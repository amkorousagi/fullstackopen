//ex4.2
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const config = require("../utils/config")
const { response } = require("express")

blogsRouter.get("/", async (req, res) => {
  //ex 4.17
  const blogs = await Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .exec()
  res.json(blogs)
  console.log("blogs ", blogs)
})

blogsRouter.post("/", async (req, res, next) => {
  try {
    //ex 4.11
    //ex 4.18
    //ex 4.19
    const user = req.user

    if (req.body.likes == undefined) {
      req.body.likes = 0
    }

    if (req.body.title == undefined || req.body.url == undefined) {
      res.status(400).end()
    } else {
      const blog = await new Blog({ ...req.body, user: user._id })
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      const result = await user.save()
      if (result) {
        res.status(201).json(result)
      } else {
        res.status(404).end()
      }
    }
  } catch (err) {
    next(err)
  }
})

blogsRouter.delete("/:id", async (req, res) => {
  //ex 4.21
  
  const user = req.user
  if (user) {
    const blog = await Blog.deleteOne({ _id: req.params.id })
    user.blogs = user.blogs.remove(req.params.id)
    await user.save()
    res.status(200).json(user)
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
