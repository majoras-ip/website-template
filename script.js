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

// Smooth scrolling (Lenis), synced with ScrollTrigger so scroll animations stay
// in time. Subtle on purpose: lerp 0.14 is a touch snappier than Lenis's default.
// Mouse wheel and trackpad only: touch scrolling stays native (syncTouch: false).
// Off under prefers-reduced-motion, including if the setting changes mid-visit.
// If Lenis fails to load, the page simply scrolls natively.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const hasGsap = !!(window.gsap && window.ScrollTrigger);
let lenis = null;

function lenisRaf(time) {
  if (lenis) lenis.raf(time * 1000);
}
function startLenis() {
  if (lenis || !window.Lenis || reduceMotion.matches) return;
  lenis = new Lenis({
    lerp: 0.14,
    smoothWheel: true,
    syncTouch: false,
    anchors: true, // lands below the call bar via scroll-padding-top in styles.css
    stopInertiaOnNavigate: true,
    autoRaf: !hasGsap,
  });
  if (hasGsap) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);
  }
}
function stopLenis() {
  if (!lenis) return;
  if (hasGsap) {
    gsap.ticker.remove(lenisRaf);
    gsap.ticker.lagSmoothing(500, 33);
  }
  lenis.destroy();
  lenis = null;
}

startLenis();
reduceMotion.addEventListener('change', () => (reduceMotion.matches ? stopLenis() : startLenis()));
