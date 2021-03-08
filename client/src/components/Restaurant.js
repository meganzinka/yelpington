import React from "react";
import { useState, useEffect } from "react";

const Restaurant = (props) => {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [hours, setHours] = useState();
  const [notes, setNotes] = useState();
  const [restaurantId, setRestaurantId] = useState();

  //fetch the specific json for each restaurant
  useEffect(() => {
    //only fetch if there's no notes or if the restaurant showing doesn't match what's in the URL
    if (!notes || restaurantId !== props.match.params.restaurantid) {
      fetch(`/api/${props.match.params.restaurantid}`)
        .then((res) => res.json())
        .then((restaurantObj) => {
          setName(restaurantObj.name);
          setAddress(restaurantObj.address);
          setPhoneNumber(restaurantObj["phone number"]);
          setHours(restaurantObj.hours);
          setNotes(restaurantObj.notes);
          setRestaurantId(props.match.params.restaurantid);
        });
    }
  });

  //if the fetch has happened, update the page, create a list for each note
  if (notes) {
    return (
      <div>
        <h1>{name}</h1>
        <h3>{address}</h3>
        <h3>{phoneNumber}</h3>
        <h4>{hours}</h4>
        <ul>
          {notes.map((note) => {
            return <li>{note}</li>;
          })}
        </ul>
      </div>
    );
  } else return null;
};

export default Restaurant;
