import React from "react";
import { useState, useEffect } from "react";

const Restaurant = (props) => {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [hours, setHours] = useState();
  const [notes, setNotes] = useState();
  const [restaurantId, setRestaurantId] = useState(); 

  useEffect(() => {
    if (!notes || restaurantId !== props.match.params.restaurantid) {
      fetch(`/api/${props.match.params.restaurantid}`)
        .then((res) => res.json())
        .then((restaurantObj) => {
          setName(restaurantObj.name);
          setAddress(restaurantObj.address);
          setPhoneNumber(restaurantObj["phone number"]);
          setHours(restaurantObj.hours);
          setNotes(restaurantObj.notes);
          setRestaurantId(props.match.params.restaurantid)
        });
    }
  });

  return (
    <div>
      <h1>{name}</h1>
      <h3>{address}</h3>
      <h3>{phoneNumber}</h3>
      <h4>{hours}</h4>
      <ul>{notes.map((note) => {
        return (
        <li>{note}</li> )
      })}</ul>
    </div>
  );
};

export default Restaurant;
