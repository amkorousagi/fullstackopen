import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"

const Most = (props) => {
  const [most, setMost] = useState(0)
  useEffect(() => {
    let i
    for (i = 0; i < props.votes.length; i++) {
      if (props.votes[i] > props.votes[most]) {
        setMost(i)
        break
      }
    }
  })
  return (
    <>
      <p>{props.anecdotes[most]}</p>
      <p>has {props.votes[most]} votes</p>
    </>
  )
}
const App = (props) => {
  const [selected, setSelected] = useState(0)
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ]
  const makeEmptyArray = (l) => {
    let arr = []
    for (let i = 0; i < l; i++) {
      arr.push(0)
    }
    return arr
  }
  const [votes, setVotes] = useState(makeEmptyArray(anecdotes.length))
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button
        onClick={() => {
          const copy = [...votes]
          copy[selected] += 1
          setVotes(copy)
        }}>
        vote
      </button>
      <button
        onClick={() =>
          setSelected(Math.floor(Math.random() * anecdotes.length))
        }>
        next anecdote
      </button>
      <h1>Anecdote with most votes</h1>
      <Most votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

export default App
