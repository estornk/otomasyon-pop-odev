
import { Login } from "../pages/Login";
import { HomePage } from "../pages/HomePage";

const LoginPage = new Login();
const HomePageObj = new HomePage();

describe("Page object example", () => {

  it("Login page validations", () => {
    // visit page
    LoginPage.navigate();

    // check title
    LoginPage.validateLoginTitle();

    // check inputs
    LoginPage.validateInputs();

    // check button
    LoginPage.validateButton();

    // check link
    LoginPage.validatePasswordLink();
  });

  it("Login and logout test with first user", () => {
    LoginPage.navigate();
    cy.login("user888@gmail.com", "1234567890");
    HomePageObj.openMenu();
    HomePageObj.logout();
  });

  it("Login and logout test with second user", () => {
    LoginPage.navigate();
    cy.login("testowyqa@qa.team", "QA!automation-1");
    HomePageObj.openMenu();
    HomePageObj.logout();
  });

});

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
