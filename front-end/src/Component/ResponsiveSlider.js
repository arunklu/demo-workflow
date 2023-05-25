import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import Data from "../card.json";
import Homeadvertise from "./Homeadvertise";
import { Row, Col } from "antd";
const breakPoints = [
  //   { width: 1, itemsToShow: 1 },
  //   { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  //   { width: 768, itemsToShow: 3 },
  //   { width: 1200, itemsToShow: 4 }
];

export default function ResponsiveSlider() {
  const [items, setItems] = useState([]);
  // const [items, setItems] = useState([]);
  const addItem = () => {
    const nextItem = Math.max(1, items.length + 1);
    setItems([...items, nextItem]);
  };
  useEffect(() => {
    {
      Data.map((post, index) => {
        const nextItem = {
          name: post.name,
          title: post.title,
          image: post.image,
        };

        breakPoints.push({
          name: post.name,
          title: post.title,
          image: post.image,
        });
        setItems([...items, nextItem]);
      });
    }
  }, [Data]);
  const removeItem = () => {
    const endRange = Math.max(0, items.length - 1);
    setItems(items.slice(0, endRange));
  };

  return (
    <Carousel
      breakPoints={breakPoints}
      style={{ background: "#fff", paddingTop: 17 }}
    >
      {Data.map((item) => (
        // <p key={item} style={{height:200,background:'pink'}}> {item}</p>

        <Homeadvertise name={item.name} title={item.title} image={item.image} />
      ))}

      {/* <Row>
           {breakPoints.map((post, index) => {
            return (
                <Col>
              
              </Col>
            );
          })}
          </Row> */}
    </Carousel>
  );
}
