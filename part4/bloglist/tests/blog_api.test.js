const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
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
    const testBlog = {
      title: 'Cookies',
      author: 'Bruno Vidal',
      url: 'www.cookiesblog.com',
      likes: 999,
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
    const newBlog = {
      title: 'Milk',
      author: 'Cow',
      url: 'https://milk.com',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
