const { response } = require('express')
const express = require('express')

const path = require('path')

const app = express()

//this has to match package.json on the client side proxy 
const port = process.env.PORT || 5000

//path to get the list of all restaurant id's 
app.get("/api", (request, response) => {
    response.sendFile(path.resolve("./api/id.json"))
})

//path to access each individual restaurant's json file 
app.get("/api/:restaurantid", (request, response)=> {
    let id = request.params.restaurantid;
    console.log(id)
    response.sendFile(path.resolve(`./api/${id}.json`))
})

//path to access each restaurant's location 
app.get("api/location", (request, response) => {
    response.sendFile(path.resolve("./api/location.json"))
})

//general path 
app.get("*", (request, response) => {
    response.sendFile(path.resolve('./client/public/index.html'))
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
}) 