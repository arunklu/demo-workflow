import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Searchcomponent from "../Component/searchcomponent";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  header: {
    color: "#000",
    background: "transparent",
    boxShadow: "none",
  },
  image: {
    objectFit: "cover",
    width: "100%",
    background: "#ffeee5",
    height: 500,
    "@media (max-width: 467px)": {
      height: 320,
    },
  },
  styletext: {
    fontFamily: "railway",
    color: "#000",
    fontSize: "42px",
    paddingLeft: "30px",
    "@media (max-width: 767px)": {
      fontSize: "39px",
    },
    "@media (max-width: 467px)": {
      fontSize: "29px",
    },
  },
  para: {
    color: "orange",
    fontWeight: "700",
    fontSize: "17px",
    textAlign: "left",
    paddingLeft: "30px",
    "@media (max-width: 767px)": {
      fontSize: "20px",
      textAlign: "left",
    },
    "@media (max-width: 467px)": {
      fontSize: "16px",
      textAlign: "left",
    },
  },
  title: {
    top: "20%",
    left: "20%",
    paddingLeft: "19px",
    position: "absolute",
    textAlign: "left",
    fontFamily: "Gorgia",
    "@media (max-width: 767px)": {
      top: "20%",
    },
    "@media (max-width: 467px)": {
      top: "10%",
      left: 5,
      right: 30,
    },
  },
  dnoneimages: {
    "@media (max-width: 467px)": {
      display: "none",
    },
  },
  search: {
    background: "#fff",
  },
  buttongo: {
    padding: "30px 12px",
    background: "orange",
    color: "#000",
    verticalAlign: "middle",
  },
});

export default function Slider(props) {
  const classes = useStyles();

  return (
    <>
      {/* <img className={classes.image} alt="complex" src={img} /> */}
      <div className={classes.image}>
        <span style={{ float: "left" }} className={classes.dnoneimages}>
          <img
            style={{ objectFit: "cover", paddingTop: 50 }}
            alt="complex"
            src="https://www.talabat.com/images/Talabat/marshmallow-banner-img-1.png"
          />
        </span>
        <span style={{ float: "right" }} className={classes.dnoneimages}>
          <img
            style={{ objectFit: "cover", paddingTop: 70 }}
            alt="complex"
            src="https://www.talabat.com/images/Talabat/marshamallow-banner-img-2.png"
          />
        </span>
      </div>
      <div position="absolute" className={classes.title}>
        <h2 className={classes.styletext}>
          Restaurant And More Delivered To Your
        </h2>
        <p className={classes.para}>
          One Thousand flavour in One Place
          <br />
          <br />
          <Searchcomponent oldsearch={props.searchdata} />
        </p>
      </div>
    </>
  );
}
