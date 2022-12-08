import {
  Given,
  When,
  Then
} from "@badeball/cypress-cucumber-preprocessor";

const username = `josefc-${Date.now()}`;
const password = '123123' // hardcoded password to simplify project setup without env variables for demo purposes

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
  cy.delay();
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
    .type(username, {delay: 40}); 
  cy.get('#sign-password')
    .type(password, {delay: 40});

  //Submit form
  cy.get('#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click(); 

});

Then("The dialog is closed and I can Log in with the new user", () => {
  //check dialog is closed
  cy.get('#signInModal').should("not.be.visible");
  //check user can log in
  cy.get("[data-target='#logInModal']").click();
  cy.delay();
  cy.get('#logInModal').within(() => {
    cy.get('#loginusername')
    .type(username, {delay: 40})
    cy.get('#loginpassword').click()
      .type(password);
    cy.get('.btn-primary')
      .contains("Log in")
      .click();
  });
  //check user is logged in
  cy.wait(7000); // arbritary waiting due rendering issues 
  cy.get('#nameofuser').invoke('text').then((text) => {
    expect(text).to.contain(username);
  });
});
When("I go to the {string} section", (section) => {
  cy.get('.list-group').contains('Categories', {matchCase:false}).parent().within(() => {
    cy.contains(section).click();
    cy.url()
    cy.delay();
  })
  
}) 
When("I add to cart any laptop there", () => {
  cy.get('#tbodyid')
    .get('.card')
      .get('.card-title', {scrollIntoView: true})
        .first()
        .click();
  cy.get('#more-information')
    .should('include.text', 'Product description')
  cy.get('.name').invoke('text').then((productName) => {
    cy.wrap(productName).as('productName');
    cy.intercept('POST', 'https://api.demoblaze.com/addtocart').as('addToCart');
    cy.contains('Add to Cart', {matchCase:false}).click();
    cy.wait('@addToCart').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    })
  })
});
 
Then("The Laptop is visible on my cart", () => {
  cy.get('@productName').then(expectedProductOnCart => {
    cy.get('#navbarExample').within(() => {
      cy.contains('Cart', {matchCase:false}).click();
      cy.intercept('https://api.demoblaze.com/view').as('productsOnCart');
      cy.url().should('include', '/cart');
    })

    cy.wait('@productsOnCart').then((interception) => {
      let response = interception.response.body;
      expect(response.cat)
        .eq("notebook", "Product type is the expected");
      expect(response.title, "Product name is the selected one")
        .eq(expectedProductOnCart);
      cy.get('#tbodyid').within(() => {
        cy.contains(expectedProductOnCart).should('be.visible');
        cy.contains(response.price)
      })
    })
  })
})

When("I click on Logout option on navbar", () => {
  cy.get('#navbarExample').within(() => {
    cy.contains('Log out', {matchCase:false}).click();
  })
})

Then("My session is closed", () => {
  cy.contains(username, {matchCase:false}).should('not.exist');
})
