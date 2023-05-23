import React, { Component } from "react";
import Trackorder from "./Component/Trackorder";
import {
  Tabs,
  Row,
  Col,
  Card,
  Badge,
  Image,
  Alert,
  Skeleton,
  Button,
Avatar,
} from "antd";
import { RedoOutlined,NodeIndexOutlined,UserOutlined } from "@ant-design/icons";
import Profile from "./Component/Profiledetail";
import Address from "./Component/Address";
import Headerlog from "./Component/headerpart";
import Header from "./Component/Aboutheader";
import { isMobile } from "react-device-detect";
import { TimerSharp } from "@material-ui/icons";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {
  addToCart,
  updateCartQuantity,
  driverId
} from "../src/store/actions/cartActions";
import { Redirect } from "react-router-dom";

import axios from "axios";
const { TabPane } = Tabs;

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      usersdata: null,
      filterusersdata: null,
      datapart: null,
      reorderdata: null,
    };
  }
  async  orderIdHandle(id) {
    const response =  axios.get(`https://deliveryguru.co.uk/dg_api/orderItems/${id}`)
    .then((res) => {
      console.log("res==000", res.data);
      let  temp= res.data[0].driver_id
      this.props.driverid(temp)
    })
    this.props.history.push("/Trackorder/" + id)

  }

  // orderIdHandle = async (id) => {
  //   const response =  axios.get(`https://deliveryguru.co.uk/dg_api/orderItems/${id}`)
  //   console.log("res==000", response)
  //   this.props.history.push("/Trackorder/" + id)
  // };
  componentDidMount() {
    let id = localStorage.getItem("id")
    const apiUrl = `https://deliveryguru.co.uk/dg_api/showOrders/${id}/7,1,5,2,3,6,12,13` 
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
          console.log("userdata",JSON.stringify(result));

          this.setState({
            usersdata: result,
          });
        },
        (error) => {
          this.setState({ error });
        }
      );

    const apiUrl1 = "https://deliveryguru.co.uk/dg_api/deals";
    fetch(apiUrl1, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log("filteruser",JSON.stringify(result));

          this.setState({
            filterusersdata: result,
          });
        },
        (error) => {
          this.setState({ error });
        }
      );
      
  }

  guidGenerator = () => {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4();
  };
 
  reorderHandler = (data, e) => {
    e.stopPropagation();
    console.log("data", data.order_no);
    axios
      .get(`https://deliveryguru.co.uk/dg_api/orderItems/${data.order_no}`)
      .then((res) => {
        console.log("res==>", res.data);
        // let temp = res.data;
        // if (temp && temp.length > 0) {
        //   temp.forEach((el, i) => {
        //     el.order_details.forEach((item, index) => {
        //       this.props.addToCart({
        //         cartindex: this.guidGenerator(),
        //         name: item.item_name,
        //         id: item.hotel_id,
        //         hotelid: item.hotel_id,
        //         price: JSON.parse(item.amount),
        //         amount: JSON.parse(item.amount),
        //         image: "",
        //         addon: item.extra,
        //         productcount: item.qty
        //       });
        //     });
        //   });
        // }
      });
      // this.props.history.push("/checkout")

    // <Redirect to={{ pathname: "/checkout" }} />;
    // props.addToCart({
    //   cartindex: guidGenerator(),
    //   name: props.hotelname,
    //   id: props.id,
    //   hotelid: props.hotelid,
    //   price: props.price,
    //   amount: props.price,
    //   image: props.image,
    //   addon: cartItems,
    //   payment_type: "COD",
    //   Instruct: instruction,
    //   productcount: counter,
    // });
  };
  render() {
    const left = "left";
    const top = "top";
    console.log("json data"+localStorage.getItem("id"));

    console.log("this.props.location.state.id",this.props.location.state.id)
   
    return (
      <div>
        {localStorage.getItem("id") == undefined ||
        localStorage.getItem("id") == "" ||
        localStorage.getItem("id") === null ? (
          <Headerlog className="headerdata" />
        ) : (
          <Header />
        )}
        {localStorage.getItem("id") !== null ? (
          
          this.state.usersdata !== null ? (
            <>
              <Tabs
                tabPosition={isMobile ? top : left}
                className="ordertabdata"
                style={{ borderLeft: "2px solid #000" }}
              >

            {/* <Avatar shape="square" size={64} icon={<UserOutlined />} /> */}
                <TabPane tab="OrderHistory" key="1">
                  <Row>
                    {this.state.usersdata != null &&
                      this.state.usersdata.map((data) => (
                        <Col
                          lg={11}
                          xs={24}
                          sm={24}
                          md={24}
                          xl={11}
                          style={{ padding: 10 }}
                        >
                          <Badge.Ribbon
                            text={
                              data.mainStatus == 2 || data.mainStatus == 12
                                ? "Order placed"
                                : data.mainStatus == 3
                                ? "Order completed"
                                : data.mainStatus == 7 || data.mainStatus == 13
                                ? "Order In Kitchen"
                                : data.mainStatus == 5
                                ? "Order In Basket"
                                : "Order rejected"
                            }
                            color={
                              data.mainStatus == 2 || data.mainStatus == 12
                                ? "orange"
                                : data.mainStatus == 3
                                ? "green"
                                : data.mainStatus == 7 || data.mainStatus == 13
                                ? "blue"
                                : data.mainStatus == 5
                                ? "light green"
                                : "red"
                            }
                          >
                            <Card
                              hoverable
                              title={data.hotel_name}
                              className="orderhidtorytitle"
                              bordered={false}
                              style={{
                                margin: "4px 1px",
                                textAlign: "left",
                                borderRadius: 6,
                                fontWeight: "bold",
                                border: "1px solid #ed742a",
                                margin: 3,
                              }}
                            >
                              <p>
                                <span>
                                  <b>#{data.order_no} </b>
                                </span>
                                <span style={{ float: "right" }}>
                                  <b> &#163; {data.amount} </b>
                                </span>
                              </p>
                              <p>
                                <span>
                                  {" "}
                                  {data.payment_type === "COD" ? (
                                    <Image src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-cash-payment-money-currency-those-icons-lineal-those-icons.png" />
                                  ) : (
                                    <Image src="https://img.icons8.com/ios/24/000000/card-in-use.png" />
                                  )}{" "}
                                  {data.payment_type}
                                </span>
                                &nbsp;
                                <span style={{ paddingLeft: "9%" }}>
                                  <Image src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/24/000000/external-date-hotel-kiranshastry-lineal-kiranshastry.png" />{" "}
                                  {data.odate != null
                                    ? data.odate
                                    : null}
                                </span>
                                <span style={{ float: "right" }}>
                                  {console.log("type-->",typeof(data.delivery_type))}
                                  {data.delivery_type === "1" ? (
                                    <Image src="https://img.icons8.com/external-konkapp-detailed-outline-konkapp/24/000000/external-takeaway-cafe-konkapp-detailed-outline-konkapp.png" />
                                  ) : (
                                    <Image src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/30/000000/external-delivery-delivery-kiranshastry-lineal-kiranshastry-1.png" />
                                  )}{" "}
                                  {data.delivery_type === "1"
                                    ? "Collection"
                                    : "Delivery"}{" "}
                                </span>
                              </p>
                              
                              <Button
                                size="small"
                                type="primary"
                                danger
                                icon={<RedoOutlined />}
                                onClick={(e) => this.reorderHandler(data, e)}
                              >
                                Reorder
                              </Button>
                              <Button
                              style={{marginLeft:30}}
                                size="small"
                                type="primary"
                                danger
                                icon={<NodeIndexOutlined />}
                                onClick={() => this.orderIdHandle(data.order_no)}
                              >
                                Track Order
                              </Button>
                              <p></p>
                              <div>
                              {/* {console.log("data",data)} */}
                              <p><span>{data.display_message}</span></p>

                              </div>
                            </Card>
                          </Badge.Ribbon>
                        </Col>
                      ))}
                  </Row>
                </TabPane>
                <TabPane tab="Offer" key="2">
                  <Row>
                    {this.state.filterusersdata !== null &&
                      this.state.filterusersdata.map((data) => (
                        // JSON.stringify(data)
                        <Col
                          lg={7}
                          xs={24}
                          sm={24}
                          md={24}
                          xl={7}
                          style={{ margin: 10, textAlign: "left" }}
                        >
                          <Badge.Ribbon text="Offer" color="pink">
                            <Card hoverable>
                              <p>
                                <b>Hotel Name : </b>
                                {data.hotel_name}
                              </p>
                              <p>
                                <b>Hotel Ref : </b>
                                {data.hotel_refid}
                              </p>
                              <p>
                                <b>Address : </b>
                                {data.address}
                              </p>
                            </Card>
                          </Badge.Ribbon>
                        </Col>
                      ))}
                  </Row>
                </TabPane>
                <TabPane tab=" Address" key="3">
                  <Address />
                </TabPane>
                <TabPane tab="Profile" key="4">
                  <Profile />
                </TabPane>
              </Tabs>
            </>
          ) : (
            <Skeleton avatar paragraph={{ rows: 8 }} style={{ margin: 20 }} />
          )
        ) : (
          <Alert
            message="Please Login Then After Show All Detail"
            type="success"
            style={{ background: "red" }}
          />
        )}
       
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
    preorder: state.product.preorderdata,
    tips: state.product.tips,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => {
      dispatch(addToCart(product));
    },
    driverid: (driverid) => {
      dispatch(driverId(driverid));
    },
    addToCart: (product) => {
      dispatch(addToCart(product));
    },
  };
};
export default connect(null, mapDispatchToProps)(Order);
