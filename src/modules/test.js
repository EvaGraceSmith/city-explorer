import React from "react";



class Profile extends React.Component {
    render() {
      return(
        this.state.activities.map((activity, idx) => (
          <li key={idx}>{activity}</li>
        ))
      )
    }
  }


  class Profiles extends React.Component {
    render() {
      return(
        this.state.activities.map(activity => {
          <li>{activity}</li>
        })
      )
    }
  }

  
  class Profiled extends React.Component {
    render() {
      return(
        this.state.activities.map((activities, idx) => {
          <li key={idx}>{activities}</li>
        })
      )
    }
  }


  class Profiley extends React.Component {
    render() {
      return(
        this.state.activities.map((activity, idx) => {
          <li key={idx}>{activity}</li>
        })
      )
    }
  }
  