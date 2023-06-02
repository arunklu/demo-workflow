import React, { Component } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import Detailscard from "./Component/Detailscard";
import Headerlog from "./Component/headerpart";
import Header from "./Component/Aboutheader";
import Grid from "@material-ui/core/Grid";
import Leftbar from "./Component/Leftbar";
import Sidebarmenucard from "./Component/Sidebarmenucard";
import { Skeleton } from "antd";
import Deliverystoreproduct from "./Component/Deliverystoreproduct";
import { connect } from "react-redux";
import Whirligig from "react-whirligig";
import {
  addToCart,
  addToHotel,
  resetpreorderdate,
  resetpreordertime,
} from "./store/actions/cartActions";
import { AudioOutlined } from "@ant-design/icons";
import Footer from "./Component/footer";
import { isMobile } from "react-device-detect";
import {
  CaretRightOutlined,
  CaretLeftOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import { filter } from "lodash";
import { Input, Row, Col } from "antd";
import { getHotelId } from "../src/store/actions/cartActions";

import { Card, Typography, Menu, Dropdown, Button } from "antd";
import "./horizontal.css";
import reactWhirligig from "react-whirligig";
import Title from "antd/lib/skeleton/Title";
const { Text } = Typography;
const card = {
  padding: 10,
  paddingTop: 0,
  "@media (max-width: 667px)": {
    width: "83% !important",
  },
};
const carddesign = {
  "@media (max-width: 667px)": {
    display: "table-row",
  },
};
class MenuDisk extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      usersdata: null,
      filterusersdata: null,
      counterForSkip: 0,
      modelid: null,
      pname: null,
      pimage: null,
      pdetail: null,
      price: null,
      pid: null,
      showCart: true,
      hideCart: true,
      setOpen: false,
      leftdata: [],
      filterdata: [],
      preorder: null,
      submenudata: null,
      leftmenuname: null,
      BYSTATUS: "All",
      active: 0,
      sections: [],
      valuedata: null,
      hoteldata: null,
      sliderdata: [],
    };
    this.nameRef = React.createRef();
  }

  handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const sections = this.state.sections;
    const lastIndex = sections.length - 1;

    for (let i = 0; i < lastIndex; i++) {
      if (
        scrollTop > sections[i].offsetTop - 20 &&
        scrollTop < sections[i + 1].offsetTop - 20
      ) {
        this.setState({ active: i });
      }
    }
    if (scrollTop > sections[lastIndex].offsetTop - 20)
      this.setState({ active: lastIndex });
  };

  Setdata = (e) => {
    this.setState({ sections: e });
  };
  componentDidMount() {
    if (this.props.id !== this.props.hotel_id?.hotelId) {
      this.props.resetpreorderdate();
      this.props.resetpreordertime();
    }

    if (Object.keys(this.props.cart.cart).length == 0) {
    }
    const apiUrl =
      "https://deliveryguru.co.uk/dg_api/menu_submenu/" + this.props.id;
    const requestOptions = {
      method: "get",
    };
    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            leftdata: result,
            filterdata: result,
          });
        },
        (error) => {
          this.setState({ error });
        }
      );

    const apiUrlslider =
      "https://deliveryguru.co.uk/dg_api/getpopular/" + this.props.id;
    const requestOptionsslider = {
      method: "get",
    };
    fetch(apiUrlslider, requestOptionsslider)
      .then((res) => res.json())
      .then(
        (result) => {
          //alert(JSON.stringify(result))
          this.setState({
            sliderdata: result,
          });
        },
        (error) => {
          this.setState({ error });
        }
      );
    // const apiUrlcheckpreorder =
    //   "https://deliveryguru.co.uk/dg_api/getopeninghoursByHotelAndType/" +
    //   this.props.id +
    //   "/delivery";

    // fetch(apiUrlcheckpreorder, requestOptions)
    //   .then((res) => res.json())
    //   .then(
    //     (result) => {
    //       var today = new Date();

    //       console.log(today.getDay());
    //       console.log(
    //         "preorder" + JSON.parse(result[0].restStatus).w1_rest_del_close
    //       );
    //       //result.map((data)=>(alert(data.openingtime.hotelid)))
    //       this.setState({
    //         preorder: JSON.parse(result[0].restStatus).w1_rest_del_close,
    //         //submenudata:result.map((data)=>(data.value))
    //       });
    //       // console.log("data"+JSON.stringify(result));
    //     },
    //     (error) => {
    //       // this.setState({ error });
    //     }
    //   );
    this.props.hotelId(this.props.id);
  }

  callbackFunction = (id) => {
    const apiUrl =
      "https://dg.delivery-guru.org/basedOnCat.php?id=" +
      this.props.id +
      "&cid=" +
      id;
    const requestOptions = {
      method: "get",
    };
    fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            usersdata: result[0].sub_menu,
            sub_menu: result.sub_menu,
          });
        },
        (error) => {
          this.setState({ error });
        }
      );

    this[id].current.scrollIntoView({ inline: "center" });
  };
  sidebarFunction = (id, pname, pdetail, pimage, price, pid) => {
    this.setState({
      modelid: id,
      pname: pname,
      pimage: pimage,
      pdetail: pdetail,
      price: price,
      pid: pid,
      setOpen: true,
      scrollid: null,
    });
  };
  onSearch = (value) => {
    alert(value);
  };

  handleChange = (event) => {
    let tempResult = JSON.parse(JSON.stringify(this.state.leftdata));

    const result = tempResult.filter((data) => {
      return (
        data.value.filter((val) => {
          return val.item_name
            .toUpperCase()
            .includes(event.target.value.toUpperCase());
        }).length > 0
      );
    });
    result.forEach((el, i) => {
      result[i].value = el.value.filter((val) => {
        return val.item_name
          .toUpperCase()
          .includes(event.target.value.toUpperCase());
      });
    });
    this.setState({ filterdata: result });
  };
  scrollToCategory = (id) => {
    this.setState({
      scrollid: id,
    });
  };
  hidemodal = () => {
    this.setState({
      setOpen: false,
    });
  };
  clickData = () => {
    this.setState({
      showCart: !this.state.showCart,
      hideCart: !this.state.hideCart,
    });
  };
  // getprepoder=(time,date)=>{
  //   let temp={time:time,date:date}
  //   this.setState({preorder:temp})
  //   this.props.orderdata(temp)
  // }

  render() {
    console.log(
      "hotelId",
      parseInt(this.props.hotel_id.hotelId),
      this.props.id
    );

    return (
      <div className="">
        {localStorage.getItem("id") == undefined ||
        localStorage.getItem("id") == "" ||
        localStorage.getItem("id") === null ? (
          <Headerlog className="headerdata" />
        ) : (
          <Header />
        )}

        <Row container>
          <Col lg={18}>
            <Detailscard id={this.props.id} />
            <Row>
              <Col
                xs={24}
                sm={24}
                md={24}
                xl={6}
                lg={6}
                style={
                  isMobile
                    ? {
                        background: "#fff",
                        padding: 7,
                        border: ".5px solid #e7e7e7",
                        boxShadow: "0px 1px 0px 1px #e3e3e3",
                        marginBottom: 9,
                      }
                    : {
                        background: "#fff",
                        padding: 20,
                        borderRight: ".5px solid #e7e7e7",
                        height: "100vh",
                      }
                }
              >
                <p
                  style={
                    isMobile
                      ? { display: "none" }
                      : {
                          background: "#fff",
                          position: "-webkit-sticky",
                          position: "sticky",
                          top: 0,
                          zIndex: 999,
                          margin: "-19px -19px 0 -19px",
                          padding: " 14px 13px",
                          boxShadow: "0 2px 4px 0 #e3e3e3",
                          fontWeight: 600,

                          fontSize: 16,
                        }
                  }
                >
                  Category Lists
                </p>
                <Leftbar
                  leftbar={this.callbackFunction}
                  id={this.props.id}
                  datapart={this.state.leftdata}
                  scrollToCategory={this.scrollToCategory}
                />
              </Col>
              <Col lg={18} xs={24} sm={24} md={24} xl={18} style={card}>
                <p
                  style={
                    isMobile
                      ? { position: "absolute", top: 0, left: 2 }
                      : {
                          position: "-webkit-sticky",
                          position: "sticky",
                          background: "#fff",
                          top: 0,
                          zIndex: 999,
                          padding: " 6.5px 13px",
                          marginLeft: "-9px",
                        }
                  }
                >
                  <span>
                    <Input
                      type="text"
                      placeholder="Search For a Dish...."
                      onChange={(e) => this.handleChange(e)}
                      style={{
                        verticalAlign: "bottom",
                        padding: 8,
                        width: "75%",
                        marginLeft: "-1%",
                        borderRadius: 8,
                      }}
                    />
                  </span>
                  <span
                    style={
                      isMobile
                        ? {}
                        : {
                            marginLeft: "2%",
                            width: "20%",
                            verticalAlign: "top",
                          }
                    }
                  >
                    <Dropdown
                      overlay={
                        <>
                          <Menu>
                            <Menu.Item key="0">
                              <a href="#">Vegetarian</a>
                            </Menu.Item>
                            <Menu.Item key="1">
                              <a href="#">Non-Vegetarian</a>
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item key="3">Veagon</Menu.Item>
                          </Menu>
                        </>
                      }
                      trigger={["click"]}
                    >
                      <Button
                        type="default"
                        className="ant-dropdown-link"
                        onClick={(e) => e.preventDefault()}
                      >
                        Select MenuItems Type
                      </Button>
                    </Dropdown>
                  </span>
                </p>

                <div style={carddesign} className="centerbarvalue">
                  {this.state.leftdata !== null ? (
                    <Sidebarmenucard
                      datapart={this.state.filterdata}
                      hotelid={this.props.id}
                      submenu={this.state.submenudata}
                      sidebarmenu={this.sidebarFunction}
                      handleScroll={this.handleScroll}
                      scrollid={this.state.scrollid}
                      preorder={this.getprepoder}
                      sliderdata={this.state.sliderdata}
                    />
                  ) : (
                    <Skeleton active />
                  )}
                </div>
              </Col>
            </Row>
          </Col>
          <Col
            lg={6}
            style={{
              boxShadow: "3px 0px 4px 6px#e3e3e3",
              position: "fixed",
              top: "10%",
              right: "1%",
              paddingLeft: "12px",
              height: "80vh",
              overflowY: "scroll",
              paddingBottom: 12,
              paddingRight: 4,
            }}
            id="cartdetail"
          >
            {this.state.hideCart === true ? (
              <MobileView>
                <div className="cartbottom">
                  <Deliverystoreproduct
                    datacart={this.props.cart}
                    hotelid={this.props.id}
                    // preorderdetails={this.state.preorder}
                  />
                </div>
              </MobileView>
            ) : null}

            <BrowserView>
              <Deliverystoreproduct
                datacart={this.props.cart}
                hotelid={this.props.id}
              />
            </BrowserView>
          </Col>
        </Row>

        {/* <Footer /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("memustate", state);
  return {
    hotel_id: state.product.hotelId,
    cart: state,
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
    hotelId: (hotelId) => {
      dispatch(getHotelId(hotelId));
    },
    resetpreorderdate: (item) => {
      dispatch(resetpreorderdate(item));
    },
    resetpreordertime: (item) => {
      dispatch(resetpreordertime(item));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuDisk);
