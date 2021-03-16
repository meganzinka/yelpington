// import React from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";

//function/component to adjust the center as different restaurants were clicked 
function MyComponent(props) {
  const map = useMap();
  //newCenter & newZoom have been sent in as props from Restaurant 
  map.setView(props.newCenter, props.newZoom);
  return null;
}

export default MyComponent;