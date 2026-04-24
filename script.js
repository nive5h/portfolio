const root = document.documentElement;
const stored = localStorage.getItem('theme');
const sys = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
const apply = m => { 
  m === 'light' ? root.classList.add('light') : root.classList.remove('light'); 
  localStorage.setItem('theme', m); 
};
apply(stored || sys);
document.getElementById('themeToggle').addEventListener('click', () => apply(root.classList.contains('light') ? 'dark' : 'light'));

const toggle = document.getElementById('navToggle');
const menu = document.getElementById('navMenu');
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#top') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const t = document.querySelector(href);
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

document.getElementById('yr').textContent = new Date().getFullYear();

document.getElementById('contactForm').addEventListener('submit', async e => {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const note = document.getElementById('formNote');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  note.textContent = '';
  note.style.color = '';
  try {
    const res = await fetch(e.target.action, {
      method: 'POST',
      body: new FormData(e.target),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      note.textContent = '✓ Message sent! I\'ll get back to you soon.';
      note.style.color = '#22d3ee';
      e.target.reset();
    } else {
      throw new Error('Server error');
    }
  } catch {
    note.textContent = '⚠ Could not send — please email me directly at niveshns05@gmail.com';
    note.style.color = '#f87171';
  }
  btn.textContent = 'Send Message';
  btn.disabled = false;
});
