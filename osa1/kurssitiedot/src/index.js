import React from 'react'
import ReactDOM from 'react-dom'


const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  console.log(props.amount)
  return (
    <div>
      <p>
        {props.title} : {props.amount}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part title={props.parts[0].name} amount={props.parts[0].exercises}/>
      <Part title={props.parts[1].name} amount={props.parts[1].exercises}/>
      <Part title={props.parts[2].name} amount={props.parts[2].exercises}/>
    </div>
  )
}

const App = () => {
  // const-määrittelyt
  const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          name: 'State of a component',
          exercises: 14
        }
      ]
    }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
