// These are navigation disclosures, not application menus: links keep native Tab behavior.
(() => {
  const selector = '.language-switcher, .nav-menu, .locale-nav details';
  const close = (details, restoreFocus = false) => {
    details.open = false;
    if (restoreFocus) details.querySelector('summary')?.focus();
  };
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const details = event.target.closest(selector);
    if (details?.open) {
      event.preventDefault();
      close(details, true);
    }
  });
  document.addEventListener('pointerdown', (event) => {
    document.querySelectorAll(selector).forEach((details) => {
      if (details.open && !details.contains(event.target)) close(details);
    });
  }, { passive: true });
  document.addEventListener('focusin', (event) => {
    document.querySelectorAll(selector).forEach((details) => {
      if (details.open && !details.contains(event.target)) close(details);
    });
  });
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    const details = link?.closest(selector);
    if (details) close(details);
  });
})();
