describe('AC6-7 | Boş Sepet Testi', () => {
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

    cy.get('[name="q"]').clear().type('roman');
    cy.get('#live-search-btn').click();
    cy.wait(1500);

    cy.get('.product-detail-card').eq(0).find('.add-to-cart-btn').click({ force: true });
    cy.get('#popup-cart').should('be.visible');
    cy.get('#t-modal-close-1 > .ti-close').click({ force: true });

    cy.get('.product-detail-card').eq(1).find('.add-to-cart-btn').click({ force: true });
    cy.get('#popup-cart').should('be.visible');
    cy.get('#t-modal-close-1 > .ti-close').click({ force: true });

    cy.get('#header-cart-btn').click();
    cy.get('#go-cart-btn').click();
    cy.url().should('include', '/sepet');
  });

  it('AC6 ve AC7 | Sepeti Temizleme (clear cart) ve Boş Sepet Doğrulaması', () => {

    // AC6 | Sepeti tamamen temizleme 
    cy.get('[id^="clear-cart-btn"]', { timeout: 15000 })
      .should('exist')
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

    cy.get('.cart-item', { timeout: 15000 }).should('have.length', 0);

    // AC7 | Boş sepet mesajı ve "Alışverişe Devam Et" butonunu doğrula
    cy.get('.fw-light', { timeout: 15000 })
      .should('be.visible')
      .and('contain.text', 'Sepetinizde Ürün Bulunmamaktadır');

    cy.get('#cart-back-btn', { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Alışverişe Devam Et');
  });
});
