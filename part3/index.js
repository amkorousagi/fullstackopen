const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  )
  process.exit(1)
}

const Person = require("./person")
/*
const person = new Person({
  name: "hsm",
  number: "5678",
  id: 1,
})

person.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})

Person.find({}).then((persons) => {
  console.log(persons)

  mongoose.connection.close()
})
*/
/*
let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  },
]
for (let i = 0; i < persons.length; i++) {
  const person = new Person(persons[i])
  person.save().then((result) => {
    console.log("note saved ", i)
  })
  .catch(err=>console.log(err.toString()))
}
*/
const app = express()
app.use(express.json())
app.use(cors())
//ex3_7 and ex3_8
morgan.token("body", (req, res) => {
  return JSON.stringify(req.body)
})
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
)
//ex3_13 : read, extract module
//ex3_14 : create

//ex3_1
app.get("/api/persons", (request, response, next) => {
  console.log(request.body)
  Person.find({})
    .then((result) => response.json(result))
    .catch((err) => next(err))
})

//ex3_2
app.get("/info", (request, response) => {
  const date = new Date()
  Person.find({}).then((result) =>
    response.send(`
  Phonebook has info for ${result.length} people 
  <br>${date}
`)
  )
})

//ex3_3
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end("no person")
      }
    })
    .catch((err) => next(err))
})

//ex3_4, ex3_15
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((person) => {
      res.status(204).end()
    })
    .catch((err) => next(err))
})

//ex3_5 and ex3_6
/*
const max = 1000
const getRandomId = () => {
  let new_id
  do {
    new_id = Math.floor(Math.random() * Math.floor(max))
  } while (persons.find((p) => p.id === new_id))
  return new_id
}
*/

app.post("/api/persons", async (req, res, next) => {
  const body = req.body
  console.log(body)
  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({ error: "name or number is missing" })
  }

  //promise chain required
  /*
  if (persons.find((p) => p.name === body.name)) {
    return res.status(400).json({ error: "name must be unique" })
  }
  */

  try {
    const result = await Person.find({ name: body.name })
    console.log(result)
    if (result.length === 0) {
      const person = new Person({
        name: body.name,
        number: body.number,
      })
      person
        .save()
        .then((result) => res.json(result))
        .catch((err) => next(err))
    } else {
      let newReq = req

      newReq.url = `/api/persons/${result[0]._id}`
      newReq.method = "PUT"
      app.handle(newReq, res)
    }
  } catch (err) {
    next(err)
  }
})

app.put("/api/persons/:id", (req, res, next) => {
  console.log("hi")
  const body = req.body
  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedObject) => {
      res.json(updatedObject)
    })
    .catch((err) => next(err))
})

//ex3_16
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unkown endpoint" })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.log(error.toString())

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformmatted id" })
  }
  next(error)
}
app.use(errorHandler)

app.listen(3001)
