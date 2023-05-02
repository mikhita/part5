describe('Blog app', () => {
  it('front page can be opened', () => {
    // eslint-disable-next-line no-undef
    cy.visit('http://localhost:3000')
    // eslint-disable-next-line no-undef
    cy.contains('Log in to application')
    // eslint-disable-next-line no-undef
    // cy.contains('Mikhita logged in')
  })
})