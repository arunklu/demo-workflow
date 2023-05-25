import React from "react";
import { Card, Row, Col, Button, Image } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Block } from "@material-ui/icons";

const useStyles = makeStyles({
  mainclass: {
    margin: "0 9%",
    width: "100%",
    marginBottom: 22,
    textAlign: "left",
  },
  mobmainclass: {
    width: "100%",
    marginBottom: 22,
    textAlign: "center",
    borderRadius: 12,
  },
  imgcss: {
    height: "50px",
    objectFit: "contain",
  },
  "@media (max-width: 767px)": {
    mainclass: {
      display: "none",
    },
    mobmainclass: {
      display: "block",
    },
  },
  "@media (min-width: 767px)": {
    mainclass: {
      display: "block",
    },
    mobmainclass: {
      display: "none",
    },
  },
});

export default function Homeadvertise(props) {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.mainclass}>
        <Row span={24}>
          <Col span={8}>
            <img
              src={props.image}
              style={{ height: 180, objectFit: "cover", width: "100%" }}
            />
          </Col>
          <Col span={15} style={{ marginLeft: 9 }}>
            <h3>{props.name}</h3>
            <hr />
            <p size="large" style={{ marginLeft: 10, fontSize: 16 }}>
              <q>{props.title}</q>
            </p>
            <Button type="primary" style={{ float: "right" }}>
              All in App <CaretRightOutlined />
            </Button>
          </Col>
        </Row>
      </Card>

      <Card className={classes.mobmainclass}>
        <Row span={24}>
          <Col>
            <img
              src={props.image}
              style={{ height: 180, objectFit: "cover", width: "100%" }}
            />

            <p>{props.title}</p>

            <Button type="primary" style={{ float: "right" }}>
              All in App <CaretRightOutlined />
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
}
