import React from "react";

//add comment 
const AddComment = (props) => {
  
  function cancelReview(event) {
    props.setAddComment(false)
  }

  let placeHolder = `What's your comment about ${props.name}?`
  return (
    <div id = "popup-wrapper">
    <div id="add-comment">
    <div id ="popup-title">Leave a Review</div>
      <form
        method="POST"
        action={`/comment/${props.currentRestaurant}`} >
        <input name="name" placeholder="What's your name?" />
        <textarea name="content" placeholder={placeHolder} /> <br></br>
        <input id="submit-button" type="submit" value="Submit" />
        <button onClick = {cancelReview}>Cancel</button>
      </form>
    </div>
    </div>
  );
};

export default AddComment;
