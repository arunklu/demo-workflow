import React, { useEffect, useState, forwardRef } from "react";
import { filter } from "lodash";
import {
  addToCart,
  updateCartQuantity,
  removeFromCart,
  preordertime,
  preorderdate
} from "../store/actions/cartActions";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, } from "antd";
import { StickyContainer, Sticky } from "react-sticky";
import { isMobile } from "react-device-detect";
import Whirligig from "react-whirligig";
import {
  Row,
  Col,
  Empty,
  Modal,
  DatePicker,
  Badge,
  Button,
  Skeleton,
  Select
} from "antd";
import {
  CaretRightOutlined,
  CaretLeftOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import getTimeIntervals from "../utils/siteUtils";
import Modalcard from "./Modalcard";
import Scrollspy from "react-scrollspy";
import ScrollTo from "react-scroll-into-view";
import styled from "styled-components";
import moment from "moment";
import "./styles.css";
import { Link, Element } from "react-scroll";
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select
const useStyles = makeStyles({
  imgheight: {
    width: "100%",
    objectFit: "cover",
    height: "60px",
  },
  f_14: {
    fontSize: 14,
  },
  paracenter: {
    textAlign: "left",
    paddingLeft: "12px",
    marginTop: "-9px",
    fontSize: 14,
  },
  starimg: {
    height: "25px",
    width: "25px",
  },
  p20: {
    padding: "8px",
    height: "100%",
    VerticalAlign: "middle",
  },
  w100: {
    height: "85px",
  },
  fontpara: {
    fontWeight: 500,
    color: "lightgrey",
    maxWidth: "100%",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginBottom: "-10px",
  },
});
const style = {
  height: "100vh",
  backgroundColor: "#ddd",
  padding: "20px 10px 10px 10px",
};

function Sidebarmenucard(props, ref) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [image, setImage] = useState("");
  const [details, setDetails] = useState("");
  const [pname, setPname] = useState("");
  const [desc, setDesc] = useState("");
  const [preorder, setPreorder] = useState([]);
  const [getdata, setGetdata] = useState();
  const [matchid, setmatchid] = useState([]);
  const canceldialog = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const classes = useStyles();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pid, setPid] = useState("");
  const [categoriesid, setcategoriesid] = useState("");
  const [state, setstate] = useState([]);
  const [datssubmenu, setDatasubmenu] = useState("");
  const [hotelname, setHotelname] = useState("");
  const [price, setPrice] = useState("");
  const [curenttime, setCurrnettime] = useState(moment().format("LT"));
  const [isPreModalVisible, setIsPreModalVisible] = useState(false);
  const [isPreordercloseVisible, setIsPreordercloseVisible] = useState(false);

  let [listname, setListName] = useState("Nate");

  let nameRef = forwardRef();
  const [today, setToday] = useState(moment().format("dddd"));
  const [rest_status, setRest_status] = useState();
  const [delivery_status, setDelivery_status] = useState();
  const [preordertime, setPreordertime] = useState("");
  const [preorderdate,  setPreorderdate] = useState("");
  const [err, setErr] = useState("");
  const [deliverytime, setDeliverytime] = useState("");
  // let rest_status = 0;
  let Options = [];
  let ukTime = new Date().toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/London",
  });
  function showModal() {
    setIsPreModalVisible(true);
  }
  const handleCancelpre = () => {
    setIsPreModalVisible(false);
  };

  function handleOk() {
    if (props.preordertime === "" || props.preorderdate === "") {
      setErr("Fields are compulsory");
    } else {
      setIsPreModalVisible(false);
      setIsModalVisible(true);
      setPid(getdata.pid);
      setImage(getdata.image);
      setHotelname(getdata.name);
      setDesc(getdata.details);
      setDetails(getdata.hotelid);
      setPrice(getdata.price);
      setcategoriesid(getdata.categorieid);
    }
    setGetdata({});
  }
  function preorderclose() {
    setIsPreordercloseVisible(false);
  }

  const statuscheck = () => {
    const apiurlorderstatus = `https://deliveryguru.co.uk/dg_api/restaurentdelandorder_status/${props.hotelid}`;
    fetch(apiurlorderstatus)
      .then((res) => res.json())
      .then((result) => {
        console.log("statuscheck", result);
        // console.log("status",result[0].rest_status,"delivery status",result[0].delivery_status)
        setRest_status(result[0].rest_status);
        setDelivery_status(result[0].delivery_status);
      });
  };
