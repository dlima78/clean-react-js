import faker from 'faker'

const baseUrl = Cypress.config().baseUrl

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      localStorage.setItem('account', JSON.stringify(account))
    })
  })

  it('Should logout on AcessDeniedError', () => {
    cy.intercept('GET', '/surveys/any_id', {
      statusCode: 403,
      response: {
        error: faker.random.words()
      }
    }).as('request')
    cy.visit('')
    cy.url().should('eq', `${baseUrl}/login`)
  })
})
