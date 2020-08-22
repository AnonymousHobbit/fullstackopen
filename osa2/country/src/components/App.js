import React from 'react'
import axios from 'axios'
import Country from './Country'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      country: "",
      weather: [],
      countries: []
    };
  }

  componentDidMount() {
    axios.get("https://restcountries.eu/rest/v2/all")
    .then(res => {
      this.setState({
        countries: res.data
      })
    })

  }

  handleChange = evt => {
    this.setState({
     [evt.target.name]: evt.target.value,
    });
  }

  handleClick = countryName => evt => {
    this.setState({
      country: countryName
    })
  }

  getWeather = name => {
    axios.get("http://api.weatherstack.com/current", {
      params: {
        access_key: process.env.REACT_APP_API_KEY,
        query: name
      }
    })
    .then(res => {
      this.setState({
        weather: res.data
      })
    })
  }

  render() {
    var error_message = ""
    var countryList = this.state.country.length <= 0
      ? []
      : this.state.countries.filter(country => country.name.toLowerCase().includes(this.state.country.toLowerCase()));

    if (countryList.length > 10) {
      error_message = "Too many matches, specify another filter"
      countryList = []
    }

    return (
      <div>
        <form>
          Country: <input name="country" onChange={this.handleChange}/>
        </form>
        <p>{error_message}</p>
        { countryList.length === 1 ? (
          <Country country={countryList[0]} weather={this.state.weather}/>
        ) : (
          countryList.map(c =>
              <div key={c.name}>
                <p>{c.name}</p><button onClick={this.handleClick(c.name)}>show</button>
              </div>
            )
          )
        }
      </div>
    )
  }
}

export default App
