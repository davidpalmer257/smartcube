# SmartCube Website Redesign

A responsive, interactive website redesign for **Smart Cube Information Systems**, designed by **[David · Flexo Studio](https://flexostudio.tech)**.

The website presents SmartCube’s services and success stories with its original content, illustrations, client logos, and icons. The design uses green panels, serif headings, fine grid borders, and spacious layouts.

[Designer portfolio](https://flexostudio.tech)

## Features

- **15 dedicated pages** with individual URLs: homepage, service directory, six service pages, success stories directory, three case studies, About, Clients, and Contact.
- Full-page navigation with direct links, refresh support, and browser back/forward navigation.
- Live service search and case study filtering.
- Keyboard-accessible solution tabs, service accordion, and mobile navigation.
- SmartCube’s original visual assets served locally.
- Shared navigation, footer, and “Designed by David” portfolio credit.
- Page titles, descriptions, canonical URLs, sitemap, and a custom 404 page.
- No external JavaScript dependencies.

## Run locally

Requires **Node.js 18+** and **Python 3**. No dependency installation is needed.

```sh
git clone https://github.com/davidpalmer257/smartcube.git
cd smartcube
npm run build
npm start
```

Open **http://127.0.0.1:4173**. Keep the server running while exploring the local preview so illustrations and nested pages continue to load.

## Edit the website

| File | Purpose |
| --- | --- |
| `src/content.mjs` | Service, case study, client, and company content |
| `src/home.html` | Homepage layout |
| `src/styles.css` | Shared styles and responsive layouts |
| `src/app.js` | Search, filters, tabs, accordion, and mobile menu |
| `scripts/build.mjs` | Shared templates and page generation |
| `dist/assets/` | Original SmartCube illustrations, logos, and icons |
| `reference/asset-sources.json` | Original asset URLs |

After editing, run `npm run build` and refresh the browser. All generated files are written to `dist/`.

## Checks

```sh
npm run check
```

The checks validate local page links, anchors, image paths, SVG files, heading structure, JavaScript syntax, and the absence of popup navigation.

## Deploy

Build and upload the contents of `dist/` to a static host that supports directory index pages. Serve nested URLs such as `/services/smart-healthcare-solutions/` from their corresponding `index.html` files.

Set the deployment origin when building to update canonical URLs and the sitemap:

```sh
SITE_URL=https://your-domain.example npm run build
```

The site uses generated HTML pages enhanced with browser JavaScript. It does not currently include a CMS, database, or server-side form processing. Contact links open the visitor’s email or phone application.

## Sources and credits

- **Website design:** [David · Flexo Studio](https://flexostudio.tech)
- **Content and visual assets:** [Smart Cube Information Systems](https://www.smartcube.co), including its About, AMIN, AjmanPay, and MOHAP pages.

SmartCube illustrations retain their original colors. Typography uses Georgia and Arial.
