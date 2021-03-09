//ex4.2
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs)
  })
})

blogsRouter.post("/", (req, res, next) => {
  //ex 4.11
  if (req.body.likes == undefined) {
    req.body.likes = 0
  }

  if ((req.body.title == undefined) | (req.body.url == undefined)) {
    res.status(400).end()
  } else {
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
  }
})

blogsRouter.delete("/:id", async (req, res) => {
  const isThere = await Blog.exists({ _id: req.params.id })
  if (isThere) {
    const blog = await Blog.deleteOne({ _id: req.params.id }, (err, res) => {
      if (err) {
        throw err
      }
      return res
    })
    res.status(200).json(blog)
  } else {
    res.status(400).end()
  }
})

blogsRouter.patch("/:id", async (req, res) => {
  const isThere = await Blog.exists({ _id: req.params.id })
  if (isThere) {
    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      (err, res) => {
        return res
      }
    )
    res.status(200).json(blog)
  } else {
    res.status(400).end()
  }
})

module.exports = blogsRouter
