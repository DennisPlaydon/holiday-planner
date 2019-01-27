import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Titles from "./components/Titles";
import CountryInput from "./components/CountryInput";
import Holidays from "./components/Holidays";

var API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {
  state = {
    holidays: undefined,
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
        error: "Please enter a valid country"
      });
    }
  };

  getNextHoliday(holidays) {
    var i;
    var nextHoliday = holidays[0];
    var todaysDate = new Date("2019-12-24");
    console.log(`Today is ${todaysDate} and ${todaysDate < nextHoliday}`);
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
    console.log("NEXT HOLIDAY");
    console.log(nextHoliday);
  }
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
                  <CountryInput getHolidays={this.getHolidays} />
                  <Holidays holidays={this.state.holidays} />
                  {/* holidays={this.state.holidays}
                    error={this.state.error} */}
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
