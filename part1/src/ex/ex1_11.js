import React, { useState } from "react"
import ReactDOM from "react-dom"
const Button = (props) => {
  return <button onClick={props.handler}>{props.text}</button>
}
const Statistic = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.data}</td>
      </tr>
    </tbody>
  )
}
const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  if (good + neutral + bad != 0) {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <Statistic text={"good"} data={good} />
          <Statistic text={"neutral"} data={neutral} />
          <Statistic text={"bad"} data={bad} />
          <Statistic text={"all"} data={good + neutral + bad} />
          <Statistic
            text={"average"}
            data={(good * 1 + bad * -1) / (good + neutral + bad)}
          />
          <Statistic
            text={"positive"}
            data={(good / (good + neutral + bad)) * 100 + "%"}
          />
        </table>
      </>
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
    <>
      <h1>give feedback</h1>
      <Button handler={handleGood} text={"good"} />
      <Button handler={handleNeutral} text={"neutral"} />
      <Button handler={handleBad} text={"bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
export default App
