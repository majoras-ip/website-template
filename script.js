// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Contact form
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  successMsg.style.display = 'block';
  form.reset();
  setTimeout(() => { successMsg.style.display = 'none'; }, 4000);
});

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
    btn.setAttribute('aria-expanded', !isOpen);
  });
});

// CTA banner dismiss
const ctaClose = document.getElementById('cta-close');
const ctaBanner = ctaClose.closest('.cta-banner');

ctaClose.addEventListener('click', () => {
  ctaBanner.classList.add('hidden');
});

// Back to top
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
