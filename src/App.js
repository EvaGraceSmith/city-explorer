import React from "react";
import axios from "axios";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Weather from './weather.js'

let SERVER_API = process.env.REACT_APP_API_URL;
console.log("server api", SERVER_API);
let API_KEY = process.env.REACT_APP_LOCATION_API;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchcity: "",
      cityLat: "",
      cityLon: "",
      cityName: "",
      mapImg: {},
      error: false,
      errorMessage: "",
    };
  }

  submitCityHandler = async (event) => {
    event.preventDefault();
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.searchcity}&format=json`;
      let cityInfo = await axios.get(url);

      this.setState({
        cityLon: cityInfo.data[0].lon,
        cityLat: cityInfo.data[0].lat,
        cityName: cityInfo.data[0].display_name,
        error: false,
      });
      //should be this.state.cityLat but does not work
      let latitude = cityInfo.data[0].lat;
      let longitude = cityInfo.data[0].lon;
      // console.log(JSON.stringify(this.state.cityData));
      let imgURL = `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${latitude},${longitude}&zoom=10&size=300x300&format=jpg`;

      this.setState({
        mapImg: imgURL,
        error: false,
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `An error occurred: ${error.response.status}`,
      });
      console.error(error);
    }
  };

  handleCityInput = (event) => {
    this.setState({
      searchcity: event.target.value,
      error: false,
    });
  };

  render() {
    return (
      <main>
        <h1>City Explorer</h1>

        {(this.state.error)&&
          <Alert key='info' variant='info' show="true" transition="false" >Please enter a valid City Name {this.state.errorMessage} </Alert>
        }
        
        <form id="form" onSubmit={this.submitCityHandler}>
          <label>
            {" "}
            Pick a City:
            <input type="text" onInput={this.handleCityInput} />
          </label>
          <button type="submit">"Explore!"</button>
        </form>

        <Card style={{
          margin: 'auto',
          width: '18rem'
        }}>

          {(this.state.cityName !=="")&&
          <Card.Img variant="top" src={this.state.mapImg} />}
          
          <ListGroup variant="flush">
            <ListGroup.Item>{this.state.cityName}</ListGroup.Item>
            <ListGroup.Item>{this.state.cityLat}</ListGroup.Item>
            <ListGroup.Item>{this.state.cityLon}</ListGroup.Item>
          </ListGroup>

          <Weather 
             cityName ={this.state.searchcity} 
             cityLat = {this.state.cityLat}
             cityLon = {this.state.cityLon}/>
        </Card>
      </main>
    );
  }
}

export default App;