console.log("side-->",props)
  ///////////initial data and restaurant opening/close api call
  useEffect(() => {
    statuscheck();
    ///////restaruant date and time api
    const apiUrlcheckpreorder = `https://deliveryguru.co.uk/dg_api/getopeninghoursByHotelAndType/${props.hotelid}/delivery`;
    fetch(apiUrlcheckpreorder)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result-->", result);
          let tempdata =
            result[0] &&
            result[0].restStatus &&
            JSON.parse(result[0].restStatus);
          let parsedata = [
            {
              day: "Sunday",
              data: [
                {
                  delivery: [
                    {
                      status: tempdata.w1_rest_del_status,
                      open: tempdata.w1_rest_del_open,
                      close: tempdata.w1_rest_del_close,
                      lunchopen: tempdata.w1_rest_del_lunch_open,
                      lunchclose: tempdata.w1_rest_del_lunch_close,
                      lunchstatus: tempdata.w1_rest_del_lunch_status,
                      dinnerstatus: tempdata.w1_rest_del_dinner_status,
                      dinneropen: tempdata.w1_rest_del_dinner_open,
                      dinnerclose: tempdata.w1_rest_del_dinner_close,
                    },
                  ],
                  collection: [
                    {
                      status: tempdata.w1_rest_coll_status,
                      open: tempdata.w1_rest_coll_open,
                      close: tempdata.w1_rest_coll_close,
                      lunchopen: tempdata.w1_rest_coll_lunch_open,
                      lunchclose: tempdata.w1_rest_coll_lunch_close,
                      lunchstatus: tempdata.w1_rest_coll_lunch_status,
                      dinnerstatus: tempdata.w1_rest_coll_dinner_status,
                      dinneropen: tempdata.w1_rest_coll_dinner_open,
                      dinnerclose: tempdata.w1_rest_coll_dinner_close,
                    },
                  ],
                },
              ],
            },
            {
              day: "Monday",
              data: [
                {
                  delivery: [
                    {
                      status: tempdata.w2_rest_del_status,
                      open: tempdata.w2_rest_del_open,
                      close: tempdata.w2_rest_del_close,
                      lunchopen: tempdata.w2_rest_del_lunch_open,
                      lunchclose: tempdata.w2_rest_del_lunch_close,
                      lunchstatus: tempdata.w2_rest_del_lunch_status,
                      dinnerstatus: tempdata.w2_rest_del_dinner_status,
                      dinneropen: tempdata.w2_rest_del_dinner_open,
                      dinnerclose: tempdata.w2_rest_del_dinner_close,
                    },
                  ],
                  collection: [
                    {
                      status: tempdata.w2_rest_coll_status,
                      open: tempdata.w2_rest_coll_open,
                      close: tempdata.w2_rest_coll_close,
                      lunchopen: tempdata.w2_rest_coll_lunch_open,
                      lunchclose: tempdata.w2_rest_coll_lunch_close,
                      lunchstatus: tempdata.w2_rest_coll_lunch_status,
                      dinnerstatus: tempdata.w2_rest_coll_dinner_status,
                      dinneropen: tempdata.w2_rest_coll_dinner_open,
                      dinnerclose: tempdata.w2_rest_coll_dinner_close,
                    },
                  ],
                },
              ],
            },
            {
              day: "Tuesday",
              data: [
                {
                  delivery: [
                    {
                      status: tempdata.w3_rest_del_status,
                      open: tempdata.w3_rest_del_open,
                      close: tempdata.w3_rest_del_close,
                      lunchopen: tempdata.w3_rest_del_lunch_open,
                      lunchclose: tempdata.w3_rest_del_lunch_close,
                      lunchstatus: tempdata.w3_rest_del_lunch_status,
                      dinnerstatus: tempdata.w3_rest_del_dinner_status,
                      dinneropen: tempdata.w3_rest_del_dinner_open,
                      dinnerclose: tempdata.w3_rest_del_dinner_close,
                    },
                  ],
                  collection: [
                    {
                      status: tempdata.w3_rest_coll_status,
                      open: tempdata.w3_rest_coll_open,
                      close: tempdata.w3_rest_coll_close,
                      lunchopen: tempdata.w3_rest_coll_lunch_open,
                      lunchclose: tempdata.w3_rest_coll_lunch_close,
                      lunchstatus: tempdata.w3_rest_coll_lunch_status,
                      dinnerstatus: tempdata.w3_rest_coll_dinner_status,
                      dinneropen: tempdata.w3_rest_coll_dinner_open,
                      dinnerclose: tempdata.w3_rest_coll_dinner_close,
                    },
                  ],
                },
              ],
            },
            {
              day: "Wednesday",
              data: [
                {
                  delivery: [
                    {
                      status: tempdata.w4_rest_del_status,
                      open: tempdata.w4_rest_del_open,
                      close: tempdata.w4_rest_del_close,
                      lunchopen: tempdata.w4_rest_del_lunch_open,
                      lunchclose: tempdata.w4_rest_del_lunch_close,
                      lunchstatus: tempdata.w4_rest_del_lunch_status,
                      dinnerstatus: tempdata.w4_rest_del_dinner_status,
                      dinneropen: tempdata.w4_rest_del_dinner_open,
                      dinnerclose: tempdata.w4_rest_del_dinner_close,
                    },
                  ],
                  collection: [
                    {
                      status: tempdata.w4_rest_coll_status,
                      open: tempdata.w4_rest_coll_open,
                      close: tempdata.w4_rest_coll_close,
                      lunchopen: tempdata.w4_rest_coll_lunch_open,
                      lunchclose: tempdata.w4_rest_coll_lunch_close,
                      lunchstatus: tempdata.w4_rest_coll_lunch_status,
                      dinnerstatus: tempdata.w4_rest_coll_dinner_status,
                      dinneropen: tempdata.w4_rest_coll_dinner_open,
                      dinnerclose: tempdata.w4_rest_coll_dinner_close,
                    },
                  ],
                },
              ],
            },
            {
              day: "Thursday",
              data: [
                {
                  delivery: [
                    {
                      status: tempdata.w5_rest_del_status,
                      open: tempdata.w5_rest_del_open,
                      close: tempdata.w5_rest_del_close,
                      lunchopen: tempdata.w5_rest_del_lunch_open,
                      lunchclose: tempdata.w5_rest_del_lunch_close,
                      lunchstatus: tempdata.w5_rest_del_lunch_status,
                      dinnerstatus: tempdata.w5_rest_del_dinner_status,
                      dinneropen: tempdata.w5_rest_del_dinner_open,
                      dinnerclose: tempdata.w5_rest_del_dinner_close,
                    },
                  ],
                  collection: [
                    {
                      status: tempdata.w5_rest_coll_status,
                      open: tempdata.w5_rest_coll_open,
                      close: tempdata.w5_rest_coll_close,
                      lunchopen: tempdata.w5_rest_coll_lunch_open,
                      lunchclose: tempdata.w5_rest_coll_lunch_close,
                      lunchstatus: tempdata.w5_rest_coll_lunch_status,
                      dinnerstatus: tempdata.w5_rest_coll_dinner_status,
                      dinneropen: tempdata.w5_rest_coll_dinner_open,
                      dinnerclose: tempdata.w5_rest_coll_dinner_close,
                    },
                  ],
                },
              ],
            },
            {
              day: "Friday",
              data: [
                {
                  delivery: [
                    {
                      status: tempdata.w6_rest_del_status,
                      open: tempdata.w6_rest_del_open,
                      close: tempdata.w6_rest_del_close,
                      lunchopen: tempdata.w6_rest_del_lunch_open,
                      lunchclose: tempdata.w6_rest_del_lunch_close,
                      lunchstatus: tempdata.w6_rest_del_lunch_status,
                      dinnerstatus: tempdata.w6_rest_del_dinner_status,
                      dinneropen: tempdata.w6_rest_del_dinner_open,
                      dinnerclose: tempdata.w6_rest_del_dinner_close,
                    },
                  ],
                  collection: [
                    {
                      status: tempdata.w6_rest_coll_status,
                      open: tempdata.w6_rest_coll_open,
                      close: tempdata.w6_rest_coll_close,
                      lunchopen: tempdata.w6_rest_coll_lunch_open,
                      lunchclose: tempdata.w6_rest_coll_lunch_close,
                      lunchstatus: tempdata.w6_rest_coll_lunch_status,
                      dinnerstatus: tempdata.w6_rest_coll_dinner_status,
                      dinneropen: tempdata.w6_rest_coll_dinner_open,
                      dinnerclose: tempdata.w6_rest_coll_dinner_close,
                    },
                  ],
                },
              ],
            },
            {
              day: "Saturday",
              data: [
                {
                  delivery: [
                    {
                      status: tempdata.w7_rest_del_status,
                      open: tempdata.w7_rest_del_open,
                      close: tempdata.w7_rest_del_close,
                      lunchopen: tempdata.w7_rest_del_lunch_open,
                      lunchclose: tempdata.w7_rest_del_lunch_close,
                      lunchstatus: tempdata.w7_rest_del_lunch_status,
                      dinnerstatus: tempdata.w7_rest_del_dinner_status,
                      dinneropen: tempdata.w7_rest_del_dinner_open,
                      dinnerclose: tempdata.w7_rest_del_dinner_close,
                    },
                  ],
                  collection: [
                    {
                      status: tempdata.w7_rest_coll_status,
                      open: tempdata.w7_rest_coll_open,
                      close: tempdata.w7_rest_coll_close,
                      lunchopen: tempdata.w7_rest_coll_lunch_open,
                      lunchclose: tempdata.w7_rest_coll_lunch_close,
                      lunchstatus: tempdata.w7_rest_coll_lunch_status,
                      dinnerstatus: tempdata.w7_rest_coll_dinner_status,
                      dinneropen: tempdata.w7_rest_coll_dinner_open,
                      dinnerclose: tempdata.w7_rest_coll_dinner_close,
                    },
                  ],
                },
              ],
            },
          ];
          // console.log("parsedata", parsedata);
          setPreorder(parsedata);
        },
        (error) => {
          console.log("apiUrlcheckpreorder", error);
        }
      );
  }, [props]);

  setInterval(statuscheck(), 60000);
  //////converting 24 format
  function convertTo24HrsFormat(time) {
    const slicedTime = time.split(/(PM|AM)/gm)[0];

    let [hours, minutes] = slicedTime.split(":");

    if (hours === "12") {
      hours = "00";
    }

    let updateHourAndMin;

    function addition(hoursOrMin) {
      updateHourAndMin =
        hoursOrMin.length < 2 ? (hoursOrMin = `${0}${hoursOrMin}`) : hoursOrMin;

      return updateHourAndMin;
    }

    if (time.endsWith("PM")) {
      hours = parseInt(hours, 10) + 12;
    }

    return `${addition(hours)}:${addition(minutes)}`;
  }
  //////preorder eligibility checks
  const preorderCheck = (
    pid,
    hotelid,
    image,
    name,
    details,
    price,
    categorieid
  ) => {
    console.log("preordercheck allowed");
    if (rest_status === 0) {
      preorder.forEach((el, i) => {
        console.log("preordercheck");
        if (el.day === today) {
          el.data.forEach((item, index) => {
            if (
              item.collection.filter((data) => data.status === 0) &&
              item.delivery.filter((itm) => itm.status === 0)
            ) {
              let collection = item.collection.filter((data) => data);
              let delivery = item.delivery.filter((data) => data);
              let temp = { start: delivery[0].open, close: delivery[0].close };
              setDeliverytime(temp);
              if (
                collection[0].open > ukTime &&
                delivery[0].open > ukTime &&
                collection[0].close < ukTime &&
                delivery[0].close < ukTime
              ) {
                if (props.preordertime === "" && props.preorderdate === "") {
                  setIsPreModalVisible(true);
                  let temp = {
                    pid: pid,
                    image: image,
                    name: name,
                    hotelid: hotelid,
                    price: price,
                    details: details,
                    categorieid: categorieid,
                  };
                  setGetdata(temp);
                  console.log("poptruepreorder");
                } else if (props.preordertime !== "" && props.preorderdate !== "") {
                  console.log("afterpreorder data");
                  setIsModalVisible(true);
                  setPid(pid);
                  setImage(image);
                  setHotelname(name);
                  setDesc(details);
                  setDetails(hotelid);
                  setPrice(price);
                  setcategoriesid(categorieid);
                }
              } else if (
                (collection[0].open >= ukTime &&
                  delivery[0].open >= ukTime) ||
                (collection[0].close <= ukTime &&
                  delivery[0].close <= ukTime)
              ) {
                setIsModalVisible(true);
                setPid(pid);
                setImage(image);
                setHotelname(name);
                setDesc(details);
                setDetails(hotelid);
                setPrice(price);
                setcategoriesid(categorieid);
                console.log("nopreorder");
              }
            }
          });
        }
      });
    } else if (rest_status === 1) {
      setIsPreordercloseVisible(true);
    }
    console.log("preorder-->executed");
  };
  /////////////pre-order time option
  if (rest_status === 0) {
    preorder.forEach((el, i) => {
      if (el.day === today) {
        el.data.forEach((item, index) => {
          if (
            item.collection.filter((data) => data.status === 0) &&
            item.delivery.filter((itm) => itm.status === 0)
          ) {
            let delivery = item.delivery.filter((data) => data);
            Options.push(
              ...getTimeIntervals(delivery[0].open, delivery[0].close)
            );
          }
        });
      }
    });
  }
  //////////
