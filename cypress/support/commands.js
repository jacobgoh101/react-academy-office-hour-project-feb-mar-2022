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

Cypress.Commands.add('login', function () {
    cy.session([], function () {
        cy.fixture('users.json').then((userFixture) => {
            cy.visit(Cypress.env('baseUrl') + 'login')
            cy.get(`[id="email"]`).type(userFixture[0].email)
            cy.get(`[id="password"]`).type(userFixture[0].password)
            cy.get(`[type="submit"]`).click()
            cy.url().should('eq', Cypress.env('baseUrl'))
        });
    })
})
