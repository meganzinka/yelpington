import React from "react";
import { useState, useEffect } from "react";
import AddComment from "./AddComment";

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
  const [addComment, setAddComment] = useState(false);
  //function to turn date into
  function datify(date) {
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    let year = date.slice(0, 4);
    //for some reason time time was off by 4 hours, so I subtracted 4 from teh hours
    let time = date.slice(11, 13) - 4 + date.slice(13, 16);
    if (time.slice(0, 2) === 0) {
      time = "12" + time.slice(2, 5) + " AM";
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
    if (props.data && (!notes || restaurantId !== props.match.params.restaurantid)) {
      console.log("inside first if")
      //fetch to access the json file with the specific info about that restaurant
      // fetch(`/api/${props.match.params.restaurantid}`)
      //   .then((res) => res.json())
      //   .then((restaurantObj) => {

      for (let i = 0; i < props.data.length; i++) {
        console.log(props.data[i].id, props.match.params.restaurantid)
        if (props.data[i].id === props.match.params.restaurantid) {
          console.log("inside the if statement of the for loop")
          console.log(props.data[i], props.match.params.restaurantId)
          //set all the restaurant info to the information in the json file
          setName(props.data[i].name);
          setAddress(props.data[i].address);
          setPhoneNumber(props.data[i]["phone number"]);
          setHours(props.data[i].hours);
          setNotes(props.data[i].notes);
          //use the restaurant ID feauture to figure out if the current ID is the same as what's in the URL
          setRestaurantId(props.match.params.restaurantid);
          //send this back up to App so App knows whether or not to show comment section, what the new center is, and new zoom
          props.setCurrentRestaurant(props.data[i].id);
          props.setNewCenter([props.data[i].lat, props.data[i].long]);
          props.setNewZoom(18);
        }
      }
    }
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
  }, [props.match.params.restaurantid]);

  function triggerPopup(event) {
    setAddComment(true)
  }
  // console.log(props.match.params.restaurantid)
  //if the fetch has happened, update the page
  if (notes) {
    return (
      <div>
        <div className="restaurant-component">
          <div id="rest-name">{name}</div>
          <div id = "row-2">
          <div id="rest-address">{address}</div>
          <div id="rest-phone">{phoneNumber}</div>
          <div id="rest-hours">{hours}</div>
          </div>
        </div>
        <div className="restaurant-component">
          <div id = "notes-header">
          Insider Tips:
          </div>
          <div id = "row-2">
          <ul>
            {notes.map((note, index) => {
              return <li key={index}>{note}</li>;
            })}
          </ul>
          </div>
        </div>

        <div className="restaurant-component">
          <div id="comment-header">
          <h4>Reviews:</h4>
          </div>
          <div id = "row-2">
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
          <button
          onClick = {triggerPopup}
          >
            Leave a Review
          </button>
          </div>
        </div>
        {addComment ? (
          <AddComment setAddComment = {setAddComment} currentRestaurant = {props.currentRestaurant} name={name} />
        ) : null}
      </div>
    );
  } else return null;
};

export default Restaurant;
