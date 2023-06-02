import React from "react";
import { Card } from "antd";
import img from "../image/img.jpg";
const { Meta } = Card;
export default function Advertise() {
  return (
    <div>
      <Card style={{ margin: "0 32px", textAlign: "left" }}>
        <div
          style={{
            marginTop: -11,
            marginRight: "-20px",
            marginLeft: "-20px",
            backgroundColor: "rgba(255,255,255,0.1)",
            boxShadow:
              "0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%)",
          }}
        >
          <img
            alt="example"
            src={img}
            style={{ borderRadius: "0.25rem", width: "100%" }}
            hoverable
          />
        </div>
        <br />
        <h3
          style={{
            fontSize: 22,
            fontWeight: 600,
            padding: 4,
            textAlign: "center",
          }}
        >
          Grill Guru
        </h3>
        <Meta
          title="G14pl"
          description="Sed ut perspiciatis 
                unde omnis iste natus sit voluptatem accusantium doloremque laudantium, totam rem aperiam."
        />
      </Card>
    </div>
  );
}
