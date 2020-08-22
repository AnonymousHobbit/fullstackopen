const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require("./test_helper")
const api = supertest(app)
const Blog = require("../models/api")
const User = require("../models/user")

let token;

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
  await User.insertMany(helper.initialUser)
  const userid = await User.findOne({ username: "root" })
  await Blog.updateMany({}, {$set: {user: userid._id}})
  token = await helper.createToken()
})

describe("HTTP GET", () => {
  test('Blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all Blogs are returned', async () => {
    const response = await api.get('/api/Blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test("Every id field is named 'id'", async () => {
    const list = await helper.blogsDB();

    list.forEach(x => {
      expect(x.id).toBeDefined()
    })
  })
})

describe("HTTP POST", () => {
  test('Blogs amount has increased by 1 after POST request', async () => {
    const newBlog = {
      title: "Hacking in general",
      author: "Hobbit",
      url: "https://hobitti.tk",
      likes: 69
    }

    await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const bamount = await helper.blogsDB();

    expect(bamount).toHaveLength(helper.initialBlogs.length+1)
  })

  test('If likes field is empty then replace it with 0', async () => {
    const newBlog = {
      title: "Hacking in general",
      author: "Hobbit",
      url: "https://hobitti.tk"
    }

    const blognew = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(blognew.body.likes).toBe(0);
    })

  test('Invalid blog cannot be added', async () => {
    const newBlog = {
      author: "Hobbit"
    }

    const blognew = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const bamount = await helper.blogsDB();

    expect(bamount).toHaveLength(helper.initialBlogs.length)
  })
})

describe("HTTP DELETE", () => {
  test("Remove blog by id", async () => {
    const firstblog = await helper.blogsDB()
    const delBlog = firstblog[0]

    await api
      .delete(`/api/blogs/${delBlog.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const bamount = await helper.blogsDB();
    expect(bamount).toHaveLength(helper.initialBlogs.length-1)
  })

})

describe("HTTP PUT", () => {
  test("update likes amount by id", async () => {
    const firstblog = await helper.blogsDB()
    const delBlog = firstblog[0]

    await api
      .put(`/api/blogs/${delBlog.id}/69`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const updating = await helper.blogsDB()
    expect(updating[0].likes).toBe(69)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
