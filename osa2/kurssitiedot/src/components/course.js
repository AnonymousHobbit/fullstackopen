import React from 'react'

const Total = (props) => {
  const total = props.course.parts.reduce((x,part) => {
        return x + part.exercises;
    },0)

  return (<p><b>Total of {total} exercises</b></p>)
}

const Header = (props) => {

  return (
    <h2>{props.name}</h2>
  )
}

const Part = (props) => {
  return (
      <p>
        {props.title} {props.amount}
      </p>
  )
}

const Content = ({ course }) => {
  const cont = course.parts.map((part) => {
      return (
        <div>
          <Part title={part.name} amount={part.exercises} />
        </div>
      )
    })

  return (
    <div>
      <Header name={ course.name } />
      {cont}
      <Total course={course}/>
    </div>
  )
}

const Course = ({ course }) => {
  const full_cont = course.map((cs) => {
    return(
      <div>
        <Content course={cs}/>
      </div>
    )
  })

  return (
    <div>
      {full_cont}
    </div>
  )
}

export default Course
