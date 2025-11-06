class LoginPage {
  static container() {
    return cy.get('.login-sidebar')
  }
  static emailField() {
    return this.container().find('input[name="Email"]')
  }
  static passwordField() {
    return this.container().find('input[name="Password"]')
  }
  static rememberMeCheckbox() {
    return this.container().find('input[type="checkbox"]')
  }
  static forgotPasswordLink() {
    return this.container().contains('Şifremi Unuttum')
  }
  static loginButton() {
    return this.container().contains('Giriş Yap')
  }
  static registerButton() {
    return this.container().contains('Üye Ol')
  }
}
