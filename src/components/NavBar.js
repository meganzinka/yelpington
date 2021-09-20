import React from "react";
import { Link} from "react-router-dom";

export default function NavBar(props) {
  if (props.data) {
    return (
      <div id="nav-bar-container">
          {props.data.map((obj, index) => {
            if (obj.id === props.currentRestaurant) {
            return (
                <div key = {index} className ="nav-item" name={obj.id} id = "selected">
                  <Link to={`/${obj.id}`}  
                   name = {obj.id}
                  >{obj.name}</Link>
                </div>
            )
            } else return (
              <div key = {index} className ="nav-item" name={obj.id} id = "white">
              <Link to={`/${obj.id}`}  
               name = {obj.id}
              >{obj.name}</Link>
            </div>
            )
          })}
      </div>
    );
  } else return null;
}

