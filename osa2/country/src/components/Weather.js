import React from 'react'
import axios from 'axios'

export default class Weather extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      weather: []
    }
  }

  componentDidMount() {
    axios.get("http://api.weatherstack.com/current", {
      params: {
        access_key: process.env.REACT_APP_API_KEY,
        query: this.props.name
      }
    })
    .then(res => {
      this.setState({
        weather: res.data.current
      })
    })
  }

  render() {
    var weather = this.state.weather
    var showWeather = Object.keys(weather).map(function(key) {
      return <p key={key}>{key} : {weather[key]} </p>
    })
    return(
      <div>
        <h1>Weather in {this.props.name}</h1>
          <p>Temperature: {weather.temperature} </p>
          <img src={weather.weather_icons} />
          <p>Wind speed: {weather.wind_speed} </p>

      </div>
    )
  }
}
