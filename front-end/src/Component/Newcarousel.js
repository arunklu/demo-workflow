import React from "react";
import { useHistory } from "react-router-dom";
import { Carousel } from "antd";
import img from "../image/5offer.jpg";
import img1 from "../image/10offer.jpg";
import img2 from "../image/20offer.jpg";
import img3 from "../image/25offer.jpg";
function onChange(a, b, c) {
  //////console.log(a, b, c);
}

const contentStyle = {
  height: "250px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

export default function Newcarousel(props) {
  let history = useHistory();
  function handleClick(url) {
    history.push(url);
  }
  return (
    <Carousel
      afterChange={onChange}
      autoplay
      dots={false}
      style={{ marginBottom: 10 }}
    >
      <div>
        <img
          src={img}
          style={{ height: "auto", objectFit: "cover", width: "1400px" }}
          onClick={() => handleClick("resturantoffer/5")}
        />
        {/* <h3 style={contentStyle}>1</h3> */}
      </div>
      <div>
        <img
          src={img1}
          style={{ height: "auto", objectFit: "cover", width: "1400px" }}
          onClick={() => handleClick("resturantoffer/10")}
        />
      </div>
      <div>
        <img
          src={img2}
          style={{ height: "auto", objectFit: "cover", width: "1400px" }}
          onClick={() => handleClick("resturantoffer/20")}
        />
      </div>
      <div>
        <img
          src={img3}
          style={{ height: "auto", objectFit: "cover", width: "1400px" }}
          onClick={() => handleClick("resturantoffer/25")}
        />
      </div>
    </Carousel>
  );
}
