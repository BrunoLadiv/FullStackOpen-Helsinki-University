// eslint-disable-next-line
function dummy(blogs) {
  return 1
}
function totalLikes(blogs) {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}
function favoriteBlog(blogs) {
  return blogs.reduce(
    (favorite, blog) => (blog.likes > favorite.likes ? blog : favorite),
    blogs[0]
  )
}

function mostBlogs(blogs) {
  const counts = blogs.reduce((acc, { author }) => {
    acc[author] = acc[author] ? acc[author] + 1 : 1
    return acc
  }, {})

  const topAuthor = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  )
  const blogCount = counts[topAuthor]

  return { author: topAuthor, blogs: blogCount }
}
function mostLikes(blogs) {
  const likesByAuthor = blogs.reduce((acc, { author, likes }) => {
    acc[author] = acc[author] ? acc[author] + likes : likes
    return acc
  }, {})

  const topAuthor = Object.keys(likesByAuthor).reduce((a, b) =>
    likesByAuthor[a] > likesByAuthor[b] ? a : b
  )
  const mostLikes = likesByAuthor[topAuthor]

  return { author: topAuthor, likes: mostLikes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
