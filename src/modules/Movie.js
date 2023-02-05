import React from "react";
import axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          movie:[],
          movieCity:"",
          error: false,
          errorMessage:"",
        };
      }
//async tells js there is an await in this function which will return a promise
    requestMovie = async (cityName) => {
  
    try {
      console.log('request movie', cityName);
      //await means to wait for the server request to return
      let needMovie = await axios.get (`${process.env.REACT_APP_API_URL}/movie`,
      { params: {
        cityname: cityName,  
        //axios.get generates a return of html & movie aka needMovie.data
      }});
    //    console.log("Movie returned ", needMovie.data);


      this.setState({
        //setState assigns the needMovie.data to the movie property
        movie: needMovie.data,
        error: false,
        movieCity: cityName,
      });
      //a catch in if statement. If we don't get any movie data back, we are returning an error
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
            <Alert key='info' variant='info' show="true" transition="false">No movie info for {this.props.cityName} error {this.state.errorMessage} </Alert>
            }
            <ListGroup variant="flush">
                <div>
                    {this.state.movie !== {} &&
                    this.state.movie.map((item,id) => {
                        return (<ListGroup.Item key={id}>{"Title " + item.title + " Overview:" + item.overview}</ListGroup.Item>);
                    })}
                </div>
            </ListGroup>
            </>
        );
    }
}
export default Movie;