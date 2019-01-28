import React from "react";

const Holiday = props => (
  <div className="weather__info">
    {props.holidayName && (
      <p className="weather__key">
        Name:
        <span className="weather__value"> {props.holidayName}</span>
      </p>
    )}
    {props.holidayDescription && (
      <p className="weather__key">
        Description:
        <span className="weather__value"> {props.holidayDescription}</span>
      </p>
    )}
    {props.daysUntil && (
      <p className="weather__key">
        Day until:
        <span className="weather__value"> {Math.ceil(props.daysUntil)}</span>
      </p>
    )}
    {props.error && <p className="weather__key">{props.error}</p>}
  </div>
);

export default Holiday;
