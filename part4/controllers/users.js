const usersRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")
const saltRounds = 10

//ex 4.15
usersRouter.get("/", async (req, res) => {
  //ex 4.17
  try {
    const users = await User.find({}).populate("blogs")

    //populate result
    res.json(users)
  } catch (err) {
    console.log("err", err)
  }
})

//ex 4.15
usersRouter.post("/", async (req, res, next) => {
  try {
    const { username, password, name } = req.body

    //ex 4.16
    if (username === undefined || password === undefined) {
      res.status(400).end()
    } else if (username.length < 3 || password.length < 3) {
      res.status(400).end()
    }

    const hashedpassword = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username: username,
      password: hashedpassword,
      name: name,
    })

    const savedUser = await user.save()
    if (savedUser) {
      res.status(201).json(savedUser)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    next(err)
  }
})

usersRouter.delete("/:id", async (req, res) => {
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

usersRouter.patch("/:id", async (req, res) => {
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

module.exports = usersRouter
