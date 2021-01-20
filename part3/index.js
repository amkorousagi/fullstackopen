const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const app = express()

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
]

app.use(express.json())
app.use(cors())
//ex3_7 and ex3_8
morgan.token("body", (req, res) => {
  return JSON.stringify(req.body)
})
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
)

//ex3_1
app.get("/api/persons", (request, response) => {
  console.log(request.body)
  response.json(persons)
})

//ex3_2
app.get("/info", (request, response) => {
  const date = new Date()
  console.log(date)
  response.send(`
    Phonebook has info for ${persons.length} people 
    <br>${date}
  `)
})

//ex3_3
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find((p) => p.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

//ex3_4
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter((p) => p.id !== id)
  res.status(204).end()
})

//ex3_5 and ex3_6
const max = 1000
const getRandomId = () => {
  let new_id
  do {
    new_id = Math.floor(Math.random() * Math.floor(max))
  } while (persons.find((p) => p.id === new_id))
  return new_id
}

app.post("/api/persons", (req, res) => {
  const body = req.body
  console.log(body)
  body.id = getRandomId()
  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({ error: "name or number is missing" })
  }

  if (persons.find((p) => p.name === body.name)) {
    return res.status(400).json({ error: "name must be unique" })
  }

  persons = persons.concat(body)
  res.send(persons)
})

app.listen(3001)
