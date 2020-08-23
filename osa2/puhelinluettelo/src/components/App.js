import React from 'react'
import Pform from './Pform.js'
import Persons from './Persons.js'
import Filter from './Filter.js'
import Notification from './Notification.js'
import personService from "../services/persons";

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      people: [],
      newName: '',
      newNumber: '',
      search: '',
      nfMessage: null,
      nfClass: ""
    }
  }

  componentDidMount() {
    personService
    .getAll()
    .then( res => {
      this.setState({people: res})
    })
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });

  }

  handleSubmit = evt => {
    evt.preventDefault();

    const persons = {
      name: this.state.newName,
      number: this.state.newNumber
    };

    if (!this.state.people.some(item => item.name === persons.name)) {
      personService
      .create(persons)
      .then(per => {
        this.setState({
          people: this.state.people.concat(per),
          nfClass: "success",
          nfMessage: "Added "+per.name
        })

        setTimeout(() => {
          this.setState({
            nfClass: "",
            nfMessage: null
          })
        }, 3000);
      })
      .catch(err => {
        this.setState({
          nfClass: "error",
          nfMessage: err.response.data.error
        })

        setTimeout(() => {
          this.setState({
            nfClass: "",
            nfMessage: null
          })
        }, 3000);
      })
    } else {
      var id = this.state.people.find(per => per.name === persons.name).id;

      if (window.confirm(`${persons.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
        .update(id, persons)
        .then(res => {
            this.setState({
              people: this.state.people.map(per => per.id === res.id
              ? Object.assign({}, per, { number: res.number })
              : per
            )
          })
        })
        .catch(err => {
          this.setState({
            nfClass: "error",
            nfMessage: err.response.data
          })

          setTimeout(() => {
            this.setState({
              nfClass: "",
              nfMessage: null
            })
          }, 3000);
        })
      }
    }
  }


  handleDelete = itemId => evt => {
    if (window.confirm(`Delete ${this.state.people.find(per => per.id === itemId).name}?`)) {
      personService
      .deleteItem(itemId)
      .then(res => {
        this.setState({
          people: this.state.people.filter(per => per.id !== itemId),
          nfMessage: "Successfully deleted a phonebook",
          nfClass: "success"
        })

        setTimeout(() => {
          this.setState({
            nfClass: "",
            nfMessage: null
          })
        }, 3000);
      })
      .catch(res => {
        this.setState({
          people: this.state.people.filter(per => per.id !== itemId),
          nfMessage: "Item has already been removed from the server",
          nfClass: "error"
        })

        setTimeout(() => {
          this.setState({
            nfClass: "",
            nfMessage: null
          })
        }, 3000);
      })
    }
  }

  render () {
    const nameList = this.state.search.length <= 0
      ? this.state.people
      : this.state.people.filter(person => person.name.toLowerCase().includes(this.state.search.toLowerCase()));

    return (
      <div>
        <h2>Phonebook</h2>
        <Notification message={this.state.nfMessage} type={this.state.nfClass}/>
        <Filter onChange={this.handleChange} curState={this.state} />
        <h2>Add a new</h2>
        <Pform onChange={this.handleChange} onSubmit={this.handleSubmit} curState={this.state}/>
        <h2>Numbers</h2>
        <Persons people={nameList} handleDelete={this.handleDelete}/>
      </div>
    )
  }

}

export default App
