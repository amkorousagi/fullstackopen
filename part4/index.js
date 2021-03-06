//ex 4.2
const app = require("./app")
const http = require("http")
const config = require("./utils/config")
const logger = require("./utils/logger")

const server = http.createServer(app)

server.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`)
})

/*
//ex4.1
const http = require("http")
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const config = require("./config")
const mongoUrl = config.url

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model("Blog", blogSchema)
mongoose.set("useNewUrlParser", true)
mongoose.set("useFindAndModify", false)
mongoose.set("useCreateIndex", true)
mongoose.set("useUnifiedTopology", true)
mongoose
  .connect(mongoUrl, {
    userNewURLParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => console.log("connected to MongoDB"))
  .catch((err) => console.log("error connecting to MongoDB: ", err.message))

app.use(cors())
app.use(express.json())

app.get("/api/blogs", (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs)
  })
})

app.post("/api/blogs", (req, res) => {
  const blog = new Blog(req.body)

  blog.save().then((result) => {
    res.status(201).json(result)
  })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
*/
