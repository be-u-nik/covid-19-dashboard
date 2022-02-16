import React from "react";
import "./App.css";
import numeral from "numeral";

function Table({ countries }) {
  return (
    <div className="d-flex table mh-100 overflow-auto">
      <table style={{ width: "100%" }}>
        <tbody>
          {countries.map(({ country, cases }) => (
            <tr key={country}>
              <td>{country}</td>
              <td>
                <strong>{numeral(cases).format("0,0")}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
