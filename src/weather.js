import React from "react";
import axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          weather:[],
          error: false,
          errorMessage:"",    
        };
    }

    requestWeather = async () => {
    try {
      console.log('request weather', this.props.cityLat, this.props.cityLon);
      let weather = await axios.get (`${process.env.REACT_APP_API_URL}/weather`,
      { params: {
        cityname: this.props.cityName,
        citylon: this.props.cityLon,
        citylat: this.props.cithLat,   
      }});
       console.log("Weather server returned ", weather.data);

      this.setState({
        weather: weather.data,
        error: false,
      });
    } catch (error){
      this.setState({
      error: true,
      errorMessage: `An error occurred: ${error.response.status}`,
      });
      console.log (error);
    }
  };
 

    render(){
         console.log('request weather', this.props.cityLat, this.props.cityLon, this.props.cityName, this.state.weather);
        if(this.props.cityLon && this.props.cityLat && this.props.cityName && this.state.weather.length===0){
          this.requestWeather();
        }
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