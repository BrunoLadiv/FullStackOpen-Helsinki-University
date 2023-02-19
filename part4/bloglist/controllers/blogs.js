const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  // Blog
  //   .find({})
  //   .then(blogs => {
  //     response.json(blogs)
  //   }) i prefer this way ☹️
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.title || !blog.url) {
    return response.status(400).send({ error: 'title or url missing' })
  }
  if (!blog.likes) blog.likes = 0

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    return res.status(404).json({ error: 'blog not found' })
  }

  await blog.remove()
  res.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

  if (updatedBlog) {
    response.json(updatedBlog.toJSON())
  } else {
    response.status(404).end()
  }
})




module.exports = blogsRouter
