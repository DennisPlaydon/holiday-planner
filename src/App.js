import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Titles from "./components/Titles";
import CountryInput from "./components/CountryInput";
import Holiday from "./components/Holiday";

var API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {
  state = {
    holidayName: undefined,
    holidayDescription: undefined,
    daysUntil: undefined,
    error: undefined
  };
  getHolidays = async e => {
    e.preventDefault();
    console.log("Getting weather");
    var country = e.target.elements.country.value;
    if (!country) {
      country = "NZ";
    }
    const api_call = await fetch(
      `https://calendarific.com/api/v2/holidays?country=${country}&year=2019&api_key=${API_KEY}`
    );
    var data = await api_call.json();
    console.log(data.response.holidays);
    if (data.response.length !== 0) {
      this.getNextHoliday(data.response.holidays);
    } else {
      this.setState({
        holidayName: undefined,
        holidayDescription: undefined,
        daysUntil: undefined,
        error: "Please enter a valid country code"
      });
    }
  };

  getNextHoliday(holidays) {
    var i;
    var nextHoliday = holidays[0];
    var todaysDate = new Date();
    for (i = 1; i < holidays.length; i++) {
      var holidayDate = new Date(holidays[i].date.iso);
      if (
        todaysDate < holidayDate &&
        todaysDate > new Date(nextHoliday.date.iso)
      ) {
        nextHoliday = holidays[i];
      } else if (todaysDate < holidayDate) {
        var differenceInMilliseconds = Math.abs(todaysDate - holidayDate);
        if (
          differenceInMilliseconds <
          Math.abs(todaysDate - new Date(nextHoliday.date.iso))
        ) {
          nextHoliday = holidays[i];
        }
      }
    }
    this.setState({
      holidayName: nextHoliday.name,
      holidayDescription: nextHoliday.description,
      daysUntil:
        (new Date(nextHoliday.date.iso) - todaysDate) / (1000 * 60 * 60 * 24),
      error: ""
    });
  }
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 col-lg-6 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 col-lg-6 form-container">
                  <CountryInput getHolidays={this.getHolidays} />
                  <Holiday
                    holidayName={this.state.holidayName}
                    holidayDescription={this.state.holidayDescription}
                    daysUntil={this.state.daysUntil}
                    error={this.state.error}
                  />
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
