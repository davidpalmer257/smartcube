from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1] / 'dist'
pages = sorted(ROOT.rglob('*.html'))
errors = []
links_checked = 0

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.refs = []
        self.headings = 0
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if tag == 'h1':
            self.headings += 1
        if tag == 'dialog' or 'onclick' in attrs or attrs.get('target') == '_blank':
            errors.append(f'{self.file}: popup navigation remains')
        if tag == 'button' and ('data-service' in attrs or 'data-story' in attrs or 'contact-open' in attrs.get('class', '')):
            errors.append(f'{self.file}: content navigation uses a button')
        for key in ['src', 'href']:
            if key in attrs:
                self.refs.append(attrs[key])

parsed = {}
for file in pages:
    page = Page()
    page.file = str(file.relative_to(ROOT))
    page.feed(file.read_text())
    parsed[file] = page
    if len(page.ids) != len(set(page.ids)):
        errors.append(f'{page.file}: duplicate element IDs')
    if page.headings != 1 or 'main' not in page.ids:
        errors.append(f'{page.file}: expected one H1 and a main landmark')

for file, page in parsed.items():
    for ref in page.refs:
        url = urlsplit(ref)
        if url.scheme or url.netloc:
            continue
        target = ROOT / unquote(url.path.lstrip('/')) if url.path.startswith('/') else file.parent / unquote(url.path)
        if not url.path:
            target = file
        if target.is_dir():
            target = target / 'index.html'
        if not target.is_file():
            errors.append(f'{page.file}: missing link or asset {ref}')
        elif url.fragment and target in parsed and unquote(url.fragment) not in parsed[target].ids:
            errors.append(f'{page.file}: missing anchor {ref}')
        links_checked += 1

for file in (ROOT / 'assets').glob('*.svg'):
    ET.parse(file)

if errors:
    raise SystemExit('\n'.join(errors))
print(f'Checked {len(pages) - 1} content pages and 404 page, {links_checked} local links/assets, and all SVGs. No popup navigation or broken local links.')
