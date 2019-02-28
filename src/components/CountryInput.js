import React from "react";

const CountryInput = props => (
  <form className="text-left" onSubmit={props.getHolidays}>
    <input
      className="countryForm"
      type="text"
      name="country"
      placeholder="Country code..."
    />
    <button>Find Holiday</button>
  </form>
);

export default CountryInput;
