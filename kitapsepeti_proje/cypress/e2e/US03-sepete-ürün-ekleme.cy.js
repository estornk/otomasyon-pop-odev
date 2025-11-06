const normalizeForUrl = (str) =>
  encodeURI(
    str
      .toLowerCase()
      .trim()
      .replace(/[’'“”"]/g, '')
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .replace(/\s+/g, '-')
      .replace(/ç/g, 'c')
      .replace(/ğ/g, 'g')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ü/g, 'u')
  );

describe('US03 - Ürün Detay Sayfası Görüntüleme ve Sepete Ekleme', () => {
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
  });

  it('AC1 | Ürün ismine tıklanınca detay sayfasına yönlendirilmelidir', () => {
    cy.get('.product-detail-card').first().within(() => {
      cy.get('[id^="product-title-"]').first().invoke('text').then(titleText => {
        const firstWordRaw = (titleText || '').trim().split(/\s+/)[0] || titleText.trim();
        const firstWordSlug = normalizeForUrl(firstWordRaw);
        cy.get('[id^="product-title-"]').first().click();
        cy.location('pathname', { timeout: 10000 }).should('include', firstWordSlug);
      });
    });
  });

  it('AC2 | Ürün detay sayfasında ürün adı, yazar, yayınevi ve fiyat görünmelidir', () => {
    cy.get('.product-detail-card').first().within(() => {
      cy.get('[id^="product-title-"]').first().click();
    });

    cy.get('#product-title').should('be.visible');
    cy.get('#model-title > span').should('be.visible');
    cy.get('#brand-title').should('be.visible');
    cy.get('.product-price').should('be.visible');
  });

  it('AC3 | Ürün Hakkında Bilgiler bölümünde Tür, ISBN, Sayfa Sayısı, Kağıt Tipi ve Basım Yılı yer almalıdır', () => {
    cy.get('.product-detail-card').first().within(() => {
      cy.get('[id^="product-title-"]').first().click();
    });

    cy.get('.col-12.mt-1 > .row').should('be.visible');
    cy.contains('Basım Yılı').should('exist');
    cy.contains('ISBN').should('exist');
    cy.contains('Sayfa Sayısı').should('exist');
    cy.contains('Kapak').should('exist');
    cy.contains('Kağıt Tipi').should('exist');
    cy.contains('Türü').should('exist');
  });

  it('AC4 | Ürün detay sayfasında Sepete Ekle butonu bulunmalıdır', () => {
    cy.get('.product-detail-card').first().within(() => {
      cy.get('[id^="product-title-"]').first().click();
    });

    cy.get('#addToCartBtn').should('be.visible');
  });

  it('AC5 | Sepete Ekle tıklandığında onay mesajı görünmelidir', () => {
    cy.get('.product-detail-card').first().within(() => {
      cy.get('[id^="product-title-"]').first().click();
    });

    cy.get('#addToCartBtn').click({ force: true });
    cy.get('#popup-cart').should('be.visible');
  });

  it('AC6 | Ürün sepete eklendikten sonra sepet ikonu sayısı 1 artmalıdır', () => {
    cy.get('.product-detail-card').first().within(() => {
      cy.get('[id^="product-title-"]').first().click();
    });

    cy.get('.badge').invoke('text').then(initialCount => {
      const countBefore = parseInt(initialCount) || 0;
      cy.get('#addToCartBtn').click({ force: true });
      cy.wait(1000);
      cy.get('.badge').invoke('text').then(newCount => {
        const countAfter = parseInt(newCount);
        expect(countAfter).to.eq(countBefore + 1);
      });
    });
  });
});
