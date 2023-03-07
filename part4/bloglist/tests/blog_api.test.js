const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../tests/test_helper')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const user = {
  username: 'root',
  password: 'secret',
}
let BlogID

async function getToken(user) {
  const res = await api.post('/api/login').send(user).expect(200)
  return res.body.token
}

describe('Blogs', () => {
  beforeAll(async () => {
    await Blog.deleteMany({})

    await User.deleteMany({})
    const passwordHash = bcrypt.hashSync('secret', 10)
    const user = new User({
      username: 'root',
      passwordHash,
    })
    await user.save()
  }, 10000)

  describe('POST/login', () => {
    test('authenticate user', async () => {
      await getToken(user)
    })
  })
})

describe('POST /api/blogs', () => {
  test('Create a new blog', async () => {
    const token = await getToken(user)
    console.log('###########>>>TOKEN<<<##########', token)

    const newBlog = {
      title: 'Jet set Radio',
      author: 'SEGA',
      url: 'https://store.steampowered.com/app/205950/Jet_Set_Radio/',
      likes: 9999,
    }

    const res = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(res.body).toBeDefined()
    expect(res.body.id).toBeDefined()
    expect(res.body.title).toBe(newBlog.title)
    expect(res.body.author).toBe(newBlog.author)
    expect(res.body.url).toBe(newBlog.url)
    expect(res.body.likes).toBe(newBlog.likes)
    BlogID = res.body.id
    console.log('###########>>>>>BLOG ID<<<<<<##############', BlogID)
  })
  test('fails with status code 401 when invalid token is provided', async () => {
    const newBlog = {
      title: 'FailBLOG',
      author: 'FAIL',
      url: 'https:fail.com/',
      likes: 0,
    }
    const invalidToken = 'fjaodfjaofjaodsghaeghew'
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${invalidToken}`)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

describe('GET/blogs/:id', () => {
  test('fails with status code 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()
    await api.get(`/api/blogs/${validNonexistingId}`).expect(404)
  })

  test('fails with status code 400 when id is invalid', async () => {
    const invalidId = '23d3ef49035a900fa48edf7'

    const res = await api.get(`/api/blogs/${invalidId}`)

    expect(res.statusCode).toEqual(400)
    expect(res.body.error).toContain('invalid id')
  })
})

// describe('DELETE/blogs/:id', () => {
//   test('deleting a blog with an invalid token returns a 401 error', async () => {
//     const invalidToken = 'faerjawlkrjwerown'
//     await api
//       .delete(`/api/blogs/${BlogID}`)
//       .set('Authorization', `Bearer ${invalidToken}`)
//       .expect(401)
//   })

//   test('a blog can be deleted', async () => {
//     const token = await getToken(user)
//     await api
//       .delete(`/api/blogs/${BlogID}`)
//       .set('Authorization', `Bearer ${token}`)
//       .expect(204)

//     const blogsAtEnd = await helper.blogsInDb()
//     const titles = blogsAtEnd.map((blog) => blog.title)
//     expect(titles).not.toContain('Jet set Radio')
//   })
// })

afterAll(() => {
  mongoose.connection.close()
})
