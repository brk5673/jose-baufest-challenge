// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("delay", () => {
    cy.wait(1000);
})

Cypress.Commands.add("getRandomPetName", () => {
    cy.request({
        method: 'GET',
        url: 'https://www.randomlists.com/data/dog-names.json',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        let petName = response.body.data[Math.floor(Math.random() * response.body.data.length)] //get some int random index
        return petName;
    })
})