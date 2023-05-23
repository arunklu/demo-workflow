import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Row,
  Col,
  Avatar,
  Typography,
  Button,
  Form,
  Input,
  Checkbox,
  List,
  Empty,
  Tag,
} from "antd";
import {
  UserOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  FacebookOutlined,
  LinkedinOutlined,LogoutOutlined,UserDeleteOutlined
} from "@ant-design/icons";
import { ShowChart } from "@material-ui/icons";

const useStyles = makeStyles({
  cardroot: {
    margin: 20,
  },
  messagebtn: {
    marginLeft: 7,
  },
  formdesign: {
    textAlign: "left",
  },
  ordercard: {
    textAlign: "left",
    color: "orange",
  },
});
const { Title } = Typography;
export default function Profiledetail() {
  const [profile, setProfile] = useState("");
  const [editdata, setEditdata] = useState("");
  const [Show, setShow]=useState(false)
  const [form] = Form.useForm();

  const classes = useStyles();
  function onChange(e) {
    //console.log(`checked = ${e.target.checked}`);
  }
  const onFinish = (values) => {
    setShow(false);
    //console.log("Success:", values);
    const apiUrl = "https://deliveryguru.co.uk/dg_api/" + "updateUser/"+localStorage.getItem("id");
    fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        //console.log(response);
      })
      .catch((err) => err);
  };

  const onFinishFailed = (errorInfo) => {
    //console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    const apiurl = "https://deliveryguru.co.uk/dg_api/profile/"+localStorage.getItem("id");
    fetch(apiurl)
      .then((res) => res.json())
      .then(
        (result) => {
          setProfile(result);
        },
        (error) => {}
      );
  }, []);

  const editClick = (id, fname, lname, mobile, email) => {
    //console.log(fname);
    setShow(true)
    setEditdata({
      id: id,
      fname: fname,
      lname: lname,
      email: email,
      mobile: mobile,
      flag: 1,
    });
    form.setFieldsValue({
      id: id,
      first_name: fname,
      last_name: lname,
      mobile: mobile,
      email: email,
    });
  };
  return (
    <>
      <Row>
        <Col lg={Show == false ? 24: 11} xs={24} sm={24} md={24} xl={Show == false ? 24: 11}>
          <Card hoverable className={classes.cardroot}>
            <Avatar
              size={{ xs: 24, sm: 32, md: 140, lg: 104, xl: 130, xxl: 400 }}
              icon={<UserOutlined />}
            />

            <Title level={3}>
              {profile.first_name +
                " " +
                profile.middle_name +
                " " +
                profile.last_name}
            </Title>
            <p>
              <b>Email :</b> {profile.email}
            </p>
            <p>
              <b>Mobile :</b> {profile.mobile}
            </p>
            <Button
              type="primary"
              danger
              onClick={() =>
                editClick(
                  profile.id,
                  profile.first_name,
                  profile.last_name,
                  profile.mobile,
                  profile.email
                )
              }
            >
              {" "}
              Edit Profile{" "}
            </Button>
            <Button danger className={classes.messagebtn}>
              Message
            </Button>
          </Card>
        </Col>
        <Col lg={13} xs={24} sm={24} md={24} xl={13} style={Show == false ?{display:'none'}:{display:"block"}}>
          <Card hoverable className={classes.cardroot}>
            <Form
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              form={form}
              name="control-hooks"
              className={classes.formdesign}
            >
              <Form.Item
                label="id"
                name="id"
                hidden="true"
                rules={[
                  { required: true, message: "Please input your Full Name!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="First Name"
                name="first_name"
                rules={[
                  { required: true, message: "Please input your Full Name!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="last_name"
                rules={[
                  { required: true, message: "Please input your Address!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Mobile"
                name="mobile"
                rules={[
                  { required: true, message: "Please input your City Name!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your Zipcode!" },
                ]}
              >
                <Input />
              </Form.Item>
              {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

              <Form.Item wrapperCol={{ offset: 4, span: 7 }}>
                <Button type="danger" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col lg={20} xs={24} sm={24} md={24} xl={20}>
          <Card hoverable className={classes.cardroot}>
            <Title level={4}>Connect with Social Media</Title>
            <Button
              type="primary"
              shape="round"
              icon={<TwitterOutlined />}
              size="lg"
              style={{background:'#00acee'}}
            >
              {" "}
              Twitter
            </Button>
            &nbsp;
            <Button
              type="primary"
              shape="round"
              icon={<YoutubeOutlined />}
              size="lg"
              danger
            >
              {" "}
              Youtube
            </Button>
            &nbsp;
            <Button
              type="primary"
              shape="round"
              icon={<FacebookOutlined />}
              size="lg"
              color=""
              style={{background:'#3b5998'}}
            >
              {" "}
              Facebook
            </Button>
            &nbsp;
            <Button
              type="primary"
              shape="round"
              icon={<LinkedinOutlined />}
              size="lg"
              color="#0e76a8"
              style={{background:'#0e76a8'}}
            >
              {" "}
              LinkedIn
            </Button>
            &nbsp;
            <Button
              type="primary"
              default
              shape="round"
              icon={<LogoutOutlined />}
              size="lg"
              color="red"
            >
              {" "}
              Sign Out
            </Button>
            &nbsp;
            <Button
              type="primary"
              shape="round"
              warning
              icon={<UserDeleteOutlined />}
              size="lg"
              color="red"
            >
              {" "}
              Delete Account
            </Button>
            {/* <List size="small" header={<div>Social Media</div>} bordered>
              <List.Item><Button type="primary" shape="round" icon={<TwitterOutlined />} size="lg"> Twitter
        </Button>
        <Button type="primary" shape="round" icon={<YoutubeOutlined />} size="lg"> Youtube
        </Button>
        <Button type="primary" shape="round" icon={<FacebookOutlined />} size="lg"> Facebook
        </Button>
        <Button type="primary" shape="round" icon={<LinkedinOutlined />} size="lg"> LinkedIn
        </Button>
        </List.Item>
              <List.Item>  <Tag icon={<YoutubeOutlined />} color="#cd201f"> Youtube </Tag></List.Item>
              <List.Item><Tag icon={<FacebookOutlined />} color="#3b5999">  Facebook </Tag></List.Item>
              <List.Item> <Tag icon={<LinkedinOutlined />} color="#55acee"> LinkedIn </Tag></List.Item>
              <List.Item>Telegram</List.Item>
            </List>{" "} */}
          </Card>
        </Col>

        {/* <Col span={13}>
          <Card hoverable className={classes.cardroot}>
            <Title level={4} className={classes.ordercard}>
              OrderDetails
            </Title>
            <p className={classes.ordercard}>Card_content</p>
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 60,
              }}
              description={<span>No Any Order</span>}
            >
              <Button type="Danger">Order Now</Button>
            </Empty>
          </Card>
        </Col>

        <Col span={12}>
          <Card
            hoverable
            className={classes.cardroot}
            title="Dilivery Address"
            extra={<Checkbox onChange={onChange} checked color="danger" />}
            actions={[
              <Checkbox onChange={onChange} checked color="danger">
                Checkbox
              </Checkbox>,
              <DeleteTwoTone key="Delete" />,
            ]}
          >
            <p className={classes.prepareleft}>Unit21 ,10 123 York Street</p>
            <br />

            <p>Card content</p>
            <span> Delivery Address</span>
            <span>Ufo 10,230 york Fort</span>
          </Card>
        </Col> */}
      </Row>
    </>
  );
}
