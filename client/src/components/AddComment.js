import React from "react";

//add comment 
const AddComment = (props) => {
  return (
    <div id="add-comment">
      <form
        method="POST"
        action={`/comment/${props.match.params.restaurantid}`} >
        <label>Leave a Comment!</label>
        <br></br>
        <input name="name" placeholder="What's your name?" />
        <textarea name="content" placeholder="What's your comment?" /> <br></br>
        <input id="submit-button" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddComment;
