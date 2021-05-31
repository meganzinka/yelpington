import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import {useState} from "react"
import MyComponent from "./MyComponent.js";
import { Link } from "react-router-dom";

function Map(props) {
  const [center, setCenter] = useState([42.05217724328756, -70.18468681413914]);
  if (props.data) {
    return (
      <MapContainer
        center={center}
        zoom={15}
        zoomControl={false}
        touchZoom={false}
        style={{ height: "600px", width: "600px" }}
      >
        <TileLayer
      url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
      attribution='Tiles &copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          
        />
        {props.data.map((obj, index) => {
          return (
            <div id="map-container" key={index}>
              {/* Create a marker at the restaurant's location  */}
              <Marker position={[obj.lat, obj.long]}>
                {/* Create a popup that links to the restaurant's page */}
                <Popup>
                  <Link
                    key = {index}
                    to={`/${obj.id}`}
                  >
                    {/* label each link with the restaurant's name */}
                    {obj.name}
                  </Link>
                </Popup>
              </Marker>
            </div>
          );
        })}
        {/* if a new center has been set on the Restaurant page, send that into My Component to change zoom and center  */}
        {props.newCenter ?  (
          <MyComponent newZoom = {props.newZoom} newCenter = {props.newCenter} />
        ) : null}
      </MapContainer>
    );
  } else return null;
}

export default Map;
