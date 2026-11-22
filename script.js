// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Estimate form (demo only: replace with a real form service before launch)
const form = document.getElementById('estimate-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  status.textContent = "Request sent. We'll call you within one business day.";
  form.reset();
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll animations: one quiet fade-up per section, only if GSAP loaded
// and the visitor hasn't asked for reduced motion. Content is fully
// visible without JS, so a CDN failure never hides anything.
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    gsap.utils.toArray('[data-reveal]').forEach(el => {
      gsap.from(el, {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true }
      });
    });
  });
}
