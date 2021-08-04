import axios from 'axios';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Map from './map';
import Weather from './Weather';
import Movies from './Movies';

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      lon: '',
      lat: '',
      errorMsg: 'error 404',
      displayErr: false,
      showMap: false,
      showCard: false,
      weather : [],
      movies : []
    };

  }





  locationData = async (event) => {
    event.preventDefault();
    const city = event.target.city.value;

    const URL = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}&q=${city}&format=json`;






    try {

      let locationResult = await axios.get(URL);
      this.setState({
        displayName: locationResult.data[0].display_name,
        lon: locationResult.data[0].lon,
        lat: locationResult.data[0].lat,
        showMap: true,
        displayErr: false,

      }

      );
      const urlServer = `http://localhost:3011/getWeather?lat=${this.state.lat}&lon=${this.state.lon}&cityName=${city}`;
      let weatherResult = await axios.get(urlServer);
      this.setState({
        weather : weatherResult.data,
        showCard: true
      });
      const urlMovies = `http://localhost:3011/movies?city=${city}`;
      let moviesResult = await axios.get(urlMovies);
      this.setState({
        movies : moviesResult.data
      });
    }
    catch {
      this.setState({
        showMap: false,
        displayErr: true,
        showCard: false
      }
      );
    }

    let weatherData = await axios.get(URL);
    this.setState({
      weatherInfoArr :weatherData.data
    });
    console.log(weatherData);
  }
  render() {
    return (
      <>
        <h1>City Explorer</h1>

        <form onSubmit={this.locationData}>
          <input type='text' placeholder='Enter City' name='city' />
          <button type='submit'>Explore!</button>
        </form>

        <Map
          displayName={this.state.displayName}
          lon={this.state.lon}
          lat={this.state.lat}
          showMap={this.state.showMap}
          displayErr={this.state.displayErr}
          errorMsg={this.state.errorMsg}
          showCard={this.state.showCard}

        />
        <Weather showCard= {this.state.showCard} weather={this.state.weather} ></Weather>
        <Movies showCard= {this.state.showCard} movies={this.state.movies} ></Movies>
      </>

    );

  }
}
export default App;
