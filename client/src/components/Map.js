import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
// import borderData from "../data/border";
// import leafletPip from "leaflet-pip";
// import L, { map } from "leaflet";
import MyComponent from "./MyComponent.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import {Restaurant} from "/Restaurant"

function Map(props) {
  const [showLink, setShowLink] = useState(true);
  const [data, setData] = useState();


  useEffect(() => {
    console.log(showLink)
    if (showLink) {
      fetch("/api/location")
        .then((res) => res.json())
        .then((list) => {
          setData(list);
          console.log(list);
          console.log(data);
        });
    }
    setShowLink(false);
  });

  return (
    <div id="map-container">
      <MapContainer
        center={[42.05217724328756, -70.18468681413914]}
        //maybe dropped pin?
        zoom={15}
        // scrollWheelZoom={false}
        // doubleClickZoom={false}
        // zoomControl={false}
        // touchZoom={false}
        style={{ height: "600px", width: "600px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        />
        {data.map((obj) => {
          return (
            <Marker position={[obj.lat, obj.long]}>
              <Popup>
                <Link to={`/${obj.name}`}>{obj.name}</Link>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;
