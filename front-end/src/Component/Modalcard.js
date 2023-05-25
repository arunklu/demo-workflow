import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { connect } from "react-redux";
import { addToCart, updateCartQuantity } from "../store/actions/cartActions";
import { Collapse, Select, Spin, Form } from "antd";
import "../about.css";
import {
  SettingOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  MinusOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Input, Image } from "antd";
import { Radio } from "antd";
import { Typography } from "antd";
import { List } from "antd";

import { isMobile } from "react-device-detect";
import { Checkbox, Divider } from "antd";
import axios from "axios";

import { Row, Col } from "antd";

const { Title, Text } = Typography;

const { TextArea } = Input;
const { Panel } = Collapse;

function Modalcard(props) {
  const [isModalVisible, setIsModalVisible] = useState(props.open);
  const [instruction, setInstruction] = useState(null);
  const [addon, setAddon] = useState([]);
  const [counter, setcounter] = useState(1);
  const [countaddon, setcountaddon] = useState(0);
  const [form] = Form.useForm();
  const [finddata, setfindData] = useState([]);
  const [errmsg, seterrmsg] = useState(null);
  const [popuperrmsg, setPopuperrmsg] = useState(null);
  const [data, setData] = useState([]);
  const[backupdata,setackkupdata]=useState(null)

  let cartItems = [];
  let count = false;
  //intial fetch depend on props
  // This will launch only if propName value has chaged.
  console.log("model-->",props)

  useEffect(() => {
    setPopuperrmsg(null);
    setInstruction(null);
    fetch(
      "https://deliveryguru.co.uk/dg_api/basedOnCatId_addon_list/" +
        props.itemId +
        "/" +
        props.hotelid
    )
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log("modelcard--->",result)
          let tempData = JSON.parse(JSON.stringify(result));
          tempData.forEach((el, i) => {
            if (el.menu_addon.length > 0) {
              el.menu_addon.forEach((item, j) => {
                tempData[i].menu_addon[j].extra.length > 0 &&
                  tempData[i].menu_addon[j].extra.forEach((val, k) => {
                    tempData[i].menu_addon[j].extra[k] =
                      tempData[i].menu_addon[j].count === 1 &&
                      tempData[i].menu_addon[j].maxcount === 1
                        ? {
                            ...val,
                            quantity: null,
                            isSelected: false,
                          }
                        : {
                            ...val,
                            isSelected: false,
                            quantity: 1,
                          };
                  });
              });
            }
            if (el.child === true) {
              el.menu_addon.forEach((itm, d) => {
                tempData[i].menu_addon[d] = { ...itm, isExpandble: false };
              })
            }
          });
          setfindData(tempData);
          console.log("data-->",tempData)
          setData(tempData);
          seterrmsg(null);
        },
        (error) => {
          console.log("Error", error);
        }
      );
    setcounter(1);
    setcountaddon(0);
    seterrmsg(null);
    setIsModalVisible(props.open);
  }, [props.itemId]);
  //random id generation for cart
  const guidGenerator = () => {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4();
  };
  // popup cancel
  const handleCancel = () => {
    
    setIsModalVisible(false);
    setfindData(null);
  };
  //item in checkox type
  const handleCheckbox = (event, addonItem, item) => {
    seterrmsg(null);
    const tempData = JSON.parse(JSON.stringify(finddata));
    tempData.forEach((el, k) => {
      el.menu_addon.length > 0 &&
        el.menu_addon.forEach((val, i) => {
          if (item.menuid === val.menuid) {
            val.extra.length > 0 &&
              val.extra.forEach((e, j) => {
                if (e.addon_id === addonItem.addon_id) {
                  tempData[k].menu_addon[i].extra[j].isSelected =
                    event.target.checked;
                }
              });
          }
        });
    });
    setfindData(tempData);
  };
  //item in radio type
  const handleRadioButton = (event, addonItem, item, type) => {
    seterrmsg(null);
    const tempData = JSON.parse(JSON.stringify(finddata));
    tempData.forEach((el, k) => {
      el.menu_addon.length > 0 &&
        el.menu_addon.forEach((val, i) => {
          if (item.id === val.id) {
            val.extra.length > 0 &&
              val.extra.forEach((e, j) => {
                if (e.addon_id === addonItem.addon_id) {
                  tempData[k].menu_addon[i].extra[j].isSelected =
                    event.target.checked;
                } else {
                  tempData[k].menu_addon[i].extra[j].isSelected =
                    !event.target.checked;
                }
              });
          }
        });
    });
    setfindData(tempData);
  };
  //checkbox item increment & decrement
  const handleQuantity = (addonItem, menuItem, action) => {
    let tempData = JSON.parse(JSON.stringify(finddata));
    tempData.forEach((el, i) => {
      if (el.menu_addon.length > 0) {
        el.menu_addon.forEach((item, j) => {
          if (item.menuid === menuItem.menuid) {
            item.extra.length > 0 &&
              item.extra.forEach((val, k) => {
                if (val.addon_id === addonItem.addon_id) {
                  switch (action) {
                    case "increment":
                      tempData[i].menu_addon[j].extra[k].quantity =
                        val.quantity + 1;
                      break;
                    case "decrement":
                      if (val.quantity > 1) {
                        tempData[i].menu_addon[j].extra[k].quantity =
                          val.quantity - 1;
                      }
                      break;
                  }
                }
              });
          }
        });
      }
    });
    setfindData(tempData);
  };
  //add to cart
  const handleSubmit = () => {
    let tempData = JSON.parse(JSON.stringify(finddata));
    let isError = false;
    tempData.forEach((el, i) => {
      el.menu_addon &&
        el.menu_addon.length > 0 &&
        el.menu_addon.forEach((item, j) => {
          let minQty = 0;
          let reducedQty = 0;
          item.extra &&
            item.extra.length > 0 &&
            item.extra.forEach((elm) => {
              if (elm.isSelected && elm.quantity !== null) {
                reducedQty = reducedQty + elm.quantity;
              }
            });
          item.extra &&
            item.extra.length > 0 &&
            item.extra.forEach((val, k) => {
              if (val.isSelected) {
                if ((val.quantity > 0 || val.quantity === null)) {
                  if (reducedQty >= item.count && reducedQty <= item.maxcount) {
                    minQty = minQty + 1 * val.quantity;
                    cartItems.push({
                      value: val.addon_name,
                      price: val.addon_price,
                      id: val.addon_id,
                      quantity: val.quantity,
                    });
                  } else if (val.quantity === null) {
                    minQty = minQty + 1;
                    cartItems.push({
                      value: val.addon_name,
                      price: val.addon_price,
                      id: val.addon_id,
                      quantity: 1,
                    });
                  } else {
                    // isError=true
                    console.log('one')
                    seterrmsg(
                      `${val.label} can have minimum of ${item.count} quantity(s) and maximum of ${item.maxcount} quantity(s)`
                    );
                  }
                }
              }
            });
            console.log("cartItems-->",cartItems) 
          if (!item.extra.some((value) => value.quantity === null)) {
            if (minQty < item.count) {
              isError = true;
              console.log("two")
              seterrmsg("Please select the minimum order level");
            }
          } else {
            if (item.isExpandble&&(minQty < item.count)) {
              isError = true;
              console.log("three")
              seterrmsg("Please select the minimum order level");
            }
          } 
        });
    });
    if (!isError ) {
      cartdata();
    }
  };

  //redux add to cart function
  const cartdata = () => {
    // if(props.cart.length < 5 ){
    props.addToCart({
      cartindex: guidGenerator(),
      name: props.hotelname,
      id: props.id,
      hotelid: props.hotelid,
      price: props.price,
      amount: props.price,
      image: props.image,
      addon: cartItems,
      payment_type: "COD",
      Instruct: instruction,
      productcount: counter,
     itemcount:1
    });

   
    seterrmsg(null);
    setIsModalVisible(props.close);
  };

  const currentExpanded=(el)=>{
    let tempData = JSON.parse(JSON.stringify(finddata));
    tempData.forEach((item,i)=>{
      
    item.menu_addon.forEach((itm,j)=>{
    if(item.menu.id===el){
      tempData[i].menu_addon[j].isExpandble=true
    }else{
      tempData[i].menu_addon[j].isExpandble=false
    }
    })
    })
    console.log("currentexpansion--->",tempData)
    setfindData(tempData);
    }
