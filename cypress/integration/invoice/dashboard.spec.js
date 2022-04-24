
/// <reference types="cypress" />

describe('apps', function () {
    beforeEach(function () {
        cy.login()
    })

    context('in dashboard', function () {
        beforeEach(function () {
            cy.visit(Cypress.env('baseUrl'))
        })

        it('display latest invoices', function () {
            cy.get('body').contains('Latest Invoices', { matchCase: false })
            cy.get('thead').contains('invoice no', { matchCase: false })
            cy.get('thead').contains('date', { matchCase: false })
            cy.get('thead').contains('due date', { matchCase: false })
            cy.get('thead').contains('company name', { matchCase: false })
            cy.get('[data-test="invoice-table"]').find('td').should('have.length.above', 0)
        })

        it('can visit invoice listing page', function () {
            cy.get('button').contains('View Invoices').click();
            cy.location('pathname').should('eq', '/invoices')
        })

        it('can visit invoice creation page', function () {
            cy.get('button').contains('Create Invoice').click();
            cy.location('pathname').should('eq', '/invoices/new')
        })
    });

})
