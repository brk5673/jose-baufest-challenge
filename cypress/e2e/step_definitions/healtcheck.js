import {
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
const loginPage = require("../../pages/LoginPage");
const username = `josse-${Date.now()}`;
const password = Cypress.env('BAUFEST_DEFAULT_PASSWORD');

Given("I visit {string}", (url) => {
  cy.visit(url);
});

Then("The navigation bar is visible with options {string} and {string}", (menuOption1, menuOption2) => {
  cy.get('#navbarExample').within(() => {
    cy.contains(menuOption1).should("be.visible");
    cy.contains(menuOption2).should("be.visible");
  })
});

When("I click on Sign up option", () => {
  cy.get('#navbarExample').within(() => {
    cy.contains("Sign up").click();
  })
});

Then("A user creation dialog form is displayed with fields {string}, {string} and {string}, {string} buttons on footer", () => {
  //get form
  cy.get('#signInModal').within(() => {
    cy.get('.modal-header').invoke('text').then((headerText)=>{
      expect(headerText).to.contain("Sign up");
    })
    cy.get('#sign-username').should("be.empty"); //check username input field
    cy.get('#sign-password').should("be.empty"); //check password input field

    //check footer buttons
    cy.get('.modal-footer').within(() => {
      cy.get('.btn-secondary').should("have.text", "Close");
      cy.get('.btn-primary').should("have.text", "Sign up");
    })
  })
});

When("I fill username, password and submit form", () => {
  cy.get('#sign-username')
    .type(username); 
  cy.get('#sign-password')
    .type(password); 
  //Submit form
  cy.get('.modal-footer').within(() => {
    cy.contains("Sign up").click();
  })
});

Then("The dialog is closed and I can Log in with the new user", () => {
  //check dialog is closed
  cy.get('.modal-content').should("not.be.visible");
  //check user can log in
  cy.get("[data-target='#logInModal']").click();
  cy.get('#loginusername')
    .type(username);
  cy.get('#loginpassword')
    .type(Cypress.env("BAUFEST_DEFAULT_PASSWORD"));

});
