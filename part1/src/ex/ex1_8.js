import React, { useState } from "react"
import ReactDOM from "react-dom"
const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  return (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good+neutral+bad}</p>
      <p>average {(good*1+bad*(-1))/(good+neutral+bad)}</p>
      <p>positive {good/(good+neutral+bad)*100}%</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = (props) => {
    console.log(props)
    setGood(good + 1)
  }
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
export default App
