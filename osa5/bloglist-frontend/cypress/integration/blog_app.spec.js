const payload = {
  username: "hobbit",
  name: "Hobbit Bohhit",
  password: "toor"
}

const blog = {
  title: "Hobbits are fun",
  author: "Hobbit",
  url: "https://hobitti.tk",
  likes: 0
}

const blog2 = {
  title: "Töihin",
  author: "Teme",
  url: "bohhit.com",
  likes: 65
}

const blog3 = {
  title: "VoiZ",
  author: "ope",
  url: "hobbit.com",
  likes: 37
}

const blog4 = {
  title: "Fullstackopen",
  author: "student",
  url: "fullstackopen.com",
  likes: 72
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('GET', 'http://localhost:3003/db')
    console.log(payload)
    cy.request("POST", 'http://localhost:3003/api/users', payload)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
    cy.get("#username")
    cy.get("#password")
    cy.get("#loginBtn")
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get("#username").type(payload.username)
      cy.get("#password").type(payload.password)
      cy.get("#loginBtn").click()
      cy.contains("write").click()
      cy.get("#newblog")
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get("#username").type("jekku123")
      cy.get("#password").type("jekutettu234")
      cy.get("#loginBtn").click()
      cy.contains("wrong credentials")
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login(payload)
    })

    it('A blog can be created', function() {
      cy.contains("write").click()
      cy.get("#title").type(blog.title)
      cy.get("#author").type(blog.author)
      cy.get("#url").type(blog.url)
      cy.get("#formBtn").click()
      cy.get("#newblog").contains(blog.title)
    })

    it("A blog can be liked", function() {
      cy.createBlog(blog)
      cy.get("#newblog").contains(blog.title)
      cy.get("#viewBtn").click()
      cy.contains("likes 0")
      cy.get("#likeBtn").click()
      cy.contains("likes 1")
    })

    it("Valid user can remove blog", function() {
      cy.createBlog(blog)
      cy.get("#newblog").contains(blog.title)
      cy.get("#viewBtn").click()
      cy.get("#removeBtn").click()
      cy.get("#newblog").should("not.contain", blog.title)
    })

    it("Blogs are organized by likes", function() {
      cy.createBlog(blog)
      cy.createBlog(blog2)
      cy.createBlog(blog3)
      cy.createBlog(blog4)

      cy.get("#newblog").contains(blog.title)
      cy.get("#newblog").contains(blog2.title)
      cy.get("#newblog").contains(blog3.title)
      cy.get("#newblog").contains(blog4.title)

      cy.get(".blogver").then(btn => {
        cy.wrap(btn[0]).click()
        cy.wrap(btn[1]).click()
        cy.wrap(btn[2]).click()
        cy.wrap(btn[3]).click()
      })

      cy.get("#blogver").then(blogs => {
        cy.wrap(blogs[0]).contains("likes 72")
        cy.wrap(blogs[1]).contains("likes 65")
        cy.wrap(blogs[2]).contains("likes 37")
        cy.wrap(blogs[3]).contains("likes 0")
      })
    })

  })
})
