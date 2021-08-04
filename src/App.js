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











//   constructor(props) {
//     super(props);
//     this.state = {
//       locationData: {},
//       lon: '',
//       lat: '',
//       errorMsg: '',
//       weatherData: [],
//       displayLocation: false,
//       weather : [],
//       movies : [],
//     };
//   }

//   submitForm = async (e) => {
//     e.preventDefault();
//     try {
//       const city = e.target.cityName.value;
//       const response = await axios.get(
//         `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${city}&format=json`
//       );
//       const locationIqData = response.data[0];
//       const cityName = locationIqData.display_name.split(',')[0];
//       const weatherResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/weather?searchQuery=${cityName}&lat=${locationIqData.lat}&lon=${locationIqData.lon}`);

//       this.setState({
//         locationData: locationIqData,
//         weatherData: weatherResponse,
//         errorMsg: '',
//         displayLocation: true,
//       });
//     }

//     catch (error) {
//       this.setState({
//         errorMsg: error.message,
//         displayLocation: false,
//       });
//     }
//   };
//   render() {
//     return (
//       <div>
//         <center>
//           <Form onSubmit={this.submitForm}>
//             <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
//               <Form.Label style={{ padding: '12px 20px' }}>
//                 City Name
//               </Form.Label>
//               <Form.Control
//                 style={{ width: '50%' }}
//                 type='text'
//                 placeholder='Enter The City Name'
//                 name='cityName'
//               />
//             </Form.Group>
//             <Button type='submit'>Explore!</Button>
//             {this.state.errorMsg && (
//               <Alert key={1} variant={'danger'}>
//                 {this.state.errorMsg}
//               </Alert>
//             )}
//           </Form>
//         </center>
//         <center>
//           <br />
//           {this.state.displayLocation &&
//           <div>

//             <Card style={{ width: '25rem' }}>
//               <Card.Img
//                 variant='top'
//                 src={`https://maps.locationiq.com/v3/staticmap?key=pk.8141a2667965912a24cfcfef73d1247e&q&center=${this.state.locationData.lat},${this.state.locationData.lon}&zoom=15`}
//               />
//               <Card.Body>
//                 <Card.Title>Location information</Card.Title>
//                 <Card.Text>
//                   {this.state.locationData.display_name}
//                 </Card.Text>
//                 <Card.Text>
//                   Longitude:{this.state.locationData.lon}
//                 </Card.Text>
//                 <Card.Text>
//                   Latitude:{this.state.locationData.lon}
//                 </Card.Text>
//               </Card.Body>
//             </Card>
//             {
//               this.state.weatherData.map(weather => {
//                 return (
//                   <div>
//                     <p>{weather.valid_date}</p>
//                     <p>{weather.description}</p>
//                   </div>
//                 );
//               })
//             }
//           </div>
//           }
//         </center>
//       </div>
//     );
//   }
// }

