import React, { useState, useEffect } from "react";
import {
  PageHeader,
  Button,
  Descriptions,
  Checkbox,
  Modal,
  Row,
  Col,
  Card,
  Form,
  Input,
  Alert,
} from "antd";
import axios from "axios";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import {
  PlusOutlined,
  DeleteTwoTone,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useStripe } from "@stripe/react-stripe-js";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: 5,
    },
    textleft: {
      textAlign: "left",
      color: "orange",
      margin: 10,
    },
    mainpaper: {
      padding: 10,
    },
    textarrival: {
      fontSize: 16,
      color: "#bab6b6",
      textAlign: "left",
    },
    prepareleft: {
      float: "left",
      fontWeight: 600,
      color: "#000",
      padding: "0 !important",
      width: "100%",
    },
    textright: {
      paddingLeft: 22,
    },
  })
);

export default function Address() {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [address, setAddress] = useState([]);
  const [done, setDone] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addresserror, setAddresserror] = useState(null);
  const [editid, setEditid] = useState("");
  const [addloader, setAddloader] = useState(false);
  const [deleteloader, setDeleteloader] = useState(false);
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

  const [addAddres, setAddAddres] = useState({
    door: "",
    complete_Address: "",
    states: "",
    city: "",
    post_code: "",
    landmark: "",
  });

  const [formerror, setformerror] = useState("");
  useEffect(() => {
    fetch(
      "https://deliveryguru.co.uk/dg_api/addresses/" +
        localStorage.getItem("id")
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setAddress(
            result.address.map((el) => {
              return { ...el, isLoading: false, deleteloader: false };
            })
          );
          // alert(JSON.stringify(result.address));
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  function Deleteaddress(id) {
    let tempAddress = JSON.parse(JSON.stringify(address));
    let indexFound = tempAddress.findIndex((el) => el.id === id);
    tempAddress[indexFound].deleteloader = true;
    setAddress(tempAddress);
    setDeleteloader(true);
    const apiUrl = "https://deliveryguru.co.uk/dg_api/deleteAddress/" + id;
    fetch(apiUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          setDone(false);
          //console.log(JSON.stringify(result));
          setDeleteloader(false);
          alert("delete Address");
        },
        (error) => {
          setDeleteloader(false);
          setError(error);
        }
      );
  }


  const onFinish = () => {
    if (
      addAddres.city === "" ||
      addAddres.complete_Address === "" ||
      addAddres.door === "" ||
      addAddres.landmark === "" ||
      addAddres.post_code === "" ||
      addAddres.states === ""
    ) {
      setformerror("All Fields are mandatory");
      return false;
    }
    setAddloader(true);
    axios
      .post("https://deliveryguru.co.uk/dg_api/addAddress", {
        id: address.length + 1,
        u_id: localStorage.getItem("id"),
        home_address:
          "Door No. " +
          addAddres.door +
          "," +
          addAddres.complete_Address +
          ", " +
          addAddres.city,
        permanent_address:
          "Door No. " +
          addAddres.door +
          "," +
          addAddres.complete_Address +
          ", " +
          addAddres.city,
        pincode: addAddres.post_code.toUpperCase(),
        city: addAddres.city,
        landmark: addAddres.landmark,
        lat: "0.0",
        longt: "0.0",
        state: "UK",
      })
      .then((res) => {
        setDone(true);
        setVisible(false);
        setAddloader(false);
        console.log("res", res);
        alert("Address added successfully");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const oneditchangeHandler = (event) => {
    setEditField({ ...editField, [event.target.name]: event.target.value });
  };

  const onAddchangeHandler = (event) => {
    setformerror("");
    setAddAddres({ ...addAddres, [event.target.name]: event.target.value });
  };

  const editHandler = (id) => {
    setEditid(id);
    setEditModalVisible(true);
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
      setAddresserror("All Fields are mandatory");
      return false;
    }

    address.forEach((el, i) => {
      console.log("el.id === editid", el.id, editid);
      if (el.id === editid) {
        console.log("id", editid);
        let editdata = address;
        editdata[i] = {
          id: editid,
          u_id: "55",
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
            `https://deliveryguru.co.uk/dg_api/updateAddressfield/{${editid}}`,
            editdata[i]
          )
          .then((res) => {
            console.log("res-->", res);
            setAddress(editdata);
            setEditModalVisible(false);
            alert("Edited successfully");
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    });
  };

  const handleCancel = () => {
    setEditModalVisible(false);
  };

  console.log("address", addAddres);
  return (
    <>
      <Card style={{ padding: "0 !important" }}>
        <PageHeader
          className={classes.prepareleft}
          onBack={() => null}
          title="Manage Delivery Address"
          subTitle=" "
          extra={[
            <Button
              type="danger"
              shape="round"
              onClick={() => setVisible(true)}
              icon={<PlusOutlined />}
            >
              Address
            </Button>,
          ]}
        >
          <Descriptions size="small" column={3} className={classes.textright}>
            <Descriptions.Item>
              You Have A Saved Address In this location
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>
      </Card>
      <Row>
        {address.map((data) => (
          <Col lg={8} xs={24} sm={24} md={24} xl={8}>
            <Card
              hoverable
              className={classes.textleft}
              title="Delivery Address"
              // extra={<Button type="primary" onClick={()=>updatedaddress(data.id)} danger >Edit</Button>}
              actions={[
                <EditOutlined
                  key="Edit"
                  title="Edit"
                  onClick={() => editHandler(data.id)}
                />,
                // <DeleteTwoTone
                //   key="Delete"
                //   title="Delete"
                //   onClick={() => Deleteaddress(data.id)}
                // />,
                <Button
                  icon={<DeleteTwoTone />}
                  loading={data.deleteloader}
                  onClick={() => Deleteaddress(data.id)}
                />,
              ]}
            >
              <p className={classes.prepareleft}>
                <b>Address : </b>
                {data.home_address}
              </p>

              <p className={classes.prepareleft}>
                <b>postcode : </b>
                {data.pincode}
              </p>

              <p>
                <span> {data.city}</span>
                {/* <span style={{ float: "right" }}>
                {data?.updated_at.substring(0, 10)}
              </span> */}
              </p>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Add Your Address"
        centered
        visible={visible}
        onOk={() => onFinish()}
        onCancel={() => setVisible(false)}
        width={1000}
        style={{ marginTop: 60 }}
        footer={[
          <Button danger onClick={() => setVisible(false)}>
            Cancel
          </Button>,
          <Button
            type="primary"
            danger
            loading={addloader}
            onClick={() => onFinish()}
          >
            Submit
          </Button>,
        ]}
      >
        <Row>
          <Col
            lg={12}
            xs={24}
            sm={24}
            md={24}
            xl={12}
            style={{ borderRight: "2px solid orange" }}
          >
            <Card hoverable>
              <div className="google-map-code">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin"
                  width="100%"
                  height="450px"
                  frameborder="0"
                  style={{ border: 0 }}
                  allowfullscreen=""
                  aria-hidden="false"
                  tabindex="0"
                ></iframe>
              </div>
            </Card>
          </Col>
          <Col lg={12} xs={24} sm={24} md={24} xl={12}>
            {/* {formerror != "" ? (
              <Alert message={formerror} type="error" closable />
            ) : null} */}
            <Form onFinish={onFinish} style={{ margin: 12 }} layout="vertical">
              <Form.Item
                label="Door"
                rules={[
                  { required: true, message: "Please enter your Door No.!" },
                ]}
              >
                <Input
                  name="door"
                  value={addAddres.door}
                  onChange={(e) => onAddchangeHandler(e)}
                />
              </Form.Item>

              <Form.Item
                label="Complete Address"
                rules={[
                  { required: true, message: "Please enter your Address!" },
                ]}
              >
                <Input
                  name="complete_Address"
                  placeholder="Building No,Street Name"
                  value={addAddres.complete_Address}
                  onChange={(e) => onAddchangeHandler(e)}
                />
              </Form.Item>
              <Form.Item
                label="State"
                rules={[
                  { required: true, message: "Please enter your State !" },
                ]}
              >
                <Input
                  name="states"
                  value={addAddres.states}
                  onChange={(e) => onAddchangeHandler(e)}
                />
              </Form.Item>
              <Form.Item
                label="City"
                rules={[
                  { required: true, message: "Please enter your City !" },
                ]}
              >
                <Input
                  name="city"
                  value={addAddres.city}
                  onChange={(e) => onAddchangeHandler(e)}
                />
              </Form.Item>

              <Form.Item
                label="postcode"
                rules={[
                  { required: true, message: "Please Enter your postcode!" },
                ]}
              >
                <Input
                  name="post_code"
                  value={addAddres.post_code}
                  onChange={(e) => onAddchangeHandler(e)}
                />
              </Form.Item>
              <Form.Item
                label="Landmark"
                rules={[
                  { required: true, message: "Please Enter your Landmark!" },
                ]}
              >
                <Input
                  name="landmark"
                  value={addAddres.landmark}
                  onChange={(e) => onAddchangeHandler(e)}
                />
              </Form.Item>
            </Form>
            <div style={{ color: "red" }}>{formerror}</div>
          </Col>
        </Row>
      </Modal>

      <Modal
        bodyStyle={{ height: "50%" }}
        centered={true}
        title="Modify Delivery Address"
        visible={editModalVisible}
        // confirmLoading={addressloaded}
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
            <div onChange={(e) => oneditchangeHandler(e)} defaultValue={"Home"}>
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
    </>
  );
}
