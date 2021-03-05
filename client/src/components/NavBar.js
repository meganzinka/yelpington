import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { Restaurant } from "./Restaurant";

export default function NavBar(props) {
  function capitalize(word) {
    let newWord = word.toLowerCase().trim();
    let newFirst = newWord[0].toUpperCase();
    return newFirst + newWord.slice(1);
  }

  return (
    <div>
      <ul>
        {props.restaurantList.map((name, index) => {
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
