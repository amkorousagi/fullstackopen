import React, { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }])
  const [newName, setNewName] = useState("")

  const newNameHandler = (e) => {
    setNewName(e.target.value)
    console.log(e.target)
  }
  const addPerson = (e) => {
    e.preventDefault()
    if (persons.map((p) => p.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName }))
      setNewName("")
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name:
          <input value={newName} onChange={newNameHandler} />
        </div>
        <div>
          <button type='submit' onClick={addPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <li key={person.name}>{person.name}</li>
      ))}
    </div>
  )
}

export default App
