import './App.css';
import React, { Component } from 'react';
import CurrentWeather from './Components/Current Weather/CurrentWeather';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tabs from './Components/Menu/Tabs'
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

// Current Errors
// - the back arrow disappears in hourly after clicking on daily


class App extends Component {

  constructor() {
    super()
    this.apiKey = '71419a1ee150661452e3c663148af2c8';
    this.state = {
      error: false,
      city: 'st johns',
      coord: { lat: '', lon: '' },
      currentData: [],
      hourlyData: [],
      dailyData: [],
      isLoading: true,
      timezone: '',
      alerts: ''
    }
  }

updateCity = (newCity) => {
  console.log(newCity)
  this.setState({city: newCity})
  console.log(this.state.city)
  this.getCityCoords()
  console.log("current city in state ", this.state.city)
}

  componentDidMount() {
    this.getCityCoords()
  }

  getCityCoords = () => {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${this.state.city}&appid=${this.apiKey}`)
      .then(response => response.json())
      .then(response => {
        this.setState({
          lat: response[0]['lat'],
          lon: response[0]['lon']
        })
        this.getWeatherData(this.state.error)
      })
      .catch(() => this.setState({ error: true }))
  }


  getWeatherData = (error) => {
    if (error === true) return
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&exclude=minutely&units=metric&appid=${this.apiKey}`)
      .then(response => response.json())
      .then(response => {
        // console.log(response['current'])
        this.setState({
          currentData: response['current'],
          hourlyData: response['hourly'],
          dailyData: response['daily'],
          timezone_offset: response['timezone_offset'],
          alerts: response['alerts'],
          isLoading: false
        })
        // this.render()
        // console.log(this.state.alerts)
      })
      .catch(() => this.setState({ error: true }))
  }

  UTXtodate = (utx) => {
    return new Date(utx * 1000).toLocaleString('en-US', { weekday: 'long' })
  }

  render() {
    console.log("inside app render")
    return (

      <div className="background">
        {
          this.state.error &&
          <Collapse in={this.state.error}>
            <Alert severity="error">Error loading Data - Reload Page</Alert>
          </Collapse>
        }
        <div className="container">
          {this.state.isLoading ? <CircularProgress className="spinner" size='10em' />
            :
            <div>
              <CurrentWeather timeConversion={this.timeConversion} updateCity={this.updateCity} timezoneOffset={this.state.timezone_offset} city={this.state.city} currentData={this.state.currentData} />
              <Tabs timeConversion={this.timeConversion} timezoneOffset={this.state.timezone_offset} hourlyData={this.state.hourlyData} dailyData={this.state.dailyData} alerts={this.state.alerts} />
            </div>}
        </div>
      </div>
    );
  }
}

export default App;
