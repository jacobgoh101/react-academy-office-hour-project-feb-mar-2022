
/// <reference types="cypress" />

describe('apps', function () {
    beforeEach(function () {
        cy.login()
    })

    context('in dashboard', function () {
        beforeEach(function () {
            cy.visit(Cypress.env('baseUrl') + 'invoices')
        })

        // it('display invoices with pagination', function () {
        //     cy.get('body').contains('Invoices', { matchCase: false })
        //     cy.get('thead').contains('due date', { matchCase: false })
        //     cy.get('thead').contains('company', { matchCase: false })
        //     cy.get('[data-test="invoice-table"]').find('td').should('have.length.above', 0)
        //     cy.get('.pagination-container').find('button').contains('Previous').should('be.disabled')
        //     cy.get('.pagination-container').find('button').contains('Next').should('exist')
        // })

        // it('allow the user to go to page 2', function () {
        //     cy.get('.pagination-container').find('button').contains('Next').click()
        //     cy.get('.pagination-container').find('button').contains('Previous').should('not.be.disabled')
        //     cy.location('search').should('contain', 'page=2')
        // })

        // it('can be sorted by different columns', function () {
        //     cy.get('th').contains('due date', { matchCase: false }).click();
        //     cy.location('search').should('contain', 'sortById=dueDate')
        //     cy.location('search').should('contain', 'sortByDesc=false')
        //     cy.get('th').contains('due date', { matchCase: false }).find('[aria-label="sorted ascending"]').should('exist')
        //     cy.get('th').contains('due date', { matchCase: false }).click();
        //     cy.location('search').should('contain', 'sortById=dueDate')
        //     cy.location('search').should('contain', 'sortByDesc=true')
        //     cy.get('th').contains('due date', { matchCase: false }).find('[aria-label="sorted descending"]').should('exist')
        //     cy.get('th').contains('company', { matchCase: false }).click();
        //     cy.location('search').should('not.contain', 'sortById=dueDate')
        //     cy.location('search').should('contain', 'sortById=company')
        //     cy.location('search').should('contain', 'sortByDesc=false')
        //     cy.get('th').contains('due date', { matchCase: false }).find('[aria-label="sorted ascending"]').should('not.exist')
        //     cy.get('th').contains('company', { matchCase: false }).find('[aria-label="sorted ascending"]').should('exist')
        // })

        it('can be filtered by due date', function () {
            cy.get('select').select('dueDate')
            cy.get('[name="start"]').type('2020-01-01')
            cy.get('[name="end"]').type('2022-01-01')
            cy.get('button').contains('Apply').click()
            cy.location('search').should('contain', 'filterBy=dueDate')
            cy.location('search').should('contain', 'start=2020-01-01')
            cy.location('search').should('contain', 'end=2022-01-01')
            cy.get('table').contains('no data available', { matchCase: false })
        })

        it('stay in the same page after reload', function () {
            cy.get('.pagination-container').find('button').contains('Next').click()
            cy.get('th').contains('due date', { matchCase: false }).click();
            cy.get('select').select('dueDate')
            cy.get('[name="start"]').type('2020-01-01')
            cy.get('[name="end"]').type('2022-01-01')
            cy.get('button').contains('Apply').click()
            cy.reload()
            cy.wait(1000)
            cy.get('.pagination-container').find('button').contains('Previous').should('not.be.disabled')
            cy.location('search').should('contain', 'page=2')
            cy.location('search').should('contain', 'sortById=dueDate')
            cy.location('search').should('contain', 'sortByDesc=false')
            cy.get('[aria-label="sorted ascending"]').should('exist')
            cy.get('[aria-current="true"]').should('not.exist')
            cy.location('search').should('contain', 'filterBy=dueDate')
            cy.location('search').should('contain', 'start=2020-01-01')
            cy.location('search').should('contain', 'end=2022-01-01')
            cy.get('table').contains('no data available', { matchCase: false })
        })

        it('can visit invoice creation page', function () {
            cy.get('button').contains('Create Invoice').click();
            cy.location('pathname').should('eq', '/invoices/new')
        })
    });

})
