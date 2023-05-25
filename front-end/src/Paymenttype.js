import React, { useForm, useState, useEffect } from "react";
import { Tabs, Radio, Card, Form, Input, Button, Select, Avatar } from "antd";
import { EyeInvisibleOutlined, CreditCardOutlined } from "@ant-design/icons";
import UPI from "./image/UPI.jpg";
import CheckoutForm from "./Component/CheckoutForm.js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const { TabPane } = Tabs;
const { Option } = Select;

const onFinish = (values) => {
  console.log(values);
};

const onGenderChange = (values) => {
  console.log(values);
};

export default function Paymenttype() {
  const [clientSecret, setClientSecret] = useState("");
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  const stripePromise = loadStripe(
    "pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3"
  );
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    // fetch("/create.php", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => setClientSecret(data.clientSecret));
  }, []);
  return (
    <>
      <Tabs tabPosition="left" style={{ background: "#ebebeb" }}>
        <TabPane tab="Wallet" key="1">
          <Card style={{ margin: "10px 30px", textAlign: "left" }}>
            <p>Icon</p>
            <p>Amazon Pay</p>
            <Button type="danger">Payment</Button>
          </Card>
          <Card style={{ margin: "10px 30px", textAlign: "left" }}>
            <p>Icon</p>
            <p>Phone Pe</p>
            <Button type="link">Link Accounts</Button>
          </Card>
          <Card style={{ margin: "10px 30px", textAlign: "left" }}>
            <p>Icon</p>
            <p>Paytm</p>
            <Button type="link">Link Accounts</Button>
          </Card>
        </TabPane>
        <TabPane tab="Debit Cards/Credit Card" key="3">
          {/* <Card style={{ margin: "10px 30px", textAlign: "left" }}> */}
            <div >
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
            </div>
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            )}

            {/* <Form layout="vertical" name="control-hooks" onFinish={onFinish}>
              <Form.Item name="Card" label="Card" rules={[{ required: true }]}>
                <Input
                  placeholder="0000-0000-0000-0000"
                  iconRender={(visible) =>
                    visible ? <EyeInvisibleOutlined /> : <CreditCardOutlined />
                  }
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: 0 }}>
                <Form.Item
                  name="gender"
                  label="Month"
                  rules={[{ required: true }]}
                  style={{
                    display: "inline-block",
                    width: "calc(33% - 18px)",
                    marginRight: 8,
                  }}
                >
                  <Select
                    placeholder="Select a option and change input text above"
                    onChange={onGenderChange}
                    allowClear
                  >
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="gender"
                  label="Year"
                  rules={[{ required: true }]}
                  style={{
                    display: "inline-block",
                    width: "calc(33% - 18px)",
                    marginRight: 8,
                  }}
                >
                  <Select
                    placeholder="Select a option and change input text above"
                    onChange={onGenderChange}
                    allowClear
                  >
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="cvv"
                  label="CVV"
                  rules={[{ required: true }]}
                  style={{
                    display: "inline-block",
                    width: "calc(34% - 18px)",
                    marginRight: 8,
                  }}
                >
                  <Input placeholder="Enter CVV Number" />
                </Form.Item>
              </Form.Item>

              <Form.Item
                name="Name On Card"
                label="Name On Card"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="danger" htmlType="submit" block>
                  Payment
                </Button>
              </Form.Item>
            </Form> */}
          {/* </Card> */}
        </TabPane>
        <TabPane tab="UPI" key="4">
          <Card style={{ margin: "10px 30px" }}>
            <Avatar
              size={64}
              src={UPI}
              shape="square"
              style={{ display: "inline-block", width: "calc(24% - 18px)" }}
            />
            <h4 style={{ display: "inline-block", width: "calc(51% - 18px)" }}>
              Transfer Money From your Bank Account Using UPI with Your
              Registered VPA
            </h4>
            <Button
              type="link"
              style={{ display: "inline-block", width: "calc(28% - 18px)" }}
            >
              How It Works
            </Button>
            <h4
              style={{
                display: "inline-block",
                width: "calc(24% - 18px)",
                marginTop: 7,
              }}
            >
              We Accept
            </h4>{" "}
            <Avatar
              shape="square"
              style={{
                display: "inline-block",
                width: "calc(24% - 18px)",
                marginRight: 4,
                backgroundColor: "#87d068",
                marginTop: 7,
              }}
            >
              Gpay
            </Avatar>
            <Avatar
              shape="square"
              style={{
                display: "inline-block",
                width: "calc(24% - 18px)",
                marginRight: 4,
                backgroundColor: "#87d068",
                marginTop: 7,
              }}
            >
              Phonepe
            </Avatar>
            <Avatar
              shape="square"
              style={{
                display: "inline-block",
                width: "calc(24% - 18px)",
                backgroundColor: "#87d068",
                marginTop: 7,
              }}
            >
              BHIM
            </Avatar>
            <hr style={{ marginTop: 9 }} />
            <h3 style={{ textAlign: "left" }}>Pay via New VPA</h3>
            <p style={{ textAlign: "left" }}>You Must Have New VPA</p>
            <br />
            <Form>
              <Form.Item name="name">
                <Input.TextArea placeholder="Enter Your VPA" />
              </Form.Item>

              <Form.Item>
                <Button type="danger" htmlType="submit" block>
                  Payment
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
        <TabPane tab="Net Banking" key="5">
          <Card
            style={{
              margin: "10px 30px",
              padding: "30px 5px",
              textAlign: "left",
              height: "50vh",
            }}
          >
            <Form>
              <Form.Item
                name="radio-button"
                rules={[{ required: true, message: "Please pick an item!" }]}
              >
                <Radio.Group>
                  <Radio.Button
                    type="danger"
                    value="a"
                    style={{
                      display: "inline-block",
                      width: "calc(34% - 18px)",
                      marginRight: 8,
                    }}
                  >
                    HDFC
                  </Radio.Button>
                  <Radio.Button
                    value="b"
                    style={{
                      display: "inline-block",
                      width: "calc(34% - 18px)",
                      marginRight: 8,
                    }}
                  >
                    ICICI
                  </Radio.Button>
                  <Radio.Button
                    value="c"
                    style={{
                      display: "inline-block",
                      width: "calc(34% - 18px)",
                      marginRight: 8,
                    }}
                  >
                    SBI
                  </Radio.Button>

                  <Radio.Button
                    value="d"
                    style={{
                      display: "inline-block",
                      width: "calc(34% - 18px)",
                      marginRight: 8,
                    }}
                  >
                    KOTAK
                  </Radio.Button>
                  <Radio.Button
                    value="e"
                    style={{
                      display: "inline-block",
                      width: "calc(34% - 18px)",
                      marginRight: 8,
                    }}
                  >
                    AXIS
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="select"
                hasFeedback
                rules={[
                  { required: true, message: "Please select your country!" },
                ]}
              >
                <Select placeholder="Other Banks ">
                  <Option value="china">China</Option>
                  <Option value="usa">U.S.A</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="danger" htmlType="submit" block>
                  Payment
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
        <TabPane tab="Food Cards" key="6">
          <Card style={{ margin: "10px 30px", height: "50vh" }}></Card>
        </TabPane>
        <TabPane tab="Cash On Delivery" key="7">
          <Card
            style={{ margin: "10px 30px", height: "50vh", textAlign: "left" }}
          >
            <h2 style={{ paddingTop: "10%" }}>Cash On Delivery</h2>
            <p>Please Keep exact change handy to help us serve you better</p>
            <Form>
              <Form.Item>
                <Button type="danger" htmlType="submit" block>
                  Payment
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
      </Tabs>
    </>
  );
}
