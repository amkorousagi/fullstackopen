import React from "react";

const Part = (props) =>(
  <p>
    {props.part} {props.exercise}
  </p>
)

const Header = (props) => (
  <>
    <h1>{props.course}</h1>
  </>
);

const Content = (props) => {
  return (
    <>
      <Part part={props.part} exercise={props.exercise}/>
    </>
  );
};

const Total = (props) => {
  let total = 0;
  props.exercises.map((item) => {
    total += item;
  });
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const parts = [part1, part2, part3];
  const exercises = [exercises1, exercises2, exercises3];

  return (
    <div>
      <Header course={course} />
      <Content part={part1} exercise={exercises1} />
      <Content part={part2} exercise={exercises2} />
      <Content part={part3} exercise={exercises3} />
      <Total exercises={exercises} />
    </div>
  );
};
export default App;
