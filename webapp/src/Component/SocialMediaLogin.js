import React, { useState,useEffect } from 'react'

export default function SocialMediaLogin() {
    const[Data,Setdata]=useState("");

    useEffect(() => {
        const requestOptions = {
            method: "get",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": "true",
            },
          };
        fetch("https://deliveryguru.co.uk/dg_api/socialmedia/",requestOptions)
          .then((res) => res.json())
          .then(
            (result) => {
               console.log("data find "+JSON.stringify(result))
            },
            (error) => {
              // setIsLoaded(true);
              // setError(error);
            }
          );
    
        
      });
  return (
    <div>SocialMediaLogin</div>
  )
}
