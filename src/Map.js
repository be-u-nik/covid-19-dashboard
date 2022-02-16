import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./showDataOnMap";

function Map({ countries, caseType, center, zoom }) {
  return (
    <div className="map d-flex">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {countries.length && showDataOnMap(countries, caseType)}
      </LeafletMap>
    </div>
  );
}

export default Map;
