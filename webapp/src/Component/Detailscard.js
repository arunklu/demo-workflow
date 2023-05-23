import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Card } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import star from "../image/star.png";
import Location from "../image/location.png";
import {
  Button,
  Tag,
  Rate,
  Modal,
  Tabs,
  Divider,
  List,
  Avatar,
  Row,
  Col,
  Collapse,
  Calendar,
  Input,
  Select,
  Radio,
} from "antd";
import {
  TwitterOutlined,
  YoutubeOutlined,
  LinkedinOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { addToHotel } from "../store/actions/cartActions";
import { Hotel } from "@material-ui/icons";
import Map from "./Map";
import { useCookies } from "react-cookie";
const { TabPane } = Tabs;
const { Option } = Select;
const { Panel } = Collapse;

const useStyles = makeStyles({
  cardstyle: {
    textAlign: "left",
    objectFit: "cover",
    borderRadius: 20,
    margin: 9,
    "@media (max-width: 600px)": {
      textAlign: "center",
      objectFit: "cover",
      borderRadius: 20,
      margin: 9,
    },
  },
  imgwidth: {
    objectFit: "contain",
    width: "100%",
    height: "150px",
    marginTop:20,
    "@media (max-width: 600px)": {
      objectFit: "cover",
      width: "100%",
      height: "100px",
    },
  },
  textcolor: {
    color: "#000",
  },
  cardside: {
    paddingLeft: "19px",
  },
  starttext: {
    color: "silver",
  },
  starwidth: {
    width: "20px",
    height: "20px",
  },
  hotelstatus: {
    float: "right",
    "@media (max-width: 600px)": {
      position: "absolute",
      top: "10%",
      right: "0",
    },
  },
});

function Detailscard(props) {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [details, setDetails] = useState([]);
  const [Star, setStar] = useState(3);
  const [hotel, setHotel] = useState(null);
  const [times, setTimes] = useState([]);
  const [hoteldetail, sethoteldetail] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalavailableVisible, setIsModalavailableVisible] = useState(false);
  const [cookies, setCookie] = useCookies([]);
  const [available, setavailable] = useState(null);
  const [Person, setPerson] = useState(null);
  const [Foodtype, setFoodtype] = useState(null);
  const [date, setdate] = useState(null);
  const [value3, setvalue3] = useState(null);
  const [Book, setBook] = useState(null);
  const [name, setname] = useState(null);
  const [email, setemail] = useState(null);
  const [mobile, setmobile] = useState(null);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [Review,setReview]=useState([]);
  const mapfrommenu=true

  const showReviewModal = () => {
    
    setIsReviewModalVisible(true);
  };

  const handleReviewOk = () => {
    setIsReviewModalVisible(false);
  };

  const handleReviewCancel = () => {
    setIsReviewModalVisible(false);
  };
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

  function onPanelChange(value, mode) {
    alert(value.format("YYYY-MM-DD"), mode);
    setdate(value.format("YYYY-MM-DD"), mode);
  }
  function onChange1(value) {
    console.log(`selected ${value}`);
    setPerson(value);
  }
  function onChange2(value) {
    console.log(`selected ${value}`);
    setFoodtype(value);
  }

  const onChange3 = (e) => {
    console.log("radio3 checked", e.target.value);
    setvalue3(e.target.value);
  };
  const showModal = () => {
    setIsModalVisible(true);

    const apiurl =
      "https://deliveryguru.co.uk/dg_api/getopeninghoursByHotelAndType/" +
      props.id +
      "/delivery";
    fetch(apiurl)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setTimes(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const showavailability = () => {
    setIsModalavailableVisible(true);
  };

  const showdatatable = () => {
    const data = JSON.stringify({
      //       "hotel_id" : "123",
      // "bookingid" : Date.parse(new Date()),
      // "tableNo" : "0",
      // "title" : "0",
      // "fname": name,
      // "lname": "",
      // "phonenumber": mobile,
      // "email" : email,
      // "created_date": date,
      // "updated_date" : "0",
      // "time" : date,
      // "timing": value3,
      // "person": Person,
      // "location": "0",
      // "bookingtime": value3,
      // "table_type": Foodtype,
      // "hotel_name":window.sessionStorage.getItem("hproductname"),
      // "hotel_email":"order@deliveryguru.co.uk"

      hotel_id: props.id,
      created_date: Date.parse(new Date()),
      time: Foodtype,
      timing: value3,
      table_type: 2,
    });

    const apiurl = "https://deliveryguru.co.uk/dg_api/checkavalability";
    fetch(apiurl, {
      method: "POST",
      body: { data },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          alert(JSON.stringify(result));
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleavailableOk = () => {
    showdatatable();
    setIsModalavailableVisible(false);
  };

  const handleavailableCancel = () => {
    setIsModalavailableVisible(false);
  };
  const handleChange = (value) => {
    setStar(value);
  };

  function callback(key) {
    console.log(key);
  }
  useEffect(() => {

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
        setIsLoaded(true);
        setError(error);
      }
    );


    const apiurl =
      "https://deliveryguru.co.uk/dg_api/getRestaurantsDetails/" + props.id;
    fetch(apiurl)
      .then((res) => res.json())
      .then(
        (result) => {
          // alert(JSON.stringify(result))
          setIsLoaded(true);
          setDetails(result);

          result.map(
            (data) => (
              window.sessionStorage.setItem("deslat", data.lat),
              window.sessionStorage.setItem("deslng", data.longt),
              window.sessionStorage.setItem("hproductname", data.hotel_name),
              window.sessionStorage.setItem("hproductid", data.id),
              window.sessionStorage.setItem("hproductcid", data.hotel_refid),
              window.sessionStorage.setItem("hproductdid", data.discount),
              setHotel(data.hotel_name),
              savehotel(result, data.hotel_name)
            )
          );
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );


     
  }, [props]);
  const savehotel = (data, hotelname) => {
    if (props.hotel.hotel.length != 1) {
      props.addToHotel(data);
    }
  };
  const hotelrating=Review.length;
  const urlbanner =    "https://deliveryguru.co.uk/MobileImages/BottomNavigation/Banner/";
  return (
    <>
      {details.map((data) => (
        <Card
          className={classes.cardstyle}
          
        >
          <Grid container>
            <br />
            <Grid lg={6} style={{
              borderRadius:20,
            backgroundImage: "URL(" + urlbanner + data.banner + ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          >
              <img
                src={
                  "https://deliveryguru.co.uk/images/hotelogo/" +
                  props.id +
                  ".png"
                }
                className={classes.imgwidth}
              />
            </Grid>
            <Grid lg={6} className={classes.cardside}>
              <h2 className={classes.textcolor}>{data.hotel_name}</h2>
              <h4 style={{ color: "#000" }}>{data.type.replace(/,/g, " |")}</h4>
              <h4>Minimum Delivery Fee  - &#163; {data.delivery_charges}   | Minimum Order - &#163; {data.min_order}</h4>
                <h4>Delivery 40 - 60min  | Collection 15 - 20min </h4>
              {/* <h3>
                <img src={star} className={classes.starwidth} /> 4.9{" "}
                <span className={classes.starttext}>(210 Ratings)</span>
              </h3> */}
               <Button type="primary" danger onClick={showModal}>Know More ... </Button> &nbsp; &nbsp; &nbsp; &nbsp;
              <Rate disabled defaultValue={Review.length} /> &nbsp;
             
               <span onClick={showReviewModal} className={classes.starttext}>({Review.length} Ratings)</span>
            
              <br />
              <br />
              <Button type="danger" block size="large" > <b>Get {data.discount} % Discount </b>  on All Online Orders. T&Cs apply !</Button>
            </Grid>
            {/* <Grid lg={2}>
            
              {data.status == 0 ? (
                <Tag color="#f50" className={classes.hotelstatus}>
                  {" "}
                  Closed{" "}
                </Tag>
              ) : (
                <Tag color="#f50">Open</Tag>
              )}
            </Grid> */}
          </Grid>
        </Card>
      ))}

      <Modal
        title={hotel}
        visible={isModalVisible}
        // onOk={handleOk}
        onCancel={handleCancel}
        size="large"
        style={{ zIndex: 999 }}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <div>
          <Map style={{ height: "300px !important" }} frommenu={mapfrommenu} deliverypincodes={details}/>
        </div>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Information" key="1">
            {details.map((about) => (
              <>
                <h3>{about.hotel_name} </h3>
                <p>{about.address}</p>
                <Rate allowHalf defaultValue={4.5} />
                {about.rating}
                <p> Delivery Charges: &#163; {about.delivery_charges}</p>
              </>
            ))}
          </TabPane>
          <TabPane tab="Delivery" key="2">
            <h3> Opening Time </h3>
            {times.map((datanew) => (
              <>
                <p>
                  {" "}
                  <b>
                    Monday{" "}
                    <span style={{ float: "right" }}>
                      {JSON.parse(datanew.restStatus).w1_rest_del_open+" Am"} -{" "}
                      {JSON.parse(datanew.restStatus).w1_rest_del_dinner_close+" Pm"}
                    </span>
                  </b>
                </p>
                <hr />

                <p>
                  {" "}
                  <b>
                    Tuesday{" "}
                    <span style={{ float: "right" }}>
                      {JSON.parse(datanew.restStatus).w2_rest_del_open +" Am"} -{" "}
                      {JSON.parse(datanew.restStatus).w2_rest_del_dinner_close+" Pm"}
                    </span>
                  </b>
                </p>
                <hr />
                <p>
                  {" "}
                  <b>
                    Wednesday{" "}
                    <span style={{ float: "right" }}>
                      {JSON.parse(datanew.restStatus).w3_rest_del_open +" Am"} -{" "}
                      {JSON.parse(datanew.restStatus).w3_rest_del_dinner_close+" Pm"}
                    </span>
                  </b>
                </p>
                <hr />
                <p>
                  {" "}
                  <b>
                    Thursday{" "}
                    <span style={{ float: "right" }}>
                      {JSON.parse(datanew.restStatus).w4_rest_del_open +" Am"} -{" "}
                      {JSON.parse(datanew.restStatus).w4_rest_del_dinner_close+" Pm"}
                    </span>
                  </b>
                </p>
                <hr />
                <p>
                  {" "}
                  <b>
                    Friday{" "}
                    <span style={{ float: "right" }}>
                      {JSON.parse(datanew.restStatus).w5_rest_del_open +" Am"} -{" "}
                      {JSON.parse(datanew.restStatus).w5_rest_del_dinner_close+" Pm"}
                    </span>
                  </b>
                </p>
                <hr />
                <p>
                  {" "}
                  <b>
                    Saturday{" "}
                    <span style={{ float: "right" }}>
                      {JSON.parse(datanew.restStatus).w6_rest_del_open +" Am"} -{" "}
                      {JSON.parse(datanew.restStatus).w6_rest_del_dinner_close+" Pm"}
                    </span>
                  </b>
                </p>
                <hr />
                <p>
                  {" "}
                  <b>
                    Sunday{" "}
                    <span style={{ float: "right" }}>
                      {JSON.parse(datanew.restStatus).w7_rest_del_open +" Am"} -{" "}
                      {JSON.parse(datanew.restStatus).w7_rest_del_dinner_close+" Pm"}
                    </span>
                  </b>
                </p>
                <hr />
              </>
            ))}
          </TabPane>
          <TabPane tab="Collection" key="3">
            <h3> Opening Time </h3>

            {times.map((datanew) => (
              <>
                <p>
                  {" "}
                  <b>
                    Monday{" "}
                    <span style={{ float: "right" }}>
                      {JSON.parse(datanew.restStatus).w1_rest_coll_open +" Am"} -{" "}
                      {JSON.parse(datanew.restStatus).w1_rest_coll_dinner_close+" Pm"}
                    </span>
                  </b>
                </p>
                <hr />

                <p>
                  {" "}
                  <b>
                    Tuesday{" "}
                    <span style={{ float: "right" }}>
                      {JSON.parse(datanew.restStatus).w2_rest_coll_open +" Am"} -{" "}
                      {JSON.parse(datanew.restStatus).w2_rest_coll_dinner_close+" Pm"}
                    </span>
                  </b>
                </p>
                <hr />
                <p>
                  {" "}
                  <b>
                    Wednesday{" "}
                    <span style={{ float: "right" }}>
                      {JSON.parse(datanew.restStatus).w3_rest_coll_open +" Am"} -{" "}
                      {JSON.parse(datanew.restStatus).w3_rest_coll_dinner_close+" Pm"}
                    </span>
                  </b>
                </p>
                <hr />
                <p>
                  {" "}
                  <b>
                    Thursday{" "}
                    <span style={{ float: "right" }}>
                      {JSON.parse(datanew.restStatus).w4_rest_coll_open+" Am"} -{" "}
                      {JSON.parse(datanew.restStatus).w4_rest_coll_dinner_close+" Pm"}
                    </span>
                  </b>
                </p>
                <hr />
                <p>
                  {" "}
                  <b>
                    Friday{" "}
                    <span style={{ float: "right" }}>
                      {JSON.parse(datanew.restStatus).w5_rest_coll_open +" Am"} -{" "}
                      {JSON.parse(datanew.restStatus).w5_rest_coll_dinner_close+" Pm"}
                    </span>
                  </b>
                </p>
                <hr />
                <p>
                  {" "}
                  <b>
                    Saturday{" "}
                    <span style={{ float: "right" }}>
                      {JSON.parse(datanew.restStatus).w6_rest_coll_open +" Am"} -{" "}
                      {JSON.parse(datanew.restStatus).w6_rest_coll_dinner_close +" Pm"}
                    </span>
                  </b>
                </p>
                <hr />
                <p>
                  {" "}
                  <b>
                    Sunday{" "}
                    <span style={{ float: "right" }}>
                      {JSON.parse(datanew.restStatus).w7_rest_coll_open +" Am"} -{" "}
                      {JSON.parse(datanew.restStatus).w7_rest_coll_dinner_close+" Pm"}
                    </span>
                  </b>
                </p>
                <hr />
              </>
            ))}
          </TabPane>
          <TabPane tab="Delivery Charges" key="4">
            <h3> Pincode According Delivery Charges : </h3>

            {details.map((dataprice, index) =>
              JSON.parse(dataprice.deliverydetails).deliverypostcode.map(
                (data) => (
                  <>
                    <p>
                      <b>
                        {++index} ){" "}
                        <span>
                          {" "}
                          &nbsp; <Avatar src={Location} size={30} />
                          {data.postcode}
                        </span>
                        <span style={{ float: "right" }}>
                          &#163; {data.price}
                        </span>
                      </b>
                    </p>
                    <hr />
                  </>
                )
              )
            )}
          </TabPane>
        </Tabs>
      </Modal>

      <Modal
        title={hotel}
        visible={isModalavailableVisible}
        onOk={handleavailableOk}
        onCancel={handleavailableCancel}
        size="large"
        style={{ zIndex: 999 }}
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



      {/* //Review Part Show in this section */}

      <Modal  width={900}  style={{ top: '40px !important' }}visible={isReviewModalVisible} onOk={handleReviewOk} onCancel={handleReviewCancel}>
      <h4 style={{textAlign:'center'}}>Average Customer  Rating 4 to 5 <Rate defaultValue={4}/></h4>
      <h3 style={{textAlign:'center'}}>Total Review ({Review.length})</h3>
      <hr />
      <div id="ratingdetail">
      <Row style={{height:'60vh',overflowY:'scroll'}} >
        {Review.map((data)=>(
       
          <>
         
          
            <Col span={12} >
            <Card title={<><span>{data.first_name}</span> <br /><span>{data.created_at}</span></>} extra={<Rate defaultValue={data.f_rate}/>} style={{margin:5,height:150}}>
            <p>{data.review}</p>
          </Card>
          </Col>
          
          </>
        ))}
        </Row>
        </div>
        <br/>
      </Modal>
    </>
  );
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
export default connect(mapStateToProps, mapDispatchToProps)(Detailscard);
