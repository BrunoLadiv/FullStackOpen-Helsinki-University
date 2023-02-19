// eslint-disable-next-line
function dummy(blogs) {
  return 1
}
function totalLikes(blogs) {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

module.exports = {
  dummy,
  totalLikes
}
