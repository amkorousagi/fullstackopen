import React, { useEffect, useState } from "react"
import service from "./ex2_16_module"

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
const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <>
      {personsToShow.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={(e) => deletePerson(e, person.id)}>delete</button>
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
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const newObject = {
          name: newName,
          number: newPhone,
          id: persons.find(p=>p.name === newName).id,
        }
          service.update(newObject).then(res=>{
            setPersons(persons.map(p=>{
              if(p.id!==res.id){
                return p
              } else{
                return res
              }
            }))
            setNewName("")
            setNewPhone("")
          })
      }

    } else {
      const newObject = {
        name: newName,
        number: newPhone,
        id: persons.length + 1,
      }
      service
        .create(newObject)
        .then((res) => {
          console.log(res)
          setPersons(persons.concat(res))
          setNewName("")
          setNewPhone("")
        })
        .catch((err) => console.log(err.toString()))
    }
  }
  const deletePerson = (e, id) => {
    e.preventDefault()
    if (window.confirm("Do you really want to delete " + id + "?")) {
      service
        .deleteObject(id)
        .then(setPersons(persons.filter((p) => p.id != id)))
    }
  }

  useEffect(() => {
    service.getAll().then((res) => {
      setPersons(res)
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
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
