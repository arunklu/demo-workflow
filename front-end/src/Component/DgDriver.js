import React from "react";

import { Card, Typography } from "antd";
import Aboutheader from "./Aboutheader";
import Footer from "./footer";
const { Title, Paragraph, Text, Link } = Typography;

export default function DgDriver() {
  return (
    <>
      <Aboutheader />
      <div style={{ background: "#ebebeb", textAlign: "left", padding: "3%" }}>
        <Card bordered style={{ padding: "12px 11px" }}>
          <Typography>
            <Title>Deliver with DeliveryGuru</Title>
            <Title level={4}>
              DeliveryGuru is one of the most busiest food delivery platforms
              that are delivering food to customers every day. So come and join
              us today and enjoy the following benefits.
            </Title>
            <Title level={3}>Work on your own Schedule</Title>
            <Paragraph>
              When you choose to deliver with us – you can use your own schedule
              and earn! You can choose to deliver for a few hours either in the
              morning, evening or in the night. You can decide when you want to
              work and how much you want to.
            </Paragraph>

            <Title level={3}>Choose your mode</Title>
            <Paragraph>
              You can choose your own mode. It can either be a car, scooter or a
              bike.
            </Paragraph>
            <Title level={3}>Earning goals</Title>
            <Paragraph>
              You can make good money when you join with us. People love food
              and you earn by delivering them what they love. When customers
              give you tips, it is all yours. You can boost your earnings by
              working for busy areas and during evenings and weekends. We will
              transfer your money weekly. If you want to get paid faster, then
              you can even cash it out daily.
            </Paragraph>
            <Title level={3}>24/7 support</Title>
            <Paragraph>
              You can message us or give us a call when you are on the road for
              any support. Any help, advice or support is given to you whenever
              required. Our support team is always with you.
            </Paragraph>
            <Title level={3}>Free professional kit</Title>
            <Paragraph>
              We provide you with free professional kit that includes a bag to
              carry the food and comfortable and breathable gear.
            </Paragraph>
            <Title level={3}>What you will need : </Title>
            <Paragraph>
              <li>Car, bike or scooter (must include license and insurance)</li>
              <li>Safety equipment (for example, helmet)</li>
              <li>Smartphone with iOS 13.6/Android 6 or above</li>
              <li>Proof of your right to work self-employed in the UK</li>
              <li>Age: 18+</li>
            </Paragraph>
          </Typography>
        </Card>
      </div>

      <Footer />
    </>
  );
}
