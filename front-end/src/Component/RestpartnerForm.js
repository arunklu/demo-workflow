import React, { useState } from "react";
import { Form, Row, Col, Input, Button, Avatar } from "antd";
import { useHistory } from "react-router";
import {
  DownOutlined,
  UpOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import img3 from "../image/shipping-fast-delivery-man-riding-260nw-1573225051.png";

export default function RestpartnerForm() {
  const [expand, setExpand] = useState(false);
  let history = useHistory();
  const [form] = Form.useForm();

  const getFields = () => {
    const count = expand ? 10 : 4;
    const children = [];
    for (let i = 0; i < count; i++) {
      children.push(
        <Col span={8} key={i}>
          <Form.Item
            name={`field-${i}`}
            label={`Field ${i}`}
            rules={[
              {
                required: true,
                message: "Input something!",
              },
            ]}
          >
            <Input placeholder="placeholder" />
          </Form.Item>
        </Col>
      );
    }
    return children;
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const validate = () => {
    history.push("/restpartnervalidatecuisins");
  };
  return (
    <>
      <Form
        style={{ padding: "20px 12px", background: "#f9fafb" }}
        form={form}
        layout="vertical"
        name="advanced_search"
        className="advance_form"
        onFinish={onFinish}
      >
        <Row>
          {" "}
          <Col lg={8}>
            {" "}
            <h3
              style={{ fontSize: 34, color: "orange", verticalAlign: "bottom" }}
            >
              Join Us Today
            </h3>
          </Col>
          <Col lg={16}></Col>
          <Col lg={23}>
            <Row justify="space-around">
              <Col span={11} offset={1}>
                <Form.Item
                  style={{ margin: "8px 15px", width: "95%" }}
                  name="FirstName"
                  label="First Name"
                  rules={[
                    {
                      required: true,
                      message: "Input something!",
                    },
                  ]}
                >
                  <Input
                    placeholder="First Name"
                    size="large"
                    style={{ padding: 13 }}
                  />
                </Form.Item>
              </Col>
              <Col span={11} offset={1}>
                <Form.Item
                  style={{ margin: "8px 15px", width: "95%" }}
                  name="LastName"
                  label="Last Name"
                  rules={[
                    {
                      required: true,
                      message: "Input something!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Last Name"
                    size="large"
                    style={{ padding: 13 }}
                  />
                </Form.Item>
              </Col>
              <Col span={11} offset={1}>
                <Form.Item
                  style={{ margin: "8px 15px", width: "95%" }}
                  name="BuisnessName"
                  label="Buisness Name"
                  rules={[
                    {
                      required: true,
                      message: "Input something!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Buisness Name"
                    size="large"
                    style={{ padding: 13 }}
                  />
                </Form.Item>
              </Col>
              <Col span={11} offset={1}>
                <Form.Item
                  style={{ margin: "8px 15px", width: "95%" }}
                  name="buisnessaddress"
                  label="Buisness Address"
                  rules={[
                    {
                      required: true,
                      message: "Input something!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Buisness Address"
                    size="large"
                    style={{ padding: 13 }}
                  />
                </Form.Item>
              </Col>
              <Col span={11} offset={1}>
                <Form.Item
                  style={{ margin: "8px 15px", width: "95%" }}
                  name="ContactNumber"
                  label="Contact Number"
                  rules={[
                    {
                      required: true,
                      message: "Input something!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Contact Number"
                    size="large"
                    style={{ padding: 13 }}
                  />
                </Form.Item>
              </Col>
              <Col span={11} offset={1}>
                <Form.Item
                  style={{ margin: "8px 15px", width: "95%" }}
                  name="Email"
                  label="Email Address"
                  rules={[
                    {
                      required: true,
                      message: "Input something!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Email Address"
                    size="large"
                    style={{ padding: 13 }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col lg={22} offset={1}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={validate}
              size="large"
              style={{
                width: 150,
                height: 50,
                float: "right",
                marginRight: 16,
                background: "orange",
                borderColor: "orange",
                fontSize: 22,
                fontWeight: "bold",
              }}
            >
              Next
            </Button>
          </Col>
        </Row>
        <br />

        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            {/* <Button
            style={{ margin: '0 8px' }}
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button> */}
            {/* <a
            style={{ fontSize: 12 }}
            onClick={() => {
              setExpand(!expand);
            }}
          >
            {expand ? <UpOutlined /> : <DownOutlined />} Collapse
          </a> */}
          </Col>
        </Row>
      </Form>
    </>
  );
}
