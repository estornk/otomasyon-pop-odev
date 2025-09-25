export class HomePage {
  openMenu() {
    cy.get('#open-navigation-menu-mobile').should("be.visible").click();
  }

  logout() {
    cy.contains(/log out/i).should("be.visible").click();
  }
}
