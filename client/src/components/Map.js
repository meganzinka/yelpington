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

function Map() {
  const [data, setData] = useState();
  const [center, setCenter] = useState([42.05217724328756, -70.18468681413914]);

  //I RAN OUT OF TIME BUT MY GOAL ON RE-SUBMISSION IS TO FIGURE OUT HOW TO GET THE MAP TO RE-CENTER & TO PUT ALL FETCHES ON APP.JS AND PASS THE DATA AS PROPS
  //Any suggestions that you have
  function centerPin() {
    console.log(data);
    console.log(data.obj);
    // console.log(document.)
    // console.log(data.obj[id])
    // setCenter([[data.obj.lat, data.obj.long]])
  }

  useEffect(() => {
    if (!data) {
      fetch(`/api/location`)
        .then((res) => res.json())
        .then((restaurantObj) => {
          setData(restaurantObj);
          console.log(restaurantObj);
          console.log(data);
        });
    }
  });

  if (data) {
    return (
      <MapContainer
        center={center}
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
            <div id="map-container">
              <Marker position={[obj.lat, obj.long]}>
                <Popup>
                  <Link to={`/${obj.id}`} onClick={centerPin}>
                    {obj.name}
                  </Link>
                </Popup>
              </Marker>
            </div>
          );
        })}
        <MyComponent center={center} />
      </MapContainer>
    );
  } else return null;
}

export default Map;
