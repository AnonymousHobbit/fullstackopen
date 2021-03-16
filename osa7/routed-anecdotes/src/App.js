import React, { useState } from 'react'
import { Switch, Route, Link, useRouteMatch, Redirect, useHistory} from "react-router-dom"
import Notification from "./components/Notification"
import AnecdoteList from "./components/AnecdoteList"
import About from "./components/About"
import AnecSolo from "./components/AnecSolo"
import Footer from "./components/Footer"
import CreateNew from "./components/CreateNew"
//7.5 Done
const Menu = (props) => {

  const match = useRouteMatch('/anecdotes/:id')
  const anec = match ? props.anecdotes.find(anec => anec.id === match.params.id): undefined

  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <div>
        <Link to="/anecdotes" style={padding}>anecdotes</Link>
        <Link to="/create" style={padding}>create new</Link>
        <Link to="/about" style={padding}>about</Link>
      </div>

      <Switch>
        <Route path="/anecdotes/:id">
          <AnecSolo anec={anec} />
        </Route>
        <Route path="/anecdotes">
          <AnecdoteList anecdotes={props.anecdotes}/>
        </Route>
        <Route path="/create">
          <CreateNew addNew={props.addNew}/>
        </Route>
        <Route path="/about">
          <About/>
        </Route>
      </Switch>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`a new anecdote ${anecdote.content} created!`);
    setTimeout(() => {
      setNotification("");
    }, 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Notification msg={notification} />
      <Menu anecdotes={anecdotes} addNew={addNew}/>
       {/*<AnecdoteList anecdotes={anecdotes} />
      <About />
      <CreateNew addNew={addNew} />*/}
      <Footer />
    </div>
  )
}

export default App;
