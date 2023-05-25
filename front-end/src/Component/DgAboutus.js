import React from "react";
import { Card, Typography } from "antd";
import Aboutheader from "./Aboutheader";
import Footer from "./footer";
const { Title, Paragraph, Text, Link } = Typography;
export default function DgAboutus() {
  return (
    <>
      <Aboutheader />
      <div style={{ background: "#ebebeb", textAlign: "left", padding: "3%" }}>
        <Card bordered style={{ padding: "12px 11px" }}>
          <Typography>
            <Title>Delivery Guru</Title>

            <Title level={3}>About us</Title>
            <Paragraph>
            Delivery Guru is a fast and reliable online ordering and delivering platform, allowing customers to order food from reputable restaurants and takeaways. We charge a reasonable commission for our services, allowing our
             restaurant partners to focus on sending out consistent, high quality food with greater ingredients.
            </Paragraph>
            <Paragraph>
            We are Headquartered at the Scottish Technology Park* and serve the whole of the UK. Click here** to find out how to get one of our portals for your business. 

<br />
ADDRESS<br />

DELIVERY GURU LTD.<br />
UNIT 1 THE MAXWELL BUILDING<br />
55 NASMYTH AVENUE<br />
EAST KILBRIDE<br />
G75 0QR<br />


            </Paragraph>

          </Typography>
        </Card>
      </div>

      <Footer />
    </>
  );
}
