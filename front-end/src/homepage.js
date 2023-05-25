import React, { Component } from "react";
import Data from "./card.json";
import Slider from "./Component/slider";
import { Grid } from "@material-ui/core";
import Cardpartner from "./datafile.json";
import Partner from "./Component/Partnercard";
import Footer from "./Component/footer";
import Whirligig from "react-whirligig";
import Headerlog from "./Component/headerpart";
import Header from "./Component/Aboutheader";
import Homeadvertise from "./Component/Homeadvertise";
import { Typography, Image } from "antd";
import Recomended from "./Component/Recomended";
import NearbyHotel from "./Component/NearbyHotel";
import Fooditemcard from "./Fooditemcard";
import { Button, Radio, Row, Col, Tag } from "antd";
import { isMobile } from "react-device-detect";
import img2 from "./image/img.jpg";
import img3 from "./image/img2.jpg";
import img4 from "./image/img3.jpg";
import mobileapp1 from "./image/mobileapp1.png";
import mobileapp from "./image/mobileapp.png";
import ResponsiveSlider from "./Component/ResponsiveSlider";
import {
  CaretRightOutlined,
  CaretLeftOutlined,
  MinusOutlined,
} from "@ant-design/icons";

import { Redirect } from 'react-router'
import { BrowserRouter, Link } from "react-router-dom";
const { Title } = Typography;
// import img1 from './image/2598_R0lVIEFOTiAxOTAtNzc.png'
// import img2 from './image/12633.png'
// import img3 from './image/Group772.png'
export default class homepage extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }


  
  
  componentDidMount() {
    fetch("https://deliveryguru.co.uk/dg_api/nearByPopular", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pin: "G1", //this.state.pincode,
        country_code: "uk"
      }),
    })
      .then((results) => results.json())
      .then((results) => {
        // alert("hotel data" + JSON.stringify(results));
        this.setState({
          data: results,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  oferpage () {
    alert("ok");
   
   return  (<Redirect   to='offerlist'  />);
      
      
   }
  render() {
    const colors = ["#9e9e9e", "#d27233db", "#9e9e9e"];
    let whirligig;
    const next = () => whirligig.next();
    const prev = () => whirligig.prev();

    
  
    return (
      <div className="maindiv" style={{ background: "#ffeee5" }}>
        <Headerlog className="headerdata" />
        <Slider style={{ background: "#fff" }} />
        {localStorage.getItem("Picodwiseshowprisuct") ? (
          <>
            {/* <ResponsiveSlider /> */}
            <Grid container lg={12}>
              {/* {Data.map((post, index) => {
            return (
              <Homeadvertise
                name={post.name}
                title={post.title}
                image={post.image}
              />
            );
          })} */}
            </Grid>

            <Grid container style={{ background: "#fff", paddingTop: 17 }}>
              <Grid lg={12}>
                <br /> <br />
              </Grid>

              <Grid
                lg={1}
                xs={1}
                sm={1}
                md={1}
                style={isMobile ? { display: "none" } : { padding: "50px 0" }}
              >
                <Button
                  onClick={prev}
                  shape="circle"
                  icon={<CaretLeftOutlined />}
                  size="large"
                  style={{ marginRight: "-85%" }}
                />
              </Grid>
              <Grid lg={10} xs={12} sm={12} md={12} container>
                <Title
                  style={{
                    fontSize: 22,
                    background: "#fff",
                    clear: "both",
                    textAlign: "left",
                  }}
                >
                  Liked By You,delivered By us
                </Title>

                <Whirligig
                  visibleSlides={isMobile ? 1 : 3.5}
                  gutter="1em"
                  ref={(_whirligigInstance) => {
                    whirligig = _whirligigInstance;
                  }}
                  className="scrollercuisine"
                >
                  {this.state.data != null &&
                    this.state.data.map((value) => (
                      <Grid
                        lg={12}
                        style={isMobile ? { margin: 7 } : { marginRight: 5 }}
                        key={value.id}
                      >
                        <NearbyHotel
                          hotelname={value.hotel_name}
                          type={value.type}
                          id={value.id}
                          url={value.menuurl}
                          status={value.rest_status}
                          address={value.address}
                          charges={value.delivery_charges}
                          discount={value.discount}
                          pin={value.pin}
                          minorder={value.min_order}
                        />
                      </Grid>
                    ))}
                </Whirligig>
                {isMobile ? (
                  <>
                    <Button
                      onClick={prev}
                      shape="circle"
                      icon={<CaretLeftOutlined />}
                      size="large"
                      style={{ marginLeft: 20 }}
                    />
                    <Button
                      shape="circle"
                      onClick={next}
                      icon={<CaretRightOutlined />}
                      size="large"
                      style={{ marginLeft: 12 }}
                    />
                  </>
                ) : null}
                {/* <Grid lg={5} style={{marginRight:25}}>
                <Recomended  />
                </Grid>
                <Grid lg={5}style={{marginRight:25}}>
                <Recomended />
                </Grid> */}
              </Grid>
              <Grid
                lg={1}
                xs={1}
                sm={1}
                md={1}
                style={isMobile ? { display: "none" } : { padding: "50px 0" }}
              >
                <Button
                  shape="circle"
                  onClick={next}
                  icon={<CaretRightOutlined />}
                  size="large"
                  style={{ marginLeft: "-85%" }}
                />
              </Grid>
            </Grid>


            <Row style={{ background: "#fff" }}>
          <Col lg={2}></Col>
          <Col lg={20}>
            <h3
              style={{
                fontSize: 22,
                paddingTop: 26,
                paddingBottom: 8,
                textTransform: "capitalize",
                textAlign: "left",
              }}
            >
              top rated Nearby <Tag  onClick={() => window.location.href="/offerlist"}>See all</Tag>
            </h3>
            <Whirligig
                  visibleSlides={isMobile ? 1 : 3.5}
                  gutter="1em"
                  ref={(_whirligigInstance) => {
                    whirligig = _whirligigInstance;
                  }}
                  className="scrollercuisine"
                >
                  {this.state.data != null &&
                    this.state.data.map((value) => (
                      <Grid
                        lg={12}
                        style={isMobile ? { margin: 7 } : { marginRight: 5 }}
                        key={value.id}
                      >
                        <NearbyHotel
                          hotelname={value.hotel_name}
                          type={value.type}
                          id={value.id}
                          url={value.menuurl}
                          status={value.rest_status}
                          address={value.address}
                          charges={value.delivery_charges}
                          discount={value.discount}
                          pin={value.pin}
                          minorder={value.min_order}
                        />
                      </Grid>
                    ))}
                </Whirligig>
                {isMobile ? (
                  <>
                    <Button
                      onClick={prev}
                      shape="circle"
                      icon={<CaretLeftOutlined />}
                      size="large"
                      style={{ marginLeft: 20 }}
                    />
                    <Button
                      shape="circle"
                      onClick={next}
                      icon={<CaretRightOutlined />}
                      size="large"
                      style={{ marginLeft: 12 }}
                    />
                  </>
                ) : null}
          </Col>
          <Col lg={2}></Col>
        </Row>

        <Row style={{ background: "#fff", padding: "30px 1px" }}>
          <Col lg={2}></Col>
          <Col lg={20}>
            <h3
              style={{
                fontSize: 22,
                paddingTop: 26,
                paddingBottom: 8,
                textTransform: "capitalize",
                textAlign: "left",
              }}
            >
              Places with discount and offer <Tag  onClick={() => window.location.href="/Dofferlist"}>See all</Tag>
            </h3>
            <Whirligig
                  visibleSlides={isMobile ? 1 : 3.5}
                  gutter="1em"
                  ref={(_whirligigInstance) => {
                    whirligig = _whirligigInstance;
                  }}
                  className="scrollercuisine"
                >
                  {this.state.data != null &&
                    this.state.data.map((value) => (
                      <Grid
                        lg={12}
                        style={isMobile ? { margin: 7 } : { marginRight: 5 }}
                        key={value.id}
                      >
                        <NearbyHotel
                          hotelname={value.hotel_name}
                          type={value.type}
                          id={value.id}
                          url={value.menuurl}
                          status={value.rest_status}
                          address={value.address}
                          charges={value.delivery_charges}
                          discount={value.discount}
                          pin={value.pin}
                          minorder={value.min_order}
                        />
                      </Grid>
                    ))}
                </Whirligig>
                {isMobile ? (
                  <>
                    <Button
                      onClick={prev}
                      shape="circle"
                      icon={<CaretLeftOutlined />}
                      size="large"
                      style={{ marginLeft: 20 }}
                    />
                    <Button
                      shape="circle"
                      onClick={next}
                      icon={<CaretRightOutlined />}
                      size="large"
                      style={{ marginLeft: 12 }}
                    />
                  </>
                ) : null}
          </Col>
          <Col lg={2}></Col>
        </Row>

        <Row style={{ background: "#fff", padding: "30px 1px" }}>
          <Col lg={2}></Col>
          <Col lg={20}>
            <h3
              style={{
                fontSize: 22,
                paddingTop: 26,
                paddingBottom: 8,
                textTransform: "capitalize",
                textAlign: "left",
              }}
            >
              Places with no delivery charges <Tag  onClick={() => window.location.href="/Deliveryofferlist"}>See all</Tag>
            </h3>
            <Whirligig
                  visibleSlides={isMobile ? 1 : 3.5}
                  gutter="1em"
                  ref={(_whirligigInstance) => {
                    whirligig = _whirligigInstance;
                  }}
                  className="scrollercuisine"
                >
                  {this.state.data != null &&
                    this.state.data.map((value) => (
                      <Grid
                        lg={12}
                        style={isMobile ? { margin: 7 } : { marginRight: 5 }}
                        key={value.id}
                      >
                        <NearbyHotel
                          hotelname={value.hotel_name}
                          type={value.type}
                          id={value.id}
                          url={value.menuurl}
                          status={value.rest_status}
                          address={value.address}
                          charges={value.delivery_charges}
                          discount={value.discount}
                          pin={value.pin}
                          minorder={value.min_order}
                        />
                      </Grid>
                    ))}
                </Whirligig>
                {isMobile ? (
                  <>
                    <Button
                      onClick={prev}
                      shape="circle"
                      icon={<CaretLeftOutlined />}
                      size="large"
                      style={{ marginLeft: 20 }}
                    />
                    <Button
                      shape="circle"
                      onClick={next}
                      icon={<CaretRightOutlined />}
                      size="large"
                      style={{ marginLeft: 12 }}
                    />
                  </>
                ) : null}
          </Col>
          <Col lg={2}></Col>
        </Row>
          </>
        ) : (
          <Row style={{ background: "#ffeee5" }}>
            <Col lg={12} style={{ position: "relative" }}>
              <Title style={{ position: "absolute", top: "30%", fontSize: 44 }}>
                {" "}
                Please Visit On Application{" "}
              </Title>
            </Col>
            <Col lg={12}>
              <p>
                <span>
                  <img
                    src={mobileapp1}
                    alt="download images"
                    style={{ width: "50%" }}
                  />
                </span>
                <span>
                  <img
                    src={mobileapp}
                    alt="download images"
                    style={{ width: "50%" }}
                  />
                </span>
              </p>
            </Col>
          </Row>
        )}

        {/* <Title className="joinby"> Places With Tasty Offers</Title>
      
        <br />
        <Grid container lg={12}>
          <Grid lg={1}>
         
          </Grid>
          <Grid lg={10} container>
            <Grid lg={4}>
              <Fooditemcard image={img2} />
            </Grid>
            <Grid lg={4}>
              <Fooditemcard image={img3} />
            </Grid>
            <Grid lg={4}>
              <Fooditemcard image={img4}/>
            </Grid>
          </Grid>
          <Grid lg={1}></Grid>
        </Grid> */}

        
        <Grid container lg={12} style={{ background: "#fff" }}>
          <Grid lg={12}>
            {" "}
            <br /> <br />
            <Title className="joinby">Join Us</Title>
          </Grid>
          <Grid lg={1}></Grid>
          <Grid container lg={10} xs={12} md={12}>
            {Cardpartner.map((data, index) => {
              return (
                <Partner
                  image={"img" + (index + 1)}
                  name={data.name}
                  details={data.details}
                  pname={data.pname}
                  image={data.image}
                  colors={colors[index]}
                />
              );
            })}
          </Grid>
          <Grid lg={1}></Grid>
        </Grid>

        <Grid lg={12} style={{ background: "#fff" }}>
          <br /> <br />
          <h3>
            Download the Delivery Guru app for faster and personalised ordering
            recommendations
          </h3>
          <span>
            <img
              src="https://www.talabat.com/images/Talabat/logo_appstore.svg"
              style={{
                height: 45,
                marginRight: 20,
                marginBottom: 20,
                marginTop: 20,
              }}
            />
          </span>
          <span>
            <img
              src="https://www.talabat.com/images/Talabat/logo_playstore.svg"
              style={{
                height: 45,
                marginRight: 20,
                marginBottom: 20,
                marginTop: 20,
              }}
            />
          </span>
          <Footer />
        </Grid>
      </div>
    );
  }
}
  