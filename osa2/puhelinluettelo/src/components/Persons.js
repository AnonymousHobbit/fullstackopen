import React from 'react'

export default class Persons extends React.Component {

  render() {
        return (
          <div>
            { this.props.people.map( person =>
              <div key={ person.id }>
                <p>{ person.name } {person.number}</p><button onClick={this.props.handleDelete(person.id)}>Delete</button>
              </div>
            ) }
          </div>
        )
    }
}
