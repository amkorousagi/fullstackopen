import React from "react"

const Part = ({ part, exercise }) => (
  <p>
    {part} {exercise}
  </p>
)

const Header = ({ course }) => (
  <>
    <h1>{course}</h1>
  </>
)

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} exercise={part.exercises} />
      ))}
    </>
  )
}

const Total = ({ exercises }) => {
  const total = exercises.reduce(
    (accumalator, currentValue) => accumalator + currentValue
  )
  return (
    <p>
      <strong>Number of exercises {total}</strong>
    </p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map((x) => x.exercises)} />
    </div>
  )
}

export default Course
