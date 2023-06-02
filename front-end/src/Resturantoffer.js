import React, { Component } from "react";
import Offer from "./Component/Offercard";
import { filter } from "lodash";
import "./about.css";
import Header from "./Component/Aboutheader";
import Discount from "./Component/Discount";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import Footer from "./Component/footer";
import { Skeleton } from "antd";
export default class Resturantoffer extends Component {
  constructor(props) {
    super();
    this.state = {
      error: null,
      usersdata: null,
      filterusersdata: null,
      counterForSkip: 0,
      price: null,
      discount: null,
      rate: null,
      value: null,
      minimumamt: null,
      BYSTATUS: "All",
    };
  }

  componentDidMount() {
    var baseUrl = window.location.href; // You can also use document.URL
    var koopId = baseUrl.substring(baseUrl.lastIndexOf("/") + 1);

    const apiUrl = "https://deliveryguru.co.uk/dg_api/restaurants";
    const requestOptions = {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(JSON.stringify(result));

          const dataoffer = filter(result, function (data) {
            return data.discount >= koopId;
          });
          this.setState({
            usersdata: result,
            filterusersdata: dataoffer,
          });
        },
        (error) => {
          this.setState({ error });
        }
      );
  }

  offerresturant = () => {
    var baseUrl = window.location.href; // You can also use document.URL
    var koopId = baseUrl.substring(baseUrl.lastIndexOf("=") + 1);
    // console.log(koopId);
    const dataoffer = filter(this.state.usersdata, function (data) {
      return data.discount >= koopId;
    });
    this.setState({ filterusersdata: dataoffer });
  };

  handleChangedata = (event) => {
    const data = filter(this.state.usersdata, function (data) {
      return data.hotel_name.includes(event.target.value);
    });

    this.setState({ filterusersdata: data });
  };
  render() {
    const { usersdata, filterusersdata } = this.state;
    return (
      <div className="maindiv">
        <Header />
        {/* <Newcarousel  offerdatapart={this.offerresturant}/> */}
        <Grid container>
          <Grid lg={12} xs={12}>
            <TextField
              xs={11}
              id="outlined-search"
              label={null}
              value={this.state.value}
              onChange={this.handleChangedata}
              placeholder="search Resturant & Dishes"
              className="searchbar"
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid lg={3} xs={12}>
            <Discount discount={this.callbackFunction} />
          </Grid>
          <Grid lg={9}>
            {usersdata !== null ? (
              filterusersdata
                .filter((value) => value.rest_status == "0")
                .map((data) => (
                  <div key={data.id} style={{ marginTop: 5 }}>
                    <Offer
                      hotelname={data.hotel_name}
                      id={data.id}
                      foodtype={data.type}
                      minorder={data.min_order}
                      discountvalue={data.discount}
                      restaurant={data.rest_status}
                      delivery={data.delivery_status}
                      charges={data.delivery_charges}
                      lat={data.lat}
                      longt={data.longt}
                      address={data.pin}
                      banner={data.banner}
                      location={this.props.location.state.id}
                    />
                  </div>
                ))
            ) : (
              <Skeleton active style={{ width: "100vh" }} />
            )}

            {/* <Alert message="Close Data" type="success" /> */}

            {usersdata !== null &&
              filterusersdata
                .filter((value) => value.rest_status == "1")
                .map((data) => (
                  <div key={data.id} style={{ marginTop: 5 }}>
                    <Offer
                      hotelname={data.hotel_name}
                      id={data.id}
                      foodtype={data.type}
                      minorder={data.min_order}
                      discountvalue={data.discount}
                      restaurant={data.rest_status}
                      delivery={data.delivery_status}
                    />
                  </div>
                ))}
          </Grid>
        </Grid>

        <Footer />
      </div>
    );
  }
}
