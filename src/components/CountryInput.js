import React from "react";

const CountryInput = props => (
  <form onSubmit={props.getHolidays}>
    <input type="text" name="country" placeholder="Country..." />
    <button>Get Holiday</button>
  </form>
);

export default CountryInput;
