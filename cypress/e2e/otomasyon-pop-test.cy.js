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
