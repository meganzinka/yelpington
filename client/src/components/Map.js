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
  const [name, setName] = useState();
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [data, setData] = useState(); 

  function capitalize(word) {
    let newWord = word.toLowerCase().trim();
    let newFirst = newWord[0].toUpperCase();
    return newFirst + newWord.slice(1);
  }

  useEffect(() => {
    if (showLink) {
      fetch("/api/location")
        .then((res) => res.json())
        .then((list) => {
          for (let i=0; i<list.length; i++) {
          setData(list[i]); 
          setName(list[i].name);
          setLat(list[i].lat);
          setLong(list[i].long);
          console.log("lat:", lat)
          console.log("long:", long)
          console.log( "name:", name)
          console.log("props.restaurantList", props.restaurantList)
          console.log("data", data)

          }
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
        style={{ height: "600px", width: "600px" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        />
        {/* {console.log("data:", data)}
        {console.log("lat:", lat)}
        {console.log("long:", long)}
        {console.log( "name:", name)} 
        {console.log("props.restaurantList", props.restaurantList)} */}


        {/* {props.restaurantList.map((name, index) => {
          return (
            <div>
              <Link to={`/${props.name}`}>
                <Marker position={[lat, long]}>
                  <Popup>{capitalize(name)}</Popup>
                </Marker>
              </Link>
            </div>
          );
        })} */}
        {/* <Link to={"/canteen"}>
          <Marker position={[42.05042671221635, -70.188190257671]}>
            <Popup>Canteen</Popup>
          </Marker>
        </Link>
        <Marker position={[42.058460314382145, -70.17417038026709]}>
          <Popup>Fanizzi's</Popup>
        </Marker>
        <Marker position={[42.05495473426212, -70.18481221545382]}>
          <Popup>Far Land Provisions</Popup>
        </Marker>
        <Marker position={[42.04824061887845, -70.18922535777045]}>
          <Popup>Jimmy's Hideaway</Popup>
        </Marker>
        <Marker position={[42.04592106054985, -70.19162757312564]}>
          <Popup>Joon Bar</Popup>
        </Marker>
        <Marker position={[42.05217724328756, -70.18468681413914]}>
          <Popup>Lobster Pot</Popup>
        </Marker>
        <Marker position={[42.05294297233715, -70.18464385222951]}>
          <Popup>The Landing Bistro and Bar </Popup>
        </Marker>
        <Marker position={[42.05538855691992, -70.18066058924296]}>
          <Popup>The Mews</Popup>
        </Marker> */}
      </MapContainer>
    </div>
  );
}

export default Map;
