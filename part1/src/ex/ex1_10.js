import React, { useState } from "react"
import ReactDOM from "react-dom"
const Button = (props) => {
  return <button onClick={props.handler}>{props.text}</button>
}
const Statistic = (props) => {
  return <p>{props.text}</p>
}
const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  if (good + neutral + bad != 0) {
    return (
      <div>
        <h1>statistics</h1>
        <Statistic text={"good ".concat(good)} />
        <Statistic text={"neutral ".concat(neutral)} />
        <Statistic text={"bad " + bad} />
        <Statistic text={"all " + (good + neutral + bad)} />
        <Statistic
          text={"average " + (good * 1 + bad * -1) / (good + neutral + bad)}
        />
        <Statistic
          text={"positive " + (good / (good + neutral + bad)) * 100 + "%"}
        />
      </div>
    )
  } else {
    return <p>No feedback given</p>
  }
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
      <Button handler={handleGood} text={"good"} />
      <Button handler={handleNeutral} text={"neutral"} />
      <Button handler={handleBad} text={"bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
export default App
