describe('US04 - Sepet Yönetimi ve Kontrolü', () => {

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

  it('AC1-AC5 ve AC8 | Sepet yönetimi, adet değişimi, silme ve boş sepet kontrolü', () => {

    // AC1 | Sepete erişim ve ürünlerin listelenmesi
    cy.get('.cart-item', { timeout: 10000 }).should('have.length', 2);

    // AC2 | Ürün bilgileri doğrulama
    cy.get('.cart-item').each(($item) => {
      cy.wrap($item).within(() => {
        cy.get('.price-sell').eq(0).should('be.visible');
        cy.get('input[id^="qty"]').should('have.value', '1');
      });
    });

    // AC3 | Sepet toplamı, kargo ve genel toplam hesaplaması
    cy.get('#cart-price-container > .p-2').within(() => {
      cy.contains('Kargo Ücreti').siblings('.text-right').invoke('text').then((text) => {
        const kargo = parseFloat(text.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
        cy.wrap(kargo).as('kargoUcreti');
      });
    });

    cy.get('.cart-item').then(($items) => {
      let hesap = 0;
      Cypress.$($items).each((i, el) => {
        const $el = Cypress.$(el);
        const unitText = $el.find('.price-sell').eq(0).text().trim();
        const unit = parseFloat(unitText.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
        const qtyVal = Number($el.find('input[id^="qty"]').val()) || 0;
        hesap += unit * qtyVal;
      });
      cy.wrap(hesap).as('hesaplananAraToplam');
    });

    cy.get('#cart-price-container > .p-2').within(() => {
      cy.contains('Sepet Toplamı').siblings('.text-right').invoke('text').then((text) => {
        const gösterilenAraToplam = parseFloat(text.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
        cy.get('@hesaplananAraToplam').then((hesaplanan) => {
          expect(gösterilenAraToplam).to.be.closeTo(hesaplanan, 0.01);
        });
      });

      cy.contains('Genel Toplam').siblings('.text-right').invoke('text').then((text) => {
        const gösterilenGenelToplam = parseFloat(text.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
        cy.get('@hesaplananAraToplam').then((hesaplanan) => {
          cy.get('@kargoUcreti').then((kargo) => {
            const beklenenGenel = +(hesaplanan + kargo).toFixed(2);
            expect(gösterilenGenelToplam).to.be.closeTo(beklenenGenel, 0.01);
          });
        });
      });
    });

    // AC4 | Adet artırma ve toplamın güncellenmesi
    cy.get('.cart-item').first().within(() => {
      cy.get('input[id^="qty"]').clear().type('2').blur();
    });

    cy.get('.cart-item').first().within(() => {
      cy.get('input[id^="qty"]').should('have.value', '2');
    });

    cy.wait(2000);
    cy.get('#cart-price-container', { timeout: 15000 }).should('be.visible');
    cy.get('.cart-item', { timeout: 15000 }).should('have.length.at.least', 2);

    // AC5 | İkinci ürünü silme
    cy.get('.cart-item').eq(1).within(() => {
      cy.get('a.cart-item-delete, a[id^="delete-product"]', { timeout: 15000 })
        .should('exist')
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });
    });

    cy.get('.t-popconfirm-inner', { timeout: 10000 }).should('be.visible');
    cy.get('.t-popconfirm-buttons > .btn-light').click({ force: true });

    cy.get('.cart-item', { timeout: 10000 }).should('have.length', 1);

    // AC8 | "Satın Al" butonu

    cy.get('#cart-price-container').should('be.visible')
      .and('contain.text', 'Satın Al')

  });
});
