describe('mon premier spec', () => {
  it('passes', () => {
    cy.visit('localhost:5501/index.html')
    cy.get('#card1').click()
    cy.url().should('include', '/blog.html')

  })
})