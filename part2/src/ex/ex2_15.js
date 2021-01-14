import React, { useEffect, useState } from "react"
import axios from "axios"

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
        <li key={person.id}>
          {person.name} {person.number}
        </li>
      ))}
    </>
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
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
      const newObject = {
        name: newName,
        number: newPhone,
        id: persons.length + 1,
      }
      axios
        .post("http://localhost:3001/persons", newObject)
        .then((res) => {
          setPersons(res.data)
          setNewName("")
          setNewPhone("")
        })
        .catch((err) => console.log(err.toString()))
    }
  }

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log(response.data)
      setPersons(response.data)
    })
  }, [])

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
