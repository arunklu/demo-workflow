import React, { Component } from "react";
import Offer from "./Component/Offercard";
import { filter } from "lodash";
import "./about.css";
import Headerlog from "./Component/headerpart";
import Header from "./Component/Aboutheader";
import Discount from "./Component/Discount";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import Whirligig from "react-whirligig";
import { isMobile } from "react-device-detect";
// import Carousel from "./Component/Newcarousel";
import Footer from "./Component/footer";
import { Tag, Input, Button, Avatar, Rate, Skeleton } from "antd";
import {
  SortAscendingOutlined,
  CaretRightOutlined,
  ArrowRightOutlined,
  CaretLeftOutlined,
} from "@ant-design/icons";
import { Card, Form } from "antd";
import { Carousel } from "@trendyol-js/react-carousel";
import { Redirect } from "react-router-dom";
import offdishes from "./image/offdishes.png";
import Location from "./image/location.png";
import listres1 from "./image/listres1.png";
import listres2 from "./image/listres2.png";
import axios from "axios";

const { Meta } = Card;

export default class About extends Component {
  constructor(props) {
    super();
    this.state = {
      error: null,
      usersdata: null,
      filterusersdata: null,
      available: null,
      counterForSkip: 0,
      price: null,
      discount: null,
      rate: null,
      value: null,
      minimumamt: null,
      hotelcount: null,
      search: "",
      data: "",
      BYSTATUS: "All",
      cuisines: null,
    };
  }

  componentDidMount() {
    if (this.state.usersdata == null) {
      // const apiUrl = "https://testapi.delivery-guru.com/public/restaurants";
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
            let filterCode =
              this.props.location.state.id.split(" ").join("").length === 6
                ? this.props.location.state.id.split(" ").join("").slice(0, 3)
                : this.props.location.state.id.split(" ").join("").slice(0, 2);
            let filteredList = [];
            result.forEach((el) => {
              if (el.deliverydetails && el.deliverydetails.length > 0) {
                let deliveryInfo = JSON.parse(
                  el.deliverydetails
                ).deliverypostcode;
                if (deliveryInfo.some((item) => item.postcode === filterCode)) {
                  filteredList.push(el);
                }
              }
            });
            this.setState({
              usersdata: filteredList,
              hotelcount: result.length,
              filterusersdata: filteredList,
            });
          },
          (error) => {
            this.setState({ error });
          }
        );

