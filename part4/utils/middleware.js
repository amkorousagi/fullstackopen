const logger = require("./logger")
const jwt = require("jsonwebtoken")
const config = require("./config")
const User = require("../models/user")

const requestLogger = (req, res, next) => {
  logger.info("Method :", req.method)
  logger.info("Path:   ", req.path)
  logger.info("Body:   ", req.body)
  logger.info("---")
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (err, req, res, next) => {
  logger.error(err.message)

  if (err.name === "CastError") {
    return res.status(400).send({ err: "malformatted id" })
  } else if (err.name === "ValidationError") {
    return res.status(400).jsom({ err: err.message })
  } else if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      error: "invlaid token",
    })
  } else if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      error: "token expired",
    })
  }

  next(err)
}

//ex 4.20
const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization")
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7)
  } else {
    req.token = null
  }
  logger.info("req ", authorization)
  next()
}

//ex 4.22
const userExtractor = async (req, res, next) => {
  const token = req.token
  const decodedToken = jwt.verify(token, config.secret)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" })
  }
  const user = await User.findById(decodedToken.id)
  req.user = user
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
}
