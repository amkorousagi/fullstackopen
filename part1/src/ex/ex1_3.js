import React from "react"

const Part = (props) => (
  <p>
    {props.part} {props.exercise}
  </p>
)

const Header = (props) => (
  <>
    <h1>{props.course}</h1>
  </>
)

const Content = (props) => {
  return (
    <>
      <Part part={props.part} exercise={props.exercise} />
    </>
  )
}

const Total = (props) => {
  let total = 0
  props.exercises.map((item) => {
    total += item
  })
  return <p>Number of exercises {total}</p>
}

const App = () => {
  const course = "Half Stack application development"
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  }
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  }
  const part3 = {
    name: "State of a component",
    exercises: 14,
  }
  return (
    <div>
      <Header course={course} />
      <Content part={part1.name} exercise={part1.exercises} />
      <Content part={part2.name} exercise={part2.exercises} />
      <Content part={part3.name} exercise={part3.exercises} />
      <Total exercises={[part1.exercises,part2.exercises,part2.exercises]} />
    </div>
  )
}
export default App
