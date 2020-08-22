import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = () => {
  return (
    <h1>give feedback</h1>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <p>{props.text} {props.value} </p>
  )
}

const Statistics = (props) => {

  if (props.clicka.length === 0) {
    return(
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  const sum = props.clicka.reduce((a, b) => a + b, 0);
  const avg = (sum / props.clicka.length) || 0;



  return (
    <div>
      <h1>Statistics</h1>

      <StatisticLine text="good" value={props.clickg} />
      <StatisticLine text="neutral" value={props.clickn} />
      <StatisticLine text="bad" value={props.clickb} />
      <StatisticLine text="all" value={props.clicka.length} />
      <StatisticLine text="average" value={avg} />
      <StatisticLine text="positive" value={(props.good/props.clicka.length)*100 + " %"} />
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAClick] = useState([])

  const goodClick = () => {
    setAClick(allClicks.concat(1))
    setGood(good+1)
  }

  const neutralClick = () => {
    setAClick(allClicks.concat(0))
    setNeutral(neutral+1)
  }

  const badClick = () => {
    setAClick(allClicks.concat(-1))
    setBad(bad+1)
  }

  return (
    <div>
      <Header />

      <Button onClick={goodClick} text="good" />
      <Button onClick={neutralClick} text="neutral" />
      <Button onClick={badClick} text="bad" />

      <Statistics clickg={good} clickn={neutral} clickb={bad} clicka={allClicks} good={good}/>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
