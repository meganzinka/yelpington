import "./style/App.css";
// import Home from "./components/Home";
import Restaurant from "./components/Restaurant";
import { Route, Switch, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Map from "./components/Map";
import { useEffect, useState } from "react";
import AddComment from "./components/AddComment";

function App() {
  //create a list of all the restaurant's ID's
  const [restaurantList, setRestaurantList] = useState([]);
  //load the data from the location.json file 
  const [data, setData] = useState()
  //variable to change center depending on which restaurant is clicked
  const [newCenter, setNewCenter] = useState()
  //variable to adjust zoom for individual restaurant vs. all restaurants 
  const [newZoom, setNewZoom] = useState()
  //variable to see if a restaurant on screen or not - used to show/hide comment section
  const [currentRestaurant, setCurrentRestaurant] = useState() 

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
    } if (!restaurantList) {
      let array = [];
      //iterate through each restaurant object in data 
      for (let object in data) {
        //add each object's id to the the array 
        array.push(object.id)
      }
      //make this an array which has all of the restuarant's IDs 
      setRestaurantList(array)
    }
  });

  //function that zooms back out and re-centers the map if the user clicks the header
  function reloadHomePage (event) {
    setNewCenter([42.05217724328756, -70.18468681413914])
    setNewZoom(15);
    //set this to a falsy value to hide the comment section 
    setCurrentRestaurant()
  }


  //main components: list of restuarants, map, restaurant info section, comment section
  return (
    <div>
      <header id ="main-header">
        <Link  to={"/"} onClick = {reloadHomePage}><h1>Yelpington Provincetown</h1></Link>
      </header>

      <div id="app-container">
        <div id="nav-bar-container">
        {/* <Route
            id="nav-bar"
            render = {props =>  */}
            <NavBar data = {data} restaurantList={restaurantList}/>
            {/* } /> */}
        </div>
        {/* only want to return map component if data has been fetched */}
        <div id="mapid">
          { data ? (<Route
            render = {props => <Map restaurantList={restaurantList} newZoom = {newZoom} newCenter = {newCenter} match={props.match} path="/:restaurantid" data = {data} />}
          />) : null }
        </div>
        {/* only want to return the comment component if a restaurant is clicked  */}
        {currentRestaurant ? (<Route render = {props => <AddComment currentRestaurant = {currentRestaurant}/>} />) : null }
        <div id="restaurant-container">
          <Route
            id="restaurant"
            path="/:restaurantid"
            render = {props => <Restaurant setNewZoom = {setNewZoom} setNewCenter = {setNewCenter} setCurrentRestaurant = {setCurrentRestaurant} match = {props.match}/>} />
        </div>
      </div>
    </div>
  );
}

export default App;
