import "./style/App.css";
// import Home from "./components/Home";
import Restaurant from "./components/Restaurant";
import { Route, Switch, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Map from "./components/Map";
import { useEffect, useState } from "react";

function App() {
  //create a list of all the restaurant's ID's
  const [restaurantList, setRestaurantList] = useState([]);

  //fetch the list if the length of the list is 0
  useEffect(() => {
    if (restaurantList.length === 0) {
      //specified json with just ID's
      fetch("/api")
        .then((res) => res.json())
        .then((list) => {
          //make the restaurant list this list of IDs
          setRestaurantList(list);
        });
    }
  });

  //main components: list of restuarants, map, restaurant info section
  return (
    <div>
      <header>
        <h1>Yelpington Provincetown</h1>
      </header>
      <div id="app-container">
        <div id="nav-bar-container">
          <NavBar id="nav-bar" restaurantList={restaurantList} />
        </div>
        <div id="mapid">
          <Route component={Map} restaurantList={restaurantList} />
        </div>
        <div id="restaurant-container">
          <Route id="restaurant" path="/:restaurantid" component={Restaurant} />
        </div>
      </div>
    </div>
  );
}

export default App;
