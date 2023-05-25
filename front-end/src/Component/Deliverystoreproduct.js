import React, { useState, useEffect } from "react";
import "./deliverystoreproduct.css";
import { connect } from "react-redux";
import { addToCart } from "../store/actions/cartActions";
import { ondelivery, getHotelId } from "../store/actions/cartActions";
import { selectedrestaurant } from "../store/actions/cartActions";

import { useHistory } from "react-router-dom";
import Login from "./Login";
import Facebook from "./Facebook";
import Google from "./Google";
import { isMobile } from "react-device-detect";
import emptycart from "../image/empty-cart.png";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserHistory } from "history";
import {
  Row,
  Col,
  Tabs,
  Button,
  Alert,
  Space,
  Empty,
  Input,
  Calendar,
  Modal,
  Select,
  Radio,
  Collapse,
  Badge,
  Avatar,
} from "antd";
import {
  ShoppingCartOutlined,
  ShopOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import CartProduct from "./CartProduct";
import Cart from "../image/ONTWNE1.png";
const { TabPane } = Tabs;
const { Option } = Select;
const { Panel } = Collapse;
function Deliverystoreproduct(props) {
  let history = useHistory();
  const dispatch = useDispatch();
  const [showdata, setShowdata] = useState("Delivery");
  const [checkout, setCheckout] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Person, setPerson] = useState(null);
  const [Foodtype, setFoodtype] = useState(null);
  const [date, setdate] = useState(null);
  const [value3, setvalue3] = useState(null);
  const [Book, setBook] = useState(null);
  const [name, setname] = useState(null);
  const [email, setemail] = useState(null);
  const [mobile, setmobile] = useState(null);
  const [ispressed, setIspressed] = useState(true);
  const [isModalVisiblecart, setIsModalVisiblecart] = useState(false);
  const [coupne, setcoupne] = useState(null);
  const [isLOGINModalVisible, setLoginIsModalVisible] = useState(false);
  const showModalCart = () => {
    setIsModalVisiblecart(true);
  };

  const handleOkcart = () => {
    setIsModalVisiblecart(false);
  };

  const handleCancelcart = () => {
    setIsModalVisiblecart(false);
  };
  function checkOutData(data) {
    if (localStorage.getItem("id") !== null) {
      props.cart.map((data1) => (data1.payment_type = data));
      history.push("/checkout");
    } else {
      showLogingModal();
    }
  }

  useEffect(() => {
    if (window.location.pathname == "/checkout") {
      setCheckout(true);
    }
  });
  const showModal = () => {
    setIsModalVisible(true);
  };

  const showLogingModal = () => {
    setLoginIsModalVisible(true);
  };

  const handleloginCancel = () => {
    setLoginIsModalVisible(false);
  };
  const handleloginOk = () => {
    setLoginIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    const data = JSON.stringify({
      hotel_id: "123",
      bookingid: Date.parse(new Date()),
      tableNo: "0",
      title: "0",
      fname: name,
      lname: "",
      phonenumber: mobile,
      email: email,
      created_date: date,
      updated_date: "0",
      time: date,
      timing: value3,
      person: Person,
      location: "0",
      bookingtime: value3,
      table_type: Foodtype,
      hotel_name: window.sessionStorage.getItem("hproductname"),
      hotel_email: "order@deliveryguru.co.uk",
    });
    //alert(data);

    const apiUrl = "https://deliveryguru.co.uk/dg_api/addbookingtablerecords";
    fetch(apiUrl, {
      method: "POST",
      body: { data },
    })
      .then((response) => {
        alert("booked table");
        setBook("table booked");
      })
      .catch((error) => {
        //console.log(error);
      });
  };
  const ordernow = () => {
    // alert("gsfg")
    props.ordernowdata();
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  function onPanelChange(value, mode) {
    alert(value.format("YYYY-MM-DD"), mode);
    setdate(value.format("YYYY-MM-DD"), mode);
  }
  function onChange1(value) {
    // console.log(`selected ${value}`);
    setPerson(value);
  }
  function onChange2(value) {
    setFoodtype(value);
  }
  const options = [
    { label: "12:30", value: "12:30" },
    { label: "1:00", value: "1:00" },
    { label: "1:30", value: "1:30" },
    { label: "2:30", value: "2:30" },
    { label: "3:00", value: "3:00" },
    { label: "3:30", value: "3:30" },
    { label: "4:00", value: "4:00" },
    { label: "4:30", value: "4:30" },
    { label: "5:00", value: "5:00" },
    { label: "5:30", value: "5:30" },
  ];

  const onChange3 = (e) => {
    setvalue3(e.target.value);
  };
  let Subtotal = 0;
  let addontotal = 0;
  let delivercharges = 0;
  let servicecharge = 0;
  let staticcart = 0;

  const delivered = () => {
    dispatch(ondelivery(true));
    setShowdata("Delivery");
    if(window.location.pathname == "/checkout"){
      props.checkorder("Delivery")
      } 
  };
  const collection = () => {
    setShowdata("ECOM");
    dispatch(ondelivery(false));
    if(window.location.pathname == "/checkout"){
    props.checkorder("Collection")
    } 
  };

  return (
    <>
      { isMobile ? (
        <>
          <span>
            <Button type="danger" size="small" onClick={showModalCart}>
              View Cart
            </Button>
          </span>
          <span style={{ float: "right" }} onClick={showModalCart}>
            {props.cart.length > 0 ? (
              <Badge count={props.cart.length} />
            ) : (
              <Badge count={props.cart.length} />
            )}
          </span>

          <Modal
            visible={isModalVisiblecart}
            onOk={handleOkcart}
            onCancel={handleCancelcart}
            style={{ marginTop: 30 }}
          >
            <>
              {showdata === "Delivery" ? (
                <p
                  style={{
                    padding: "7px 10px",
                    background: "#fff",
                    position: "-webkit-sticky",

                    top: 0,
                    zIndex: 999,
                  }}
                >
                  <Button
                    type="danger"
                    // icon={<ShoppingCartOutlined />}
                    size="large"
                    style={{
                      marginRight: 3,
                      borderRadius: 8,
                      padding: "6px 10px 8px 10px",
                      verticalAlign: "bottom",
                    }}
                    onClick={() => {
                      delivered();
                    }}
                  >
                    Delivery
                  </Button>
                  <Button
                    // icon={<ShopOutlined />}
                    danger
                    size="large"
                    style={{
                      marginLeft: 3,
                      borderRadius: 8,
                      padding: "6px 10px 8px 10px",
                      verticalAlign: "bottom",
                    }}
                    onClick={() => {
                      collection();
                    }}
                  >
                    Collection
                  </Button>

                  <Button
                    // icon={<ShopOutlined />}
                    danger
                    size="large"
                    style={{
                      marginLeft: 3,
                      borderRadius: 8,
                      padding: "6px 10px 8px 10px",
                      verticalAlign: "bottom",
                    }}
                    onClick={showModal}
                  >
                    Book In &nbsp;
                  </Button>
                </p>
              ) : (
                <p
                  style={{
                    padding: "7px 10px",
                    background: "#fff",
                    position: "-webkit-sticky",

                    top: 0,
                    zIndex: 999,
                  }}
                >
                  <Button
                    danger
                    // icon={<ShoppingCartOutlined />}
                    size="large"
                    style={{ marginRight: 3, borderRadius: 8 }}
                    onClick={(e) => {
                      delivered();
                    }}
                  >
                    Delivery
                  </Button>
                  <Button
                    type="danger"
                    // icon={<ShopOutlined />}
                    size="large"
                    style={{ marginLeft: 3, borderRadius: 8 }}
                    onClick={(e) => {
                      collection();
                    }}
                  >
                    Collection
                  </Button>
                  <Button
                    danger
                    // icon={<ShopOutlined />}
                    size="large"
                    style={{ marginLeft: 3, borderRadius: 8 }}
                    onClick={showModal}
                  >
                    Book In
                  </Button>
                </p>
              )}
              <hr />

              {showdata === "Delivery" ? (
                props.cart.length > 0 ? (
                  <div id="delivery">
                    <CartProduct
                      cartvalue={props.datacart}
                      hotelid={props.hotelid}
                    />

                    {window.location.pathname == "/checkout" ? (
                      isMobile ? (
                        <>
                          {props.cart.map(
                            (subtotaldata) => (
                              (Subtotal +=
                                ((addontotal = 0),
                                parseFloat(subtotaldata.amount) +
                                  parseFloat(
                                    subtotaldata.addon != null &&
                                      subtotaldata.addon.reduce(
                                        (count, value) => {
                                          return (
                                            count + parseFloat(value.price)
                                          );
                                        },
                                        0.0
                                      )
                                  )) * subtotaldata.productcount),
                              (<></>)
                            )
                          )}
                          {props.coupnavalid != false
                            ? props.deliverydiscount != 0
                              ? "You Coupon is Valid, discount is" +
                                props.discountdata +
                                "%"
                              : "You Coupon is InValid"
                            : null}

                          <Alert
                            message="Coupon"
                            description="You will see the  coupon List  of hotel ,  1-DG0021,DG0047"
                            type="info"
                            action={
                              <Space direction="horizontal">
                                {/* <Button size="small" type="danger" onClick={()=>this.handleCounpne()}>
                      Accept
                    </Button> */}
                                <Button
                                  size="small"
                                  danger
                                  type="dashed"
                                  onClick={() => props.handlecoupne(coupne)}
                                >
                                  Apply coupon
                                </Button>
                              </Space>
                            }
                          />
                          <br />
                          <Input
                            placeholder="Success Tips"
                            allowClear
                            onChange={(event) => setcoupne(event.target.value)}
                            style={{ marginTop: 6, marginBottom: 8 }}
                          />
                          <hr />
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
                          {props.hotel.hotel.map(
                            (value) => (
                              value.delivery_charges
                                ? (delivercharges = parseFloat(
                                    value.delivery_charges
                                  ))
                                : 0,
                              (servicecharge =
                                Subtotal +
                                parseFloat(0.5) +
                                parseFloat(0.05) +
                                delivercharges),
                              (
                                <>
                                  <p>
                                    <span>Delivery Charges:{}</span>
                                    <span style={{ float: "right" }}>
                                      &#163; {value.delivery_charges}
                                    </span>
                                  </p>
                                </>
                              )
                            )
                          )}
                          <p>
                            {" "}
                            <span>Discount (10%)</span>
                            <span style={{ float: "right" }}>
                              {" "}
                              &#163; {(Subtotal * 10) / 100}
                            </span>
                          </p>
                          <h4>
                            <span>Total</span>
                            <span style={{ float: "right" }}>
                              &#163;{" "}
                              {(servicecharge - (Subtotal * 10) / 100).toFixed(
                                2
                              )}
                            </span>
                          </h4>

                          <Button
                            type="danger"
                            onClick={() => ordernow()}
                            danger
                          >
                            {" "}
                            Place Order Now{" "}
                          </Button>
                        </>
                      ) : null
                    ) : (
                      <Button
                        type="danger"
                        block
                        onClick={() => checkOutData("COD")}
                        danger
                      >
                        Checkout <DoubleRightOutlined />
                      </Button>
                    )}
                  </div>
                ) : (
                  <Empty />
                )
              ) : props.cart.length > 0 ? (
                <div id="delivery">
                  <CartProduct
                    cartvalue={props.datacart}
                    hotelid={props.hotelid}
                  />
                  {window.location.pathname == "/checkout" ? (
                    isMobile ? (
                      <Button
                        type="danger"
                        block
                        onClick={() => props.ordernowdata()}
                        danger
                      >
                        Place Order Now
                      </Button>
                    ) : null
                  ) : (
                    <Button
                      type="danger"
                      block
                      onClick={() => checkOutData("ECOM")}
                      danger
                    >
                      Checkout <DoubleRightOutlined />
                    </Button>
                  )}
                </div>
              ) : (
                <div id="collection">
                  <p> &nbsp;</p>
                  <img src={emptycart} />
                </div>
              )}
            </>
          </Modal>
        </>
      ) : (
        // web Part code start

        <>
          {props.updatekey ? (
            <div>
              <p
                style={{
                  padding: "6px 10px",
                  background: "#fff",

                  top: 0,
                  zIndex: 997,
                  borderBottom: ".5px solid #a7a2a2",
                }}
              >
                <Button
                  type="danger"
                  // icon={<ShoppingCartOutlined />}
                  size="large"
                  style={{
                    marginRight: 3,
                    borderRadius: 8,
                    padding: "6px 10px 8px 10px",
                    verticalAlign: "bottom",
                  }}
                  onClick={(e) => {
                    delivered();
                  }}
                >
                  Delivery
                </Button>
                <Button
                  // icon={<ShopOutlined />}
                  danger
                  size="large"
                  style={{
                    marginLeft: 3,
                    borderRadius: 8,
                    padding: "6px 10px 8px 10px",
                    verticalAlign: "bottom",
                  }}
                  onClick={(e) => {
                    collection();
                  }}
                >
                  Collection
                </Button>

                <Button
                  // icon={<ShopOutlined />}
                  danger
                  size="large"
                  style={{
                    marginLeft: 3,
                    borderRadius: 8,
                    padding: "6px 10px 8px 10px",
                    verticalAlign: "bottom",
                  }}
                  onClick={showModal}
                >
                  Book In &nbsp;
                </Button>
              </p>
              {/* <div style={{margin:10}}>
            <Alert
      message="RESTAURANT"
      description={hotelname}
      type="success"
    />
            </div> */}
            </div>
          ) : (
            <p
              style={{
                padding: "6px 10px",
                background: "#fff",

                top: 0,
                zIndex: 999,
                borderBottom: ".5px solid #a7a2a2",
              }}
            >
              <Button
                danger
                // icon={<ShoppingCartOutlined />}
                size="large"
                style={{ marginRight: 3, borderRadius: 8 }}
                onClick={(e) => {
                  delivered();
                }}
              >
                Delivery
              </Button>
              <Button
                type="danger"
                // icon={<ShopOutlined />}
                size="large"
                style={{ marginLeft: 3, borderRadius: 8 }}
                onClick={(e) => {
                  collection();
                }}
              >
                Collection
              </Button>
              <Button
                danger
                // icon={<ShopOutlined />}
                size="large"
                style={{ marginLeft: 3, borderRadius: 8 }}
                onClick={showModal}
              >
                Book In
              </Button>
            </p>
          )}
          {props.preorderdate === undefined && props.preordertime === undefined
            ? null
            : props.preorderdate &&  props.preordertime &&
              props.preorderdate.length !== 0 && (
                <div style={{ marginTop: 10, marginBottom: 15 }}>
                  <Alert
                    message={
                      "Preorder" +
                      " : " +
                    props.preorderdate +
                      " ," +
                    props.preordertime
                    }
                    type="error"
                  />
                </div>
              )}
          {props.updatekey ? (
            props.cart.length > 0 ? (
              <div id="delivery">
                <CartProduct
                  cartvalue={props.datacart}
                  hotelid={props.hotelid}
                />
                {window.location.pathname == "/checkout" ? (
                  ""
                ) : (
                  <Button
                    type="danger"
                    style={{position:"absolute",bottom:'7px',right:3,left:4,width:"97%"}}
                    block
                    onClick={() => checkOutData("COD")}
                    danger
                  >
                    Checkout <DoubleRightOutlined />
                  </Button>
                )}
              </div>
            ) : (
              <div id="collection">
                <p> &nbsp;</p>
                <img src={emptycart} />
                <p>Your Cart Is Empty</p>
                <p>Please add Item</p>
              </div>
            )
          ) : props.cart.length > 0 ? (
            <div id="delivery">
              <CartProduct cartvalue={props.datacart} hotelid={props.hotelid} />
              {window.location.pathname == "/checkout" ? (
                ""
              ) : (
                <Button
                  type="danger"
                  block
                  onClick={() => checkOutData("ECOM")}
                  danger
                >
                  Checkout <DoubleRightOutlined />
                </Button>
              )}
            </div>
          ) : (
            <div id="collection">
              <p> &nbsp;</p>
              <img src={emptycart} />
              <p>Your Cart Is Empty</p>
              <p>Please add Item</p>
            </div>
          )}
        </>
      )}

      <Modal
        title="Book Table"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        size="large"
      >
        <Row>
          <Col span={9}>
            <br />
            <br />

            <Input
              placeholder="Name"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              value={name}
              onChange={(e) => setname(e.target.value)}
              style={{ width: "95%" }}
            />
            <br />
            <br />
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              style={{ width: "95%" }}
            />
            <br />
            <br />
            <Input
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setmobile(e.target.value)}
              style={{ width: "95%" }}
            />
            <br />
            <br />
            <Select
              showSearch
              style={{ marginBottom: 8 }}
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={onChange1}
              style={{ width: "95%" }}
            >
              <Option value="1 Person">1 Person</Option>
              <Option value="2 Person">2 Person</Option>
              <Option value="3 Person">3 Person</Option>
              <Option value="4 Person">4 Person</Option>
              <Option value="5 Person">5 Person</Option>
              <Option value="6 Person">6 Person</Option>
            </Select>
            <br />
            <br />
            <Select
              showSearch
              style={{ marginBottom: 8 }}
              placeholder="Select a Food Type"
              optionFilterProp="children"
              onChange={onChange2}
              style={{ width: "95%" }}
            >
              <Option value="Lunch">Lunch</Option>
              <Option value="Dinner">Dinner</Option>
            </Select>
          </Col>
          <Col span={15} style={{ borderLeft: ".5px solid #e3e3e3" }}>
            <Calendar fullscreen={false} onPanelChange={onPanelChange} />
          </Col>
        </Row>

        <br />

        <Collapse defaultActiveKey={["1"]}>
          <Panel header="Select Time Slot" key="1">
            <Radio.Group
              options={options}
              onChange={onChange3}
              value={value3}
              optionType="button"
              buttonStyle="solid"
            />
          </Panel>
        </Collapse>
      </Modal>


      <Modal
        title="Login"
        visible={isLOGINModalVisible}
       
        style={{height:'100%'}}
        footer={null}
         onOk={handleloginOk} onCancel={handleloginCancel}
      >
        <Login onCancel={handleloginCancel} />
    <hr />
    <p style={{textAlign:'center',fontWeight:'bold'}}>Login With SocialMedia</p>
        <p style={{textAlign:'left'}}>
                    <span><Google /></span><br /><span style={{textAlign:'center'}}><Facebook /></span>
              </p>

              
      </Modal>
    </>

    
  );
}
const mapStateToProps = (state) => {
  return {
    updatekey: state.product.updatekey,
    cart: state.cart.cart,
    hotel: state.hotel.hotel,
    preorderdate:state.product.preorderdate,
    preordertime:state.product.preordertime
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => {
      dispatch(addToCart(product));
    },
    ondelivery: (updatekey) => {
      dispatch(ondelivery(updatekey));
    },
    getHotelId: (hotelId) => {
      dispatch(getHotelId(hotelId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deliverystoreproduct);
