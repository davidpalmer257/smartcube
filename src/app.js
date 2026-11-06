import {services} from '/content.js';

const tabs=[...document.querySelectorAll('[data-sector]')];
function selectSector(key,focus=false){
  const service=services[key];
  tabs.forEach(tab=>{const active=tab.dataset.sector===key;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;if(active&&focus)tab.focus()});
  document.querySelector('#solution-title').textContent=service.title;
  document.querySelector('#solution-description').textContent=service.description;
  const image=document.querySelector('#solution-image');image.src=`/assets/${service.image}`;image.alt=`${service.title} illustration`;
  document.querySelector('#solution-more').href=service.path;
  document.querySelector('#solution-panel').setAttribute('aria-labelledby',`tab-${key}`);
}
tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>selectSector(tab.dataset.sector));
  tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();selectSector(tabs[next].dataset.sector,true)}});
});

const list=document.querySelector('#service-list');
list?.querySelectorAll('details').forEach(detail=>{
  detail.addEventListener('toggle',()=>{
    if(!detail.open)return;
    list.querySelectorAll('details').forEach(other=>{if(other!==detail)other.open=false});
    const service=services[detail.dataset.key];
    const art=document.querySelector('#service-art');art.src=`/assets/${service.image}`;art.alt=`${service.title} illustration`;
  });
});

const mobileToggle=document.querySelector('.mobile-toggle');
const mobileNav=document.querySelector('#mobile-nav');
function closeMenu(){mobileNav.hidden=true;mobileToggle.setAttribute('aria-expanded','false');mobileToggle.setAttribute('aria-label','Open menu')}
mobileToggle?.addEventListener('click',()=>{const open=mobileToggle.getAttribute('aria-expanded')!=='true';mobileToggle.setAttribute('aria-expanded',String(open));mobileToggle.setAttribute('aria-label',open?'Close menu':'Open menu');mobileNav.hidden=!open});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeMenu();mobileToggle?.focus()}});
window.addEventListener('pageshow',closeMenu);

const search=document.querySelector('[data-directory-search]');
const category=document.querySelector('[data-directory-category]');
const cards=[...document.querySelectorAll('[data-filter-item]')];
function filterDirectory(){
  const query=search?.value.trim().toLowerCase()??'';
  const sector=category?.value??'all';
  let count=0;
  cards.forEach(card=>{const visible=card.dataset.search.includes(query)&&(sector==='all'||card.dataset.category===sector);card.hidden=!visible;if(visible)count++});
  const status=document.querySelector('.results-count');
  if(status)status.textContent=category?`${count} success ${count===1?'story':'stories'}`:`${count} ${count===1?'service':'services'}`;
  const empty=document.querySelector('.empty-state');if(empty)empty.hidden=count!==0;
}
search?.addEventListener('input',filterDirectory);
category?.addEventListener('change',filterDirectory);
window.addEventListener('pageshow',filterDirectory);
