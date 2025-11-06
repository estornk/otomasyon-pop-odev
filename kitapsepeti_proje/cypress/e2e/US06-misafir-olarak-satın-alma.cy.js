describe('US06 - Misafir Olarak Satın Alma Akışı', () => {

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

  it('AC1–AC6 | Misafir olarak satın alma akışı doğru çalışmalıdır', () => {

    // ✅ AC1–3 | Ürünü sepete ekle > Satın al > Üye olmadan devam et
    cy.get('.product-detail-card').first().within(() => {
      cy.get('.add-to-cart-btn', { timeout: 15000 }).click({ force: true });
    });

    cy.get('#popup-cart', { timeout: 15000 }).should('be.visible');
    cy.get('#popup-cart').within(() => {
      cy.contains('Sepete Git', { timeout: 10000 })
        .should('be.visible')
        .click({ force: true });
    });

    cy.url().should('include', '/sepet');
    cy.get('.cart-item', { timeout: 10000 })
      .should('have.length.at.least', 1);

    cy.get('#cart-buy-btn')
      .should('be.visible')
      .click({ force: true });

    cy.url({ timeout: 10000 }).should('include', '/siparis-uye-giris');

    cy.contains('Üye Olmadan Devam Et', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    cy.url({ timeout: 10000 }).should('include', '/address');
    cy.contains('Adres Bilgileri', { matchCase: false, timeout: 10000 })
      .should('be.visible');

    // ✅ AC4 | Adres formu alanlarının görünürlüğü
    const fields = [
      '[name="fullname"]',
      '[name="country_code"]',
      '[name="city_code"]',
      '[name="town"]',
      '[name="district"]',
      '[name="address"]',
      '[name="email"]',
      '[name="mobile_phone"]'
    ];

    fields.forEach(selector => {
      cy.get(selector, { timeout: 10000 })
        .should('exist')
        .and('be.visible');
    });

    cy.get('[name="country_code"]').select(1);
    cy.get('[name="city_code"]').select(1);
    cy.wait(1000);
    cy.get('[name="town_code"]').select(1);
    cy.wait(1000);
    cy.get('[name="district_code"]').select(1);
    cy.wait(1000);
    cy.get('[name="mobile_phone"]').type('5551234567')
    cy.get('[name="email"]').type('test12deneme345@hotmail.com')
    cy.get('[name="address"]').clear().type('Deneme Mah. Test Sok. No:5 Kat:2 Daire:3');

    cy.get('.col-12 > .btn').should('be.visible').click({ force: true });

    cy.get('[name="fullname"]')
      .should('have.class', 'btn-outline-danger');
    cy.url().should('include', '/address');

    // AC6 | Geçerli bilgilerle devam etme
    cy.get('[name="fullname"]').type('Test Kullanıcı');

    cy.get('.col-12 > .btn').should('be.visible').click({ force: true });
    cy.url({ timeout: 15000 }).should('include', '/payment');
  });
});
