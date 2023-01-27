import React from "react";
import axios from "axios";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';


let API_KEY = process.env.REACT_APP_LOCATION_API;

console.log(API_KEY);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locationData: [],
      city: "",
      cityData: {},
      error: false,
      errorMessage: "",
      mapdata: {},

    };
  }

  submitCityHandler = async (event) => {
    event.preventDefault();

    try {

      let url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.city}&format=json`;
      let cityInfo = await axios.get(url);


      await this.setState({
        cityData: cityInfo.data[0],
        error: false,
      });

      let latitude = cityInfo.data[0].lat;
      let longitude = cityInfo.data[0].lon;
      console.log(JSON.stringify(this.state.cityData));
      let url2 = `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${latitude},${longitude}&zoom=10&size=300x300&format=jpg`;


      this.setState({
        cityData: cityInfo.data[0],
        mapdata: url2,
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
      city: event.target.value,
      error: false,
    });
  };



  render() {
    let locationList = this.state.locationData.map((charName, index) => {
      return <li key={index}>{charName.display_name}</li>;
    });


    return (
      <main>



        <h1>City Explorer</h1>
        <ul>{locationList}</ul>

        {(this.state.error)&&
          <Alert key='info' variant='info' show="true" transition="false" >Error, please enter a valid City Name</Alert>
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
          {(this.state.mapdata !=={})&&
          <Card.Img variant="top" src={this.state.mapdata} />}
          <ListGroup variant="flush">
            <ListGroup.Item>{this.state.cityData.display_name}</ListGroup.Item>
            <ListGroup.Item>{this.state.cityData.lat}</ListGroup.Item>
            <ListGroup.Item>{this.state.cityData.lon}</ListGroup.Item>
          </ListGroup>

        </Card>
      </main>
    );
  }




}



export default App;
