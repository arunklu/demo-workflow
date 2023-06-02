import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Card } from "antd";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    textAlign: "left",
  },
  paper: {
    borderRadius: "20px",
    padding: "19px",
    margin: "20px 8px",
    color: "#000",
    textAlign: "justify",
    "@media (max-width: 767px)": {
      borderRadius: "40px",
      padding: "19px",
      boxShadow: "2px 5px 4px 3px #e3e3e3",
    },
  },
  image: {
    width: 128,
    height: 118,
  },
  textleft: {
    textAlign: "left",
    padding: "0 12px",
  },
  p_12: {
    padding: "10px 12px",
  },
  margin: {
    marginTop: 0,
    textAlign: "center",
  },
  widthset: {
    maxWidth: "17.333333% !important",
  },
  paralink: {
    color: "orange",
    fontWeight: "800",
    fontFamily: "oblique",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "150px",
    borderRadius: "14px",
  },
});

export default function Partnercard(props) {
  const classes = useStyles();
  return (
    <>
      <Grid lg={4}>
        <Card className={classes.paper}>
          <img className={classes.img} alt="complex" src={props.image} />

          <h3 className={classes.margin}>
            {" "}
            <b>{props.name}</b>
          </h3>
          <p>{props.details}</p>
          <a href="/About" className={classes.paralink}>
            {props.pname} &#8594;
          </a>
        </Card>
      </Grid>
    </>
  );
}
