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
      alerts: '',
      errorMessage: '',
    }
  }

updateCity = (newCity) => {
  if (newCity.trim() === '') {
    this.setState({errorMessage: 'City cannot be empty', error: true});
    return;
  }
  this.setState({city: newCity}, () => {
    this.getCityCoords();
  })
}

  componentDidMount() {
    this.getCityCoords()
  }

  getCityCoords = () => {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${this.state.city}&appid=${this.apiKey}`)
      .then(response => response.json())
      .then(response => {
        if (response.length === 0) {
          this.setState({errorMessage: 'Please enter a valid city name', error: true});
          return;
        }
        this.setState({
          lat: response[0]['lat'],
          lon: response[0]['lon'],
          isLoading: true
        })
        this.setState({errorMessage: '', error: false});
        this.getWeatherData();
      })
      .catch(() => this.setState({ error: true }))
  }


  getWeatherData = () => {
    if (this.state.error === true) return
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&exclude=minutely&units=metric&appid=${this.apiKey}`)
      .then(response => response.json())
      .then(response => {
        this.setState({
          currentData: response['current'],
          hourlyData: response['hourly'],
          dailyData: response['daily'],
          timezone_offset: response['timezone_offset'],
          alerts: response['alerts'],
          isLoading: false
        })
      })
      .catch(() => this.setState({ error: true }))
  }

  UTXtodate = (utx) => {
    return new Date(utx * 1000).toLocaleString('en-US', { weekday: 'long' })
  }

  render() {
    return (

      <div className="background">
        {
          this.state.error &&
          <Collapse in={this.state.error}>
            <Alert severity="error">{this.state.errorMessage ? this.state.errorMessage :
            'Error loading Data - Reload Page'}
            </Alert>
          </Collapse>
        }
        <div className="container">
          {this.state.isLoading ? 
          <CircularProgress className="spinner" size='10em' />
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
