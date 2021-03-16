const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require("./test_helper")
const User = require('../models/user')
const Blog = require("../models/api")

const initialUser = {
  username: "root",
  name: "root user",
  password: "toor"
}

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const user = new User(initialUser)

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersDB()

    const newUser = {
      username: 'testuser',
      name: 'user user',
      password: 'password1',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
   const usersAtStart = await helper.usersDB()

   const testUser = {
     username: "root",
     name: "Testing for",
     password: "1234"
   }

   const result = await api
     .post('/api/users')
     .send(initialUser)
     .expect(400)
     .expect('Content-Type', /application\/json/)

   expect(result.body.error).toContain('Username must be unique')

   const usersAtEnd = await helper.usersDB()
   expect(usersAtEnd).toHaveLength(usersAtStart.length)
 })
})

afterAll(() => {
    mongoose.connection.close()
})
