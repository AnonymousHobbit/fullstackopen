import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  return (
    <div>
      <button name="GOOD" onClick={e => store.dispatch({ type: 'GOOD' })}>good</button>
      <button name="NEUTRAL" onClick={e => store.dispatch({ type: 'NEUTRAL' })}>neutral</button>
      <button name="BAD" onClick={e => store.dispatch({ type: 'BAD' })}>bad</button>
      <button name="RESET" onClick={e => store.dispatch({ type: 'RESET' })}>reset stats</button>

      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().neutral}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
