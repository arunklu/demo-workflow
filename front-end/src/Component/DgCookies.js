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
            <Title>Delivery Guru Cookies Policy</Title>

            <Title level={3}>1.What are Cookies?</Title>
            <Paragraph>
            Cookies are bits of data that are stored on your computer while browsing the website. They are a reliable mechanism for us to remember certain things like items added to your shopping cart or information you enter into form fields. 

Some cookies last for the duration of your web session and some are stored for future use, eg where you ask us to remember your login details. You have the right not to accept cookies but please be aware that this may affect the functionality of the website. 

We also use cookies to  generally improve the quality of our site and the service it provides. When you enter the website our server sends a cookie to your computer allowing us to identify your computer for the purposes of website functionality.

This policy explains the different categories of cookie and how you can manage your cookie preferences.
</Paragraph>
<li>Essential/ Strictly Necessary Cookies</li>
            <Paragraph>
            These cookies are essential for the proper functioning of the website, such as remembering your postcode or to navigate effectively through the pages of the website. Without these cookies you will only be able to read the website and are unlikely to have any sort of functionality.
             In particular you will be unable to order anything from our restaurant partners!


            </Paragraph>


<Title level={3}>2. Functionality Cookies</Title>

<Paragraph>These cookies allow you to access services and improve your experience visiting our site in the future. For example they might allow you to access previous orders you have made through the website. They may share information with our partners however for the sole purpose of providing the goods,
     services or functions to which it relates and for no other reason.</Paragraph>


     <Title level={3}>3. Performance Cookies </Title>
     <Paragraph>These cookies collect information about the way in which you use our site so that we can come up with ways to improve the performance of the website and the user experience. They do not collect personal or identifiable information.
          It is anonymous data used for analytical purposes.</Paragraph>

          <Title level={3}>4. Advertising Cookies</Title>
          <Paragraph>
          These cookies collect data in order to provide information about your browsing habits, which is in turn used to provide tailored suggestions about products and services that may be of interest to you. These cookies collect data by reference to the IP address you are using
           and may link to third party websites such as social media networks to provide target advertising.
          </Paragraph>

          <Title level={3}>Manage your Preferences</Title>
          <Paragraph>It is important to know that you can manage your cookie preferences on your web browser. Most web browsers accept cookies automatically but you can alter your browser settings to restrict certain cookies
               or notify you each time a cookie is created. Please see third party information websites such as https://www.whoishostingthis.com/resources/cookies-guide/ for more information.</Paragraph>
          </Typography>
        </Card>
      </div>

      <Footer />
    </>
  );
}
