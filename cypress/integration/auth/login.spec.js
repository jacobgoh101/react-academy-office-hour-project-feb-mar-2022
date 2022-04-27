
/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('apps', function () {
    beforeEach(function () {
        cy.fixture('users.json').as('users')

        cy.visit(Cypress.env('baseUrl'))
    })

    context('when the user is not yet logged-in', function () {
        it('takes the user to login page', function () {
            cy.url().should('include', '/login')
        })


        context('with incorrect credentials', function () {
            it('show errors', function () {
                cy.get(`[id="email"]`).type(faker.internet.email())
                cy.get(`[id="password"]`).type(faker.internet.password())
                cy.get(`[type="submit"]`).click()
                cy.get(`[role="alert"]`).should('contain', 'Invalid Credentials')
            })
        })

        context('with correct credentials', function () {
            it('take the user to dashboard after login', function () {
                cy.get(`[id="email"]`).type(this.users[0].email)
                cy.get(`[id="password"]`).type(this.users[0].password)
                cy.get(`[type="submit"]`).click()
                cy.url().should('eq', Cypress.env('baseUrl'))
            })
        })
    })

    context('when the user is already logged-in', function () {
        context('when the user visit the login page', function () {
            beforeEach(function () {
                cy.get(`[id="email"]`).type(this.users[0].email)
                cy.get(`[id="password"]`).type(this.users[0].password)
                cy.get(`[type="submit"]`).click()
            })
            it('redirects the user to dashboard', function () {
                cy.url().should('eq', Cypress.env('baseUrl'))
            });
        })
    });

})
