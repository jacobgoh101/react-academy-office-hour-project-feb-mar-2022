// login.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="cypress" />
import { faker } from '@faker-js/faker';


const newUserEmail = faker.internet.email();
const newUserPassword = faker.internet.password();

describe('apps', function () {
    beforeEach(function () {
        cy.fixture('users.json').as('users')

        cy.visit(Cypress.env('baseUrl') + 'signup')
    })

    context('don\'t allow form submission without filling up all fields', function () {
        it('show errors', function () {
            cy.get(`[id="email"]`).type(this.users[0].email)
            cy.get(`[id="password"]`).type(faker.internet.password())
            cy.get(`[type="submit"]`).click()
            cy.get(`[type="submit"]`).dblclick()
            cy.get('form').should('contain', 'Name is a required field')
        })
    })

    context('when the confirm password does not match with password', function () {
        it('show errors', function () {
            cy.get(`[id="email"]`).type(this.users[0].email)
            cy.get(`[id="password"]`).type(faker.internet.password())
            cy.get(`[id="confirmPassword"]`).type(faker.internet.password())
            cy.get(`[id="name"]`).type(faker.name.findName())
            cy.get(`[type="submit"]`).click()
            cy.get(`form`).should('contain', 'Passwords must match')
        })
    })

    context('when the email was already used', function () {
        it('show errors', function () {
            cy.get(`[id="email"]`).type(this.users[0].email)
            cy.get(`[id="password"]`).type('123456')
            cy.get(`[id="confirmPassword"]`).type('123456')
            cy.get(`[id="name"]`).type(faker.name.findName())
            cy.get(`[type="submit"]`).click()
            cy.get(`[role="alert"]`).should('contain', 'Please check your entries and try again')
        })
    })

    context('when the email was already used', function () {
        it('show errors', function () {
            cy.get(`[id="email"]`).type(this.users[0].email)
            cy.get(`[id="password"]`).type('123456')
            cy.get(`[id="confirmPassword"]`).type('123456')
            cy.get(`[id="name"]`).type(faker.name.findName())
            cy.get(`[type="submit"]`).click()
            cy.get(`[role="alert"]`).should('contain', 'Please check your entries and try again')
        })
    })

    context(`with valid signup`, function () {
        it('auto login & require user to finish onboarding', function () {
            cy.get(`[id="email"]`).type(newUserEmail)
            cy.get(`[id="password"]`).type(newUserPassword)
            cy.get(`[id="confirmPassword"]`).type(newUserPassword)
            cy.get(`[id="name"]`).type(faker.name.findName())
            cy.get(`[type="submit"]`).click()

            cy.intercept('POST', `${Cypress.env('apiBaseUrl')}login`).as('login')
            cy.intercept('GET', `${Cypress.env('apiBaseUrl')}me`).as('getMe')
            cy.wait('@login')
            cy.wait('@getMe')

            cy.url().should('include', '/onboarding')

            // user can't access anywhere else without going through onboarding
            cy.visit(Cypress.env('baseUrl') + 'signup')
            cy.url().should('include', '/onboarding')
            cy.visit(Cypress.env('baseUrl') + 'login')
            cy.url().should('include', '/onboarding')
            cy.visit(Cypress.env('baseUrl') + 'random-testing-page')
            cy.url().should('include', '/onboarding')
            cy.visit(Cypress.env('baseUrl'))
            cy.url().should('include', '/onboarding')

            cy.get('[type="submit"]').click()
            cy.get('[type="submit"]').click()
            cy.get('form').should('contain', 'Name is a required field')

            cy.get('[name="name"]').type(faker.name.findName())
            cy.get('[name="address"]').type(faker.address.streetAddress())
            cy.get('[name="vatNumber"]').type(faker.finance.account())
            cy.get('[name="regNumber"]').type(faker.finance.account())
            cy.get('[name="iban"]').type(faker.finance.account())
            cy.get('[name="swift"]').type(faker.finance.account())

            cy.get('[type="submit"]').click()

            cy.url().should('eq', Cypress.env('baseUrl'))
        })
    })
})
