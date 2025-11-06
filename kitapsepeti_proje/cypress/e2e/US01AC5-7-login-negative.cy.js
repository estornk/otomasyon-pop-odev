import LoginPage from '../pages/LoginPage';

describe('User Story 01 - Login Negative', () => {
  beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();

  cy.visit('https://www.kitapsepeti.com/', {
    onBeforeLoad(win) {
      const origFetch = win.fetch.bind(win);
      win.fetch = (input, init) => {
        const url = typeof input === 'string' ? input : (input && input.url) || '';
        if (url.includes('/login') || url.includes('/Account/Login') || url.includes('/auth')) {
          const body = JSON.stringify({ message: 'Giriş bilgileriniz hatalı' });
          return Promise.resolve(new win.Response(body, { status: 401, headers: { 'Content-Type': 'application/json' } }));
        }
        return origFetch(input, init);
      };
    }
  });

  cy.wait(1000);

    cy.get('body').then(($body) => {
      if ($body.find('.cc-nb-main-container').length > 0) {
        cy.get('.cc-nb-main-container').within(() => {
          cy.get('.cc-nb-okagree').click({ force: true });
        });
      }
    });
  });


  it('AC5 - Kayıtlı e-posta + yanlış şifre girildiğinde hata mesajı görünmelidir', () => {
    cy.get('.member-login-btn').click();
    cy.get('#header-member-panel-322 > .drawer-body').should('be.visible');

    cy.get('#header-email').type('test12deneme34@hotmail.com');
    cy.get('#header-password').type('yanlisSifre123');
    cy.get('#login-btn-322').click({ force: true });

    cy.get('#header-email').should('have.class', 'btn-outline-danger')
  });

  it('AC6 - Geçersiz e-posta ', () => {
    cy.get('.member-login-btn').click();
    cy.get('#header-member-panel-322 > .drawer-body').should('be.visible');

    cy.get('#header-email').type('invalid-email-format');
    cy.get('#header-password').type('123456');
    cy.get('#login-btn-322').click({ force: true });

    cy.get('#header-email').should('have.class', 'btn-outline-danger')
  });

  it('AC7 - Boş alan', () => {
    cy.get('.member-login-btn').click();
    cy.get('#header-member-panel-322 > .drawer-body').should('be.visible');

    cy.get('#header-email').clear();
    cy.get('#header-password').clear();

    cy.get('#login-btn-322').click({ force: true });
    cy.get('#header-email').should('have.class', 'btn-outline-danger')
  });
});
