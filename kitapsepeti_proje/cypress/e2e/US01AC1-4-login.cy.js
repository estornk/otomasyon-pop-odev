import LoginPage from '../pages/LoginPage';
import userData from '../fixtures/userData.json';

describe('User Story 01 - Kullanıcı Girişi', () => {
  beforeEach(() => {
  cy.visit('https://www.kitapsepeti.com/')
  cy.wait(1000)

  cy.get('body').then(($body) => {
    if ($body.find('.cc-nb-main-container').length > 0) {
      cy.get('.cc-nb-main-container').within(() => {
        cy.get('.cc-nb-okagree').click({ force: true })
      })
    }
  })
})


  it('AC1–AC4 | Kullanıcı geçerli bilgilerle giriş yaptığında adres sayfasına ulaşabilmelidir', () => {
    //AC1 | Login popup'ına erişme
    cy.get('.member-login-btn').click();
    cy.get('#header-member-panel-322 > .drawer-body').should('be.visible');

    //AC2 | Form alanları kontrolü
    cy.get('#header-email').should('be.visible');
    cy.get('#header-password').should('be.visible');
    cy.get('form.w-100 > .flex-wrap > .d-flex').should('be.visible');
    cy.get('.flex-wrap > .text-gray').should('be.visible');
    cy.get('#login-btn-322').should('be.visible');
    cy.get('#register-btn-322').should('be.visible');

    //AC3 | Başarılı giriş
    cy.fixture('userData').then((data) => {
    cy.get('#header-email').type(data.email)
    cy.get('#header-password').type(data.password)
    cy.get('#login-btn-322').click( {force: true})
    cy.wait(2000);
})
    
  });
});
