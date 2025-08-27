// main.js: theme toggle, mobile menu, project filtering, contact form (EmailJS placeholder), skills chart, multi-language and more

// Theme toggle (dark/light)
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme');
if(savedTheme) root.setAttribute('data-theme', savedTheme);
themeToggle && themeToggle.addEventListener('click', ()=>{
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Mobile menu
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');
mobileToggle && mobileToggle.addEventListener('click', ()=>{
  const open = mobileMenu.hidden === false;
  mobileMenu.hidden = open;
});

// Projects filtering
document.querySelectorAll('.filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.project').forEach(card => {
      const cats = card.dataset.cats.split(',');
      if(f === 'all' || cats.includes(f)) card.style.display = 'block'; else card.style.display = 'none';
    });
  });
});

// Greeting by time of day
const greet = document.getElementById('greeting');
if(greet){
  const h = new Date().getHours();
  const g = h<12? 'Good morning' : h<18? 'Good afternoon' : 'Good evening';
  greet.textContent = g;
}


// Contact form submit (EmailJS placeholder)
// For real use, include EmailJS SDK and replace service/template IDs
const contactForm = document.getElementById('contact-form');
if(contactForm){
  contactForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const data = new FormData(contactForm);
    // placeholder: show an alert and reset
    alert('Thanks! Message simulated as sent. Replace with EmailJS integration.');
    contactForm.reset();
  });
}

// Save as PDF (print)
const savePdfBtn = document.getElementById('save-pdf');
if(savePdfBtn){
  savePdfBtn.addEventListener('click', ()=> window.print());
}

// Newsletter (placeholder)
const newsletter = document.getElementById('newsletter-form');
if(newsletter){
  newsletter.addEventListener('submit',(e)=>{ e.preventDefault(); alert('Subscribed — simulated. Integrate Mailchimp/ConvertKit.'); newsletter.reset(); });
}

// Simple testimonials carousel (auto)
let tIndex=0;
const tests = document.querySelectorAll('.testimonial');
if(tests.length){
  setInterval(()=>{
    tests.forEach((t,i)=> t.style.display = (i===tIndex? 'block' : 'none'));
    tIndex = (tIndex+1) % tests.length;
  },4000);
}

// Multi-language toggle (EN/ES simple)
const langToggle = document.getElementById('lang-toggle');
let lang = localStorage.getItem('lang') || 'en';
function applyLang(){
  if(lang === 'es'){
    document.querySelectorAll('[data-i18n]').forEach(el=> el.textContent = el.dataset.i18nEs || el.dataset.i18n);
    langToggle.textContent = 'EN';
  } else { 
    document.querySelectorAll('[data-i18n]').forEach(el=> el.textContent = el.dataset.i18n);
    langToggle.textContent = 'ES';
  }
  localStorage.setItem('lang', lang);
}
langToggle && langToggle.addEventListener('click', ()=>{ lang = lang === 'en' ? 'es' : 'en'; applyLang(); });
applyLang();

// Register service worker for PWA
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/service-worker.js').catch(()=>{});
}
