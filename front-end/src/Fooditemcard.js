import React from "react";
import { Card, Typography, Button } from "antd";
const { Meta } = Card;
const { Title } = Typography;
export default function Fooditemcard(props) {
  return (
    <Card
      style={{ textAlign: "left", margin: 5 }}
      cover={
        <img alt="example" src={props.image} style={{ objectFit: "cover" }} />
      }
    >
      {/* <p style={{position:'absolute',right:'-25px',top:'-40%',width: 0,height: 0,border: '0 solid transparent',borderRightWidth: 0,borderLeftWidth: '339px',borderBottom: '61px solid #ff483b'}}> &nbsp;</p> */}
      <Title level={2}>Europe Street beat </Title>
      <p>
        Delicious meals are tasty, appetizing, scrumptious, yummy, luscious,
        delectable, mouth-watering, fit for a king, delightful, lovely,
        wonderful, pleasant, enjoyable, appealing, enchanting, charming.
      </p>

      <Button type="primary">Details</Button>
    </Card>
  );
}
