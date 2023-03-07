/* eslint-disable */

describe('Blog app', function () {
  const backendUrl = Cypress.env('BACKEND')

  beforeEach(function () {
    cy.visit('')
    cy.request('POST', `${backendUrl}/testing/reset`)

    const users = [
      {
        name: 'mirek',
        username: 'mirek',
        password: '12345',
      },
      {
        name: 'adm',
        username: 'root',
        password: '12345',
      },
    ]

    cy.wrap(users).each((user) => {
      cy.request('POST', `${backendUrl}/users/`, user)
    })
  })

  describe('login form', function () {
    it('can be opened', function () {
      cy.contains('login')
    })
  })

  describe('login', function () {
    it('succeeds with correct credentials', function () {
      const user = {
        username: 'mirek',
        password: '12345',
      }

      cy.login(user)
      cy.contains('mirek Blogs:')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wronguser')
      cy.get('#password').type('wrongpass')
      cy.get('#login-button').click()

      cy.contains('Wrong Credentials')
    })
  })

  describe('when logged in', function () {
    const blog = {
      title: 'Cypress Blog',
      author: 'mirek',
      url: 'www.example.com',
    }

    beforeEach(function () {
      const user = {
        username: 'mirek',
        password: '12345',
      }

      cy.login(user)
    })

    it('can create a new blog', function () {
      cy.contains('New Blog').click()

      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#create-button').click()

      cy.contains(`${blog.title} by ${blog.author}`)
    })
    it('tests the like feature', function () {
      cy.contains('New Blog').click()

      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#create-button').click()
      cy.get('#view').click()
      cy.contains('Likes: 0')
      cy.get('#like').click()
      cy.contains('Likes: 1')
    })
    it('tests if user is able to delete a blog', function () {
      cy.contains('New Blog').click()

      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#create-button').click()
      cy.get('#view').click()
      cy.contains('remove').click()
      
      
      
      
    })
  })
})
