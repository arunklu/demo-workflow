import React, { Component } from "react";
import Account from "./Component/Account";
import Headerlog from "./Component/headerpart";
import Header from "./Component/Aboutheader";
import { connect } from "react-redux";
import img1 from "../src/image/Icon material-payment.png";
import Paper from "@material-ui/core/Paper";
import {
  addToCart,
  addToHotel,
  addName,
  resetcart,
  resetpreorderdate,
  resetpreordertime,
} from "./store/actions/cartActions";
import Deliverystoreproduct from "./Component/Deliverystoreproduct";
import Login from "./Component/Login";
import Facebook from "./Component/Facebook";
import Google from "./Component/Google";
import {
  Row,
  Col,
  Skeleton,
  Input,
  Card,
  Alert,
  Button,
  Space,
  Modal,
  Typography,
  notification,
  Result,
} from "antd";
import { SmileOutlined } from "@ant-design/icons";
import CartProduct from "./Component/CartProduct";
import { Redirect } from "react-router-dom";
import moment from "moment";
import {} from "module";
import { isMobile } from "react-device-detect";
import Paymenttype from "./Paymenttype";
const { Title, Text } = Typography;

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      datacome: false,
      loading: false,
      coupan: null,
      hotelid: null,
      updateaddrress: "",
      totalamount: null,
      discount: 0,
      coupanvalid: false,
      coupansuccess:false,
      status: "",
      preorder: false,
      canclecoupon: false,
      orderplaceloader: false,
      LoginIsModalVisible: false,
      coupanstatus: false,
      coupanstatus: "",
      personaldata: {
        name: "",
        email: "",
        mobile: "",
      },
    };
  }

  componentDidMount() {
    //alert(JSON.stringify(this.props.cart));
    //alert("data"+localStorage.getItem("name"));
    this.setState({
      loading: true,
      discount: window.sessionStorage.getItem("hproductdid"),
    });
    this.props.hotel.hotel.map((value) => this.setState({ hotelid: value.id }));
    if (this.props.preorder === undefined || "") {
      this.setState({ status: "2" });
    } else {
      this.setState({ status: "12" });
      this.setState({ preorder: !this.state.preorder });
    }
  }
  handleCounpne(coupanid) {
    const hoteldetailscard_id = window.sessionStorage.getItem("hproductid");
    const couponval = this.state.coupan;
    if (
      this.state.coupan != null ||
      (coupanid != null && coupanid === hoteldetailscard_id)
    ) {
      this.setState({
        discount: window.sessionStorage.getItem("hproductdid"),
        coupanvalid: true,
      });
    } else {
      this.setState({
        coupanvalid: true,
      });
    }

    const requestOptions = {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch(
      "https://deliveryguru.co.uk/dg_api/verifyCoupon/" +
        this.state.hotelid +
        "/" +
        coupanid +
        "/" +
        localStorage.getItem("id"),
      requestOptions
    )
      .then((res) => res.json())
      .then(
        (result) => {
          // alert("Results of send order:" + JSON.stringify(result));
          if (result.response == "fail") {
            this.setState({ coupanstatus: "Your Coupon is Invalid" });
          } else {
            this.setState({
              discount: result.data.discount,
              coupanstatus: true,
              coupanstatus:
                "Your Coupon is Valid, discount is " +
                result.data.discount +
                " %",
            });
            this.setState({coupansuccess:true})
          }
        },
        (error) => {
          this.setState({ error });
        }
      );
  }
  addressselect(addr) {
    this.setState({ updateaddrress: addr.home_address });
  }

  checkOrdertype = (type) => {
    this.setState({ ordertype: type });
  };

  handleClickorder = (charge, subtotal) => {
    this.setState({ orderplaceloader: true });
    let total = charge - (subtotal * this.state.discount) / 100;
    let discountedprice = (subtotal * this.state.discount) / 100;

    console.log("total-->", total, discountedprice);

    if (this.props.updatekey === true) {
      if (this.state.updateaddrress === "") {
        this.setState({ orderplaceloader: false });
        Modal.info({
          title: "Please select Address",
          className: "warning",
          content: (
            <div>
              <p>PLease select your address before Place order ! Thank you</p>
            </div>
          ),
          onOk() {},
        });
        return false;
      }
      if (
        this.state.personaldata.name === "" ||
        this.state.personaldata.email === "" ||
        this.state.personaldata.mobile === ""
      ) {
        this.setState({ orderplaceloader: false });
        Modal.info({
          title: "Please Enter Personal Details",
          className: "warning",
          content: (
            <div>
              <p>
                PLease Enter your Personal details before Place order ! Thank
                you
              </p>
            </div>
          ),
          onOk() {},
        });
        return false;
      }
      this.placeOrderapi(total, discountedprice);
    } else if (this.props.updatekey === false) {
      if (
        this.state.personaldata.name === "" ||
        this.state.personaldata.email === "" ||
        this.state.personaldata.mobile === ""
      ) {
        this.setState({ orderplaceloader: false });
        Modal.info({
          title: "Please Enter Personal Details",
          className: "warning",
          content: (
            <div>
              <p>
                PLease Enter your Personal details before Place order ! Thank
                you
              </p>
            </div>
          ),
          onOk() {},
        });
        return false;
      }
      this.placeOrderapi(total, discountedprice);
    }
  };

  placeOrderapi = (total, discountedprice) => {
    console.log("amount==>", total);
    let ukTime = new Date().toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/London",
    });
    let passingData = {
      hotel_name: "",
      hotel_add: "",
      hotel_phone: "",
      hotel_city: "",
      hotel_pin: "",
      user_id: parseInt(localStorage.getItem("id")),
      name: localStorage.getItem("name"),
      user_add: "0",
      user_email: localStorage.getItem("email"),
      number: localStorage.getItem("number"),
      email: localStorage.getItem("email"),
      card: {
        card_no: "",
        card_type: "null",
        cvv: "",
        exp_month: "01",
        exp_year: "22",
        modified_date: "null",
        name_on_card: "test",
        user_id: 55,
      },
      order: {
        delivery_charges: 0,
        amount: 0.0,
        day: this.state.preorder
          ? moment(new Date()).format("DD/MM/YYYY")
          : this.props.preorderdate,
        delivery_type: this.props.updatekey ? "0" : "1",
        discount:
          discountedprice > 0 ? parseFloat(discountedprice).toFixed(2) : "0.00",
        driver_id: "0",
        hotel_id: "47",
        order_no: "GR2022061314511455",
        c_id: "0",
        payment_type: "COD",
        status: "12",
        time: this.state.preorder ? ukTime : this.props.preordertime,
        name: "test",
        number: "09500839345",
        email: "premkumarsselvam@gmail.com",
        user_address_id: "0",
        user_id: 55,
      },
      orderItem: [],
      extra: [],
      transcation: {},
    };
    {
      let newprice = 0;
      this.props.cart.map(
        (datapart) => (
          // console.log(JSON.stringify(datapart)),
          datapart.addon !== null &&
            datapart.addon.map((dataprice) => (newprice += dataprice.price)),
          // (passingData.order.c_id = datapart.id),
          (passingData.order.amount = parseFloat(total).toFixed(2)),
          (passingData.order.name = this.state.personaldata.name),
          (passingData.order.order_no =
            "DG" + Date.parse(new Date()) + datapart.id) +
            localStorage.getItem("id"),
          (passingData.order.user_id = parseInt(localStorage.getItem("id"))),
          (passingData.order.email = this.state.personaldata.email),
          (passingData.order.number = this.state.personaldata.mobile),
          (passingData.order.payment_type = datapart.payment_type)
        )
      );
      this.props.hotel.hotel.map(
        (value) => (
          (passingData.hotel_name = value.hotel_name),
          (passingData.hotel_add = value.address),
          (passingData.hotel_phone = value.hotel_mob),
          (passingData.hotel_city = value.city),
          (passingData.hotel_pin = value.pin),
          (passingData.order.hotel_id = JSON.stringify(value.id)),
          (passingData.user_add = this.props.updatekey
            ? this.state.updateaddrress
            : "0")
        )
      );
    }

    this.props.cart.map((value) => {
      let parseData = {
        amount: value.amount,
        item_id: value.id,
        qty: value.productcount,
        discount: "0",
        extraFor: 0,
        notes: value.Instruct,
        status: "0",
      };
      passingData.orderItem.push(parseData);

      value.addon.map((el) => {
        let addonData = {
          add_on_id: el.id,
          item_id: value.id,
          for: 0,
          amount: el.price,
          qty: el.quantity,
        };
        passingData.extra.push(addonData);
      });
    });
    console.log("totao111-->", passingData.order.amount);
    console.log("data of cart" + JSON.stringify(passingData));
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passingData),
    };
    fetch("https://deliveryguru.co.uk/dg_api/placeOrder", requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("Results of send order:" + JSON.stringify(result));
          // this.setState({orderplaceloader:false})
          this.setState({
            data: result.product,
            datacome: true,
          });
          this.props.resetcart();
          this.props.resetpreorderdate();
          this.props.resetpreordertime();
        },
        (error) => {
          this.setState({ error });
          this.setState({ orderplaceloader: false });
        }
      );
  };

  CancleCounpne = () => {
    this.setState({ canclecoupon: !this.state.canclecoupon });
  };

  showModal = () => {
    this.setState({
      LoginIsModalVisible: true,
    });
  };

  handleOk = () => {
    this.setState({
      LoginIsModalVisible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      LoginIsModalVisible: false,
    });
  };

  personalOnchange = (event) => {
    this.setState({
      personaldata: {
        ...this.state.personaldata,
        [event.target.name]: event.target.value,
      },
    });
  };

  render() {
    let addontotal = 0;
    let servicecharge = 0;
    let Subtotal = 0;
    let delivercharges = 0;
    let tips = 0;
    if (this.state.datacome === true) {
      return (
        <Redirect
          to={{ pathname: "/placeorder", state: { id: this.state.hotelid } }}
        />
      );
    }

    console.log(
      "moments",
      this.state.status,
      this.state.preorder,
      this.state.updateaddrress,
      this.props.updatekey,
      this.state.personaldata
    );
    return (
      <div>
        {localStorage.getItem("id") === undefined ||
        localStorage.getItem("id") === "" ||
        localStorage.getItem("id") === null ? (
          <Headerlog className="headerdata" />
        ) : (
          <Header />
        )}
        {this.state.loading != false ? (
          <Row>
            <Col lg={17} xs={24} sm={24} md={24} xl={17}>
              <h2>Personal Details</h2>
              <Card bordered={true} style={{ margin: "3px 30px" }}>
                <Row lg={24}>
                  <Col span={7} style={{ margin: "4px 16px" }}>
                    <Input
                      placeholder="Your Name"
                      value={this.state.personaldata.name}
                      type="text"
                      name="name"
                      onChange={(e) => this.personalOnchange(e)}
                    />
                  </Col>
                  <Col span={7} style={{ margin: "4px 16px" }}>
                    <Input
                      placeholder="Your Email"
                      value={this.state.personaldata.email}
                      type="email"
                      name="email"
                      onChange={(e) => this.personalOnchange(e)}
                    />
                  </Col>
                  <Col span={7} style={{ margin: "4px 16px" }}>
                    <Input
                      placeholder="Your Mobile"
                      value={this.state.personaldata.mobile}
                      inputMode="numeric"
                      maxLength={11}
                      name="mobile"
                      onChange={(e) => this.personalOnchange(e)}
                    />
                  </Col>
                </Row>
              </Card>
              {this.props.updatekey ? (
                <Account addressselect={(item) => this.addressselect(item)} />
              ) : null}
              <Paper
                style={{
                  padding: "15px 40px",
                  margin: "32px",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <img
                  src={img1}
                  style={{
                    position: "absolute",
                    left: "-12px",
                    top: "30%",
                    width: "30px",
                  }}
                />
                <h2>Payments</h2>
              </Paper>
              <Card style={{ margin: "0 3%" }}>
                <Paymenttype />
              </Card>
            </Col>
            <Col lg={7} xs={24} sm={24} md={24} xl={7}>
              <img
                style={{ marginBottom: 10 }}
                src={
                  "https://deliveryguru.co.uk/images/hotelogo/" +
                  this.state.hotelid +
                  ".png"
                }
              />
              {isMobile ? (
                <div className="cartbottom">
                  <Deliverystoreproduct
                    coupnavalid={this.state.coupanvalid}
                    deliverydiscount={this.state.discount}
                    handlecoupne={() => this.handleCounpne()}
                    datacart={this.props.cart}
                    ordernowdata={this.handleClickorder}
                    checkorder={(item) => this.checkOrdertype(item)}
                  />
                </div>
              ) : (
                <Card
                  // extra={<a href="#">More</a>}
                  style={{ margin: "0 12px", textAlign: "left" }}
                >
                  <Deliverystoreproduct
                    hoteldata={this.state.datacome}
                    ordernowdata={this.handleClickorder}
                    checkorder={(item) => this.checkOrdertype(item)}
                  />
                  {/* <CartProduct cartvalue={this.props.cart} /> */}
                  {this.state.coupansuccess===false ? (
                    <span style={{ color: "red" }}>
                      {this.state.coupanstatus}
                    </span>
                  ) : (
                    <span style={{ color: "green" }}>{this.state.coupanstatus}</span>
                  )}
                  {/* <span style={{color:"red"}}>{this.state.coupanstatus}</span> */}
                  <Alert
                    // message="Apply Coupon"
                    type="info"
                    action={
                      <div style={{ flexDirection: "Row" }}>
                        <Space>
                          <Input
                            placeholder="Enter Coupon"
                            allowClear
                            onChange={(event) =>
                              this.setState({ coupan: event.target.value })
                            }
                          />

                          {this.state.canclecoupon ? (
                            <Button
                              size="small"
                              danger
                              type="dashed"
                              onClick={() => this.CancleCounpne()}
                            >
                              Cancel
                            </Button>
                          ) : (
                            <Button
                              size="small"
                              danger
                              type="dashed"
                              onClick={() =>
                                this.handleCounpne(this.state.coupan)
                              }
                            >
                              Apply Coupon
                            </Button>
                          )}
                        </Space>
                        <br />
                      </div>
                    }
                  />
                  <br />
                  <hr />
                  {this.props.cart.length > 0 &&
                    this.props.cart.map(
                      (subtotaldata) => (
                        (Subtotal +=
                          ((addontotal = 0),
                          parseFloat(subtotaldata.amount) +
                            parseFloat(
                              subtotaldata.addon != null &&
                                subtotaldata.addon.reduce((count, value) => {
                                  return count + parseFloat(value.price);
                                }, 0.0)
                            )) * subtotaldata.productcount),
                        (<></>)
                      )
                    )}
                  {this.props.cart.length > 0 ? (
                    <>
                      <p>
                        <span>Subtotal </span>
                        <span style={{ float: "right" }}>
                          &#163; {Subtotal.toFixed(2)}
                        </span>
                      </p>
                      <p>
                        <span>Service Charges</span>
                        <span style={{ float: "right" }}> &#163; 0.50</span>
                      </p>
                      <p>
                        {" "}
                        <span>Carry Bag Fee</span>
                        <span style={{ float: "right" }}> &#163; 0.05</span>
                      </p>
                      {this.props.hotel.hotel.map(
                        (value) => (
                          this.props.updatekey === true && this.props.tips
                            ? (tips = this.props.tips)
                            : null,
                          this.props.updatekey === true && this.props.charge
                            ? (delivercharges = parseFloat(this.props.charge))
                            : 0.0,
                          (servicecharge =
                            Subtotal +
                            parseFloat(0.5) +
                            parseFloat(0.05) +
                            delivercharges +
                            tips),
                          (
                            <>
                              <p>
                                <span>Delivery Charges</span>
                                <span style={{ float: "right" }}>
                                  &#163;{" "}
                                  {/* {this.props.updatekey.updatekey === true
                                    ? this.props.charge 
                                    : 0.00} */}
                                  {parseFloat(delivercharges).toFixed(2)}
                                  {/* {value.delivery_charges} */}
                                </span>
                              </p>
                            </>
                          )
                        )
                      )}
                      <p>
                        {" "}
                        <span>Discount ({this.state.discount}%)</span>
                        <span style={{ float: "right" }}>
                          {" "}
                          &#163;{" "}
                          {parseFloat(
                            (Subtotal * this.state.discount) / 100
                          ).toFixed(2)}
                        </span>
                      </p>
                      {/* ///// */}
                      {this.props.updatekey === true ? (
                        <p>
                          {" "}
                          <span>Tips: </span>
                          <span style={{ float: "right" }}>
                            {" "}
                            &#163;{tips}
                            {".00"}
                          </span>
                        </p>
                      ) : null}
                      <h4>
                        <span>Total</span>
                        <span style={{ float: "right" }}>
                          &#163;{" "}
                          {(
                            servicecharge -
                            (Subtotal * this.state.discount) / 100
                          ).toFixed(2)}
                        </span>
                      </h4>
                    </>
                  ) : (
                    <p>No Any Select Any items</p>
                  )}{" "}
                  {this.props.cart.length > 0 ? (
                    <Button
                      type="primary"
                      block
                      danger
                      loading={this.state.orderplaceloader}
                      onClick={() =>
                        this.handleClickorder(servicecharge, Subtotal)
                      }
                    >
                      Place Order Now{" "}
                    </Button>
                  ) : (
                    <Button type="primary" block danger>
                      Place Order Now{" "}
                    </Button>
                  )}
                </Card>
              )}
            </Col>
          </Row>
        ) : (
          <Skeleton avatar paragraph={{ rows: 8 }} style={{ margin: 20 }} />
        )}
        <Modal
          title="Login"
          visible={this.state.LoginIsModalVisible}
          style={{ height: "100%" }}
          footer={null}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Login onCancel={this.handleCancel} />
          <hr />
          <p style={{ textAlign: "center", fontWeight: "bold" }}>
            Login With SocialMedia
          </p>
          <p style={{ textAlign: "left" }}>
            <span>
              <Google />
            </span>
            <br />
            <span style={{ textAlign: "center" }}>
              <Facebook />
            </span>
          </p>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    updatekey: state.product.updatekey,
    products: state.product.products,
    cart: state.cart.cart,
    hotel: state.hotel,
    name: state.name,
    charge: state.product.charge,
    preordertime: state.product.preordertime,
    preorderdate: state.product.preorderdate,
    tips: state.product.tips,
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
    addName: (product) => {
      dispatch(addName(product));
    },
    resetcart: (item) => {
      dispatch(resetcart(item));
    },
    resetpreorderdate: (item) => {
      dispatch(resetpreorderdate(item));
    },
    resetpreordertime: (item) => {
      dispatch(resetpreordertime(item));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
