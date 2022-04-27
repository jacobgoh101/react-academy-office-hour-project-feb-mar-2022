
/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('apps', function () {
    beforeEach(function () {
        cy.login()
        cy.visit('clients/new')
    })

    it('can create a client and an invoice', function () {
        const name = faker.name.findName();
        const email = faker.internet.email();
        const companyName = faker.company.companyName();
        const vatNumber = faker.finance.account();
        const regNumber = faker.finance.account();
        cy.get('[name="name"]').type(name)
        cy.get('[name="email"]').type(email)
        cy.get('[name="companyName"]').type(companyName)
        cy.get('[name="address"]').type(faker.address.streetAddress())
        cy.get('[name="vatNumber"]').type(vatNumber)
        cy.get('[name="regNumber"]').type(regNumber)
        cy.get(`[type="submit"]`).click()
        cy.get('.chakra-alert').should('contain', 'Client created')
        cy.url().should('include', '/clients')
        cy.get('body').should('contain', 'Company Info')
        cy.get('body').should('contain', name)
        cy.get('body').should('contain', email)
        cy.get('body').should('contain', companyName)
        cy.get('body').should('contain', vatNumber)
        cy.get('body').should('contain', regNumber)
        cy.get('button').contains(`Edit Client`).should('be.visible')
        cy.get('button').contains(`Create Invoice`).should('be.visible')
        cy.get('[data-test="invoice-table"]').should('exist')
        cy.get('button').contains(`Create Invoice`).click();
        cy.url().should('include', '/clients')
        cy.url().should('include', '/invoices/new')
        cy.get('select[name="clientId"]').should('contain', email)
        cy.get('select[name="clientId"]').should('contain', name)
        cy.get('select[name="clientId"]').should('contain', companyName)
        cy.get('select[name="clientId"]').should('be.disabled')
        cy.get('[name="invoiceNumber"]').type(faker.finance.account())
        cy.get('[name="projectCode"]').type(`default`)
        cy.get('[name="date"]').type(`2020-01-01`)
        cy.get('[name="dueDate"]').type(`2022-01-01`)
        cy.get('button').contains(`Add new line`).click()
        cy.get(`[name="items[0].description"]`).type(`test`)
        cy.get(`[name="items[0].rate"]`).type(103)
        cy.get(`[name="items[0].quantity"]`).type(2)
        cy.get(`[name="items[1].description"]`).type(`test2`)
        cy.get(`[name="items[1].rate"]`).type(1007)
        cy.get(`[name="items[1].quantity"]`).type(5)
        cy.get('[data-test="total"]').should('contain', 103 * 2 + 1007 * 5)
        cy.get('button').contains('Save').click()
        cy.get('.chakra-alert').should('contain', 'Invoice created')
        cy.url().should('include', '/invoices')
        cy.get('body').should('contain', email)
        cy.get('body').should('contain', name)
        cy.get('body').should('contain', companyName)
        cy.get('body').should('contain', vatNumber)
        cy.get('body').should('contain', regNumber)
        cy.get('[data-test="total"]').should('contain', 103 * 2 + 1007 * 5)
    })

})
