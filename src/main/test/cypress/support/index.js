Cypress.Commands.add('getByTestId', (id) => cy.get(`[role=${id}]`))
