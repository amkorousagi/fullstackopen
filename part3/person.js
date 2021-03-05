//ex3_13
const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
const password = process.argv[2]
const dbName = "node-app"

const url = `mongodb+srv://fullstack:${password}@cluster0.shpyy.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => console.log("connected to MongoDB"))
  .catch((err) => console.log("error connecting to MongoDB: ", err.message))

//ex3_19
const personSchema = new mongoose.Schema({
  name: { type: String, minlength: 2, required: true, unique: true },
  number: { type: String, minlength: 8, required: true },
})
personSchema.plugin(uniqueValidator)

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
module.exports = mongoose.model("Person", personSchema)
