import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { Restaurant } from "./Restaurant";

export default function NavBar(props) {
  const [data, setData] = useState();

  useEffect(() => {
    if (!data) {
      fetch(`/api/location`)
        .then((res) => res.json())
        .then((restaurantObj) => {
          setData(restaurantObj);
          console.log(restaurantObj);
          console.log(data);
        });
    }
  });

  if (data) {
    return (
      <div>
        <ul>
          {data.map((obj) => {
            return (
              <h4>
                <li>
                  <Link to={`/${obj.id}`}>{obj.name}</Link>
                </li>
              </h4>
            );
          })}
        </ul>
      </div>
    );
  } else return null;
}
