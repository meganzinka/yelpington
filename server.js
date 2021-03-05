const { response } = require('express')
const express = require('express')

const path = require('path')

const app = express()

//this has to match package.json on the client side proxy 
const port = process.env.PORT || 5000

// app.use(express.static('./client/public'))

app.get("/api", (request, response) => {
    response.sendFile(path.resolve("./api/id.json"))
})

app.get("/api/:restaurantid", (request, response)=> {
    let id = request.params.restaurantid;
    console.log(id)
    response.sendFile(path.resolve(`./api/${id}.json`))
})

app.get("api/location", (request, response) => {
    response.sendFile(path.resolve("./api/location.json"))
})
app.get("*", (request, response) => {
    response.sendFile(path.resolve('./client/public/index.html'))
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
}) 