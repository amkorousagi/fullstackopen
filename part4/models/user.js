//ex4.15
const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    validate() {
      return this.username.length >= 3
    },
  },
  password: {
    type: String,
    require: true,
  },
  name: String,
  //ex 4.17
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
})
userSchema.plugin(uniqueValidator)

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("User", userSchema)
