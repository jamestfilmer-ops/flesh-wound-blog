/* ============================================================
   'TIS BUT A FLESH WOUND — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ----------------------------------------------------------
  // STICKY HEADER: shrink on scroll
  // ----------------------------------------------------------
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ----------------------------------------------------------
  // READING PROGRESS BAR (article pages only)
  // ----------------------------------------------------------
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      progressBar.style.width = Math.min(progress, 100) + '%';
    }, { passive: true });
  }

  // ----------------------------------------------------------
  // SCROLL-TRIGGERED CARD FADE-IN
  // ----------------------------------------------------------
  const cards = document.querySelectorAll('.card');
  if (cards.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
  }

  // ----------------------------------------------------------
  // ACTIVE NAV LINK
  // ----------------------------------------------------------
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.site-nav a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href) && href !== '/') {
      link.classList.add('active');
    } else if (href === 'index.html' && (currentPath === '/' || currentPath.endsWith('index.html'))) {
      link.classList.add('active');
    }
  });

  // ----------------------------------------------------------
  // READ TIME ESTIMATE
  // ----------------------------------------------------------
  const articleContent = document.querySelector('.article-content');
  const readTimeEl = document.querySelector('.read-time');
  if (articleContent && readTimeEl) {
    const words = articleContent.innerText.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 250));
    readTimeEl.textContent = `${minutes} min read`;
  }

  // ----------------------------------------------------------
  // NEWSLETTER FORM (basic UX)
  // ----------------------------------------------------------
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('.newsletter-input');
      const btn = newsletterForm.querySelector('.newsletter-btn');
      if (input && input.value.includes('@')) {
        btn.textContent = 'Subscribed';
        btn.style.background = '#1A4A38';
        input.value = '';
        input.placeholder = 'You\'re in.';
      }
    });
  }

});
