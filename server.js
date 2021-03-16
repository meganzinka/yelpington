const { response } = require('express')
const express = require('express')
const mongoose = require("mongoose")
const path = require('path')

//server set-up
const app = express()
app.use(express.static(path.resolve("./client/public")));
app.use(express.urlencoded({ extended: true }));

//this has to match package.json on the client side proxy 
const port = process.env.PORT || 5000

//path to access each individual restaurant's json file 
app.get("/api/:restaurantid", (request, response)=> {
    let id = request.params.restaurantid;
    response.sendFile(path.resolve(`./api/${id}.json`))
})

//path to access each restaurant's location 
app.get("api/location", (request, response) => {
    response.sendFile(path.resolve("./api/location.json"))
})

//set-up for comment feature 
mongoose.connect("mongodb://localhost:27017/Yelp");
    //four major components of new comment 
const commentSchema = new mongoose.Schema({
    id: String,
    name: String,
    content: String,
    date: Date
})
const CommentsModel = mongoose.model("comments", commentSchema)
const commentsDB = mongoose.connection; 
app.post("/comment/:id", (request, response) => {
    //let the id equal the restaurant id code 
    let id = request.params.id
    //fill in the major components with info from the form  
    let commentObj = {
        id : id,
        name: request.body.name,
        content: request.body.content,
        date: Date.now()
    }
    //send new comments to the database 
    const newComment = new CommentsModel(commentObj)
    newComment.save(function (err) {
        if (err) throw err
    })
      //send re-load the page so that the comments show 
  response.redirect(`/${id}`);
} )

//show comments 
app.get("/show/:id", async (request, response) => {
    let id = request.params.id
    const cursor = await CommentsModel.find({})
    let results = [] 
    //loop through cursor and only return the comments that are for the current restaurant 
    cursor.forEach((entry) => {
        if (entry.id === id) {
            results.push(entry)
        }
    })
    //return all comments 
    response.json(results)
})
commentsDB.on("error", console.error.bind(console, "connection error:"));

//general path 
app.get("*", (request, response) => {
    response.sendFile(path.resolve('./client/public/index.html'))
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
}) 