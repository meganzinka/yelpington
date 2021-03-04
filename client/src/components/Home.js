import React from 'react' 
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Map from "Map"

function Home (props) {
    return (
        <div>
            <h1>This is the home page</h1>
            <div id="mapid">
            < Map />
            </div>
        </div>
    )
}


export default Home