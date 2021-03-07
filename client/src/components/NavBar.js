import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { Restaurant } from "./Restaurant";

export default function NavBar(props) {
  const [restaurantList, setRestaurantList] = useState([]);
  
  function capitalize(word) {
    let newWord = word.toLowerCase().trim();
    let newFirst = newWord[0].toUpperCase();
    return newFirst + newWord.slice(1);
  }

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
      <ul>
        {restaurantList.map((name, index) => {
          return (
            <h4 key={index}>
              <li>
                <Link to={`/${name}`} onClick = {() => {
                    console.log(name)
                }}>{capitalize(name)}</Link>
              </li>
            </h4>
          );
        })}
      </ul>
    </div>
  );
}
