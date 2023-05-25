import React, { Component } from "react";
import Aboutheader from "./Aboutheader";
import { Form, Input, Button, Select, Row, Col, Alert, Space } from "antd";
import footer from "./footer";
import img2 from "../image/bgslider.jpg";
import { RightOutlined } from "@ant-design/icons";
const { Option } = Select;

export default class ValidatepartnerForm extends Component {
  constructor() {
    super();
    this.state = {
      nextlist: true,
      validationemail: false,
      sendmail: false,
      traditionalstreet: false,
      alternativestreet: false,
    };
  }
  onGenderChange = (value) => {
    console.log(value);
  };
  nextcuisines = () => {
    this.setState({
      nextlist: false,
      validationemail: true,
    });
  };
  validatehighstreet = () => {
    this.setState({
      traditionalstreet: false,
      alternativestreet: false,
      validationemail: false,
      sendmail: true,
    });
  };
  validatecuisines = () => {
    this.setState({
      validationemail: false,
      sendmail: true,
    });
  };
  validatetradition = () => {
    this.setState({
      traditionalstreet: true,
      sendmail: false,
    });
  };
  validatealternate = () => {
    this.setState({
      validationemail: false,
      traditionalstreet: false,
      alternativestreet: true,
    });
  };

  render() {
    return (
      <div>
        <Aboutheader />
        <Row>
          <Col lg={6}></Col>
          <Col lg={12}>
            <Form
              layout="vertical"
              name="advanced_search"
              className="ant-advanced-search-form advance_formnew"
            >
              <div
                style={
                  this.state.nextlist == false
                    ? { display: "none" }
                    : { display: "block" }
                }
              >
                <Form.Item
                  name="Primary"
                  label="Select Buisness Type"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select a option and change input text above"
                    onChange={this.onGenderChange}
                    allowClear
                    size="large"
                  >
                    <Option value="Restaurant">Restaurant</Option>
                    <Option value="Grocery">Grocery</Option>
                    <Option value="Alcohol">Alcohol</Option>
                    <Option value="Convenience">Convenience</Option>
                    <Option value="Flowers">Flowers Shop</Option>
                    <Option value="PetStore">Pet Store</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="Primary1"
                  label="Select Primary Cuisines"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select a option and change input text above"
                    onChange={this.onGenderChange}
                    allowClear
                    size="large"
                  >
                    <Option value="Bagels">Bagels</Option>
                    <Option value="Breakfast">Breakfast </Option>
                    <Option value="British ">British </Option>
                    <Option value="Burgers">Burgers</Option>
                    <Option value="Caribbean">Caribbean </Option>
                    <Option value="Chicken ">Chicken </Option>
                    <Option value="Chinese">Chinese</Option>
                    <Option value="Danish">Danish </Option>
                    <Option value="Desserts ">Desserts </Option>
                    <Option value="Diner">Diner</Option>
                    <Option value="EuropeanFish&Chips">
                      European Fish & Chips{" "}
                    </Option>
                    <Option value="French">French </Option>
                    <Option value="Greek">Greek</Option>
                    <Option value="Indian">Indian </Option>
                    <Option value="Italian">Italian </Option>
                    <Option value="Kebab">Kebab</Option>
                    <Option value="Lebanese">Lebanese </Option>
                    <Option value="Mediterranean">Mediterranean </Option>
                    <Option value="Mexican">Mexican</Option>
                    <Option value="MiddleEastern">Middle Eastern </Option>
                    <Option value="Paninis">Paninis </Option>
                    <Option value="Pizza">Pizza</Option>
                    <Option value="Sandwiches">Sandwiches</Option>
                    <Option value="Seafood">Seafood </Option>
                    <Option value="Spanish">Spanish</Option>
                    <Option value="Sushi">Sushi </Option>
                    <Option value="Tapas">Tapas</Option>
                    <Option value="Thai">Thai </Option>
                    <Option value="Turkish">Turkish </Option>
                    <Option value="Vegan">Vegan</Option>
                    <Option value="Vegetarian">Vegetarian </Option>
                    <Option value="Vietnamese">Vietnamese </Option>
                    <Option value="Other">Other </Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="Secondary1"
                  label="Select Secondary Cuisines"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select a option and change input text above"
                    onChange={this.onGenderChange}
                    allowClear
                    size="large"
                  >
                    <Option value="Bagels">Bagels</Option>
                    <Option value="Breakfast">Breakfast </Option>
                    <Option value="British ">British </Option>
                    <Option value="Burgers">Burgers</Option>
                    <Option value="Caribbean">Caribbean </Option>
                    <Option value="Chicken ">Chicken </Option>
                    <Option value="Chinese">Chinese</Option>
                    <Option value="Danish">Danish </Option>
                    <Option value="Desserts ">Desserts </Option>
                    <Option value="Diner">Diner</Option>
                    <Option value="EuropeanFish&Chips">
                      European Fish & Chips{" "}
                    </Option>
                    <Option value="French">French </Option>
                    <Option value="Greek">Greek</Option>
                    <Option value="Indian">Indian </Option>
                    <Option value="Italian">Italian </Option>
                    <Option value="Kebab">Kebab</Option>
                    <Option value="Lebanese">Lebanese </Option>
                    <Option value="Mediterranean">Mediterranean </Option>
                    <Option value="Mexican">Mexican</Option>
                    <Option value="MiddleEastern">Middle Eastern </Option>
                    <Option value="Paninis">Paninis </Option>
                    <Option value="Pizza">Pizza</Option>
                    <Option value="Sandwiches">Sandwiches</Option>
                    <Option value="Seafood">Seafood </Option>
                    <Option value="Spanish">Spanish</Option>
                    <Option value="Sushi">Sushi </Option>
                    <Option value="Tapas">Tapas</Option>
                    <Option value="Thai">Thai </Option>
                    <Option value="Turkish">Turkish </Option>
                    <Option value="Vegan">Vegan</Option>
                    <Option value="Vegetarian">Vegetarian </Option>
                    <Option value="Vietnamese">Vietnamese </Option>
                    <Option value="Other">Other </Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="tertiary"
                  label="Select tertiary Cuisines"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select a option and change input text above"
                    onChange={this.onGenderChange}
                    allowClear
                    size="large"
                  >
                    <Option value="Bagels">Bagels</Option>
                    <Option value="Breakfast">Breakfast </Option>
                    <Option value="British ">British </Option>
                    <Option value="Burgers">Burgers</Option>
                    <Option value="Caribbean">Caribbean </Option>
                    <Option value="Chicken ">Chicken </Option>
                    <Option value="Chinese">Chinese</Option>
                    <Option value="Danish">Danish </Option>
                    <Option value="Desserts ">Desserts </Option>
                    <Option value="Diner">Diner</Option>
                    <Option value="EuropeanFish&Chips">
                      European Fish & Chips{" "}
                    </Option>
                    <Option value="French">French </Option>
                    <Option value="Greek">Greek</Option>
                    <Option value="Indian">Indian </Option>
                    <Option value="Italian">Italian </Option>
                    <Option value="Kebab">Kebab</Option>
                    <Option value="Lebanese">Lebanese </Option>
                    <Option value="Mediterranean">Mediterranean </Option>
                    <Option value="Mexican">Mexican</Option>
                    <Option value="MiddleEastern">Middle Eastern </Option>
                    <Option value="Paninis">Paninis </Option>
                    <Option value="Pizza">Pizza</Option>
                    <Option value="Sandwiches">Sandwiches</Option>
                    <Option value="Seafood">Seafood </Option>
                    <Option value="Spanish">Spanish</Option>
                    <Option value="Sushi">Sushi </Option>
                    <Option value="Tapas">Tapas</Option>
                    <Option value="Thai">Thai </Option>
                    <Option value="Turkish">Turkish </Option>
                    <Option value="Vegan">Vegan</Option>
                    <Option value="Vegetarian">Vegetarian </Option>
                    <Option value="Vietnamese">Vietnamese </Option>
                    <Option value="Other">Other </Option>
                  </Select>
                </Form.Item>

                <Button
                  type="primary"
                  onClick={this.nextcuisines}
                  htmlType="submit"
                  size="large"
                  style={{
                    width: 150,
                    height: 50,
                    float: "right",
                    background: "orange",
                    borderColor: "orange",
                    fontSize: 22,
                    fontWeight: "bold",
                  }}
                >
                  Next
                </Button>
                <Button
                  type="primary"
                  onClick={() => window.location.href("/restpartner")}
                  htmlType="submit"
                  size="large"
                  style={{
                    width: 150,
                    height: 50,
                    float: "right",
                    marginRight: 12,
                    background: "orange",
                    borderColor: "orange",
                    fontSize: 22,
                    fontWeight: "bold",
                  }}
                >
                  Back
                </Button>
              </div>
              <div
                style={
                  this.state.validationemail == false
                    ? { display: "none" }
                    : { display: "block" }
                }
              >
                <h2>Where does your business operate? </h2>
                <h3>
                  We’ll make sure you have all the help you need to successfully
                  set up your restaurant on Delivery Guru. Pick one
                </h3>
                <br />
                <Alert
                  message="High street location, on its own"
                  description="A traditional high street place with a shop front, such as a takeaway, restaurant or cafe."
                  type="info"
                  action={
                    <Space direction="vertical">
                      <h3 onClick={this.validatehighstreet}>
                        {" "}
                        <RightOutlined />
                      </h3>
                    </Space>
                  }
                />
                <br />
                <Alert
                  message="Shared location with other businesses"
                  description="You operate multiple businesses at the same address, or share an address with another business run by someone else."
                  type="success"
                  action={
                    <Space direction="vertical">
                      <h3 onClick={this.validatealternate}>
                        {" "}
                        <RightOutlined />
                      </h3>
                      {/* <Button size="small" danger type="ghost">
                                                Decline
                                            </Button> */}
                    </Space>
                  }
                />
                <br />
                <Alert
                  message="Somewhere else"
                  description="Your business operates from a residential address, a pub, a van, an industrial estate or another location."
                  type="warning"
                  action={
                    <Space direction="vertical">
                      <h3 onClick={this.validatealternate}>
                        {" "}
                        <RightOutlined />
                      </h3>
                    </Space>
                  }
                />
                <br />
                <Button
                  type="primary"
                  onClick={this.validatecuisines}
                  htmlType="submit"
                  size="large"
                  style={{
                    width: 150,
                    float: "right",
                    marginRight: 42,
                    background: "orange",
                    borderColor: "orange",
                  }}
                >
                  Next
                </Button>
              </div>

              <div
                style={
                  this.state.sendmail == false
                    ? { display: "none" }
                    : { display: "block", height: "77vh" }
                }
              >
                <h2>Where does your business operate? </h2>
                <h3>
                  We’ll make sure you have all the help you need to successfully
                  set up your restaurant on Delivery Guru. Pick one
                </h3>
                <br />
                <Form.Item
                  name="Email"
                  label="Email Address"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Your Email" style={{ padding: 13 }} />
                </Form.Item>
                <br />
                <Button
                  type="primary"
                  onClick={this.validatecuisines}
                  htmlType="submit"
                  block
                  size="large"
                  style={{
                    marginRight: 42,
                    height: 50,
                    fontSize: 22,
                    fontWeight: "bold",
                    background: "orange",
                    borderColor: "orange",
                  }}
                >
                  Next
                </Button>
              </div>

              <div
                style={
                  this.state.traditionalstreet == false
                    ? { display: "none" }
                    : { display: "block" }
                }
              >
                <h2>What kind of shared location is it?</h2>

                <h3>Pick One</h3>
                <Alert
                  message="I own all the businesses"
                  description="There are other businesses in this location and they are all owned by you."
                  type="warning"
                  action={
                    <Space direction="vertical">
                      <h3 onClick={this.validatehighstreet}>
                        <RightOutlined />
                      </h3>
                      {/* <Button size="small" danger type="ghost">
                                                Decline
                                            </Button> */}
                    </Space>
                  }
                />
                <br />
                <Alert
                  message="I do not own the other businesses"
                  description="Your business operates from a residential address, a pub, a van, an industrial estate or another location."
                  type="warning"
                  action={
                    <Space direction="vertical">
                      <h3 onClick={this.validatehighstreet}>
                        {" "}
                        <RightOutlined />
                      </h3>
                      {/* <Button size="small" danger type="ghost">
                                                Decline
                                            </Button> */}
                    </Space>
                  }
                />
                <br />
                <Alert
                  message="There are other businesses in this location and they are owned by other people."
                  description="Shared delivery-only kitchen
                                        Leased kitchen facilities shared with multiple 
                                        restaurants for delivery-only orders. Not open to the public. Sometimes called a ‘dark kitchen’."
                  type="warning"
                  action={
                    <Space direction="vertical">
                      <h3 onClick={this.validatehighstreet}>
                        <RightOutlined />
                      </h3>
                      {/* <Button size="small" danger type="ghost">
                                                Decline
                                            </Button> */}
                    </Space>
                  }
                />
                <br />
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  style={{
                    height: 50,
                    fontSize: 22,
                    fontWeight: "bold",
                    marginRight: 42,
                    background: "orange",
                    borderColor: "orange",
                  }}
                >
                  Next
                </Button>
              </div>

              <div
                style={
                  this.state.alternativestreet == false
                    ? { display: "none" }
                    : { display: "block" }
                }
              >
                <h2>What kind of location is it?</h2>
                <br />
                <Alert
                  message="A traditional high street place with a shop front"
                  description=" "
                  type="warning"
                  action={
                    <Space direction="vertical">
                      <h3 onClick={this.validatehighstreet}>
                        <RightOutlined />
                      </h3>
                      {/* <Button size="small" danger type="ghost">
                                                Decline
                                            </Button> */}
                    </Space>
                  }
                />
                <br />
                <Alert
                  message="An alternative location accessible to the public, such as a pop-up food van, residential address, off-license or similar
                                        "
                  description=" "
                  type="warning"
                  action={
                    <Space direction="vertical">
                      <h3 onClick={this.validatehighstreet}>
                        <RightOutlined />
                      </h3>
                    </Space>
                  }
                />
                <br />
                <Button
                  type="primary"
                  onClick={this.validatecuisines}
                  htmlType="submit"
                  block
                  size="large"
                  style={{
                    height: 50,
                    fontSize: 22,
                    fontWeight: "bold",
                    marginRight: 42,
                    background: "orange",
                    borderColor: "orange",
                  }}
                >
                  Next
                </Button>
              </div>
              {/* <div>
                                <h2>What kind of location is it?</h2>
                                    <br />
                                    <Alert
                                        message="A traditional high street place with a shop front"
                                        description=" "
                                        type="warning"
                                        action={
                                            <Space direction="vertical">
                                            <Button size="small" type="primary">
                                                Next
                                            </Button>
                                            
                                            </Space>
                                }
                                
                                />  
                                <br />  
                                <Alert
                                        message="An alternative location accessible to the public, such as a pop-up food van, residential address, off-license or similar"
                                        description=" "
                                        type="warning"
                                        action={
                                            <Space direction="vertical">
                                            <Button size="small" type="primary">
                                                Next
                                            </Button>
                                           
                                            </Space>
                                }
                                
                                />  

                        

                        </div> */}
            </Form>
          </Col>
          <Col lg={6}></Col>
        </Row>
        <Row
          style={{ background: "#f9fafb", padding: "34px 4px", marginTop: 22 }}
        >
          <Col lg={5}></Col>
          <Col lg={14}>
            <Row>
              <Col lg={6}>About us</Col>
              <Col lg={6}>Privacy policy</Col>
              <Col lg={6}>Terms & Conditios</Col>
              <Col lg={6}> Cookies & Policy</Col>
            </Row>
          </Col>
          <Col lg={5}></Col>
        </Row>
        <Row style={{ background: "#f9fafb" }}>
          <Col lg={3}></Col>
          <Col lg={18}>
            <h3> Check my Cookies Prefrence</h3>
          </Col>
          <Col lg={3}></Col>
        </Row>
      </div>
    );
  }
}
