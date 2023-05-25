import React, { Component } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Skeleton,
  Modal,
  Button,
  Input,
  Rate,
  Avatar,
} from "antd";
import Headerlog from "./Component/headerpart";
import axios from "axios";
import Header from "./Component/Aboutheader";
import { UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { addToCart, addToHotel } from "./store/actions/cartActions";
import Trackorder from "./Component/Trackorder";
import Map from "./Component/Map";
const cardStyle = {
  width: "100%",
  textAlign: "left",
};
class Producttrackorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataresults: [],
      address: "",
      reviewvisible: false,
      username: "",
      rating: "",
      comments: "",
      err: "",
    };
  }

  componentDidMount() {
    const requestOptions = {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch(
      "https://deliveryguru.co.uk/dg_api/orderItems/" + this.props.utm,
      requestOptions
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("Results of Track order:" + JSON.stringify(result));

          this.setState({
            dataresults: result,
            address: result.map(
              (value) => (
                window.sessionStorage.setItem("hotelname", value.hotel_name),
                value.hotel_name
              )
            ),
          });
        },
        (error) => {
          this.setState({ error });
        }
      );
  }

  reviewshowModal = () => {
    this.setState({
      reviewvisible: true,
    });
  };
  handleCancel = () => {
    this.setState({ reviewvisible: false });
  };

  handleReview = (orderno, id) => {
    if (this.state.username === "") {
      this.setState({ err: "please enter your name" });
      return false;
    }
    let data = {
      hotel_id: id,
      orderno: orderno,
      uid: 55,
      f_rate: this.state.rating,
      p_rate: "0",
      pr_rate: "0",
      c_rate: "0",
      review: this.state.comments,
      status: "0",
    };
    axios
      .post(`https://deliveryguru.co.uk/dg_api/addreview`, data)
      .then((res) => {
        console.log(res);
        this.setState({ reviewvisible: false });
        this.setState({ rating: "" });
        this.setState({ comments: "" });
        this.setState({ username: "" });
      });
  };
  render() {
    const { Title, Text } = Typography;
    const { TextArea } = Input;
    const datareplace = this.state.address;
    let mapaddr =
      "https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=2/4%20Glebe%20Street,%20Renfrew,%20PA48TU+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed";
    const newAddr = mapaddr;
    console.log("state", this.props.utm);
    return (
      <div style={{ position: "relative" }}>
        {localStorage.getItem("id") != undefined ||
        localStorage.getItem("id") != "" ? (
          <Headerlog className="headerdata" />
        ) : (
          <Header />
        )}
        {this.state.dataresults.length > 0 ? (
          <Row style={cardStyle}>
            <Col xs={24} sm={24} md={24} lg={8} xl={12}>
              <Map />
            </Col>
            <Col xs={24} sm={24} md={24} lg={16} xl={12}>
              {this.state.dataresults.map((data, index) => (
                <>
                  <Card
                    title={data.hotel_name}
                    bordered={true}
                    style={{ margin: 9 }}
                  >
                    {/* {console.log(
                      "trackorder" + JSON.stringify(this.props.hotel)
                    )} */}
                    <Trackorder
                      orderno={data.order_no}
                      hotelstatus={data.orderStatus}
                    />
                    {console.log("stepdta-->", data)}
                    <br />
                    <p>
                      <span>
                        <b>Order : </b>
                      </span>
                      <span>#{data.order_no}</span>
                    </p>

                    <Text type="secondary">
                      {data.orderTime.substring(0, 11)}|
                      {data.order_details.length} Items | &#163; {data.amount} |
                      Order Type:{" "}
                      {data.delivery_type === "1" ? "Collection" : "Delivery"}
                    </Text>
                    {data.delivery_type !== "1" ? (
                      <p>
                        <span>
                          {data.orderStatus === 12 ? (
                            <b>Pre Order Delivery Date & Time : </b>
                          ) : (
                            <b>Order Delivery Date & Time : </b>
                          )}
                        </span>
                        <span>
                          {console.log("preordertime-->", data)}
                          {data.day} | {data.time}
                        </span>
                      </p>
                    ) : null}
                    <div>
                      <span
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => this.reviewshowModal()}
                      >
                        Click here to review order
                      </span>
                      <Modal
                        bodyStyle={{ height: "60%" }}
                        visible={this.state.reviewvisible}
                        title="Order Feedback"
                        onOk={this.handleReview}
                        onCancel={this.handleCancel}
                        footer={[
                          <Button danger onClick={this.handleCancel}>
                            Cancel
                          </Button>,
                          <Button
                            type="primary"
                            danger
                            onClick={() =>
                              this.handleReview(data.order_no, data.hotel_id)
                            }
                          >
                            Submit
                          </Button>,
                        ]}
                      >
                        <p style={{ margin: 15, color: "gray" }}>
                          {"Order No"}
                          {" : "}
                          {data.order_no}
                        </p>
                        <div style={{ padding: 30 }}>
                          <label>
                            {" "}
                            Name <br />
                            <div style={{ color: "red" }}>
                              {" "}
                              {this.state.err}
                            </div>
                            <Input
                              name="username"
                              value={this.state.username}
                              onChange={(e) =>
                                this.setState({ username: e.target.value })
                              }
                              placeholder="Enter Name"
                            />
                          </label>
                          <br />
                          <label>
                            {" "}
                            Comments
                            <br />
                            <TextArea
                              name="comments"
                              value={this.state.comments}
                              onChange={(e) =>
                                this.setState({ comments: e.target.value })
                              }
                              rows={2}
                            />
                          </label>
                          <div style={{ marginTop: 10 }}>
                            <label>
                              {" "}
                              Rating <br />
                              <Rate
                                onChange={(e) => this.setState({ rating: e })}
                                name="rating"
                                value={this.state.rating}
                              />
                            </label>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  </Card>

                  <Card bordered={true} style={{ margin: 9 }}>
                    <Title level={4}> Order Details</Title>
                    {console.log("data", this.state.dataresults)}
                    <p style={{ fontSize: 22, fontWeight: "bold" }}></p>
                    <Row>
                      {this.state.dataresults.length > 0 &&
                        this.state.dataresults.map((data) => {
                          return (
                            <Col span={12}>
                              <p>
                                <b>FROM</b>
                              </p>
                              <p>
                                {" "}
                                <Avatar
                                  size="small"
                                  icon={<UserOutlined />}
                                />{" "}
                                &nbsp;
                                <b>{data.hotel_name}</b>
                              </p>
                              <p>{data.hotel_address}</p>
                              <br />
                              <br />
                              <p>
                                <b>COLLECT BY</b>
                              </p>
                              <p>
                                <Avatar size="small" icon={<UserOutlined />} />{" "}
                                &nbsp;
                                <b>{data.username}</b> <br />{" "}
                                {data.permanent_address}
                              </p>
                              <br />
                              <p>{data.contact}</p>
                              <br />
                              <p>{data.email}</p>​
                            </Col>
                          );
                        })}
                      <Col span={12}>
                        <p>
                          <Avatar size="small" icon={<UserOutlined />} /> &nbsp;
                          <b>{data.order_details.length} ITEMS</b>
                        </p>
                        {this.state.dataresults.length > 0 &&
                          this.state.dataresults.map((data) => {
                            console.log("dattatat==>", data);
                            return (
                              data.order_details.length > 0 &&
                              data.order_details.map((item) => {
                                console.log("item-->", item);
                                return (
                                  <div>
                                    <p style={{ padding: "4px 10px" }}>
                                      <span>
                                        {item.item_name} x {item.qty}
                                      </span>
                                      <span style={{ float: "right" }}>
                                        &#163; {item.price}
                                      </span>
                                      {item.extra.map((itm) => {
                                        return (
                                          <div>
                                          <ul>
                                            <li>
                                              {itm.addon_name} x {itm.qty}
                                            </li>
                                          </ul>
                                           </div>
                                        );
                                      })}
                                    </p>
                                    <span style={{ padding: "4px 10px" }}>NOTES :{item.notes}</span>
                                  </div>
                                );
                              })
                            );
                          })}
                        <br />
                        <hr />
                        <p>
                          <b>Discount</b>
                          <b style={{ float: "right" }}>
                            &#163; {data.discount != 0 ? parseFloat(data.discount).toFixed(2) : "0.00"}
                          </b>
                          <p>
                            <b>Total</b>
                            <b style={{ float: "right" }}>
                              &#163; {data.amount}
                            </b>
                          </p>
                          <p style={{ color: "orange" }}>NOT PAID</p>
                        </p>
                      </Col>
                    </Row>
                  </Card>
                </>
              ))}
            </Col>
          </Row>
        ) : (
          <Skeleton avatar paragraph={{ rows: 8 }} style={{ margin: 20 }} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.product.products,
    cart: state.cart,
    hotel: state.hotel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => {
      dispatch(addToCart(product));
    },
    addToHotel: (product) => {
      dispatch(addToHotel(product));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Producttrackorder);
