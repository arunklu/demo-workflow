import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import img from "../image/Group 344.png";
import img2 from "../image/icon.png";
import img3 from "../image/ONTWNE1.png";
import img4 from "../image/shipping-fast-delivery-man-riding-260nw-1573225051.png";
import { Card } from "antd";
import { useHistory } from "react-router-dom";
import { Typography, Rate, Modal, Avatar, DatePicker, TimePicker } from "antd";
import { Image, Tag } from "antd";
import { Row, Col, Input } from "antd";
import imgdiscount from "../image/discount.png";
import imgminorder from "../image/minorder.png";
import deliverycharges from "../image/deliverycharges.png";
import imgclock from "../image/clock.png";
import offdishes from "../image/offdishes.png";
import { connect } from "react-redux";
import { addToHotel } from "../store/actions/cartActions";
import "../about.css";
import dummyimage from "../image/hotelnot.png";
import { isMobile } from "react-device-detect";
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    textAlign: "left",
  },

  paper: {
    marginBottom: "10px",
    borderRadius: 10,
    position: "relative",
    boxShadow: "0px 1px 2px 0px #e3e3e3",
    // boxShadow: "0px 5px 3px #e3e3e3",
    "@media (max-width: 767px)": {
      borderRadius: "40px",
      padding: "19px",
      boxShadow: "2px 5px 4px 3px #e3e3e3",
    },
  },

  f15: {
    fontSize: 15,
    fontWeight: 900,
    "f15:hover": {
      TextDecoder: "underline",
    },
  },
  f14: {
    fontSize: "14px !important",
    marginBottom: 0,
    marginTop: "2px !important",
  },
  image: {
    width: 128,
    height: 80,
  },
  textleft: {
    textAlign: "left",
    padding: "0 12px",
  },
  p_12: {
    padding: "10px 12px",
  },
  margin: {
    marginTop: 0,
  },
  paralink: {
    color: "#ff0057",
    fontWeight: "800",
    fontFamily: "oblique",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "90px",
    maxHeight: "90px",
    marginLeft: 0,
    "@media (max-width: 767px)": {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
      marginLeft: 0,
    },
  },
  imghover: {
    width: 70,
    height: 10,
    background: "#fff",
    padding: "6px 9px",
    boxShadow: "1px 1px 1px 1px #e3e3e3",
    borderRadius: 5,
  },
  iconimg: {
    width: "px",
    height: "20px",
    margin: "0 4px",
  },
  offersize: {
    fontSize: "100px",
  },
  percentsize: {
    fontSize: "50px",
  },
  offer: {
    background: "yellow",
    borderRadius: "56px 0 0 0",
  },
});
function Offercard(props) {
  const classes = useStyles();
  let history = useHistory();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [distance, setdistance] = useState(null);
  const [Review,setReview]=useState([]);
  function showModal() {
    setIsModalVisible(true);
  }

  function handleOk() {
    setIsModalVisible(false);
  }

  function handleCancel() {
    setIsModalVisible(false);
  }
  function onPanelChange(value, mode) {
    console.log(value, mode);
  }

  useEffect(() => {
    const origin = "G14PL";
    const requestOptions = {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
    };
    //console.log(props.sub_menu);
    fetch(
      "http://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" +
        props.location +
        "&destinations=" +
        props.address +
        "&key=AIzaSyDY2j1NE12MzJYS7t-dVay1lXooOpzxZsY",
      requestOptions
    )
      .then((res) => res.json())
      .then(
        (result) => {
          //alert(JSON.stringify(result))
          // setdistance(result);
          console.log("data find " + JSON.stringify(result));
        },
        (error) => {
          // setIsLoaded(true);
          // setError(error);
        }
      );



      const apiurl1 =
      "https://deliveryguru.co.uk/dg_api/review/hotel/" +
      props.id ;
    fetch("https://deliveryguru.co.uk/dg_api/review/hotel/" +
    props.id)
      .then((res) => res.json())
      .then(
        (result) => {
         // alert(JSON.stringify(result));
          setReview(result);
        },
        (error) => {
          //setError(error);
        }
      );
  }, [props.location]);
  let totalrate=0;
  totalrate = Math.floor(Review.reduce((total, currentValue) => total = parseFloat(total) + parseFloat(currentValue.f_rate !="" ? currentValue.f_rate :0),0)/Review.length)
  return (
    
    <>
      {isMobile ? (
        <Card
          // title="Card title"
          onClick={() =>
            props.restaurant == "1"
              ? setIsModalVisible(true)
              : history.push("/Menu/" + props.id)
          }
          className={classes.paper}
          style={
            props.restaurant == "1"
              ? { background: "#fdfdfd", marginRight: 10 }
              : { marginRight: 10 }
          }
        >
          <Row>
            <Col span={24} style={{ margin: "auto", textAlign: "initial" }}>
              <img
                style={{
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: 10,
                  margin: "-7px",
                }}
                src="https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,f_auto,q_auto,h_161,w_436,d_uk:cuisines:african-3.jpg/v1/uk/restaurants/18133.jpg"
              />
              <Row>
                <Col span={8}>
                  <span>
                    <img
                      style={{
                        objectFit: "cover",
                        width: "95px",
                        paddingTop: 5,
                      }}
                      src={
                        "https://deliveryguru.co.uk/images/hotelogo/" +
                        props.id +
                        ".png"
                      }
                    />
                  </span>
                </Col>
                <Col span={16} style={{ textAlign: "Left", marginTop: 7 }}>
                  <span>
                    <Title
                      className={classes.f15}
                      level={5}
                      style={{ fontWeight: 900 }}
                    >
                      {props.hotelname}
                    </Title>
                    <p></p>
                    <Title level={5} className={classes.f14}>
                      {props.foodtype}
                    </Title>

                    <p>
                      <span>
                        <Rate
                          allowHalf
                          defaultValue={4.5}
                          className={classes.f14}
                        />{" "}
                        4.5 &nbsp;
                      </span>
                      {/* <span>
              <img src={img} className={classes.iconimg} />
            </span> */}

                      {/* <span>
              <img src={img2} className={classes.iconimg} />
            </span> */}
                      {/* {props.restaurant !== 1 ? null : (
              <span>
                <img src={img3} className={classes.iconimg} />
              </span>
            )}
            {props.restaurant !== 1 && props.delivery !== 1 ? null : (
              <span>
                <img src={img4} className={classes.iconimg} />
              </span>
            )} */}
                    </p>
                  </span>
                </Col>
              </Row>
              <span style={{ clear: "both" }}>
                <Title level={5} className={classes.f14}>
                  <img src={imgdiscount} className={classes.iconimg} /> Discount{" "}
                  {props.discountvalue}
                </Title>
                <Title level={5} className={classes.f14}>
                  {" "}
                  <img src={deliverycharges} className={classes.iconimg} />
                  Delivery Fee &#163; {props.charges != ""
                    ? 0
                    : props.charges}{" "}
                  &nbsp; Min. Order {props.minorder}
                </Title>
                <Title level={5} className={classes.f14}>
                  <span>
                    <img src={imgclock} className={classes.iconimg} />
                    15 - 45 Min
                  </span>
                  <span>
                    {" "}
                    {props.restaurant !== 1 ? null : (
                      <span style={{ float: "right", paddingRight: 10 }}>
                        <img src={img3} className={classes.iconimg} />
                      </span>
                    )}
                    {props.restaurant !== 1 && props.delivery !== 1 ? null : (
                      <span style={{ float: "right", paddingRight: 10 }}>
                        <img src={img4} className={classes.iconimg} /> &#163; 5
                      </span>
                    )}
                  </span>{" "}
                </Title>
              </span>
              {/*        
          <Title level={5} className={classes.f14}><span><img src={imgdiscount} className={classes.iconimg}/></span> Discount {props.discount}</Title>
          <p></p>
          <Title level={5} className={classes.f14}><img src={deliverycharges} className={classes.iconimg} /> Min. Order {props.minorder}</Title>
          <p></p>
          <Title level={5} className={classes.f14}><img src={imgclock} className={classes.iconimg} />15 - 45 Min</Title> */}

              <Avatar
                src={offdishes}
                size={80}
                style={{
                  position: "absolute",
                  left: -9,
                  top: 1,
                  borderRadius: "0 45px 0 0",
                }}
              />
            </Col>
          </Row>
        </Card>
      ) : (
        <Card
          // title="Card title"
          onClick={() =>
            props.restaurant == "1"
              ? setIsModalVisible(true)
              : history.push("/Menu/" + props.id)
          }
          className={classes.paper}
          style={
            props.restaurant == "1"
              ? { background: "#fdfdfd", marginRight: 10 }
              : { marginRight: 10 }
          }
        >
          <Row>
            <Col span={3} style={{ margin: "auto", textAlign: "initial" }}>
              <span>
                <img
                  style={{ objectFit: "cover", width: "95px" }}
                  src={
                    "https://deliveryguru.co.uk/images/hotelogo/" +
                    props.id +
                    ".png" != null ? "https://deliveryguru.co.uk/images/hotelogo/" +
                    props.id +
                    ".png" : dummyimage
                  }
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src=dummyimage;
                  }}
                />
              </span>
            </Col>
            <Col
              span={9}
              style={{
                textAlign: "left",
                flexDirection: "row",
                paddingRight: 10,
                paddingLeft: 10,
              }}
            >
              <Title
                className={classes.f15}
                level={5}
                style={{ fontWeight: 900 }}
              >
                {props.hotelname}
              </Title>
              <p></p>
              <Title level={5} className={classes.f14}>
                {props.foodtype}
              </Title>

              <p>
                <span>
                 
                  <Rate  defaultValue={parseFloat(totalrate).toFixed(1)} className={classes.f14} />{" "}
                 {totalrate != 0 ? totalrate : 0}  ({Review.length}) &nbsp; 
                </span>
                {/* <span>
              <img src={img} className={classes.iconimg} />
            </span> */}

                {/* <span>
              <img src={img2} className={classes.iconimg} />
            </span> */}
                {/* {props.restaurant !== 1 ? null : (
              <span>
                <img src={img3} className={classes.iconimg} />
              </span>
            )}
            {props.restaurant !== 1 && props.delivery !== 1 ? null : (
              <span>
                <img src={img4} className={classes.iconimg} />
              </span>
            )} */}
              </p>
            </Col>
            <Col
              span={8}
              style={{
                textAlign: "left",
                flexDirection: "row",
                paddingRight: 29,
              }}
            >
              <Title level={5} className={classes.f14}>
                <img src={imgdiscount} className={classes.iconimg} /> Discount{" "}
                &nbsp;&nbsp; {props.discountvalue} %
              </Title>
              <Title level={5} className={classes.f14}>
                {" "}
                <img src={deliverycharges} className={classes.iconimg} />
                Delivery &#8356; {props.charges != null
                  ? props.charges
                  : 0}{" "}
                &nbsp;Min. order {props.minorder}
              </Title>
              <Title level={5} className={classes.f14}>
                <span>
                  <img src={imgclock} className={classes.iconimg} />
                  15 - 45 Min
                </span>
                <span>
                  {" "}
                  {props.restaurant !== 1 ? null : (
                    <span style={{ float: "right", paddingRight: 10 }}>
                      <img src={img3} className={classes.iconimg} />
                    </span>
                  )}
                  {props.restaurant !== 1 && props.delivery !== 1 ? null : (
                    <span style={{ float: "right", paddingRight: 10 }}>
                      <img src={img4} className={classes.iconimg} /> $5
                    </span>
                  )}
                </span>{" "}
              </Title>

              {/*        
          <Title level={5} className={classes.f14}><span><img src={imgdiscount} className={classes.iconimg}/></span> Discount {props.discount}</Title>
          <p></p>
          <Title level={5} className={classes.f14}><img src={deliverycharges} className={classes.iconimg} /> Min. Order {props.minorder}</Title>
          <p></p>
          <Title level={5} className={classes.f14}><img src={imgclock} className={classes.iconimg} />15 - 45 Min</Title> */}
            </Col>
            <Col
              span={4}
              style={{
                margin: "auto",
                textAlign: "initial",
                position: "relative",
              }}
            >
              <img
                style={{
                  width: "100%",
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 10,
                }}
                src="https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,f_auto,q_auto,h_161,w_436,d_uk:cuisines:african-3.jpg/v1/uk/restaurants/18133.jpg"
              />

              <Avatar
                src={offdishes}
                size={80}
                style={{
                  position: "absolute",
                  left: -9,
                  top: 1,
                  borderRadius: "0 45px 0 0",
                }}
              />
              <i>{distance}</i>
            </Col>
          </Row>
        </Card>
      )}

      <Modal
        title="Closed Now!!"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <img
          style={{ objectFit: "cover", width: "100%", height: "300px" }}
          src={"https://grill-guru.co.uk/img/closepopimg.jpg"}
        />
      </Modal>
    </>
  );
}

