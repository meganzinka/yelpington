import "./style/App.css";
// import Home from "./components/Home";
import Restaurant from "./components/Restaurant";
import { Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Map from "./components/Map";
import { useEffect, useState } from "react";
import homeIcon from "./images/home.png";

function App() {
  //create a list of all the restaurant's ID's
  const [restaurantList, setRestaurantList] = useState([]);
  //load the data from the location.json file
  const [data, setData] = useState();
  //variable to change center depending on which restaurant is clicked
  const [newCenter, setNewCenter] = useState();
  //variable to adjust zoom for individual restaurant vs. all restaurants
  const [newZoom, setNewZoom] = useState();
  //variable to see if a restaurant on screen or not - used to show/hide comment section
  const [currentRestaurant, setCurrentRestaurant] = useState();

  //fetch the list if the length of the list is 0
  useEffect(() => {
    if (!data) {
      //specified json with just ID's
      fetch("/api/location")
        .then((res) => res.json())
        .then((list) => {
          //save all restaurant objects as data
          setData(list);
        });
      //if we haven't created a list of the restaurant's id's let's create one:
    }
    if (!restaurantList) {
      let array = [];
      //iterate through each restaurant object in data
      for (let object in data) {
        //add each object's id to the the array
        array.push(object.id);
      }
      //make this an array which has all of the restuarant's IDs
      setRestaurantList(array);
    }
  });

  //function that zooms back out and re-centers the map if the user clicks the header
  function reloadHomePage(event) {
    setNewCenter([42.05217724328756, -70.18468681413914]);
    setNewZoom(15);
    //set this to a falsy value to hide the comment section
    setCurrentRestaurant();
  }

  //main components: list of restuarants, map, restaurant info section, comment section
  return (
    <div>
      <header id="main-header">
      <div id="home-icon-container">

        <Link to={"/"} onClick={reloadHomePage}>
            <img id="home-icon" src={homeIcon} alt="house" />
        </Link>
        </div>

        <div id = "app-title">
        <div id = "yelpington">Yelpington</div> <div id ="provincetown">Provincetown, MA</div>
        </div>
      </header>

      <div id="app-container">
          <NavBar
            data={data}
            restaurantList={restaurantList}
            currentRestaurant={currentRestaurant}
          />
        <div id="mapid">
          {data ? (
            <Route
              //path="/"
              render={(props) => (
                <div id="map-component-wrapper">
                <Map
                  restaurantList={restaurantList}
                  newZoom={newZoom}
                  newCenter={newCenter}
                  //match={props.match}
                  data={data}
                />
                </div>
              )}
            />
          ) : null}
        </div>
        <div id="restaurant-container">
          <Route
            id="restaurant"
            path="/:restaurantid"
            render={(props) => (
              <Restaurant
                data={data}
                setNewZoom={setNewZoom}
                setNewCenter={setNewCenter}
                setCurrentRestaurant={setCurrentRestaurant}
                currentRestaurant={currentRestaurant}
                match={props.match}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
