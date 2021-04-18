import faker from 'faker'

const baseUrl = Cypress.config().baseUrl

describe('Signup', () => {
  beforeEach(() => {
    cy.visit('signup')
  })
  it('Should load with correct initial state', () => {
    cy.getByTestId('name-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')
    cy.getByTestId('passwordConfirmation-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')
    cy.get('button[type=submit]').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').type(faker.random.alphaNumeric(2))
    cy.getByTestId('name-status')
      .should('have.attr', 'title', 'Campo inválido')
      .should('contain.text', '🔴')
    cy.getByTestId('email').type(faker.random.word())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo inválido')
      .should('contain.text', '🔴')
    cy.getByTestId('password').type(faker.random.alphaNumeric(2))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo inválido')
      .should('contain.text', '🔴')
    cy.getByTestId('passwordConfirmation').type(faker.random.alphaNumeric(2))
    cy.getByTestId('passwordConfirmation-status')
      .should('have.attr', 'title', 'Campo inválido')
      .should('contain.text', '🔴')
    cy.get('button[type=submit]').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('name').type(faker.random.alphaNumeric(5))
    cy.getByTestId('name-status')
      .should('have.attr', 'title', 'Tudo certo')
      .should('contain.text', '🟢')
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Tudo certo')
      .should('contain.text', '🟢')
    cy.getByTestId('password').type('123456')
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Tudo certo')
      .should('contain.text', '🟢')
    cy.getByTestId('passwordConfirmation').type('123456')
    cy.getByTestId('passwordConfirmation-status')
      .should('have.attr', 'title', 'Tudo certo')
      .should('contain.text', '🟢')
    cy.get('button[type=submit]').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present EmailInUseError if email already exists', () => {
    cy.getByTestId('name').type('Eduardo Lima')
    cy.getByTestId('email').type('dlima78@gmail.com')
    cy.getByTestId('password').type('123456')
    cy.getByTestId('passwordConfirmation').type('123456')
    cy.get('button[type=submit]').click()
    cy.getByTestId('error-wrap')
      .getByTestId('main-error').should('contain.text', 'Email já cadastrado.')
    cy.url().should('eq', `${baseUrl}/signup`)
  })

  it.only('Should prevent multiple submits', () => {
    cy.intercept({
      method: 'Post',
      url: /signup/
    }).as('request')
    const password = faker.random.alphaNumeric(5)
    cy.getByTestId('name').type(faker.name.findName())
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(password)
    cy.getByTestId('passwordConfirmation').type(password)
    cy.get('button[type=submit]').dblclick()
    cy.get('@request.all').should('have.length', 1)
  })
})
