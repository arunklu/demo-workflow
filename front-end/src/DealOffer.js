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

const { Meta } = Card;

export default class DealOffer extends Component {
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
      hotelcount: null,
      search: "",
      data: "",
      BYSTATUS: "All",
      cuisines: null,
    };
  }
  
  componentDidMount() {
    let datapart="";
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
           
            // console.log(JSON.stringify(result));
            this.setState({
              usersdata: result,
              filterusersdata:result,
              hotelcount: result.length,
              
              
            });
          },
          (error) => {
            this.setState({ error });
          }
        );

        const apiUrlnearpin = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=g14pl&destinations=" + 47 + " &key=AIzaSyDY2j1NE12MzJYS7t-dVay1lXooOpzxZsY";
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
          console.log(JSON.stringify(result.result));

          this.setState({
            cuisines: result.result,
          });
        },
        (error) => {
          this.setState({ error });
        }
      );
  }

//   searchData = () => {
//     // alert(this.props.location.state.id);
//     const data = filter(this.state.usersdata, function (data) {
//       return (
//         data.hotel_name.includes(this.props.location.state.id) ||
//         data.type.includes(this.props.location.state.id) ||
//         data.hotel_mob.includes(this.props.location.state.id) ||
//         data.pin.includes(this.props.location.state.id) ||
//         data.pin.includes(this.props.location.state.id)
//       );
//     });

//     this.setState({ filterusersdata: data });
//   };

  callbackFunction = (price, discount, minimumamt, rate) => {
    //   this.state.usersdata.filter(valuedata => valuedata.discount>=discount).map(data)

    discount = discount == 0 ? 0 : discount;

    const data = filter(this.state.usersdata, function (data) {
      return data.min_order >= minimumamt && data.discount >= discount;
    });

    this.setState({ filterusersdata: data });
  };

  handleChangedata = (event) => {
    const data = filter(this.state.usersdata, function (data) {
      return (
        data.hotel_name.includes(event.target.value) ||
        data.type.includes(event.target.value) ||
        data.hotel_mob.includes(event.target.value) ||
        data.pin.includes(event.target.value) ||
        data.address.includes(event.target.value) ||
        data.pin.includes(event.target.value)
      );
    });
    this.setState({ filterusersdata: data });
  };

  handleOpendata = () => {
    ////console.log("oo");
    const data = filter(this.state.usersdata, function (data) {
      return data.rest_status == "0";
    });

    this.setState({ filterusersdata: data });
  };

  handleClosedata = () => {
    ////console.log("oo");
    const data = filter(this.state.usersdata, function (data) {
      return data.rest_status == "1";
    });

    this.setState({ filterusersdata: data });
  };

  delivercharges = (dcharges) => {
    const data = filter(this.state.usersdata, function (data) {
      return data.delivery_charges == dcharges;
    });

    this.setState({ filterusersdata: data });
  };

  filtercuisine = (name) => {
    // alert(id);
    const data = filter(this.state.usersdata, function (data) {
      return data.type.includes(name);
    });

    this.setState({ filterusersdata: data });
  };

  handleBYnamedata = () => {
    ////console.log("oo");

    const data = this.state.usersdata.sort(function (a, b) {
      return a.hotel_name.localeCompare(b.hotel_name); //using String.prototype.localCompare()
    });

    this.setState({ filterusersdata: data });
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
             
              <span style={{ textDecoration: "underline", color: "#000" }}>
                Change Location
              </span>
            </Button>
            <Discount
              count={this.state.hotelcount}
              discount={this.callbackFunction}
              cuisines={this.state.cuisines}
              handlecharges={this.delivercharges}
              handlecuisine={this.filtercuisine}
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
                placeholder="Search For a Restaurants Or Dish"
                className="searchbar"
                variant="outlined"
                style={{ marginRight: "5px !important" }}
              />

              <Button
                type="primary"
                size="large"
                style={{ position: "absolute", right: 20, top: 10 }}
              >
                Search Dish <ArrowRightOutlined />
              </Button>
            </span>
            <p style={{ textAlign: "right", marginRight: 8 }}>
              <span
                color="#ef653b"
                style={{ float: "left", fontWeight: "bold", fontSize: 16 }}
              >
                {" "}
                {filterusersdata != null ? filterusersdata.length : ""} open
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

            {usersdata != null && filterusersdata != null &&
              filterusersdata
                .filter((value) => value.rest_status == 0 )
                .map((data) => (
                  <>
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
                        bannerimg={data.banner}
                        location={data.id}
                      />
                    </div>
                  </>
                ))}
            {/* <Alert message="Close Data" type="success" /> */}
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
                      location={data.id}
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
