const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('secret', 10)
  const user = new User({
    username: 'root',
    name: 'brunov',
    blogs: [],
    passwordHash,
  })

  await user.save()
})

beforeEach(async () => {
  await Blog.deleteMany({})

  const users = await User.find({})
  const user = users[0]
  const id = users[0]._id

  const blogObject = helper.initialBlogs.map(
    (blog) =>
      new Blog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        user: id,
        likes: blog.likes ? blog.likes : 0,
      })
  )
  const promiseArray = blogObject.map((blog) => {
    blog.save()
    user.blogs = user.blogs.concat(blog._id)
  })
  await Promise.all(promiseArray)
  await user.save()
})

describe('Correct format and amount of blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('same length', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})
describe('Blog id test', () => {
  test('blog posts is named id instead of _id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('Blogs POST ', () => {
  test('new blog was added', async () => {
    const users = await User.find({})

    const id = users[0]._id
    const testBlog = {
      title: 'Cookies',
      author: 'Bruno Vidal',
      url: 'www.cookiesblog.com',
      likes: 999,
      user: id,
    }

    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const title = response.body.map((r) => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(title).toContain('Cookies')
  })
})
describe('Likes test', () => {
  test('likes default to 0 if missing', async () => {
    const users = await User.find({})

    const id = users[0]._id
    const testBlog = {
      title: 'Cookies n Cream',
      author: 'Bruno RL',
      url: 'www.cookiesncreamblog.com',
      user: id,
    }

    const response = await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })
})

describe('Missin props test', () => {
  test('fails if title is missing', async () => {
    const users = await User.find({})

    const id = users[0]._id
    const testBlog = {
      author: 'Bruno twettVidal',
      url: 'www.cookitwtwesblog.com',
      likes: 999,
      user: id,
    }

    await api.post('/api/blogs').send(testBlog).expect(400)
  })

  test('fails if url is missing', async () => {
    const testBlog = {
      title: 'Some blog',
      author: 'Some Author',
      likes: 42,
    }

    await api.post('/api/blogs').send(testBlog).expect(400)
  })
})

describe('deleting a blog post', () => {
  test('blog deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const ids = blogsAtEnd.map((blog) => blog.id)
    expect(ids).not.toContain(blogToDelete.id)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api.delete(`/api/blogs/${validNonexistingId}`).expect(404)
  })
})

describe('update (PUT) test', () => {
  test('updating a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      ...blogToUpdate,
      likes: 999,
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedPost = blogsAtEnd.find((blog) => blog.id === blogToUpdate.id)

    expect(updatedPost.likes).toBe(updatedBlog.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