console.log("tempdata",finddata)
  return (
    <>
      <Modal
        title={props.hotelname}
        visible={isModalVisible}
        style={
          isMobile
            ? { marginTop: 30 }
            : { fontSize: "27px !important", fontWeight: 800 }
        }
        onOk={handleSubmit}
       
        footer={[
          
          <span style={{ float: "left", paddingBottom: 4, marginTop: "-5px" }}>
            
            <Button
              shape="circle"
              icon={<MinusOutlined />}
              size="large"
              onClick={counter !== 1 ? () => setcounter(counter - 1) : null}
            />

            <Text> &nbsp; {counter}&nbsp; </Text>

            <Button
              shape="circle"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => setcounter(counter + 1)}
            />
          </span>,
          <span> 
           <Button
              key="submit"
              type="default"
              size="large"
              style={{ borderRadius: 5 ,marginRight:2}}
              onClick={() => handleCancel()}
            >
              Cancel
            </Button></span>,
          <span>
            <Button
              key="submit"
              type="danger"
              size="large"
              style={{ borderRadius: 5 }}
              onClick={() => handleSubmit()}
            >
              Add to Cart
            </Button>
          </span>,
        ]}
      >
        {props.image !== "dummy.jpg" ? (
          <img
            style={{
              width: "100%",
              height: "50% !important",
              objectFit: "cover",
            }}
            src={
              "https://deliveryguru.co.uk/admin/images/itemimages/" +
              props.image
            }
          />
        ) : null}
        <br />
        <div style={{ color: "red", fontWeight: "bold" }}> {popuperrmsg}</div>

        <p style={{ paddingLeft: 7, paddingTop: 19 }}>{props.detaildata}</p>
        
        {finddata !== null ? (
          <>
          <Collapse accordion   expandIconPosition={"right"}>
            {
          finddata.map((items, i) =>
            items.child === false ? (
              items.menu_addon.map((menuitem) => (
                <>
                  <Row style={{background:"#fff",borderColor:"#fff"}}>
                    <Col span={24} style={{ padding: 4 }}>
                      <Text
                        style={{ padding: "0 !important", textAlign: "left" }}
                      >
                        {menuitem.title} {menuitem.price}
                        <br />
                        <b style={{ paddingLeft: 7, fontSize: 12 }}>
                          {menuitem.add_on_desc}
                        </b>
                        <br />
                        {errmsg !== null ? (
                          <b style={{ color: "red", fontWeight: "bold" }}>
                            {errmsg}
                          </b>
                        ) : null}
                      </Text>

                      <Radio.Group style={{ width: "100%" }}>
                        <>
                          {menuitem.extra !== null
                            ? menuitem.extra.map((data) => (
                                <div>
                                  <div style={{ marginTop: 10 }}>
                                    <Row justify="space-between">
                                      <Col span={10}>
                                        {menuitem.maxcount !== null &&
                                        menuitem.maxcount !== 1 ? (
                                          <List.Item.Meta
                                            style={{ fontWeight: "normal" }}
                                            avatar={
                                              <>
                                                <Checkbox
                                                  type="checkbox"
                                                  name="hobbies"
                                                  id={data.id}
                                                  value={data.label}
                                                  price={data.addon_price}
                                                  onChange={(e) =>
                                                    handleCheckbox(
                                                      e,
                                                      data,
                                                      menuitem
                                                    )
                                                  }
                                                >
                                                  {data.label}
                                                </Checkbox>{" "}
                                              </>
                                            }
                                          />
                                        ) : (
                                          <List.Item.Meta
                                            style={{ fontWeight: "normal" }}
                                            avatar={
                                              <Radio
                                                type="radio"
                                                name="hobbies"
                                                id={data.id}
                                                value={data.label}
                                                price={data.addon_price}
                                                onChange={(e) =>
                                                  handleRadioButton(
                                                    e,
                                                    data,
                                                    menuitem,
                                                    "radio"
                                                  )
                                                }
                                              >
                                                {data.label}
                                              </Radio>
                                            }
                                          />
                                        )}
                                      </Col>
                                      <Col span={6}>
                                        {data.isSelected &&
                                        data.quantity !== null ? (
                                          <>
                                            <Button
                                              shape="circle"
                                              icon={<MinusOutlined />}
                                              size="small"
                                              onClick={() =>
                                                handleQuantity(
                                                  data,
                                                  menuitem,
                                                  "decrement"
                                                )
                                              }
                                            />
                                            <Text>
                                              {" "}
                                              &nbsp; {data.quantity}&nbsp;{" "}
                                            </Text>

                                            <Button
                                              shape="circle"
                                              icon={<PlusOutlined />}
                                              size="small"
                                              onClick={() =>
                                                handleQuantity(
                                                  data,
                                                  menuitem,
                                                  "increment"
                                                )
                                              }
                                            />
                                          </>
                                        ) : null}
                                      </Col>
                                      <Col
                                        span={8}
                                        style={{
                                          textAlign: "end",
                                          clear: "both",
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontSize: 15,
                                            float: "right",
                                            fontWeight: "normal",
                                          }}
                                        >
                                          {" "}
                                          &nbsp; &#163;{" "}
                                          {data.addon_price == "0.00"
                                            ? "0.0"
                                            : "" + data.addon_price.toFixed(2)}
                                        </span>
                                      </Col>
                                    </Row>
                                  </div>
                                  {/* ))} */}
                                </div>
                                //  : ""
                              ))
                            : ""}
                        </>
                      </Radio.Group>
                    </Col>
                  </Row>
                </>
              ))
            ) : (
<>
                <Panel
                  header={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      onClick={()=>currentExpanded(items.menu.id)}
                    >
                      <div>{items.menu.item_name}</div>
                      <div>{items.menu.price}</div>
                    </div>
                  }
                  key={i}
                  child={items.child}
                >
                  <Row>
                    {" "}
                    <Col span={24}>
                      {items.menu_addon.map((menuitem) => (
                        <>
                          <Text style={{ padding: 0, textAlign: "left" }}>
                            {menuitem.title}
                            <br />
                            <span style={{ paddingLeft: 8, fontSize: 12 }}>
                              {menuitem.add_on_desc}
                            </span>
                            <br />
                            {errmsg !== null ? (
                              <b style={{ color: "red", fontWeight: "bold" }}>
                                {errmsg}
                              </b>
                            ) : null}
                          </Text>

                          <Radio.Group style={{ width: "100%" }}>
                            <>
                              {menuitem.extra != null
                                ? menuitem.extra.map((data) => (
                                    <div>
                                      <div style={{ marginTop: 10 }}>
                                        <Row justify="space-between">
                                          <Col span={10}>
                                            {menuitem.maxcount != null &&
                                            menuitem.maxcount != 1 ? (
                                              <List.Item.Meta
                                                style={{ fontWeight: "normal" }}
                                                avatar={
                                                  <>
                                                    <Checkbox
                                                      type="checkbox"
                                                      name="hobbies"
                                                      id="inlineCheckboxh1"
                                                      value={data.label}
                                                      price={data.addon_price}
                                                      onChange={(e) =>
                                                        handleCheckbox(
                                                          e,
                                                          data,
                                                          menuitem
                                                        )
                                                      }
                                                    >
                                                      {data.label}
                                                    </Checkbox>{" "}
                                                  </>
                                                }
                                              />
                                            ) : (
                                              <List.Item.Meta
                                              style={{ fontWeight: "normal" }}
                                                avatar={
                                                  <Radio
                                                    type="radio"
                                                    name="hobbies"
                                                    id="inlineCheckboxh1"
                                                    style={{fontWeight:'normal'}}
                                                    value={data.label}
                                                    price={data.addon_price}
                                                    onChange={(e) =>
                                                      handleRadioButton(
                                                        e,
                                                        data,
                                                        menuitem,
                                                        "radio"
                                                      )
                                                    }
                                                  >
                                                    {data.label}
                                                  </Radio>
                                                }
                                              />
                                            )}
                                          </Col>
                                          <Col span={6}>
                                            {data.isSelected &&
                                            data.quantity !== null ? (
                                              <>
                                                <Button
                                                  shape="circle"
                                                  icon={<MinusOutlined />}
                                                  size="small"
                                                  onClick={() =>
                                                    handleQuantity(
                                                      data,
                                                      menuitem,
                                                      "decrement"
                                                    )
                                                  }
                                                />

                                                <Text>
                                                  {" "}
                                                  &nbsp; {
                                                    data.quantity
                                                  }&nbsp;{" "}
                                                </Text>

                                                <Button
                                                  shape="circle"
                                                  icon={<PlusOutlined />}
                                                  size="small"
                                                  onClick={() =>
                                                    handleQuantity(
                                                      data,
                                                      menuitem,
                                                      "increment"
                                                    )
                                                  }
                                                />
                                              </>
                                            ) : null}
                                          </Col>
                                          <Col
                                            span={8}
                                            style={{
                                              textAlign: "end",
                                              clear: "both",
                                            }}
                                          >
                                            {countaddon > 0 ? (
                                              <span>
                                                <i
                                                  onClick={() =>
                                                    handleQuantity(
                                                      data,
                                                      menuitem,
                                                      "decrement"
                                                    )
                                                  }
                                                >
                                                  <MinusCircleOutlined />
                                                </i>
                                                &nbsp;<i>{countaddon}</i>&nbsp;
                                                <i
                                                  onClick={() =>
                                                    handleQuantity(
                                                      data,
                                                      menuitem,
                                                      "increment"
                                                    )
                                                  }
                                                >
                                                  <PlusCircleOutlined />
                                                </i>
                                              </span>
                                            ) : null}
                                            <span
                                              style={{
                                                fontSize: 15,
                                                float: "right",
                                               fontWeight: "normal"
                                              }}
                                            >
                                              {" "}
                                              &nbsp; &#163;{" "}
                                              {data.addon_price == "0.00"
                                                ? "0.0"
                                                : "" + data.addon_price}
                                            </span>
                                          </Col>
                                        </Row>
                                      </div>
                                      {/* ))} */}
                                    </div>
                                    //  : ""
                                  ))
                                : ""}
                            </>
                          </Radio.Group>
                        </>
                      ))}
                    </Col>
                  </Row>
                </Panel>
             </> 
            )
          )}
          </Collapse>
          </> ) : (
          <div style={{ marginLeft: "45%", color: "#f5222d" }}>
            {" "}
            <Spin size="large" delay={500} />
          </div>
        )}
        <br />
        <b style={{ paddingLeft: 8, fontSize: 14, paddingBottom: 15 }}>
          Special request to suit your taste buds
        </b>
        <br />
        {cartItems.length > 0 ? (
          <TextArea
            style={{
              width: "98%",
              marginLeft: 8,
              marginTop: 16,
              borderRadius: 10,
            }}
            rows={4}
            value={instruction}
            placeholder="Please leave any special request e.g.Extra spicy, no sauce, well done  etc. Please do not leave any allergen info here."
            onChange={(e) => {
              setInstruction(e.target.value);
            }}
          />
        ) : (
          <TextArea
            style={{
              width: "98%",
              marginLeft: 8,
              marginTop: 16,
              borderRadius: 10,
            }}
            value={instruction}
            rows={4}
            placeholder="Please leave any special request e.g.Extra spicy, no sauce, well done  etc. Please do not leave any allergen info here."
            onChange={(e) => {
              setInstruction(e.target.value);
            }}
          />
        )}
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    // id: state.product.hotelId.hotelId,
    cart: state.cart.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => {
      dispatch(addToCart(product));
    },
    updtaeToCart: (productId) => {
      dispatch(updateCartQuantity(productId));
    },
  };
};
// UPDATE_CART_QUANTITY
export default connect(mapStateToProps, mapDispatchToProps)(Modalcard);
