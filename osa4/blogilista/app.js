const express = require("express")
const app = express()
const cors = require("cors")
const Blog = require('./models/api')
const User = require('./models/user')
const config = require('./utils/config')
const blogsapi = require("./routes/blogs.js")
const userapi = require("./routes/users")
const loginRouter = require('./routes/login')

const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const middleware = require("./utils/middleware")

//define mongoDB connection
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

mongoose.connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
  console.log('error connection to MongoDB:', error.message)
  })

//define additional stuff
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(bodyParser.json())

app.get("/", function(req, res) {
  res.send("Hello world")
})

if (process.env.NODE_ENV === 'test') {
  app.get("/db", async (req, res) => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    res.send("Deleted")
  })
}

app.use(middleware.tokenExtractor)

//define routes
app.use("/api/blogs", blogsapi)
app.use("/api/users", userapi)
app.use('/api/login', loginRouter)

//define Middleware
app.use(middleware.errorHandler)

module.exports = app
