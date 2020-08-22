import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      points: new Array(this.props.anecdotes.length).fill(0)
    }
  }


  handleClick = () => {
    return () => {
      this.setState({ selected: Math.floor(Math.random() * Math.floor(this.props.anecdotes.length)) })
    }
  }

  setVote = () => {
    let points = Object.assign( {}, this.state.points )
    points[(this.state.selected)] += 1

    return () => {
        this.setState({ points })
    }
}


  render () {
    const list = Object.values(this.state.points)
    const best = Math.max(...list)
    const points = Object.assign( {}, this.state.points )
    const amount = points[(this.state.selected)]
    return(
      <div>
        { this.props.anecdotes[ this.state.selected ] }
        <br />
        <p>has {amount} votes</p>
        <button onClick={this.handleClick()}>next anecdote</button>
        <button onClick={this.setVote()}>vote</button>
        <h1>Anecdote with most votes</h1>
        <p>{ this.props.anecdotes[ list.indexOf(best) ] }</p>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
