import React from 'react'
import Weather from './Weather'
import axios from 'axios'
class Country extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h2>{this.props.country.name}</h2>
        <p>capital: {this.props.country.capital}</p>
        <p>population: {this.props.country.population}</p>
        <h2>Spoken languages:</h2>
        <ul>
        {(this.props.country.languages.map(lan => {
            return(<li key={lan.name}>{lan.name}</li>)
        }))}
        </ul>
        <br/>
        <img src={this.props.country.flag} height="100px" />
        <Weather name={this.props.country.capital}/>
      </div>

    )
  }
}

export default Country
