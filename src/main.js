import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Map from './map';
import 'bootstrap/dist/css/bootstrap.min.css';
class Main extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      data : '',
      locationName : '',
      display : false,
      errorShown : false,
      // errorWarning : '',
    };
  }

      getLocation = async (event) => {
        event.preventDefault();

        try {
          const api = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}&q=${this.state.locationName}&format=json`;
          const responce = await axios.get(api);

          this.setState({
            data : responce.data[0],
            display : true,
            // errorShown : false,
          });
        }
        catch {
          this.setState({
            errorShown : true,

          });
        }

      };


      updateLocation = (event) => {
        this.setState({locationName : event.target.value});
      }


      render() {
        return (
          <main>
            <div className={'search-bar'}>
              <Form onSubmit = {this.getLocation}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control onChange={this.updateLocation} type="text" placeholder="Enter a Location" />
                </Form.Group>

                <Button variant="primary" type="submit">
                Submit
                </Button>
              </Form>
            </div>

            <div className={'location'}>

              {this.state.errorShown && (
                <h1>
                  Error 404 <h2>Unable to geocode</h2>
                </h1>
              )}

              <h3>{this.state.data.display_name}</h3>

            </div>

            <Map
              lon={this.state.data.lon}
              lat={this.state.data.lat}
              display={this.state.display}
            />
          </main>
        );
      }
}
export default Main;
