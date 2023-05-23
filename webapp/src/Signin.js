import React, { Component } from "react";
import Login from "./Component/Login";
import AboutHead from "./Component/Aboutheader";
import Grid from "@material-ui/core/Grid";
import Footer from "./Component/footer";
export default class Signin extends Component {
  // componentDidMount() {
  //     // POST request using fetch with error handling
  //     const requestOptions = {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ title: 'React POST Request Example' })
  //     };
  //     fetch('https://reqres.in/invalid-url', requestOptions)
  //         .then(async response => {
  //             const isJson = response.headers.get('content-type')?.includes('application/json');
  //             const data = isJson && await response.json();

  //             // check for error response
  //             if (!response.ok) {
  //                 // get error message from body or default to response status
  //                 const error = (data && data.message) || response.status;
  //                 return Promise.reject(error);
  //             }

  //             this.setState({ postId: data.id })
  //         })
  //         .catch(error => {
  //             this.setState({ errorMessage: error.toString() });
  //             console.error('There was an error!', error);
  //         });
  // }
  render() {
    return (
      <div
        className="maindiv"
        style={{
          backgroundImage: `url("https://tb-static.uber.com/prod/web-eats-v2/open-graph/postmates.png")`,
          objectFit: "cover",
          height: "100vh",
          backgroundSize: "cover",
        }}
      >
        <AboutHead />
        <Grid container>
          <Grid lg={4}></Grid>
          <Grid lg={5}>
            <Login />
          </Grid>
        </Grid>
        <Footer />
      </div>
    );
  }
}
