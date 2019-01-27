import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Titles from "./components/Titles";
import CountryInput from "./components/CountryInput";

var API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {
  getWeather = async e => {
    e.preventDefault();
    console.log("Getting weather");
    const api_call = await fetch(
      `https://calendarific.com/api/v2/holidays?country=US&year=2018&api_key=${API_KEY}`
    );
    var data = await api_call.json();
    console.log(data);
  };
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <CountryInput getWeather={this.getWeather} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
