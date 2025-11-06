describe('US05 | Ödeme ve Sipariş Onayı Testi (AC1-AC8)', () => {
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

    cy.get('.member-login-btn').click();
    cy.get('#header-member-panel-322 > .drawer-body').should('be.visible');

    cy.fixture('userData').then((data) => {
    cy.get('#header-email').type(data.email)
    cy.get('#header-password').type(data.password)
    cy.get('#login-btn-322').click( {force: true})
    cy.wait(5000);
})

    cy.get('[name="q"]').clear().type('roman');
    cy.get('#live-search-btn').click();
    cy.wait(1500);

    cy.get('.product-detail-card').first().find('.add-to-cart-btn').click({ force: true });
    cy.get('#popup-cart').should('be.visible');
    cy.wait(1000);
    cy.contains('Sepete Git').click({ force: true });
    cy.url().should('include', '/sepet');
  });

  it('AC1-AC8 | Ödeme ve Sipariş Onayı Akışı', () => {

    // AC1 | "Satın Al" butonuna tıklanmalı ve Adres Bilgileri sayfasına yönlendirmeli
    cy.get('#cart-buy-btn')
      .should('be.visible')
      .click({ force: true });

    cy.url({ timeout: 10000 }).should('include', '/order');

    // AC2 | "Ödeme Adımına Geç" butonuna tıklanmalı ve ödeme sayfasına yönlendirmeli
    cy.get('button.order-next-btn', { timeout: 10000 })
  .should('be.visible')
  .and('contain.text', 'Ödeme Adımına Geç')
  .click({ force: true });
    cy.url({ timeout: 10000 }).should('include', '/payment');

    // AC3 | Kargo seçenekleri kontrolü (PTT Kargo)
    cy.get('.payment-cargo-list .accordion-body.show ul li label', { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'PTT Kargo')
      .click({ force: true });
    cy.get('.payment-cargo-list input[type="radio"]', { timeout: 10000 })
      .first()
      .should('exist')
      .and('be.checked');

    // AC4 | Ödeme yöntemleri kontrolü
    cy.get('#iyz-tablist', { timeout: 15000 }).should('be.visible');
    cy.get('#iyz-tab-payWithIyzico img', { timeout: 10000 })
      .should('be.visible')
      .and(($img) => {
    const src = $img.attr('src');
    expect(src).to.include('iyzipay');
  });

    cy.get('#iyz-tab-credit-card', { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Kartla Ödeme');

    // AC5 | Kartla Ödeme seçildiğinde kart formu alanları görünmeli
    cy.get('#iyz-tab-credit-card').click({ force: true });
    cy.get('[name="cardHolderName"]').should('be.visible');
    cy.get('#ccnumber').should('be.visible');
    cy.get('#ccexp').should('be.visible');
    cy.get('#cccvc').should('be.visible');

    // AC6 | Tüm alanlar doldurulunca “Öde” butonu aktif olmalı
    cy.get('[name="cardHolderName"]').type('Test Kullanıcı');
    cy.get('#ccnumber').type('4111111111111111');
    cy.get('#ccexp').type('12/28');
    cy.get('#cccvc').type('123');

    cy.get('#iyz-payment-button', { timeout: 10000 })
      .should('be.visible')
      .and('not.have.class', 'css-1219de1-Button-Button-StyledButton-StyledButton')
      .and('have.class', 'css-184xkgp-Button-Button-StyledButton')
      .and('contain.text', 'ÖDE');

    // AC7 | Eksik bilgi girilince uyarı mesajı görünmeli
    cy.get('#ccname').clear();
    cy.get('#iyz-payment-button', { timeout: 10000 })
      .should('be.visible')
      .and('have.class', 'css-1219de1-Button-Button-StyledButton-StyledButton')
      .and('not.have.class', 'css-184xkgp-Button-Button-StyledButton');

    // AC8 | Sayfanın sağında Sipariş Özeti kutusu ve doğru toplam tutar bulunmalı
cy.get('#order-summary').should('be.visible')
  .within(() => {
    cy.contains('Genel Toplam', { matchCase: false }).should('be.visible');
    cy.get('div:nth-child(2)')
      .invoke('text')
      .then((text) => {
        const tutar = parseFloat(text.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
        cy.log('Genel Toplam:', tutar);
        expect(tutar, `Genel Toplam tutarı ${text} olmalı ve 0'dan büyük olmalı`).to.be.greaterThan(0);

        });
      });
  });
});
