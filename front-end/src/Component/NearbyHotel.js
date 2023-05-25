import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Image,
  Typography,
  Button,
  Modal,
  Avatar,
  Rate,
} from "antd";

import { useHistory } from "react-router-dom";
import img3 from "../image/4913730.png";
import imgclock from "../image/clock.png";
import deliverycharges from "../image/deliverycharges.png";
import img5 from "../image/ONTWNE1.png";
import imgminorder from "../image/minorder.png";
import location from "../image/location.png";
const { Title } = Typography;
export default function NearbyHotel(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  let history = useHistory();
  const showModal = () => {
    //  setIsModalVisible(true);
    // let data=props.url.replace(/[^a-zA-Z ]/g, "");
    window.open(props.url);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Row style={{}}>
        {/* <Col span={8}>
            <img
            style={{width:'100%'}}
              src={
                "https://deliveryguru.co.uk/images/hotelogo/" +
                props.id +
                ".png"
              }
              atl="recomended images"
            />
          </Col> */}

        <Col span={24} style={{ height: "100%", position: "relative" }}>
          <Card
            style={{
              padding: 0,
              textAlign: "left",
              background: "transparent !important",
              borderRadius: "10px 10px 0 0",
              position: "relative",
            }}
          >
            <img
              style={{ width: "100%", height: 130, borderRadius: "10px" }}
              src={img3}
              atl="recomended images"
            />

            <div style={{ width: "100%" }}>
              <span
                style={{
                  position: "absolute",
                  top: "34%",
                  borderRadius: 10,
                  left: 15,
                  border: "2px double #e3e3e3",
                  background: "#fff",
                }}
              >
                <img
                  style={{
                    width: 50,
                    height: 50,
                    objectFit: "contain",
                    margin: 11,
                    background: "#fff",
                  }}
                  src={
                    "https://deliveryguru.co.uk/images/hotelogo/" +
                    props.id +
                    ".png"
                  }
                />
              </span>
              <div>
                <span
                  level={4}
                  style={{
                    position: "absolute",
                    top: "45%",
                    left: "32%",
                    width: "100%",
                    fontWeight: "bold",
                    fontSize: 20,
                    padding: 0,
                    margin: 1,
                  }}
                >
                  {" "}
                  {props.hotelname}
                </span>

                <h3
                  level={5}
                  style={{
                    textAlign: "center",
                    fontSize: 13,
                    padding: 0,
                    margin: 1,
                    paddingTop: 45,
                  }}
                >
                  {props.type}
                </h3>
              </div>
            </div>
            <div style={{ padding: "14px 7px 5px 7px" }}>
              <p level={5} style={{ marginBottom: 1, fontSize: 13 }}>
                <span style={{ marginRight: "1%" }}>
                  <b> Delivery Fee -</b> &#163;{" "}
                  {parseFloat(props.charges).toFixed(2)}
                </span>
                {/* |{" "} */}
                <span style={{ float: "right" }}>
                  <b> &nbsp; Minimum Order -</b> &#163; {props.minorder}
                </span>
              </p>
              <p
                level={5}
                style={{ marginBottom: 1, fontSize: 13, marginTop: 9 }}
              >
                <span style={{ marginRight: "16%" }}>
                  <b>
                    {" "}
                    <img src={imgclock} style={{ height: 15, margin: 1 }} /> 40
                    - 50 mins
                  </b>{" "}
                </span>{" "}
                |{" "}
                <span style={{ textAlign: "center" }}>
                  <b style={{ textAlign: "center", paddingLeft: "3%" }}>
                    {" "}
                    <img src={location} style={{ height: 20, margin: 2 }} /> 1.8
                    miles{" "}
                  </b>{" "}
                </span>
              </p>
              <p
                level={5}
                style={{ marginBottom: 1, fontSize: 13, marginTop: 9 }}
              >
                <span style={{ float: "right" }}>
                  <Rate
                    defaultValue={4.5}
                    style={{ height: 13, color: "orangered", fontSize: 18 }}
                  />{" "}
                  <b> 11 Reviews</b>{" "}
                </span>
              </p>
            </div>
          </Card>
          <p
            style={{
              background: "pink",
              textAlign: "center",
              padding: "4px 0",
              marginBottom: -1,
              borderRadius: " 0 0 10px 10px",
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            Enjoy 20% off Entire Menu
          </p>
        </Col>
      </Row>

      <Modal
        title="{props.hotelname}"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <Button type="primary">Visit</Button>
      </Modal>
    </>
  );
}
