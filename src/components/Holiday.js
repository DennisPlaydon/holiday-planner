import React from "react";
import HolidayButton from "./HolidayButton";

const Holiday = props => (
  <div className="holiday__info text-left">
    {props.holidayName && (
      <p className="holiday__key">
        Name:
        <span className="holiday__value"> {props.holidayName} </span>
      </p>
    )}
    {props.holidayDescription && (
      <p className="holiday__key">
        Description:
        <span className="holiday__value"> {props.holidayDescription}</span>
      </p>
    )}
    {props.date && (
      <p className="holiday__key">
        Date:
        <span className="holiday__value"> {props.date}</span>
      </p>
    )}
    {props.daysUntil && (
      <React.Fragment>
        <p className="holiday__key">
          Countdown:
          <span className="holiday__value">
            {" "}
            {Math.ceil(props.daysUntil)} days
          </span>
        </p>
        {/* <HolidayButton getNextHoliday={props.getNextHoliday} /> */}
      </React.Fragment>
    )}
    {props.error && <p className="holiday__key">{props.error}</p>}
  </div>
);

export default Holiday;
