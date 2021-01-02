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
      {props.parts.map((part) => (
        <Part part={part.name} exercise={part.exercises} />
      ))}
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
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map((x) => x.exercises)} />
    </div>
  )
}
export default App
