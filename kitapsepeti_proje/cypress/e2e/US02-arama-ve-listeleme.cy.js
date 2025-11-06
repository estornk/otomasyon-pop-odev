describe('Arama ve Ürün Listeleme Senaryoları (AC1–AC9)', () => {

  beforeEach(() => {
    cy.visit('https://www.kitapsepeti.com/');
    cy.wait(2000);   
    cy.get('body').then(($body) => {
      if ($body.find('.cc-nb-main-container').length) {
        cy.get('.cc-nb-main-container').within(() => {
          cy.get('.cc-nb-okagree').click({ force: true });
        });
      }
    });
  });

  it('AC1 - Kullanıcı, ana sayfadaki arama çubuğuna en az 1 karakter (ürün adı) yazarak arama yapabilmelidir', () => {
    cy.get('[name="q"]').type('a');
    cy.get('#live-search-btn').click();
    cy.url().should('include', '/arama');
    cy.get('.product-detail-card').should('have.length.greaterThan', 0);

  });

  it('AC2 - Arama sonuçları sayfasının sağ üstünde arama kriterlerine uygun ürünlerin listelendiği doğru bir şekilde görülmelidir', () => {
    cy.get('[name="q"]').type('roman'); 
    cy.get('#live-search-btn').click();
    cy.get('.product-detail-card').should('have.length.greaterThan', 0); 
  });

  it('AC3 - Kullanıcı, sistemde bulunmayan bir kelimeyle arama yaptığında, sayfada herhangi bir uygun ürün olmadığı görülmelidir', () => {
    cy.get('[name="q"]').type('asfdqwert'); 
    cy.get('#live-search-btn').click(); 
    cy.get('.product-detail-card').should('have.length', 0) ; 
  });

  it('AC4 - Ürün kartı, ürün listeleme sayfasındaki her bir üründe bulunmalıdır', () => {
    cy.get('[name="q"]').type('kitap');
    cy.get('#live-search-btn').click();
    cy.get('.product-detail-card').each(($card) => {
      cy.wrap($card).should('exist'); 
      cy.wrap($card).find('.product-title').should('be.visible');
      cy.wrap($card).find('.brand-title').should('be.visible') 
    });
  });

  it('AC5 - Her ürün kartında, "Sepete Ekle" butonu olmalıdır ve buton üzerine hover yapınca aktif hale gelmelidir', () => {
    cy.get('[name="q"]').type('kitap'); 
    cy.get('#live-search-btn').click(); 
    cy.get('.product-detail-card')
      .first()
      .find('.add-to-cart-btn')
      .click({ force: true });


  });

  it('AC6 - Arama sonuçları sayfasının sağ üstünde sıralama menüsünde yer alan seçenekler doğru şekilde listelenmelidir', () => {
    cy.get('[name="q"]').type('kitap'); 
    cy.get('#live-search-btn').click(); 
    cy.get('[name="sort"]').should('contain', 'Varsayılan Sıralama');
    cy.get('[name="sort"]').should('contain', 'Yeniden Eskiye');
    cy.get('[name="sort"]').should('contain', 'Eskiden Yeniye');
    cy.get('[name="sort"]').should('contain', 'Fiyat Artan');
    cy.get('[name="sort"]').should('contain', 'Fiyat Azalan');
  });

  it('AC7 - Arama sonuçları sayfasının sol tarafında filtreleme seçenekleri, "Kategori", "Marka", ve "Model" filtreleri bulunmalıdır', () => {
    cy.get('[name="q"]').type('kitap'); 
    cy.get('#live-search-btn').click(); 
    cy.get('#product-filter > .px-1').should('contain', 'Kategori');
    cy.get('#product-filter > .px-1').should('contain', 'Marka');
    cy.get('#product-filter > .px-1').should('contain', 'Model');
  });

  it('AC8 - Kullanıcı, ana sayfada üstteki kategori isimlerinin üzerine tıklayarak ilgili kategorileri görmelidir', () => {
    cy.get('#main-menu > .container a') 
      .first() 
      .then($el => {
    const kategoriAdi = $el.text().trim(); 
    cy.wrap($el).click( {force: true}); 

    cy.url().should('include', encodeURI(kategoriAdi)); 
  });

  });

 it('AC9 - Kullanıcı aşağıya scroll yaptığında yeni ürünlerin yüklendiğini görmelidir', () => {
  cy.get('[name="q"]').type('kitap'); 
    cy.get('#live-search-btn').click(); 
  cy.get('.product-detail-card').then($cardsBefore => {
    const initialCount = $cardsBefore.length;

    cy.window().then(win => {
      win.scrollTo(0, win.document.body.scrollHeight);
    });
    cy.wait(6000);

    cy.get('.product-detail-card', { timeout: 10000 }).should($cardsAfter => {
      expect($cardsAfter.length).to.be.greaterThan(initialCount);
    });
  });
});






});
