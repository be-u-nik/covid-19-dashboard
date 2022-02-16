import React from "react";
import { Card, Col } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./InfoBox.css";

function InfoBox({ title, cases, active, theme, total, ...props }) {
  return (
    <Col onClick={props.onClick} sm={4} className="m-1">
      <Card
        className={`infoBox d-flex flex-column justify-content-center 
        ${
          active && theme === "green"
            ? `infoBox--greenTheme`
            : active && theme === "red"
            ? `infoBox--redTheme`
            : active && theme === "grey"
            ? `infoBox--greyTheme`
            : ``
        }
        `}
      >
        <Card.Body>
          {/* Title */}
          <span className="infoBox__title">{title}</span>
          {/* Number of cases */}
          <h1
            className={`
          ${
            theme === "green"
              ? `infoBox--greenColor`
              : theme === "red"
              ? `infoBox--redColor`
              : theme === "grey"
              ? `infoBox--greyColor`
              : ``
          }
          `}
          >
            {cases}
          </h1>
          {/* Total */}
          <span className="infoBox__total">{total} Total</span>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default InfoBox;
