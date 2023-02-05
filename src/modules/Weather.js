import React from "react";
import axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          weather:[],
          weatherCity:"",
          error: false,
          errorMessage:"",
        };
      }

    requestWeather = async (cityLat, cityLon, cityName) => {
  
    try {
      console.log('request weather', cityLat, cityLon);
      let needWeather = await axios.get (`${process.env.REACT_APP_API_URL}/weather`,
      { params: {
        cityname: cityName,
        citylon: cityLon,
        citylat: cityLat,   
        //axios.get generates a return of html & weather aka needWeather.data
      }});
    //    console.log("Weather server returned ", needWeather.data);


      this.setState({
        //setState assigns the needWeather.data to the weather property
        weather: needWeather.data,
        error: false,
        weatherCity: cityName,
      });
      //a catch in if statement. If we don't get any weather back, we are returning an error
    } catch (error){
      this.setState({
      error: true,
      errorMessage: `An error occurred: ${error.response.status}`,
      });
      console.log (error);
    }
  };

 
// render is a react function that draws the page and updates as needed
    render(){
        // return utilizes bootstrap components (or other html) and renders them on the web page.
        return(
            <>
            {(this.state.error) && 
            <Alert key='info' variant='info' show="true" transition="false">No weather for {this.props.cityName} error {this.state.errorMessage} </Alert>
            }
            <ListGroup variant="flush">
                <div>
                    {this.state.weather !== {} &&
                    this.state.weather.map((item,id) => {
                        return (<ListGroup.Item key={id}>{"on Date " + item.date + " the forecast is for " + item.description}</ListGroup.Item>);
                    })}
                </div>
            </ListGroup>
            </>
        );
    }
}
export default Weather;