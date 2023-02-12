import React from "react";
import axios from "axios";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Weather from './modules/Weather.js'
import Movie from './modules/Movie.js'
import Yelp from './modules/Yelp.js'

let SERVER_API = process.env.REACT_APP_API_URL;
console.log("server api", SERVER_API);
let API_KEY = process.env.REACT_APP_LOCATION_API;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCity: "",
      cityLat: "",
      cityLon: "",
      cityName: "",
      mapImg: {},
      error: false,
      errorMessage: "",
    };
    // Create the child instance using react createRef
    this.weatherChild = React.createRef();
    this.movieChild =React.createRef();
    this.yelpChild = React.createRef();
  }

  submitCityHandler = async (event) => {
    event.preventDefault();
    //try and catch work together. Try says try all these things, if you find an error, jump to catch
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.searchCity}&format=json`;
      //This is requesting my map from locationIQ. Should probably be moved to server side eventually
      let cityInfo = await axios.get(url);

   //These are returning the lat and long from location iq
      let latitude = cityInfo.data[0].lat;
      let longitude = cityInfo.data[0].lon;

//This is setting the map image url and setting state for future use
      this.setState({
        mapImg: `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${latitude},${longitude}&zoom=10&size=300x300&format=jpg`,
        error: false,
        cityLon: cityInfo.data[0].lon,
        cityLat: cityInfo.data[0].lat,
        cityName: cityInfo.data[0].display_name
      });
      let shortCityNanme= cityInfo.data[0].display_name.split(',')[0];
      // This is a call the child function that gets the weather for this location, and city name.
      this.weatherChild.current.requestWeather(latitude, longitude, shortCityNanme);
      this.movieChild.current.requestMovie(shortCityNanme);
// I need one specific to yelp ie:
// this.yelpChild.current.requestYelp(cityInfo.data[0].display_name.split(',')[0])


//Catch goes with try above and is utilized if the try catches an error
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `An error occurred: ${error.response.status}`,
      });
      console.error(error);
    }
  };
//This is a helper function that sets state. It is catching every letter that is typed in to search city.
  handleCityNameInput = (event) => {
    this.setState({
      searchCity: event.target.value,
      error: false,
    });
  };

  render() {
    return (
      <main>
        <h1>City Explorer</h1>

        {(this.state.error) &&
          <Alert key='info' variant='info' show="true" transition="false" >Please enter a valid City Name {this.state.errorMessage} </Alert>
        }

        <form id="form" onSubmit={this.submitCityHandler}>
          <label>
            {" "}
            Pick a City:
            <input type="text" onInput={this.handleCityNameInput} />
          </label>
          <button type="submit">"Explore!"</button>
        </form>

        <Card style={{
          margin: 'auto',
          width: '18rem'
        }}>

          {(this.state.cityName !== "") &&
            <Card.Img variant="top" src={this.state.mapImg} />}

          <ListGroup variant="flush">
            <ListGroup.Item>{this.state.cityName}</ListGroup.Item>
            <ListGroup.Item>{this.state.cityLat}</ListGroup.Item>
            <ListGroup.Item>{this.state.cityLon}</ListGroup.Item>
          </ListGroup>

          <Weather ref={this.weatherChild} />
          <Movie ref={this.movieChild}/>
          <Yelp ref={this.yelpChild}/>
        </Card>
      </main>
    );
  }
}

export default App;