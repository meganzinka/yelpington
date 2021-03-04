// import React from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";

//this is what communicates zoom function as map container couldn't talk to app.js

function MyComponent(props) {
  const map = useMap();
  L.control.scale().addTo(map);
  map.setView(props.center, props.zoom);
  return null;
}

export default MyComponent;


//issue is view and marker are moving together
