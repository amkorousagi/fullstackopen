import React, { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "010-1234-5678" },
  ])
  const [newName, setNewName] = useState("")
  const [newPhone, setNewPhone] = useState("")

  const newNameHandler = (e) => {
    setNewName(e.target.value)
  }
  const newPhoneHandler = (e) => {
    setNewPhone(e.target.value)
  }
  const addPerson = (e) => {
    e.preventDefault()
    if (persons.map((p) => p.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, phone:newPhone}))
      setNewName("")
      setNewPhone("")
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
          phone:
          <input value={newPhone} onChange={newPhoneHandler} />
        </div>
        <div>
          <button type='submit' onClick={addPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <li key={person.name}>{person.name} {person.phone}</li>
      ))}
    </div>
  )
}

export default App
