describe('AC9-10 | Sepete Erişim Testleri', () => {

  beforeEach(() => {
    cy.visit('https://www.kitapsepeti.com/');
    cy.wait(1000);

    cy.get('body').then(($body) => {
      if ($body.find('.cc-nb-main-container').length > 0) {
        cy.get('.cc-nb-main-container').within(() => {
          cy.get('.cc-nb-okagree').click({ force: true });
        });
      }
    });
  });

  it('AC9 | Ürün detay sayfasından sepete ekleme ve sepete gitme', () => {
    cy.get('[name="q"]').clear().type('roman');
    cy.get('#live-search-btn').click();
    cy.wait(1500);

    cy.get('.product-detail-card').first().within(() => {
      cy.get('[id^="product-title-"]').first().click();
    });

   cy.get('#addToCartBtn')
      .should('be.visible')
      .click({ force: true });

    cy.get('#popup-cart').should('be.visible');

    cy.get('#popup-cart')
      .within(() => {
        cy.contains('Sepete Git', { timeout: 10000 }).should('be.visible').click({ force: true });
      });

    cy.url({ timeout: 10000 }).should('include', '/sepet');
    cy.get('.cart-item', { timeout: 10000 }).should('have.length.at.least', 1);
  });

  it('AC10 | Ana sayfadan sepete ekleme ve sepete gitme', () => {
    cy.visit('https://www.kitapsepeti.com/');
    cy.wait(1500);

    cy.get('.product-detail-card').first().within(() => {
      cy.get('.add-to-cart-btn', { timeout: 10000 }).should('be.visible').click({ force: true });
    });

    cy.get('#popup-cart', { timeout: 10000 }).should('be.visible');

    cy.get('#popup-cart')
      .within(() => {
        cy.contains('Sepete Git', { timeout: 10000 }).should('be.visible').click({ force: true });
      });

    cy.url({ timeout: 10000 }).should('include', '/sepet');
    cy.get('.cart-item', { timeout: 10000 }).should('have.length.at.least', 1);
  });

});
