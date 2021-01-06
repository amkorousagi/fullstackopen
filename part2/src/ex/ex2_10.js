import React, { useState } from "react"

const Filter = ({ showWord, ShowWordHandler }) => {
  return (
    <div>
      filter shown with
      <input value={showWord} onChange={ShowWordHandler} />
    </div>
  )
}
const PersonForm = ({
  newName,
  newPhone,
  newNameHandler,
  newPhoneHandler,
  addPerson,
}) => {
  return (
    <form>
      <div>
        name:
        <input value={newName} onChange={newNameHandler} />
      </div>
      <div>
        phone:
        <input value={newPhone} onChange={newPhoneHandler} />
      </div>
      <div>
        <button type='submit' onClick={addPerson}>
          add
        </button>
      </div>
    </form>
  )
}
const Persons = ({ personsToShow }) => {
  return (
    <>
      {personsToShow.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
        </li>
      ))}
    </>
  )
}
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ])
  const [newName, setNewName] = useState("")
  const [newPhone, setNewPhone] = useState("")
  const [showWord, setShowWord] = useState("")

  const personsToShow =
    showWord === ""
      ? persons
      : persons.filter((person) => person.name.includes(showWord))

  const newNameHandler = (e) => {
    setNewName(e.target.value)
  }
  const newPhoneHandler = (e) => {
    setNewPhone(e.target.value)
  }
  const ShowWordHandler = (e) => {
    setShowWord(e.target.value)
  }
  const addPerson = (e) => {
    e.preventDefault()
    if (persons.map((p) => p.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newPhone }))
      setNewName("")
      setNewPhone("")
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter showWord={showWord} ShowWordHandler={ShowWordHandler} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newPhone={newPhone}
        newNameHandler={newNameHandler}
        newPhoneHandler={newPhoneHandler}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App
