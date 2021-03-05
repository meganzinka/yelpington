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
      <h1>Restuarant Page</h1>
      <h1>{name}</h1>
      <h1>{address}</h1>
      <h1>{phoneNumber}</h1>
      <h1>{hours}</h1>
      <h1>{notes}</h1>
    </div>
  );
};

export default Restaurant;
