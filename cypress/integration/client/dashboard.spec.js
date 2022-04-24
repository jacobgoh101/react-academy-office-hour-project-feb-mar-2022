
/// <reference types="cypress" />

describe('apps', function () {
    beforeEach(function () {
        cy.login()
    })

    context('in dashboard', function () {
        beforeEach(function () {
            cy.visit(Cypress.env('baseUrl'))
        })

        it('display latest clients', function () {
            cy.get('body').contains('Latest Clients', { matchCase: false })
            cy.get('thead').contains('total billed', { matchCase: false })
            cy.get('thead').contains('invoices count', { matchCase: false })
            cy.get('thead').contains('name', { matchCase: false })
            cy.get('[data-test="client-table"]').find('td').should('have.length.above', 0)
        })

        it('can visit client listing page', function () {
            cy.get('button').contains('View Clients').click();
            cy.location('pathname').should('eq', '/clients')
        })

        it('can visit client creation page', function () {
            cy.get('button').contains('Create Client').click();
            cy.location('pathname').should('eq', '/clients/new')
        })
    });

})
