describe('Blog app', () => {
  beforeEach(function(){
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Log in to application')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
  })

  describe('Login',function() {
    beforeEach(function(){
      cy.visit('http://localhost:3000')
    })

    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('mikhita')
      cy.get('#password').type('mikhita')
      cy.get('#login-button').click()

      cy.contains('Mikhita logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('mikhitada')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.wait(1000) // Wait for 1 second
      cy.screenshot()
      cy.contains('wrong username or password')
        .should('be.visible')
        .invoke('css', 'color')
        .should('equal', 'rgb(255, 0, 0)')
    })
  })
})