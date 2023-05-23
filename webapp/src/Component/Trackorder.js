import React, { useState, useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import { Steps, Button, message } from "antd";

const { Step } = Steps;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: 5,
    },
    textleft: {
      textAlign: "left",
      color: "orange",
      marginBottom: 0,
    },
    mainpaper: {
      padding: 10,
    },
    textarrival: {
      fontSize: 16,
      color: "#bab6b6",
      textAlign: "left",
    },
  })
);

export default function Trackorder(props) {
  const classes = useStyles();
  const [position, setPosition] = useState();
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (props.hotelstatus === 12 || 2) {
      setPosition(0);
      setStatus("wait");
    }
    if (props.hotelstatus === 5 || 13) {
      setPosition(1);
      setStatus("wait");
    }
    if (props.hotelstatus === 6) {
      setPosition(1);
      setStatus("error");
    }
    if (props.hotelstatus === 4) {
      setPosition(2);
      setStatus("wait");
    }
    if (props.hotelstatus === 7) {
      setPosition(3);
      setStatus("wait");
    }
    if (props.hotelstatus === 3) {
      setPosition(4);
      setStatus("finish");
    }
  }, []);

  const steps = [
    {
      title: "Order Place",
    },
    {
      title: "Order Accepted",
      description: "And Order In Kitchen",
    },
    {
      title: "Delivery Assign",
      description: "To Driver",
    },
    {
      title: "Order Ready ",
      description: "To Deliver",
    },
    {
      title: "Completed",
    },
  ];

  return (
    <div className={classes.root}>
      <Steps current={position} status={status}>
        {steps.map((item) => (
          <Step
            key={item.title}
            title={item.title}
            description={item?.description}
          />
        ))}
      </Steps>
    </div>
  );
}
