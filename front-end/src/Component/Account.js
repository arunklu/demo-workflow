import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Row,
  Col,
  Card,
  Badge,
  Typography,
  Alert,
  Space,
  Button,
  Form,
  Input,
  Checkbox,
  Modal,
  Spin,
  Radio,
} from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import img from "../image/Icon material-account-box.png";
import img1 from "../image/Icon material-payment.png";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./Account.css";
import StripeCheckout from "react-stripe-checkout";
import { AddAlertOutlined, Height } from "@material-ui/icons";
import {
  DeleteOutlined,
  EditOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { parseInt } from "lodash";
import { deliveryCharge, gettips } from "../store/actions/cartActions";

const { Title } = Typography;
const useStyles = makeStyles({
  Account: {
    padding: "15px 40px",
    margin: "32px",
    textAlign: "left",
    position: "relative",
  },
  Deliver: {
    // padding:'15px 40px',
    margin: "32px",
    textAlign: "left",
    position: "relative",
  },
  accounticon: {
    position: "absolute",
    left: "-12px",
    top: "30%",
    width: "30px",
  },
  eliipsetext: {
    maxWidth: "100%",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  payment: {
    padding: "15px 40px",
    margin: "32px",
    textAlign: "left",
    position: "relative",
  },
});
export default function Account(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [address, setAddress] = useState([]);
  const [useraddress, setUseraddress] = useState();
  const [logdata, setLogdata] = useState("");
  const [Alladress, setAlladdress] = useState(false);
  const [clientSecret, setClientSecret] = useState(" ");
  const [msg, setmsg] = useState(null);
  const [addresserror, setAddresserror] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const[personaldata,setPersonaldata]=useState({
    name:'',
    email:'',
    mobile:'',
  })
  // const [tipsamount, setTipsamout] = useState(0);
  const [inputField, setInputField] = useState({
    address: "",
    flatno: "",
    doorno: "",
    city: "",
    postcode: "",
    Instruction: "",
    userstatus: "",
  });
  const [editField, setEditField] = useState({
    address: "",
    flatno: "",
    doorno: "",
    city: "",
    postcode: "",
    Instruction: "",
    userstatus: "",
    id: "",
  });
  const [added, setAdded] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [addressloaded, setAddressloaded] = useState(false);
  const [addresselected, setAddresselected] = useState(true);
  const classes = useStyles();
  const id = useSelector((state) => state.cart.cart[0]?.hotelid);
  const subTotal = useSelector((state) => state.cart.cart);
  let tipsamount = useSelector((state) => state.product.tips);
  const dispatch = useDispatch();
  const ELEMENTS_OPTIONS = {
    fonts: [
      {
        cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
      },
    ],
  };

  // async function handleToken(token, addresses) {
  //   console.log("address",addresses)
  //   const response = await axios.post(
  //     "https://api.stripe.com/v1/tokens",
  //     { token, addresses }
  //   );
  //   const { status } = response.data;
  //   if (status === "success") {
  //     toast("Success! Check email for details", { type: "success" });
  //   } else {
  //     toast("Something went wrong", { type: "error" });
  //   }
  // }

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  useEffect(() => {
    fetch("https://deliveryguru.co.uk/dg_api/addresses/55")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setAddress(
            result.address.map((el) => {
              return { ...el, isLoading: false, deleteloader: true };
            })
          );
          //alert(JSON.stringify(result));
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [added]);

  const total = subTotal
    .map((item) => JSON.parse(item.price))
    .reduce((prev, curr) => prev + curr, 0);

  const handledata = (pin, addr, data) => {
    console.log("data", data);
    let tempAddress = JSON.parse(JSON.stringify(address));
    let indexFound = tempAddress.findIndex((el) => el.id === data.id);
    tempAddress[indexFound].isLoading = true;
    setAddress(tempAddress);
    const apiUrl = "https://testapi.delivery-guru.com/public/restaurants";
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
          console.log("aCCount_res", result);
          let pincheck =
            pin.split(" ").join("").length === 6
              ? pin.split(" ").join("").slice(0, 3)
              : pin.split(" ").join("").slice(0, 2);
          console.log("pincheck", pincheck);
          let filterdata = result.filter((el) => el.id === parseInt(id));
          console.log("filterdata", filterdata);

          // console.log(
          //   "filterdata.deliverydetails-->",
          //   filterdata[0].deliverydetails
          // );
          if (
            filterdata[0].deliverydetails &&
            filterdata[0].deliverydetails.length > 0
          ) {
            let deliveryInfo = JSON.parse(
              filterdata[0].deliverydetails
            ).deliverypostcode;
            let checkAvailability = false;
            deliveryInfo.forEach((el, i) => {
              if (el.postcode === pincheck) {
                checkAvailability = true;
                console.log("total", total);
                if (el.minorder >= total) {
                  alert(`minmum order should be ${el.minorder}`);
                  let tempArr = JSON.parse(JSON.stringify(address));
                  tempArr[indexFound].isLoading = false;
                  setAddress(tempArr);
                } else {
                  console.log("price", el.price);
                  dispatch(deliveryCharge(el.price));
                  setUseraddress(data);
                  props.addressselect(data);
                  let tempArr = JSON.parse(JSON.stringify(address));
                  tempArr[indexFound].isLoading = false;
                  setAddress(tempArr);
                  setAddresselected(false);
                }
              }
            });
            console.log("checkAvailability", checkAvailability);
            checkAvailability === false && alert("Delivery Not In Range");
            if (!checkAvailability) {
              let tempArr = JSON.parse(JSON.stringify(address));
              tempArr[indexFound].isLoading = false;
              setAddress(tempArr);
            }
          }
        },
        (error) => {
          setError(error);
        }
      );
  };
  const changelogdata = () => {
    setLogdata(1);
  };

  const ondelete = (item) => {
      console.log("delete", item);
      let tempAddress = JSON.parse(JSON.stringify(address));
      let indexFound = tempAddress.findIndex((el) => el.id === item.id);
      tempAddress[indexFound].deleteloader = false;
      setAddress(tempAddress);
      axios
        .get(`https://deliveryguru.co.uk/dg_api/deleteAddress/${item.id}`)
        .then((response) => {
          setAdded(true);
          console.log(response);
          let tempArr = JSON.parse(JSON.stringify(address));
          tempArr[indexFound].deleteloader = false;
          setAddress(tempArr);
          setAdded(true);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    // let todelete = address.filter((el) => el.id !== item.id);
    // setAddress(todelete);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const onedithandler = () => {
    if (
      editField.doorno === "" ||
      editField.address === "" ||
      editField.city === "" ||
      editField.flatno === "" ||
      editField.postcode === "" ||
      editField.userstatus === ""
    ) {
      setAddresserror("All Field are compulsory");
      return false;
    }
    let edit = useraddress;
    address.forEach((el, i) => {
      if (el.id === edit.id) {
        console.log("id", edit.id);
        let editdata = address;
        editdata[i] = {
          id: edit.id,
          u_id: localStorage.getItem("id"),
          home_address:
            "Door No. " +
            editField.doorno +
            "," +
            editField.flatno +
            " " +
            editField.address +
            ", " +
            editField.city,
          permanent_address:
            "Door No. " +
            editField.doorno +
            "," +
            editField.flatno +
            " " +
            editField.address +
            ", " +
            editField.city,
          pincode: editField.postcode.toUpperCase(),
          city: editField.city,
          landmark: editField.Instruction,
          status: editField.userstatus,
          lat: "0.0",
          longt: "0.0",
          state: "UK",
        };
        // editdata[i]=data
        axios
          .post(
            `https://deliveryguru.co.uk/dg_api/updateAddressfield/{${edit.id}}`,
            editdata[i]
          )
          .then((res) => {
            console.log("res-->", res);
            setUseraddress(editdata[i]);
            setEditModalVisible(false);
            setAdded(true);
            alert("Edited successfully");
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditModalVisible(false);
  };

  const onchangeHandler = (event) => {
    setInputField({ ...inputField, [event.target.name]: event.target.value });
  };

  const oneditchangeHandler = (event) => {
    setEditField({ ...editField, [event.target.name]: event.target.value });
  };

  
  //////////////////
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setAddressloaded(true);

    if (
      inputField.doorno === "" ||
      inputField.address === "" ||
      inputField.city === "" ||
      inputField.flatno === "" ||
      inputField.postcode === "" ||
      inputField.userstatus === ""
    ) {
      setAddresserror("All Field are compulsory");
      return false;
    }
    axios
      .post("https://deliveryguru.co.uk/dg_api/addAddress", {
        id: address.length + 1,
        u_id: localStorage.getItem("id"),
        home_address:
          "Door No. " +
          inputField.doorno +
          "," +
          inputField.flatno +
          " " +
          inputField.address +
          ", " +
          inputField.city,
        permanent_address:
          "Door No. " +
          inputField.doorno +
          "," +
          inputField.flatno +
          " " +
          inputField.address +
          ", " +
          inputField.city,
        pincode: inputField.postcode.toUpperCase(),
        city: inputField.city,
        landmark: inputField.Instruction,
        status: inputField.userstatus,
        lat: "0.0",
        longt: "0.0",
        state: "UK",
      })
      .then((res) => {
        setAdded(true);
        setIsModalVisible(false);
        console.log("res", res);
        alert("Address added successfully");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const editHandler = () => {
    editField.city = useraddress.city;
    editField.postcode = useraddress.pincode;
    editField.Instruction = useraddress.landmark;
    editField.id = useraddress.id;
    setEditModalVisible(true);
  };
  const tipsIncrement = () => {
    // setTipsamout(tipsamount+1)
    dispatch(gettips(tipsamount + 1));
  };
  const tipsDecrement = () => {
    console.log("dec");
    // setTipsamout(tipsamount-1)
    dispatch(gettips(tipsamount - 1));
  };
  return (
    <>
      <Card className={classes.Deliver}>
        <Title style={{ textAlign: "left", paddingLeft: "3%" }} level={2}>
          {" "}
          Delivery Address{" "}
        </Title>
        <div>
          {useraddress === undefined ? (
            <Alert
              message={"Select Below  Address"}
              type="info"
              style={{ fontWeight: 800, textAlign: "left" }}
            ></Alert>
          ) : (
            <div>
              <Badge.Ribbon text=" Home " color="pink">
                <Card
                  ellipsis={true}
                  title={useraddress.pincode}
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
                  <p className={classes.eliipsetext}>
                    <img src="https://img.icons8.com/external-konkapp-detailed-outline-konkapp/24/000000/external-takeaway-cafe-konkapp-detailed-outline-konkapp.png" />
                    <span style={{ marginLeft: 20 }} ellipsis={true}>
                      {useraddress.home_address}
                    </span>
                  </p>

                  <div style={{ margin: 20 }}>
                    {"Deliver Instruction"} {":"} {useraddress.landmark}
                  </div>
                  <div>
                    <Space>
                      <Button
                        size="small"
                        type="primary"
                        danger
                        onClick={() => editHandler()}
                      >
                        Edit
                      </Button>
                      <Modal
                        bodyStyle={{ height: "50%" }}
                        centered={true}
                        title="Add Delivery Address"
                        visible={editModalVisible}
                        confirmLoading={addressloaded}
                        footer={[
                          <Button danger onClick={handleCancel}>
                            Cancel
                          </Button>,
                          <Button type="primary" danger onClick={onedithandler}>
                            Submit
                          </Button>,
                        ]}
                      >
                        <div style={{ margin: 20 }}>
                          <form>
                            <Input.Group>
                              <label>
                                {"Door & Flat No"}
                                <br />
                                <Input
                                  style={{
                                    width: "50%",
                                    marginTop: 10,
                                    marginBottom: 10,
                                  }}
                                  name="doorno"
                                  placeholder="Door"
                                  value={editField.doorno}
                                  onChange={(e) => oneditchangeHandler(e)}
                                />
                                <Input
                                  style={{
                                    width: "50%",
                                    marginTop: 10,
                                    marginBottom: 10,
                                  }}
                                  name="flatno"
                                  value={editField.flatno}
                                  onChange={(e) => oneditchangeHandler(e)}
                                  placeholder="Flat No"
                                />
                              </label>
                            </Input.Group>
                            <label>
                              Complete Address
                              <Input
                                type="text"
                                style={{ marginTop: 10, marginBottom: 10 }}
                                placeholder="Building No,Street Name"
                                name="address"
                                value={editField.address}
                                onChange={(e) => oneditchangeHandler(e)}
                              />
                            </label>
                            <label>
                              City
                              <Input
                                type="text"
                                style={{ marginTop: 10, marginBottom: 10 }}
                                name="city"
                                value={editField.city}
                                onChange={(e) => oneditchangeHandler(e)}
                              />
                            </label>{" "}
                            <label>
                              postcode
                              <Input
                                disabled={true}
                                style={{ marginTop: 10, marginBottom: 10 }}
                                value={editField.postcode}
                                name="postcode"
                                onChange={(e) => oneditchangeHandler(e)}
                              />
                            </label>
                            <label>
                              Delivery Instruction
                              <Input
                                style={{ marginTop: 10, marginBottom: 10 }}
                                value={editField.Instruction}
                                name="Instruction"
                                placeholder="Eg.Leave At Door"
                                onChange={(e) => oneditchangeHandler(e)}
                              />
                            </label>
                            <div
                              onChange={(e) => oneditchangeHandler(e)}
                              defaultValue={"Home"}
                            >
                              <input
                                style={{ marginLeft: "25%" }}
                                type="radio"
                                value="Home"
                                name="userstatus"
                              />{" "}
                              HOME
                              <input
                                style={{ marginLeft: "25%" }}
                                type="radio"
                                value="Office"
                                name="userstatus"
                              />{" "}
                              OFFICE
                            </div>
                            <div style={{ color: "red" }}>{addresserror}</div>
                          </form>
                        </div>
                      </Modal>
                      <Button
                        size="small"
                        type="primary"
                        danger
                        onClick={() => setAddresselected(true)}
                      >
                        Change Address
                      </Button>
                    </Space>
                  </div>
                </Card>
              </Badge.Ribbon>
            </div>
          )}
        </div>
        {addresselected ? (
          <Row className={classes.Deliver}>
            {Alladress !== true
              ? address.slice(0, 4).map((data, index) => (
                  <Col
                    lg={12}
                    xs={24}
                    sm={24}
                    md={24}
                    xl={12}
                    style={{ padding: 4 }}
                  >
                    <Badge.Ribbon text=" Home " color="pink">
                      <Card
                        ellipsis={true}
                        title={data.pincode}
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
                        <p className={classes.eliipsetext}>
                          <img src="https://img.icons8.com/external-konkapp-detailed-outline-konkapp/24/000000/external-takeaway-cafe-konkapp-detailed-outline-konkapp.png" />
                          <span style={{ marginLeft: 20 }} ellipsis={true}>
                            {data.home_address}
                          </span>
                        </p>
                        <div>
                          <Button
                            type="primary"
                            danger
                            loading={data.isLoading}
                            onClick={() =>
                              handledata(data.pincode, data.home_address, data)
                            }
                          >
                            Delivery Here
                          </Button>
                          {data.deleteloader ? (
                            <DeleteOutlined
                              onClick={() => {
                                ondelete(data);
                              }}
                              style={{ marginLeft: 20 }}
                            />
                          ) : (
                            <Spin style={{ marginLeft: 20 }} size="small" />
                          )}
                        </div>
                      </Card>
                    </Badge.Ribbon>
                  </Col>
                ))
              : address.map((data, index) => (
                  <Col
                    lg={12}
                    xs={24}
                    sm={24}
                    md={24}
                    xl={12}
                    style={{ padding: 4 }}
                  >
                    <Badge.Ribbon text=" Home " color="pink">
                      <Card
                        ellipsis={true}
                        title={data.pincode}
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
                        <p className={classes.eliipsetext}>
                          <img src="https://img.icons8.com/external-konkapp-detailed-outline-konkapp/24/000000/external-takeaway-cafe-konkapp-detailed-outline-konkapp.png" />
                          <span ellipsis={true}>{data.home_address}</span>
                        </p>
                        <div>
                          <div>
                            <Button
                              type="primary"
                              danger
                              loading={data.isLoading}
                              onClick={() =>
                                handledata(
                                  data.pincode,
                                  data.home_address,
                                  data
                                )
                              }
                            >
                              Delivery Here
                            </Button>
                            {data.deleteloader ? (
                              <DeleteOutlined
                                onClick={() => {
                                  ondelete(data);
                                }}
                                style={{ marginLeft: 20 }}
                              />
                            ) : (
                              <Spin style={{ marginLeft: 20 }} size="small" />
                            )}
                          </div>
                        </div>
                      </Card>
                    </Badge.Ribbon>
                  </Col>
                ))}
            {Alladress !== true ? (
              <div className="justify-content-center" style={{ margin: 10 }}>
                <Button
                  type="primary"
                  danger
                  onClick={() => setAlladdress(true)}
                >
                  {" "}
                  All Address{" "}
                </Button>
                <Button
                  style={{ marginLeft: 10 }}
                  type="primary"
                  danger
                  onClick={() => setIsModalVisible(true)}
                >
                  {"+"} Add Address{" "}
                </Button>
                <Modal
                  bodyStyle={{ height: "50%" }}
                  centered={true}
                  title="Add Delivery Address"
                  visible={isModalVisible}
                  confirmLoading={addressloaded}
                  footer={[
                    <Button danger onClick={handleCancel}>
                      Cancel
                    </Button>,
                    <Button type="primary" danger onClick={handleSubmit}>
                      Submit
                    </Button>,
                  ]}
                >
                  <div style={{ margin: 20 }}>
                    <form>
                      <Input.Group>
                        <label>
                          {"Door & Flat No"}
                          <br />
                          <Input
                            style={{
                              width: "50%",
                              marginTop: 10,
                              marginBottom: 10,
                            }}
                            name="doorno"
                            placeholder="Door"
                            value={inputField.doorno}
                            onChange={(e) => onchangeHandler(e)}
                          />
                          <Input
                            style={{
                              width: "50%",
                              marginTop: 10,
                              marginBottom: 10,
                            }}
                            name="flatno"
                            value={inputField.flatno}
                            onChange={(e) => onchangeHandler(e)}
                            placeholder="Flat No"
                          />
                        </label>
                      </Input.Group>
                      <label>
                        Complete Address
                        <Input
                          type="text"
                          style={{ marginTop: 10, marginBottom: 10 }}
                          placeholder="Building No,Street Name"
                          name="address"
                          value={inputField.address}
                          onChange={(e) => onchangeHandler(e)}
                        />
                      </label>
                      <label>
                        City
                        <Input
                          type="text"
                          style={{ marginTop: 10, marginBottom: 10 }}
                          name="city"
                          value={inputField.city}
                          onChange={(e) => onchangeHandler(e)}
                        />
                      </label>{" "}
                      <label>
                        Postalcode
                        <Input
                          style={{ marginTop: 10, marginBottom: 10 }}
                          value={inputField.postcode}
                          name="postcode"
                          onChange={(e) => onchangeHandler(e)}
                        />
                      </label>
                      <label>
                        Delivery Instruction
                        <Input
                          style={{ marginTop: 10, marginBottom: 10 }}
                          value={inputField.Instruction}
                          name="Instruction"
                          placeholder="Eg.Leave At Door"
                          onChange={(e) => onchangeHandler(e)}
                        />
                      </label>
                      <div
                        onChange={(e) => onchangeHandler(e)}
                        style={{}}
                        defaultValue={"Home"}
                      >
                        <input
                          style={{ marginLeft: "25%" }}
                          type="radio"
                          value="Home"
                          name="userstatus"
                        />{" "}
                        HOME
                        <input
                          style={{ marginLeft: "25%" }}
                          type="radio"
                          value="Office"
                          name="userstatus"
                        />{" "}
                        OFFICE
                      </div>
                      <div style={{ color: "red" }}>{addresserror}</div>
                    </form>
                  </div>
                </Modal>
              </div>
            ) : (
              <Button type="primary" onClick={() => setAlladdress(false)}>
                {" "}
                Minimize{" "}
              </Button>
            )}
          </Row>
        ) : null}

        <Card style={{ margin: 30, height: "100px" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <h1>Tip Your delivery Executive</h1>
            </div>
            <div
              style={{
                marginLeft: 50,
                backgroundColor: "#FF4D4E",
                height: 50,
                width: "15%",
                paddingTop: 8,
                paddingLeft: 4,
              }}
            >
              <Button
                style={{ backgroundColor: "white", color: "#FF4D4E" }}
                shape="circle"
                icon={<MinusOutlined />}
                size="middle"
                onClick={tipsamount !== 0 ? () => tipsDecrement() : null}
              />
              {tipsamount && tipsamount !== null ? (
                <span style={{ color: "white" }}>
                  {" "}
                  &nbsp; {"£" + tipsamount + ".00"}&nbsp;{" "}
                </span>
              ) : (
                <span style={{ color: "white" }}>
                  {" "}
                  &nbsp; {"£" + "0" + ".00"}&nbsp;{" "}
                </span>
              )}

              <Button
                style={{
                  backgroundColor: "white",
                  color: "#FF4D4E",
                  float: "right",
                }}
                shape="circle"
                icon={<PlusOutlined />}
                size="middle"
                onClick={() => tipsIncrement()}
              />
            </div>
          </div>
          <span>
            (Tipping your delivery executive is the best way of saying thanks
            for their effort and service)
          </span>
        </Card>
      </Card>
    </>
  );
}