      const apiUrlnearpin =
        "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=g14pl&destinations=" +
        this.props.location.state.id +
        " &key=AIzaSyDY2j1NE12MzJYS7t-dVay1lXooOpzxZsY";
      const cuirequestOptions = {
        method: "post",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      fetch(apiUrlnearpin, cuirequestOptions)
        .then((res) => res.json())
        .then(
          (result) => {
            alert(JSON.stringify(result.result));

            this.setState({
              cuisines: result.result,
            });
          },
          (error) => {
            this.setState({ error });
          }
        );
    }
    //  this.handleChangedata(this.props.location.state.id);
    const apiUrlcuisines = "https://deliveryguru.co.uk/dg_api/selectCuisines";
    const cuirequestOptions = {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch(apiUrlcuisines, cuirequestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log("response--->",JSON.stringify(result.result));

          this.setState({
            cuisines: result.result,
          });
        },
        (error) => {
          this.setState({ error });
        }
      );
  }
  ////////////////restaurant search
  searchData = () => {
    // alert(this.props.location.state.id);
    const data = filter(this.state.usersdata, function (data) {
      return (
        data.hotel_name.includes(this.props.location.state.id) ||
        data.type.includes(this.props.location.state.id) ||
        data.hotel_mob.includes(this.props.location.state.id) ||
        data.pin.includes(this.props.location.state.id) ||
        data.pin.includes(this.props.location.state.id)
      );
    });
    this.setState({ filterusersdata: data });
  };

  //////////////discount filter
  callbackFunction = (price, discount, minimumamt, rate) => {
    //   this.state.usersdata.filter(valuedata => valuedata.discount>=discount).map(data)
    const data = filter(this.state.usersdata, function (data) {
      return data.discount >= discount || data.discount >= minimumamt;
    });
    this.setState({ filterusersdata: data });
  };
  ////////////////restaurant search
  handleChangedata = (event) => {
    let text = event.target.value;
    const caps = text.charAt(0).toUpperCase().concat(text.slice(1));
    const data = filter(this.state.usersdata, function (data) {
      return (
        data.hotel_name.includes(caps) ||
        data.type.includes(caps) ||
        data.hotel_mob.includes(caps) ||
        data.pin.includes(caps) ||
        data.address.includes(caps) ||
        data.pin.includes(caps)
      );
    });
    this.setState({ filterusersdata: data });
  };
  //////////////////restaurant open search
  handleOpendata = () => {
    const data = filter(this.state.usersdata, function (data) {
      return data.rest_status == 0;
    });

    this.setState({ filterusersdata: data });
  };
  ///////////restaurant close search
  handleClosedata = () => {
    const data = filter(this.state.usersdata, function (data) {
      return data.rest_status == 1;
    });
    this.setState({ filterusersdata: data });
  };
  ///////////deliverycharge filter
  delivercharges = (dcharges) => {
    let element = [];
    this.state.usersdata.forEach((el, i) => {
      if (el.deliverydetails && el.deliverydetails.length > 0) {
        let deliveryInfo = JSON.parse(el.deliverydetails).deliverypostcode;
        if (deliveryInfo.some((item) => Math.floor(item.price) <= dcharges)) {
          element.push(el);
        }
      }
    });
    this.setState({ filterusersdata: element });
  };
  /////////////cuisine filter
  filtercuisine = (name) => {
    const temp = this.state.usersdata.filter((item) =>
      item.type.includes(name)
    );
    this.setState({ filterusersdata: temp });
  };

  handleBYnamedata = () => {
    const data = this.state.usersdata.sort(function (a, b) {
      return a.hotel_name.localeCompare(b.hotel_name);
      //using String.prototype.localCompare()
    });

    this.setState({ filterusersdata: data });
  };
  ////////////////////distance filter
  distancefilter = (el) => {
    let location = "g521sr";
    const apiUrlnearpin =
      "http://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" +
      location +
      "&destinations=" +
      this.props.location.state.id +
      "&key=AIzaSyDY2j1NE12MzJYS7t-dVay1lXooOpzxZsY";
    const cuirequestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
    };
    axios
      .get(apiUrlnearpin, cuirequestOptions)
      .then((result) => {
        console.log("result", result);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  //////////////////////minimum order filter
  minimumorderFilter = (data) => {
    let element = [];
    this.state.usersdata.forEach((el, i) => {
      if (el.min_order && el.min_order > 0) {
        if (el.min_order <= data) {
          element.push(el);
        }
      }
      console.log("data", el);
    });
    this.setState({ filterusersdata: element });
  };

  render() {
    const { usersdata, filterusersdata } = this.state;
    if (this.state.data != "") {
      return (
        <Redirect to={{ pathname: "/home", state: { id: this.state.data } }} />
      );
    }
    let whirligig;
    const next = () => whirligig.next();
    const prev = () => whirligig.prev();
    // console.log("props-->",this.props.location.state)
    // console.log("this.state.cuisines", this.state.cuisines);
    return (
      <div className="maindiv">
        {localStorage.getItem("id") == undefined ||
        localStorage.getItem("id") == "" ||
        localStorage.getItem("id") === null ? (
          <Headerlog className="headerdata" />
        ) : (
          <Header />
        )}
        <Grid container>
          <Grid lg={11} xs={12} offset={1}></Grid>
        </Grid>
        <h3 style={{ textAlign: "left", fontWeight: 900, paddingLeft: 8 }}>
          Popular Cuisines{" "}
        </h3>
        <Grid container>
          <Grid
            lg={11}
            xs={12}
            style={{ margin: "0 4%", position: "relative" }}
          >
            <Button
              shape="circle"
              icon={<CaretLeftOutlined />}
              size="large"
              onClick={prev}
              style={{ position: "absolute", top: "35%", left: "-5px" }}
            ></Button>
            <Whirligig
              visibleSlides={isMobile ? 2 : 7}
              gutter="1em"
              ref={(_whirligigInstance) => {
                whirligig = _whirligigInstance;
              }}
              className="scrollercuisine"
            >
              {this.state.cuisines != null ? (
                this.state.cuisines.map((data) => (
                  <Card
                    hoverable
                    onClick={() => this.filtercuisine(data.name)}
                    style={{ marginLeft: 7, textAlign: "left" }}
                    cover={<img alt="example" src={listres2} />}
                  >
                    <Meta title={data.name} />
                  </Card>
                ))
              ) : (
                <Skeleton active avatar lg={24} size="large" />
              )}
            </Whirligig>
            <Button
              shape="circle"
              icon={<CaretRightOutlined />}
              size="large"
              onClick={next}
              style={{ position: "absolute", top: "35%", right: "-5px" }}
            ></Button>
          </Grid>
        </Grid>

        <h3>&nbsp;</h3>
        <Grid container>
          <Grid lg={3} xs={12}>
            <Button
              type="primary"
              size="large"
              onClick={() =>
                this.setState({ data: this.props.location.state.id })
              }
              style={{
                padding: "16px 0 42px  0",
                width: "97%",
                marginLeft: "1%",
                marginRight: "2%",
                background: "#e3e3e3",
                border: "#e3e3e3",
                color: "#000",
              }}
            >
              <Avatar src={Location} size={25} />
              {this.props.location.state.id} &nbsp; &nbsp;
              <span style={{ textDecoration: "underline", color: "#000" }}>
                Change Location
              </span>
            </Button>
            <Discount
              count={this.state.hotelcount}
              discount={this.callbackFunction}
              location={this.props.location.state.id}
              cuisines={this.state.cuisines}
              handlecharges={this.delivercharges}
              handlecuisine={this.filtercuisine}
              distance={this.distancefilter}
              minimumorder={this.minimumorderFilter}
            />
          </Grid>
          <Grid lg={9}>
            <span style={{ position: "relative" }}>
              <TextField
                xs={11}
                id="outlined-search"
                label={null}
                value={this.state.value}
                onChange={this.handleChangedata}
                placeholder="Search For a Restaurants"
                className="searchbar"
                variant="outlined"
                style={{ marginRight: "5px !important" }}
              />

              <Button
                type="primary"
                size="large"
                style={{ position: "absolute", right: 20, top: 10 }}
              >
                Search <ArrowRightOutlined />
              </Button>
            </span>
            <p style={{ textAlign: "right", marginRight: 8 }}>
              <span
                color="#ef653b"
                style={{ float: "left", fontWeight: "bold", fontSize: 16 }}
              >
                {" "}
                {filterusersdata != null ? filterusersdata.length : " "}{" "}
                restaurants match your filters
              </span>{" "}
              <Button
                type="bordered"
                color="#ef653b"
                onClick={() => this.handleBYnamedata()}
                style={{ marginRight: 2 }}
              >
                <SortAscendingOutlined /> By Name
              </Button>{" "}
              <Button
                type="bordered"
                color="#ef653b"
                onClick={() => this.handleOpendata()}
                style={{ marginRight: 6 }}
              >
                {" "}
                Open{" "}
              </Button>
              <Button
                type="bordered"
                color="#ef653b"
                onClick={() => this.handleClosedata()}
              >
                {" "}
                Close{" "}
              </Button>
            </p>
            <h2></h2>
            <h2></h2>

            {usersdata != null &&
              filterusersdata != null &&
              filterusersdata
                .filter((value) => value.rest_status == 0)
                .map((data) => (
                  <>
                    <div key={data.id} style={{ marginTop: 5 }}>
                      {console.log("data-->", data)}
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
                        bannerimg={data.banner}
                        location={this.props.location.state.id}
                      />
                    </div>
                  </>
                ))}
            {/* {/* <Alert message="Close Data" type="success" /> */}
            {usersdata !== null ? (
              filterusersdata
                .filter((value) => value.rest_status == 1)
                .map((data) => (
                  <div key={data.banner} style={{ marginTop: 5 }}>
                    <Offer
                      bannerimg={data.banner}
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
                      location={this.props.location.state.id}
                    />
                  </div>
                ))
            ) : (
              <Skeleton active style={{ width: "100vh" }} />
            )}
          </Grid>
        </Grid>

        <Footer />
      </div>
    );
  }
}
