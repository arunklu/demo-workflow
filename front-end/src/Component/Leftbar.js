import { makeStyles } from "@material-ui/core";
import { List, Typography, Divider } from "antd";
import React, { useState, useEffect, useRef } from "react";
import Scrollspy from "react-scrollspy";
import { Layout, Menu, Breadcrumb, Button } from "antd";

import Whirligig from "react-whirligig";

import { scrollTo } from "../utils";
import styled from "styled-components";
import { isMobile } from "react-device-detect";
import { Link, Element } from "react-scroll";
import scrollElement from "react-scroll/modules/mixins/scroll-element";
const { Title } = Typography;
const { Header, Content, Footer } = Layout;
const carddesign = {
  "@media (max-width: 667px)": {
    display: "table-row",
  },
};
const useStyles = makeStyles({
  mainbranch: {
    "@media (max-width: 700px)": {
      display: "none",
    },
    "@media (min-width: 701px)": {
      display: "block",
    },
  },
  resmainbranch: {
    "@media (min-width: 701px)": {
      display: "none",
    },
    "@media (max-width: 700px)": {
      display: "block",
    },
  },
});

const Nav = styled.nav`
  position: fixed;
  top: 0;
  text-align: center;
`;

export default function Leftbar(props) {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [Sidebar, setSidebar] = useState([]);
  const [pid, setPid] = useState([]);
  const [array, setArray] = useState([]);
  const [selected, setselected] = useState(false);

  let whirligig;
  const next = () => whirligig.next();
  const prev = () => whirligig.prev();
  useEffect(() => {
    fetch("https://deliveryguru.co.uk/dg_api/categoryByHotelId/" + props.id)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setSidebar(result);
          result.map((data) => showdataall(data.id));
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  function showdataall(id) {
    setPid((pid) => [...pid, id]);

    //console.log("pid" + pid);
  }
  return (
    <>
      {isMobile ? (
        <div>
          <Whirligig
            visibleSlides="2.5"
            gutter="1em"
            ref={(_whirligigInstance) => {
              whirligig = _whirligigInstance;
            }}
            className="scrollercuisine"
          >
            {props.datapart.map((data) => (
              <>
                <span
                  key="1"
                  style={
                    selected == data.name
                      ? {
                          fontSize: 15,
                          fontWeight: 600,
                          padding: "1px 5px",
                          background: "red",
                          color: "#fff",
                        }
                      : { fontSize: 15, fontWeight: 800 }
                  }
                  onClick={() => (
                    scrollTo({ id: data.id }), setselected(data.name)
                  )}
                >
                  {data.name}
                </span>
              </>
            ))}
          </Whirligig>
        </div>
      ) : (
        <div style={isMobile ? {display:"none"}:{ position: "relative", width: "100%" }}>
        <Scrollspy
          items={
            props.datapart != null &&
            props.datapart.map((section) => section.id)
          }
          currentClassName={"currentdata"}
          scrolledPastClassName={"scrolleddata"}
          className="scrolldata"
          //rootEl={'#list'}
          style={{
            height: "100vh",
            overflow: "hidden",
            overflowY: "scroll",
            WebkitOverflowScrolling: "none",
            scrollbarColor: "transparent",
            scrollbarWidth: "none",
            paddingTop: 40,
          }}
        >
          {props.datapart.map((section, i) => (
            <li
              key={section.id}
              style={{
                listStyle: "none",
                textAlign: "left",
                fontSize: 16,
                padding: 5,
                fontWeight: 500,
               
              }}
            >
              <a style={{ color: "inherit" }} href={"#" + section.id}>
                {section.name}
              </a>
            </li>
          ))}
        </Scrollspy>
      </div>
      )}
    </>
  );
}
