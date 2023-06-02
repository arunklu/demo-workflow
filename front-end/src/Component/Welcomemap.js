import React from 'react';
import { withScriptjs } from "react-google-maps";
import Map from './Map';
import { Fragment } from 'react';
import { Link, Route } from 'react-router-dom';
import { useEffect } from 'react';
const WelcomePage = () =>{
    const MapLoader = withScriptjs(Map);
    const locations = {
        origin : { lat: 55.8695523, lng: -4.2920542 },
    destination : { lat: 55.882100, lng: -4.302540 }
    }
    useEffect(()=>{
        
    },[]);
    return(
        <Fragment>
        <p>Welcome page</p>
        <p><Link to="/welcome/getlocation">Get Location</Link></p>
        <Route path="/welcome/getlocation">
        <MapLoader location={locations}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDY2j1NE12MzJYS7t-dVay1lXooOpzxZsY"
        loadingElement={<div style={{ height: `100%` }} />}
      ></MapLoader>
      </Route>
      </Fragment>
    );
};
​
export default WelcomePage;