import React from "react";
import { useState, useEffect } from "react";

const Restaurant = (props) => {
  //restaurant display info 
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [hours, setHours] = useState();
  const [notes, setNotes] = useState();
  //restaurant ID's to create links 
  const [restaurantId, setRestaurantId] = useState();
  //create an array to put comments upon fetch 
  const [comments, setComments] = useState([]);

  //function to turn date into
  function datify(date) {
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    let year = date.slice(0, 4);
    //for some reason time time was off by 4 hours, so I subtracted 4 from teh hours
    let time = date.slice(11, 13) - 4 + date.slice(13, 16);
    if (time.slice(0, 2) === 0) {
      time = "12" + time.slice(2,5) + " AM";
    } else if (time.slice(0, 2) === "12") {
      time = time + " PM";
    } else if (time.slice(0, 2) > 12) {
      //convert from military time
      time = time.slice(0, 2) - 12 + time.slice(2, 5) + " PM";
    } else {
      time = time + " AM";
    }
    return `${month}-${day}-${year} at ${time}`;
  }
  //empty array where comments will be added
  let array = [];

  useEffect(() => {
    //only fetch if there's no notes or if the restaurant showing doesn't match what's in the URL
    if (!notes || restaurantId !== props.match.params.restaurantid) {
      //fetch to access the json file with the specific info about that restaurant
      fetch(`/api/${props.match.params.restaurantid}`)
        .then((res) => res.json())
        .then((restaurantObj) => {
          //set all the restaurant info to the information in the json file
          setName(restaurantObj.name);
          setAddress(restaurantObj.address);
          setPhoneNumber(restaurantObj["phone number"]);
          setHours(restaurantObj.hours);
          setNotes(restaurantObj.notes);
          //use the restaurant ID feauture to figure out if the current ID is the same as what's in the URL 
          setRestaurantId(props.match.params.restaurantid);
          //send this back up to App so App knows whether or not to show comment section, what the new center is, and new zoom 
          props.setCurrentRestaurant(restaurantObj.id)
          props.setNewCenter([restaurantObj.lat, restaurantObj.long]);
          props.setNewZoom(18)
        });
      //fetch to access comments
      fetch(`/show/${props.match.params.restaurantid}`)
        .then((res) => res.json())
        //push each comment into the array 
        .then((comments) => {
          comments.forEach((comment) => {
            array.push(comment);
          });
          //set the comments to be this array of comments 
          setComments(array);
        });
    }
  });
  // console.log(props.match.params.restaurantid)
  //if the fetch has happened, update the page
  if (notes) {
    return (
      <div>
        <h1>{name}</h1>
        <h3>{address}</h3>
        <h3>{phoneNumber}</h3>
        <h4>{hours}</h4>
        <h4>Notes:</h4>
        {/* map through the notes to put each note on its own bullet point */}
        <ul>
          {notes.map((note, index) => {
            return <li key={index}>{note}</li>;
          })}
        </ul>
        {/* map through the comments to put each note on its own bullet point, including a part that shows the name of the commenter and when they commented*/}
        <h4>Comments:</h4>
        <ul>
          {comments.length > 0
            ? comments.map((obj, index) => {
                return (
                  <li key={index}>
                    {obj.content}
                    <br></br>
                    <i>
                      - {obj.name} on {datify(obj.date)}
                    </i>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    );
  } else return null;
};

export default Restaurant;
