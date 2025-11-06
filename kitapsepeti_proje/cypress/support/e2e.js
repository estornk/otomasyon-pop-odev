Cypress.on('window:load', (win) => {
  const observer = new win.MutationObserver(() => {
    const acceptButton = win.document.querySelector('#cookie-policy-accept, .cookie__bar button, .cookie__accept, .cookie-btn');
    if (acceptButton) {
      acceptButton.click();
      observer.disconnect();
    }
  });

  observer.observe(win.document.body, { childList: true, subtree: true });
});

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

