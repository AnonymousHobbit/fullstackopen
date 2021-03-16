import React, { useState } from 'react'
import { useField } from '../hooks'
import { Switch, Route, Link, useRouteMatch, Redirect, useHistory} from "react-router-dom"

const CreateNew = (props) => {
  const { reset: rContent, ...content } = useField("text");
  const { reset: rAuthor, ...author } = useField("text");
  const { reset: rInfo, ...info } = useField("text");

  const history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(content)
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    });
    history.push("/anecdotes")
  }

  const resetField = () => {

  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={(e) => {rContent(); rAuthor(); rInfo();}}>Reset</button>
      </form>
    </div>
  )

}

export default CreateNew
