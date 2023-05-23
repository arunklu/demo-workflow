import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Row, Col } from "antd";
export default function () {
  let history = useHistory();
  return (
    <>
      {/* <AppBar position="static" color="danger">
        <Container maxWidth="md">
          <Typography variant="body1" color="inherit" className=" ">
            © 2021 Devloped By Delivery Guru
          </Typography>
        </Container>
      </AppBar> */}
      <div
        style={{
          background: "#000",
          color: "#fff",
          padding: "10px",
          textAlign: "left",
        }}
      >
        <Row>
          <Col lg={5} xs={24} sm={24} md={24} xl={5}>
            <h3 style={{ color: "#fff" }}>About Us</h3>
            <p href="#" onClick={() => history.push("/aboutus")}>
              About Delivery Guru
            </p>
            <p href="#" onClick={() => history.push("/home")}>
              Our Blog
            </p>
            <p href="#" onClick={() => history.push("/home")}>
              Careers
            </p>
            <p href="" onClick={() => history.push("/restpartner")}>
              Become A Partner
            </p>
            <p href="#">Top Locals Brands</p>
          </Col>
          <Col lg={5} xs={24} sm={24} md={24} xl={5}>
            <h3 style={{ color: "#fff" }}>Popular Cuisines</h3>
            <p href="#" onClick={() => history.push("/home")}>
              Indian
            </p>
            <p href="#" onClick={() => history.push("/home")}>
              Pizza
            </p>
            <p href="#" onClick={() => history.push("/home")}>
              Kebabas
            </p>
            <p href="#" onClick={() => history.push("/home")}>
              Fish & Chips
            </p>
            <p href="#" onClick={() => history.push("/home")}>
              Italians
            </p>
            <p href="#" onClick={() => history.push("/home")}>
              View Allcuisines
            </p>
          </Col>
          <Col lg={5} xs={24} sm={24} md={24} xl={5}>
            <h3 style={{ color: "#fff" }}>Popular Locations</h3>
            <p href="#" onClick={() => history.push("/home")}>
              Glasgow
            </p>
            <p href="#" onClick={() => history.push("/home")}>
              Edinburgh
            </p>
            <p href="#" onClick={() => history.push("/home")}>
              Livingston
            </p>
            <p href="#" onClick={() => history.push("/home")}>
              Bathgate
            </p>
            <p href="#" onClick={() => history.push("/home")}>
              Dundee
            </p>
            <p href="#" onClick={() => history.push("/home")}>
              Paisley
            </p>
            <p href="#" onClick={() => history.push("/home")}>
              View AllLocation
            </p>
          </Col>

          <Col lg={5} xs={24} sm={24} md={24} xl={5}>
            <h3 style={{ color: "#fff" }}>Legal</h3>
            <p href="#" onClick={() => history.push("/cookies")}>
              Cockie Policy
            </p>
            <p href="#" onClick={() => history.push("/privacy")}>
              Privacy Policy
            </p>
            <p href="#" onClick={() => history.push("/home")}>
              Moderns slavery
            </p>
            <p href="#" onClick={() => history.push("/terms")}>
              Terms & Conditions
            </p>
            <p href="#" onClick={() => history.push("/driver")}>
              Driver
            </p>
          </Col>
          <Col lg={4} xs={24} sm={24} md={24} xl={4}>
            <h3 style={{ color: "#fff" }}>DownLoads Our Apps</h3>
            <p href="#">Playstore</p>
          </Col>
        </Row>
      </div>
    </>
  );
}
