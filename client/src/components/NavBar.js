import React from "react";
import { Link} from "react-router-dom";

export default function NavBar(props) {

  // if the data has been fetched on the App page, iterate through each restaurant object in data set - create a list of the restuarant's names that link to the proper page 
  if (props.data) {
    return (
      <div>
        <ul>
          {props.data.map((obj, index) => {
            return (
              <h4>
                <li class ="nav-item">
                  <Link class ="nav-item" to={`/${obj.id}`} key = {index}>{obj.name}</Link>
                </li>
              </h4>
            );
          })}
        </ul>
      </div>
    );
  } else return null;
}

