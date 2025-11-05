(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  const body = document.body;
  const reductionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const prefersReducedMotion = () => reductionQuery.matches;

  if (navToggle && nav) {
    const closeNav = () => {
      nav.classList.remove('open');
      body.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.textContent = 'Menu';
    };

    const openNav = () => {
      nav.classList.add('open');
      body.classList.add('nav-open');
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.textContent = 'Close Menu';
    };

    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.contains('open');
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    nav.addEventListener('click', (event) => {
      if (event.target instanceof HTMLElement && event.target.tagName === 'A') {
        closeNav();
      }
    });

    const handleMotionChange = () => {
      body.classList.toggle('reduce-motion', prefersReducedMotion());
    };

    if (typeof reductionQuery.addEventListener === 'function') {
      reductionQuery.addEventListener('change', handleMotionChange);
    } else if (typeof reductionQuery.addListener === 'function') {
      reductionQuery.addListener(handleMotionChange);
    }

    handleMotionChange();
  }

  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    if (link.classList.contains('skip-link')) {
      return;
    }

    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') {
        return;
      }

      const target = document.querySelector(targetId);
      if (!target) {
        return;
      }

      if (!prefersReducedMotion()) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
