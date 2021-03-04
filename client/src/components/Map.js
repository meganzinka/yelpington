import {
    MapContainer,
    TileLayer,
    Polygon,
    Marker,
    Polyline,
  } from "react-leaflet";
  import borderData from "../data/border";
  import leafletPip from "leaflet-pip";
  // import L, { map } from "leaflet";
  import MyComponent from "./MyComponent.js";
  
  
  function Map(props) {
  
    //Vt outline given to use in starter code that outlines that state
    let vtOutline = borderData.geometry.coordinates[0].map((coords) => [
      coords[1],
      coords[0],
    ]);
  
    
  //mapcontainer - controls that zoom cannot be used, style, and initial zoom
  //tile layer
  // my component which allows info from map container and map to talk to app.js
  
    return (
      <MapContainer
        center={props.center}
        //maybe dropped pin?
        zoom={8}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        zoomControl={false}
        touchZoom={false}
        style={{ height: "600px", width: "600px" }}
      >
  
        <MyComponent droppedPin = {props.droppedPin} center={props.center} zoom={props.zoom} />
  
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        />
        <Marker position={props.center} />
        <Polygon
          positions={vtOutline}
          pathOptions={{ color: "orange", fillOpacity: 0 }}
        />
      </MapContainer>
    );
  }
  
  export default Map;
  