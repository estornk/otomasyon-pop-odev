import LoginPage from '../pages/LoginPage';

describe('AC9 - Şifremi Unuttum yönlendirmesi', () => {
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

  it('Kullanıcı "Şifremi Unuttum" linkine tıkladığında şifre sıfırlama sayfasına yönlendirilmelidir', () => {
    cy.get('.member-login-btn').click({ force: true });
    cy.get('#header-member-panel-322 > .drawer-body').should('be.visible');
    cy.get('.flex-wrap > .text-gray').click({ force: true });
    cy.url().should('include', 'uye-sifre-hatirlat');
    cy.contains(/(Şifremi Unuttum|Şifre|E-Posta|E-Posta:)/i).should('be.visible');
  });
});
