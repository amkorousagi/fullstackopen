//ex 4.18
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const loginRouter = require("express").Router()
const User = require("../models/user")
const config = require("../utils/config")

loginRouter.post("/", async (req, res) => {
  const body = req.body
  const user = await User.findOne({ username: body.username })
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(body.password, user.password)

  console.log("body ", body)
  console.log("user ", user)
  console.log("passwordCorrect ", passwordCorrect)
  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: "invalid username or password" })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, config.secret, { expiresIn: 60 * 60 })

  res.status(200).send({ token, username: user.username, name: user.name })
})
module.exports = loginRouter
