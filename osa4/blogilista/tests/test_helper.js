const Blog = require("../models/api");
const User = require("../models/user");
const app = require('../app')
const jwt = require('jsonwebtoken')

const initialUser = {
  username: "root",
  name: "root user",
  password: "$2b$10$JtRiI.4Rb2w.pdK5ExIl5evdPstBYgPmSkkJWLpjuOesG6KNaQBTu"
}

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0
  }
];

const blogsDB = async () => {
  const blogObject = await Blog.find({});
  return blogObject.map(b => b.toJSON());
};

const usersDB = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const createToken = async () => {

  const user = await User.findOne({ username: "root" })
  const testuser = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(testuser, process.env.SECRET)
  return token
}

module.exports = {
  blogsDB,
  initialBlogs,
  initialUser,
  usersDB,
  createToken
};