{
  /* <Grid container lg={12}>
<Grid item xs={12} lg={2}>
  <Image
    width={100}
    src={
      "https://deliveryguru.co.uk/images/hotelogo/" + props.id + ".png"
    }
  />
</Grid>

<Grid item xs={12} lg={6} style={{ textAlign: "left" }}>
  <Title level={3}>{props.hotelname}</Title>
  <p></p>
  <Title level={5}>{props.foodtype}</Title>

  <p>
    <span>
      <img src={img} className={classes.iconimg} />
    </span>

    <span>
      <img src={img2} className={classes.iconimg} />
    </span>
    {props.restaurant !== 1 ? null : (
      <span>
        <img src={img3} className={classes.iconimg} />
      </span>
    )}
    {props.restaurant !== 1 && props.delivery !== 1 ? null : (
      <span>
        <img src={img4} className={classes.iconimg} />
      </span>
    )}
  </p>
</Grid>
<Grid
  lg={4}
  style={{ textAlign: "end", flexDirection: "row", paddingRight: 10 }}
>
  <Title level={4}>Discount {props.discount}</Title>
  <p></p>
  <Title level={4}>Min. Order {props.minorder}</Title>
  <p></p>
  <Title level={4}>15 - 45 Min</Title>
</Grid>
</Grid> */
}

const mapStateToProps = (state) => {
  return {
    products: state.product.products,
    hotel: state.hotel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToHotel: (product) => {
      dispatch(addToHotel(product));
    },
  };
};
// UPDATE_CART_QUANTITY
export default connect(mapStateToProps, mapDispatchToProps)(Offercard);
