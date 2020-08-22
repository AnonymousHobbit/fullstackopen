const express = require('express')
const router = express.Router()
const Blog = require("../models/api")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {_id: 1, username: 1, name: 1})
  response.json(blogs.map(note => note.toJSON()))
})

router.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({error: 'token missing or invalid'})
  }

  const user = await User.findById(decodedToken.id)
  if (!request.body.author || !request.body.url) {
  	return response.status(400).json({error: 'Author or url is missing'});
  }

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user._id
  })

  blogsave = await blog.save()
  user.blogs = user.blogs.concat(blogsave._id)
  await user.save()
  response.json(blogsave)
})

router.delete('/:id', async (request, response) => {

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'})
    }
    const delBlog = await Blog.findById(request.params.id)
    if (delBlog.user.toString() === decodedToken.id) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end()
    } else {
      return response.status(401).json({error: 'Not allowed to remove this post'})
    }

  } catch (exception) {
    response.status(404).end()
  }
})

router.put('/:id/:like', async (request, response) => {

	await Blog.findByIdAndUpdate(request.params.id, {likes: request.params.like}, { new: true })
		.then(updatedBlog => {
			response.status(204).end()
		})
		.catch(error => response.status(404).end())
})

module.exports = router