const _onSelecttime =(val)=>{
  setPreordertime(val)
  props.ordertime(val)
}
let data=1;
let count=0
const newdata=0;
let whirligig;
    const next = () => whirligig.next();
    const prev = () => whirligig.prev();
  console.log("props.cart-->",props.preorderdate)
  return (
    <>
      {props.datapart.length > 0 ? (
        <>
        {/* <Button type="primary" onClick={()=>setIsPreModalVisible(true)}>Preorder data openedbc</Button> */}
          <StickyContainer
            id="list"
            style={{
              height: "100vh",
              overflowY: "scroll",
              width: "100%",
              marginTop: 20,
            }}
          >
               <Row>
            <Col span={1}>
            <Button
                  onClick={prev}
                  shape="circle"
                  icon={<CaretLeftOutlined />}
                  size="large"
                  style={{ marginTop:'72%' }}
                />
            </Col>

            <Col span={22}>
            <Whirligig
              visibleSlides={isMobile ? 2 : 2}
              gutter="1em"
              ref={(_whirligigInstance) => {
                whirligig = _whirligigInstance;
              }}
              className="scrollercuisine"
            >
              {props.sliderdata != null ? (
                props.sliderdata.map((data) => (
                  <Card
                    hoverable
                    onClick={() =>
                      preorderCheck(
                        data.id,
                        props.hotelid,
                        data.image,
                        data.item_name,
                        data.item_desc,
                        data.price
                      )
                    }
                    style={{ marginLeft: 7, textAlign: "left" ,borderRadius:7 }}
                    // cover={<img alt="example" src={listres2} />}
                  >
                    <p><b>{data.item_name}</b></p>
                    <Text ellipsis={true}>{data.item_desc}</Text>
                    <p><b>&#163; {data.price}</b></p>
                  </Card>
                ))
              ) : (
                <Skeleton active avatar lg={24} size="large" />
              )}
            </Whirligig>
            </Col>

            <Col span={1}>
            <Button
                      shape="circle"
                      onClick={next}
                      icon={<CaretRightOutlined />}
                      size="large"
                      style={{ marginTop:'72%' }}
                    />
            </Col>
  </Row>
            {props.datapart !== null &&
              props.datapart.map((val, i) => {
                let cat = val.name;
                return (
                  <Element
                    name={val.id.toString()}
                    className={val.id}
                    key={"display" + val.id}
                    data-bs-spy="scroll"
                  >
                    <Title
                      level={4}
                      id={val.id}
                      lg={24}
                      nameRef={ref}
                      style={{
                        textAlign: "left",
                        width: "100%",
                        clear: "both",
                        padding: "0 10px",
                        paddingTop: 30,
                      }}
                      name={val.id.toString()}
                      className={val.id}
                      key={"display" + val.id}
                    >
                      {val.name}
                      {/* <p>{isCatChange ?"yes" : "no"}</p> */}
                    </Title>
                    {val.value.map((value, i) => {
                      let checkBadge=[];
                      return(
                      <Card className="listcard" style={{ padding: 0 }}>
                        <Row>
                          {value.image !== "dummy.jpg" ? (
                            <>
                              <Col
                                span={17}
                                style={{
                                  textAlign: "left",
                                  padding: "7px 11px",
                                  height: 100,
                                }}
                                onClick={() =>
                                  preorderCheck(
                                    value.id,
                                    props.hotelid,
                                    value.image,
                                    value.item_name,
                                    value.item_desc,
                                    value.price,
                                    value.categories_id
                                  )
                                }
                              >
                                <Title
                                  level={5}
                                  ellipsis={true}
                                  style={{ paddingLeft: 0 }}
                                >
                                  {props.cart.length > 0 &&
                                  props.cart.map((cartdata, index) =>{
                                    let count=0
                                    props.cart.forEach((item)=>{
                                      if(item.id===value.id){
                                        count+=1;
                                      }
                                    })  
                                    if(!checkBadge.some((el)=>el.name===cartdata.name)){
                                      checkBadge.push(cartdata);
                                    return(
                                    cartdata.id === value.id ? (
                                      <Badge
                                        count={count}
                                        style={{
                                          background: "#f5222d",
                                          color: "#fff",
                                        }}
                                      /> 
                                    ) : null
                                    )
                                  }
                                  
                                  })
                                  }
                                  {value.item_name}
                                </Title>
                                <Text ellipsis={true}>{value.item_desc}</Text>
                                <br />
                                <Text strong>&#163; {value.price}</Text>
                              </Col>
                              <Col span={1}></Col>
                              <Col span={6} style={{ margin: "0px" }}>
                                <img
                                  style={{ width: "100%", height: 100 }}
                                  src={
                                    "https://deliveryguru.co.uk/admin/images/itemimages/" +
                                    value.image
                                  }
                                />
                              </Col>
                            </>
                          ) : (
                            <Col
                              span={22}
                              style={{
                                textAlign: "left",
                                padding: "7px 11px",
                                height: 100,
                              }}
                              onClick={() =>
                                preorderCheck(
                                  value.id,
                                  props.hotelid,
                                  value.image,
                                  value.item_name,
                                  value.item_desc,
                                  value.price,
                                  value.categories_id
                                )
                              }
                            >
                              <Title level={5} ellipsis={true}>
                                {props.cart.length > 0 &&
                                  props.cart.map((cartdata, index) =>{
                                    let count=0
                                    props.cart.forEach((item)=>{
                                      if(item.id===value.id){
                                        count+=1;
                                      }
                                    })  
                                    if(!checkBadge.some((el)=>el.name===cartdata.name)){
                                      checkBadge.push(cartdata);
                                    return(
                                    cartdata.id === value.id ? (
                                      <Badge
                                        count={count}
                                       
                                        style={{
                                          background: "#f5222d",
                                          color: "#fff",
                                        }}
                                      /> 
                                    ) : null
                                    )
                                  }
                                  
                                  })
                                  }
                                {value.item_name}
                              </Title>
                              <Text ellipsis={true}>{value.item_desc}</Text>
                              <br />
                              <Text strong>&#163; {value.price}</Text>
                            </Col>
                          )}
                        </Row>
                      </Card>
                    )})}
                  </Element>
                );
              })}
          </StickyContainer>
        </>
      ) : (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 160,
            marginTop: 100,
          }}
          description={<span>Not Present Any Dish</span>}
        ></Empty>
      )}
      <Modal
        title="Closed Now!!"
        visible={isPreModalVisible}
        onOk={handleOk}
        onCancel={handleCancelpre}
        // bodyStyle={{ height: "0%" }}
        className="hotelsdetails"
        centered={true}
        width="350px"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h2>Pre order</h2>
          <label>
           
            Date :
            <br />
            <DatePicker
              style={{ width: "300px", marginLeft: "15px" }}
              onChange={(date, dateString) => props.orderdate(dateString)}
              disabledDate={(current)=> {
                let startDate = moment().subtract(1, 'days') 
                let endDate = moment().add(6, 'days')
                return current < startDate || current > endDate;
             } }
             inputReadOnly={true}
             width="300px"
            />
          </label>
          <label>
            {" "}
            Time :
            <br />
            <Select
              placeholder={"please select Time"}
              options={Options}
              id="selectpreorder"
              onChange={_onSelecttime}
              style={{ width: "300px", marginLeft: "15px" }}
              width="300px"
            />
          </label>
        </div>
        <div style={{ color: "red" }}>{err}</div>
      </Modal>
      <Modal
        title="Closed Now!!"
        visible={isPreordercloseVisible}
        onOk={preorderclose}
        onCancel={handleCancelpre}
      >
        <h4
          className="container"
          style={{ justifyContent: "center", color: "red" }}
        >
          SORRY!! WE ARE CLOSED NOW
        </h4>
        <table>
          <tr>
            <th>Day</th>
            <th>Opening Hours</th>
            <th>Closing Hours</th>
          </tr>
          {preorder.map((val, key) => {
            return val.data.map((el, i) => {
              return el.delivery.map((item, inx) => {
                return (
                  <tr
                    key={key}
                    style={{
                      color: val.day === today ? "white" : null,
                      background: val.day === today ? "green" : null,
                    }}
                  >
                    <td>
                      <div>{val.day}</div>
                    </td>
                    <td>{item.open}</td>
                    <td>{item.close}</td>
                  </tr>
                );
              });
            });
          })}
        </table>
      </Modal>
      {/* )} */}
      <Modalcard
        canceldialog={canceldialog}
        open={isModalVisible}
        modalhide={handleCancel}
        itemId={pid}
        image={image}
        detaildata={desc}
        hotelname={hotelname}
        sub_menu={filter(datssubmenu, function (data) {
          return data.id == pid;
        })}
        id={pid}
        hotelid={details}
        price={price}
        cId={categoriesid}
        
      />
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    products: state.product.products,
    cart: state.cart.cart,
    preorderdate:state.product.preorderdate,
    preordertime:state.product.preordertime
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => {
      dispatch(addToCart(product));
    },
    updateToCart: (productId) => {
      dispatch(updateCartQuantity(productId));
    },
    removeTocart: (productId) => {
      dispatch(removeFromCart(productId));
    },
    ordertime:(time)=>{
      dispatch(preordertime(time))
    },
    orderdate:(date)=>{
      dispatch(preorderdate(date))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebarmenucard);
