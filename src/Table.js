import React from "react";
import "./App.css";
import numeral from "numeral";

function Table({ countries }) {
  return (
    <div className="table mh-100 overflow-auto">
      {countries.map(({ country, cases }) => (
        <tr key={country}>
          <td>{country}</td>
          <td>
            <strong>{numeral(cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
