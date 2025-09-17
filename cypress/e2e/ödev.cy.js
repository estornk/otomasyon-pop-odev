describe("login test ödevi", () => {
  it("test 1", () => {
    cy.visit("https://www.edu.goit.global/account/login");

    cy.login("user888@gmail.com", "1234567890");
    cy.get('#open-navigation-menu-mobile').click();
    cy.contains(/log out/i).click();
       
  });
   it("test 2", () => {
    cy.visit("https://www.edu.goit.global/account/login");

    cy.login("testowyqa@qa.team", "QA!automation-1");
    cy.get('#open-navigation-menu-mobile').click();
    cy.contains(/log out/i).click();

  
  });

   
});

