// import React from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";

//this is what communicates zoom function as map container couldn't talk to app.js

function MyComponent(props) {
  console.log("inside MyComponent", props.center)
  const map = useMap();
  map.setView(props.newCenter, props.newZoom);
  return null;
}

export default MyComponent;