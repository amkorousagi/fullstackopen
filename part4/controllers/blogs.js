//ex4.2
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs)
  })
})

blogsRouter.post("/", (req, res, next) => {
  const blog = new Blog(req.body)

  blog
    .save()
    .then((result) => {
      if (result) {
        res.status(201).json(result)
      } else {
        res.status(404).end()
      }
    })
    .catch((err) => next(err))
})

module.exports = blogsRouter
