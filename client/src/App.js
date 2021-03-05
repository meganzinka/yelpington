import "./style/App.css";
import Home from "./components/Home";
import Restaurant from "./components/Restaurant";
import { Route, Switch, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Map from "./components/Map";
import {useEffect, useState} from "react"

function App() {
  const [restaurantList, setRestaurantList] = useState([]);

  useEffect(() => {
    if (restaurantList.length === 0) {
      fetch("/api")
        .then((res) => res.json())
        .then((list) => {
          setRestaurantList(list);
        });
    }
    // window.location.reload();
  });
  return (
    <div>
      <h1>Yelpington</h1>
      <NavBar restaurantList = {restaurantList}/>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route id="restaurant" path="/:restaurantid" component={Restaurant} />
      </Switch>
      <div id="mapid">
        <Route component={Map} restaurantList = {restaurantList}/>
      </div>
    </div>
  );
}

export default App;
