import "./style/App.css";
// import Home from "./components/Home";
import Restaurant from "./components/Restaurant";
import { Route, Switch, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Map from "./components/Map";
import {useEffect, useState} from "react"

function App() {

  return (
    <div >
      <h1>Yelpington Provincetown</h1>
      <div id="app-container">
        <div id="nav-bar-container">
      <NavBar id="nav-bar" />
      </div>
      <div id="mapid">
      <Route component={Map}/>
      </div>
      <div id="restaurant-container">
      <Route id="restaurant" path="/:restaurantid" component={Restaurant} />
      </div>
        </div>
      </div>
  );
}

export default App;
