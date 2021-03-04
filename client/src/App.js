import './App.css';
import Home from "./components/Home"
import Restaurant from "./components/Restaurant"
import {Route, Switch, Link} from "react-router-dom"

// import { Route, Switch} from "react-router-dom"

function App() {
  return (
    <div>
    <h1>Yelpington</h1>
    <Switch>
      <Route exact path = "/">
        <Home />
      </Route>
      <Route path = "/:restaurantid" component = {Restaurant} />
    </Switch>
    </div>
  );
}

export default App;
