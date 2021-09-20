import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import MyComponent from "./MyComponent.js";
import { Link, withRouter } from "react-router-dom";
import L, { Tooltip } from "leaflet";

function Map(props) {
  const [center, setCenter] = useState([42.05217724328756, -70.18468681413914]);
  const [restaurantId, setRestaurantId] = useState();
  const [style, setStyle] = useState()
  const { innerWidth: width} = window;
  console.log(width)
  const { pathname } = props.location;

  useEffect(() => {
    if (window > 600) {
      setStyle({height: "600px", width: "600px"})
    } else (setStyle({height: "50vh", width: "100vw"}))
  }, [window])
  if (props.data) {
    return (
      <MapContainer
        center={center}
        zoom={15}
        zoomControl={false}
        touchZoom={false}
        // style={{height: "600px", width: "600px"}}
        id="map-container"
      >
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
          attribution='Tiles &copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        />
        {props.data.map((obj, index) => {
          return (
            <div id="marker" key={index}>
              <Marker
                position={[obj.lat, obj.long]}
                style={{ backgroundColor: "red" }}
                eventHandlers={{
                  click: (e) => setRestaurantId(pathname),
                }}
              >
                {restaurantId === pathname && (
                  <Popup position={[obj.lat, obj.long]}>
                    {/* <Link
                    key = {index}
                    to={`/${obj.id}`}
                  > */}
                    <center>
                      <h3>{obj.name} </h3>
                      {/* </Link> */}
                      {obj.address}
                    </center>
                  </Popup>
                )}
              </Marker>
            </div>
          );
        })}
        {/* if a new center has been set on the Restaurant page, send that into My Component to change zoom and center  */}
        {props.newCenter ? (
          <MyComponent newZoom={props.newZoom} newCenter={props.newCenter} />
        ) : null}
      </MapContainer>
    );
  } else return null;
}

export default withRouter(Map);
