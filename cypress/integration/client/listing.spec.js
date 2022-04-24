
/// <reference types="cypress" />

describe('apps', function () {
    beforeEach(function () {
        cy.login()
    })

    context('in dashboard', function () {
        beforeEach(function () {
            cy.visit(Cypress.env('baseUrl') + 'clients')
        })

        it('display clients with pagination', function () {
            cy.get('body').contains('Clients', { matchCase: false })
            cy.get('thead').contains('total billed', { matchCase: false })
            cy.get('thead').contains('invoices count', { matchCase: false })
            cy.get('thead').contains('name', { matchCase: false })
            cy.get('[data-test="client-table"]').find('td').should('have.length.above', 0)
            cy.get('.pagination-container').find('button').contains('Previous').should('be.disabled')
            cy.get('.pagination-container').find('button').contains('Next').should('exist')
        })

        it('allow the user to go to page 2', function () {
            cy.get('.pagination-container').find('button').contains('Next').click()
            cy.get('.pagination-container').find('button').contains('Next').should('be.disabled')
            cy.get('.pagination-container').find('button').contains('Previous').should('not.be.disabled')
            cy.location('search').should('contain', 'page=2')
        })

        it('can be sorted by different columns', function () {
            cy.get('th').contains('total billed', { matchCase: false }).click();
            cy.location('search').should('contain', 'sortById=totalBilled')
            cy.location('search').should('contain', 'sortByDesc=false')
            cy.get('th').contains('total billed', { matchCase: false }).find('[aria-label="sorted ascending"]').should('exist')
            cy.get('th').contains('total billed', { matchCase: false }).click();
            cy.location('search').should('contain', 'sortById=totalBilled')
            cy.location('search').should('contain', 'sortByDesc=true')
            cy.get('th').contains('total billed', { matchCase: false }).find('[aria-label="sorted descending"]').should('exist')
            cy.get('th').contains('invoices count', { matchCase: false }).click();
            cy.location('search').should('not.contain', 'sortById=totalBilled')
            cy.location('search').should('contain', 'sortById=invoicesCount')
            cy.location('search').should('contain', 'sortByDesc=false')
            cy.get('th').contains('total billed', { matchCase: false }).find('[aria-label="sorted ascending"]').should('not.exist')
            cy.get('th').contains('invoices count', { matchCase: false }).find('[aria-label="sorted ascending"]').should('exist')

        })

        it('stay in the same page after reload', function () {
            cy.get('.pagination-container').find('button').contains('Next').click()
            cy.get('th').contains('total billed', { matchCase: false }).click();
            cy.reload()
            cy.wait(1000)
            cy.get('.pagination-container').find('button').contains('Next').should('be.disabled')
            cy.get('.pagination-container').find('button').contains('Previous').should('not.be.disabled')
            cy.location('search').should('contain', 'page=2')
            cy.location('search').should('contain', 'sortById=totalBilled')
            cy.location('search').should('contain', 'sortByDesc=false')
            cy.get('[aria-label="sorted ascending"]').should('exist')
            cy.get('[aria-current="true"]').should('contain', '2')
        })

        it('can visit client creation page', function () {
            cy.get('button').contains('Create Client').click();
            cy.location('pathname').should('eq', '/clients/new')
        })
    });

})
