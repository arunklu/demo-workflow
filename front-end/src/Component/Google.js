import React, { useState,useEffect } from "react";
import "./styles.css";
import { GoogleLogin, GoogleLogout } from "react-google-login";

export default function Google() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [id,setid]=useState("");
  const [loginStatus, setLoginStatus] = useState(false);
    const [Data , SetData]=useState("");
  const responseGoogle = response => {
    console.log(response);
    setName(response.profileObj.name);
    setEmail(response.profileObj.email);
    setUrl(response.profileObj.imageUrl);
    setid(response.profileObj.id)
    setLoginStatus(true);
  };
  const logout = () => {
    console.log("logout");
    setLoginStatus(false);
  };

  useEffect(() => {
    
    const origin = "G14PL";

    const requestOptions = {
      method: "get",
      body: { gmailid:id ,gmailimage:url,user_gmail:email},
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
    };
    //console.log(props.sub_menu);
    fetch(
      "https://deliveryguru.co.uk/dg_api/socialmedia",
      requestOptions
    )
      .then((res) => res.json())
      .then(
        (result) => {
          //alert(JSON.stringify(result))
          // setdistance(result);
          console.log("data find " + JSON.stringify(result));
        },
        (error) => {
          // setIsLoaded(true);
          // setError(error);
        }
      );

    // }
  });
  return (
    <div className="App">
      {!loginStatus && (
        <GoogleLogin
          clientId="598946738262-o24ndulimphutds9dnrm683fhkdr4pvr.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      )}
      {loginStatus && (
        <div>
          <h2>Welcome {name}</h2>
          <h2>Email: {email}</h2>
          <img src={url} alt={name} />
          <br />
          <GoogleLogout
            clientId="598946738262-o24ndulimphutds9dnrm683fhkdr4pvr.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={logout}
          />
        </div>
      )}
    </div>
  );
}