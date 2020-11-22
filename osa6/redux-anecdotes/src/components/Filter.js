import React from 'react'
import { connect } from 'react-redux'
import { filtering } from "../reducers/filterReducer.js"

const Filter = (props) => {


  const handleChange = async (event) => {
    props.filtering(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filtering
}
const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter
