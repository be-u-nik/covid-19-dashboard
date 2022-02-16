import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row, Form } from "react-bootstrap";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./sortData";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import numeral from "numeral";

function App() {
  const [countries, setcountries] = useState([]);
  const [country, setcountry] = useState("worldwide");
  const [countryInfo, setcountryInfo] = useState({});
  const [tableData, settableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(2.05);
  const [mapCountries, setmapCountries] = useState([]);
  const [casesType, setcasesType] = useState("cases");

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries") //pulling data in json format from disease.sh
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data);
          setmapCountries(data);
          settableData(sortedData);
          setcountries(countries);
        });
    };
    getCountriesData();
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setcountryInfo(data);
      });
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setcountryInfo(data);
        setcountry(countryCode);
        countryCode === "worldwide"
          ? setMapCenter([34.80746, -40.4796])
          : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        countryCode === "worldwide" ? setMapZoom(2) : setMapZoom(3);
      });
  };

  const statDecoration = (stat) =>
    stat ? `+${numeral(stat).format("0,0")}` : "+0";

  return (
    <Container fluid className="app">
      {/* app__top */}
      <Row className="app__top d-flex mb-3">
        <Col
          lg={4}
          className="app__top__header d-flex flex-column justify-content-center align-items-center"
        >
          {/* header */}
          <div className="app__top__header__title">
            <h2>COVID-19 TRACKER</h2>
          </div>
          {/* dropdown to select a country */}
          <Form.Select
            className="app__top__header__select w-auto"
            size="sm"
            aria-label="Default select example"
            onChange={onCountryChange}
          >
            <option value="worldwide">Worldwide</option>
            {countries.map((country, index) => (
              <option key={index} value={country.value}>
                {country.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col lg={8}>
          <Container
            fluid
            className="app__top__stats d-flex flex-row justify-content-between"
          >
            {/* infobox1 */}
            <InfoBox
              theme="red"
              active={casesType === "cases"}
              onClick={(e) => setcasesType("cases")}
              title="Coronovirus Cases"
              cases={statDecoration(countryInfo.todayCases)}
              total={numeral(countryInfo.cases).format("0,0")}
            ></InfoBox>
            {/* infobox2 */}
            <InfoBox
              theme="green"
              active={casesType === "recovered"}
              onClick={(e) => setcasesType("recovered")}
              title="Recovered"
              cases={statDecoration(countryInfo.todayRecovered)}
              total={numeral(countryInfo.recovered).format("0,0")}
            ></InfoBox>
            {/* infobox3 */}
            <InfoBox
              theme="grey"
              active={casesType === "deaths"}
              onClick={(e) => setcasesType("deaths")}
              title="Deaths"
              cases={statDecoration(countryInfo.todayDeaths)}
              total={numeral(countryInfo.deaths).format("0,0")}
            ></InfoBox>
          </Container>
        </Col>
      </Row>
      {/* app__bottom */}
      <Row>
        <Col lg={3} className="">
          <div className="app__bottom__charts d-flex flex-column justify-content-between">
            {/* cases chart 1*/}
            {countryInfo?.country != null ? (
              <div>
                <h2>
                  {countryInfo.country} - new {casesType}
                </h2>
                <LineGraph
                  caseType={casesType}
                  countryCode={country === "worldwide" ? "all" : country}
                ></LineGraph>
              </div>
            ) : (
              <span></span>
            )}

            {/* cases chart 2 */}
            <div>
              <h2>worldwide - new {casesType}</h2>
              <LineGraph caseType={casesType}></LineGraph>
            </div>
          </div>
        </Col>
        <Col lg={5} className="">
          {/* Map */}
          <Map
            caseType={casesType}
            countries={mapCountries}
            center={mapCenter}
            zoom={mapZoom}
          ></Map>
        </Col>
        <Col lg={4}>
          {/* table of Live cases By Country */}
          <h1>Live cases By Country</h1>
          <Table countries={tableData}></Table>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
