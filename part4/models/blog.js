//ex4.2
const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  //ex 4.17
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
})
blogSchema.plugin(uniqueValidator)

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("Blog", blogSchema)
