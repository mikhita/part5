describe('Blog app', () => {
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3005/api/testing/reset')
    const user = {
      name: 'Misha Ghandi',
      username: 'mikhita2',
      password: 'mikhita2'
    }
    cy.request('POST', 'http://localhost:3005/api/users/', user)
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
      cy.get('#username').type('mikhita2')
      cy.get('#password').type('mikhita2')
      cy.get('#login-button').click()

      cy.contains('Misha Ghandi logged in')

      cy.wait(1000) // Wait for 1 second
      cy.contains('new blog').click()
      cy.get('#title').type('a blogTitle created by cypress')
      cy.get('#author').type('author created by cypress')
      cy.get('#url').type('url created by cypress')
      cy.contains('create').click()
      cy.contains('a blogTitle created by cypress')

      cy.contains('view').click()

      cy.contains('remove').click()

      // cy.contains('like').click()
      // cy.get('.likes').should('have.text', '1 like')


    })

    // it('fails with wrong credentials', function() {
    //   cy.contains('log in').click()
    //   cy.get('#username').type('mikhitada')
    //   cy.get('#password').type('wrongpassword')
    //   cy.get('#login-button').click()

    //   cy.wait(1000) // Wait for 1 second
    //   cy.screenshot()
    //   cy.contains('wrong username or password')
    //     .should('be.visible')
    //     .invoke('css', 'color')
    //     .should('equal', 'rgb(255, 0, 0)')
    // })
    // it('a new blog can be created', function() {
    //   cy.wait(2000) // Wait for 1 second
    //   cy.contains('new blog').click()
    //   cy.get('#title').type('a blogTitle created by cypress')
    //   cy.get('#author').type('author created by cypress')
    //   cy.get('#url').type('url created by cypress')
    //   cy.contains('create').click()
    //   cy.contains('a blogTitle created by cypress')
    // })
  })
})