import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  DirectionsService,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import axios from "axios";
import hotel from "../image/restaurant.png";
import person from "../image/placeholder.png";
import { useSelector } from "react-redux";

const libraries = ["places", "directions"];
const mapContainerStyle = {
  height: "61vh",
  width: "100%",
};
const center = {
  lat: 55.8695523,
  lng: -4.2920542,
};

const Map = (props) => {
  console.log("propsinmap", props);
  const hotellat = useSelector((state) => state.hotel.hotel[0].lat);
  const hotellng = useSelector((state) => state.hotel.hotel[0].longt);

  const driverid = useSelector((state) => state.product.driverid?.driverid);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyA8riNVIULszyt3B5Krm_ki0YscCAtauv8",
    libraries,
  });

  const [origin2, setOrigin2] = useState(null);
  const [destination2, setDestination2] = useState(null);
  const [response, setResponse] = useState(null);
  const [distance, setDistance] = useState();
  const [duration, setDuration] = useState();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // https://driver.delivery-guru.com/showByDriverid/'+id
    // https://driver.delivery-guru.com/getDriverCurrentLocation/1
    if (props && props.frommenu === true) {
      setLocations(props.deliverypincodes[0].deliverydetails);
    } else {
      let id = JSON.parse(driverid);
      // axios.get(`https://driver.delivery-guru.com/getDriverCurrentLocation/${id}`)
      axios
        .get(`https://driver.delivery-guru.com/getDriverCurrentLocation/1`)
        .then((res) => {
          console.log("driverres-->", res);
        })
        .catch((err) => {
          console.log("error", err);
        });
      setOrigin2({ lat: JSON.parse(hotellat), lng: JSON.parse(hotellng) });
      setDestination2({ lat: 55.8515471, lng: -4.129749 });
    }
  }, [hotellat, hotellng]);

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === "OK") {
        setResponse(response);
        setDistance(response.routes[0].legs[0].distance);
        setDuration(response.routes[0].legs[0].duration);
      } else {
        console.log("response: ", response);
      }
    }
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "loading maps";

  const DirectionsServiceOption = {
    destination: destination2,
    origin: origin2,
    travelMode: "DRIVING",
  };
  console.log("location", locations);
  const getCoordinates = (address) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${"g14pl"}&key=AIzaSyA8riNVIULszyt3B5Krm_ki0YscCAtauv8`
    )
      .then((response) => response.json())
      .then((data) => {
        // const latitude = data.results.geometry.location.lat;
        // const longitude = data.results.geometry.location.lng;
        console.log("data", data);
        // console.log({latitude, longitude})
      });
  };
  getCoordinates();
  // console.log("driverid",driverid)
  // conversion km to miles mi =km * 0.62137
  return (
    <div>
      {locations === null ? (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={center}
          // onLoad={onMapLoad}
        >
          {response !== null && (
            <DirectionsRenderer
              options={{
                directions: response,
                suppressMarkers: true,
              }}
            />
          )}

          <Marker position={origin2} icon={hotel} />
          <Marker position={destination2} icon={person} />

          <DirectionsService
            options={DirectionsServiceOption}
            callback={directionsCallback}
          />
        </GoogleMap>
      ) : (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={center}
          // onLoad={onMapLoad}
        >
          <Marker position={"G11"} icon={hotel} />
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;