import userData from '../fixtures/userData.json';

describe('AC8 - Çok fazla hatalı giriş kısıtlaması', () => {
  it('Kullanıcı 10 hatalı denemeden sonra uyarı mesajı almalıdır', () => {
    const wrongPassword = 'yanlisSifre123';
    let attemptCount = 0;

    cy.intercept('POST', '**/Customer/Login', (req) => {
      attemptCount += 1;

      if (attemptCount <= 10) {
        req.reply({
          statusCode: 200,
          body: {
            success: false,
            message: 'E-posta adresi veya şifre hatalı.'
          }
        });
      } else {
        req.reply({
          statusCode: 429,
          body: {
            success: false,
            message: 'Çok fazla istek talebinde bulundunuz. Lütfen 30 dakika sonra tekrar deneyin.'
          }
        });
      }
    }).as('mockedLogin');

    for (let i = 0; i < 10; i++) {
      cy.visit('https://www.kitapsepeti.com/');
      
      cy.get('.cc-nb-main-container').then(($popup) => {
        if ($popup.is(':visible')) {
          cy.get('.cc-nb-okagree').click({ force: true });
        }
      });

      cy.get('.member-login-btn').click({ force: true });
      cy.get('#header-email').clear().type(userData.email);
      cy.get('#header-password').clear().type(wrongPassword);
      cy.get('#login-btn-322').click( {force: true})

      
    }

    cy.visit('https://www.kitapsepeti.com/');
    cy.get('.member-login-btn').click({ force: true });
      cy.get('#header-email').clear().type(userData.email);
      cy.get('#header-password').clear().type(wrongPassword);
      cy.get('#login-btn-322').click( {force: true})

     cy.contains('Çok fazla istek talebinde bulundunuz. Lütfen 30 dakika sonra tekrar deneyin.')
      .should('be.visible');
  });
});
