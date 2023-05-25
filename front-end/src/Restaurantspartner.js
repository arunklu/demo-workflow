import React, { Component } from "react";
import Headerpart from "./Component/headerpart";
import Aboutheader from "./Component/Aboutheader";
import RestpartnerForm from "./Component/RestpartnerForm";
import { Row, Col, Card, Button, Avatar, Empty } from "antd";
import Footer from "./Component/footer";
import img from "./image/4913730.png";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
export default class Restaurantspartner extends Component {
  render() {
    return (
      <div>
        <Aboutheader />

        <Row style={{ position: "relative" }}>
          <img
            src={img}
            style={{ height: "67vh", width: "100%", objectFit: "cover" }}
          />

          <div
            style={{
              position: "absolute",
              top: "10%",
              textAlign: "left",
              width: "45%",
              color: "#fff",
              left: "3%",
            }}
          >
            <h2 style={{ color: "#fff", fontSize: 50, fontWeight: 600 }}>
              0% commissions <br />
              for 30 days
            </h2>
            <h3 style={{ color: "#fff", fontSize: 23, fontWeight: 500 }}>
              Let's recover faster, together and Reach more customers and
              increase your revenue by offering delivery, pickup, and online
              ordering to your customers today.
            </h3>
          </div>
          <RestpartnerForm />
          {/* <Col lg={10}>
                    <Empty />
                    </Col>
                    <Col lg={14}>

                        <h2>Get more customers</h2>
                        <p>Restaurants on Delivery Guru take 4,000 orders a year on average. 
                            We’ll put your restaurant in front of more potential
                             customers than anyone else.</p>
                    </Col> */}
        </Row>

        <Row style={{ background: "#ff6d3f", padding: "44px 14px" }}>
          <Col lg={7} offset={1}>
            <Avatar
              src="https://restaurants.just-eat.co.uk/img/red-lines-chef.c133949e.png"
              size={104}
            />
            <br />
            <h3 style={{ color: "#fff", fontSize: 20 }}>
              Tell us about your restaurant and business.
            </h3>
          </Col>

          <Col lg={7} offset={1}>
            <Avatar
              src="https://restaurants.just-eat.co.uk/img/red-lines-id.ab5837de.png"
              size={104}
            />
            <br />
            <h3 style={{ color: "#fff", fontSize: 20 }}>
              Upload your ID, proof of ownership and menu.
            </h3>
          </Col>

          <Col lg={7} offset={1}>
            <Avatar
              src="https://restaurants.just-eat.co.uk/img/red-lines-tablet.cab17f66.png"
              size={104}
            />
            <br />
            <h3 style={{ color: "#fff", fontSize: 20 }}>
              Receive your Orderpad and start taking orders.
            </h3>
          </Col>
        </Row>

        <Row>
          <Col lg={2}></Col>

          <Col lg={20} style={{ padding: "22px 3px" }}>
            <>
              <h3
                style={{
                  fontSize: 34,
                  color: "orange",
                  verticalAlign: "bottom",
                }}
              >
                Frequently asked questions
              </h3>
              <Accordion
                className="partnerque"
                style={{ borderTop: "1px solid #9e9e9e !important" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="fsize-22">
                    How long will it take for me to get online?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="fsize-22">
                  As long as you send us all the details and documents we ask
                  for (you can do all this online, quickly and safely) and
                  you’ve signed your contract, your restaurant can usually go
                  online with Delivery Guru within 5 working days.
                </AccordionDetails>
              </Accordion>
              <Accordion className="partnerque">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="fsize-22">
                    My restaurant is a van/unit. Can I still join Delivery Guru?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="fsize-22">
                  You don’t need to have your FSA rating before you join
                  Delivery Guru, but you do need to register your business with
                  the Food Standards Agency (FSA) or Food Standards Scotland
                  (FSS), as well as with your local council, so your restaurant
                  can be inspected and given a hygiene rating as soon as
                  possible. In England and Wales you will need to get a food
                  hygiene rating of 3 or more from the FSA for your restaurant
                  to appear on Delivery Guru. In Scotland you will need to get a
                  Pass rating from FSS.
                </AccordionDetails>
              </Accordion>
              <Accordion className="partnerque">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="fsize-22">
                    How much does it cost to join and how much commission will I
                    pay?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="fsize-22">
                  There’s a one-off joining fee of £295 (excluding VAT) and our
                  commission is 14% (excluding VAT) on every Delivery Guru order
                  you take. So if you get an order worth £20, for example, our
                  commission would be £3.36 (that’s £2.80 commission plus 56p
                  VAT). There is also a 50p (excluding VAT) admin charge for all
                  Delivery Guru orders which is paid by the customer (unless you
                  choose not to pass this charge on). You don’t need to pay the
                  joining fee upfront – it’ll be deducted automatically from
                  Delivery Guru customer orders paid for by debit or credit card
                  until it’s been paid off. Cash orders aren’t counted – that
                  money goes straight to you.
                </AccordionDetails>
              </Accordion>

              <Accordion className="partnerque">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="fsize-22">
                    I want to join Delivery Guru but I don’t have any drivers.
                    Can you help?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="fsize-22">
                  You don’t need to have your FSA rating before you join
                  Delivery Guru, but you do need to register your business with
                  the Food Standards Agency (FSA) or Food Standards Scotland
                  (FSS), as well as with your local council, so your restaurant
                  can be inspected and given a hygiene rating as soon as
                  possible. In England and Wales you will need to get a food
                  hygiene rating of 3 or more from the FSA for your restaurant
                  to appear on Delivery Guru. In Scotland you will need to get a
                  Pass rating from FSS.
                </AccordionDetails>
              </Accordion>
              <Accordion className="partnerque">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="fsize-22">
                    Do I need to have my FSA food hygiene rating in place to
                    join Delivery Guru?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="fsize-22">
                  You don’t need to have your FSA rating before you join
                  Delivery Guru, but you do need to register your business with
                  the Food Standards Agency (FSA) or Food Standards Scotland
                  (FSS), as well as with your local council, so your restaurant
                  can be inspected and given a hygiene rating as soon as
                  possible. In England and Wales you will need to get a food
                  hygiene rating of 3 or more from the FSA for your restaurant
                  to appear on Delivery Guru. In Scotland you will need to get a
                  Pass rating from FSS.
                </AccordionDetails>
              </Accordion>

              <Accordion className="partnerque">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="fsize-22">
                    Do I need to have my FSA food hygiene rating in place to
                    join Delivery Guru?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="fsize-22">
                  Maybe – it depends where in the UK you’re located. You’ll have
                  a chance to tell us where you are and if you need drivers or
                  not at the beginning of the restaurant sign-up process, we can
                  then check if you’re in one of the areas covered by our
                  restaurant delivery service.
                </AccordionDetails>
              </Accordion>
            </>
          </Col>
          <Col lg={2}></Col>
        </Row>

        <Row>
          <Col lg={3}></Col>
          <Col lg={18}>
            <h3
              style={{
                fontSize: 24,
                verticalAlign: "bottom",
                marginBottom: 32,
                marginTop: 42,
              }}
            >
              Let's boost your customers, cut your costs and make more of your
              business. Together.
            </h3>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{
                width: 230,
                height: 55,
                background: "orange",
                borderColor: "orange",
                fontSize: 22,
                fontWeight: "bold",
              }}
            >
              Join us today
            </Button>
            <br />

            <h3
              style={{
                fontSize: 24,
                verticalAlign: "bottom",
                marginBottom: 32,
                marginTop: 32,
              }}
            >
              Any questions? Call us on 0333 207 5555
            </h3>
          </Col>
          <Col lg={3}></Col>
        </Row>

        <Row style={{ background: "#f9fafb", padding: "34px 4px" }}>
          <Col lg={5}></Col>
          <Col lg={14}>
            <Row>
              <Col lg={6}>About us</Col>
              <Col lg={6}>Privacy policy</Col>
              <Col lg={6}>Terms & Conditios</Col>
              <Col lg={6}> Cookies & Policy</Col>
            </Row>
          </Col>
          <Col lg={5}></Col>
        </Row>
        <Row style={{ background: "#f9fafb" }}>
          <Col lg={3}></Col>
          <Col lg={18}>
            <h3> Check my Cookies Prefrence</h3>
          </Col>
          <Col lg={3}></Col>
        </Row>
        {/* <Footer /> */}
      </div>
    );
  }
}
