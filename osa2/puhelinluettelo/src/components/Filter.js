import React from 'react'

export default class Filter extends React.Component {
  render() {
    return (
      <form>
        Filter: <input name="search" onChange={this.props.onChange}/>
      </form>
    )
  }
}
