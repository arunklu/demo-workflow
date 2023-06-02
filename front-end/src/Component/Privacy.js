import React from "react";
import { Card, Typography } from "antd";
import Aboutheader from "./Aboutheader";
import Footer from "./footer";
const { Title, Paragraph, Text, Link } = Typography;
export default function Privacy() {
  return (
    <>
      <Aboutheader />
      <div style={{ background: "#ebebeb", textAlign: "left", padding: "3%" }}>
        <Card title="Privacy" bordered style={{ padding: "12px 11px" }}>
          <Typography>
            <Paragraph>Introduction</Paragraph>

            <Title level={3}>Data Protection Officer</Title>
            <Paragraph>
            We have an appointed data protection officer (DPO) who is responsible for overseeing questions in relation to your privacy. If you have any questions or requests to exercise your legal rights, please contact our DPO using the details set out below.
            Name of legal entity: Delivery Guru Limited
            Name of DPO: Murray McAuley
            Email address: contact@deliveryguru.co.uk
            Postal address: DPO, delivery Guru Limited, Unit 1, The Maxwell Building, East Kilbride, G75 0QR
            Telephone number: 0141 286 1337
            You have the right to make a complaint at any time to the Information Commissioner’s Office (ICO), the UK supervisory authority for data protection issues (www.ico.org.uk). We would, however, appreciate the chance to deal with your concerns before you approach the ICO so please contact us in the first instance.

            </Paragraph>

            <Title level={3}>Information that we collect from you</Title>
            <Paragraph>
            When you register with Delivery Guru you may be asked to provide certain personal data or personal information about yourself including:
            Your name;
            Email address;
            Telephone number;
            Address
            (collectively “Contact Data”)
            We may also collect information about the way in which you use the website or from information gathered from letters, emails, posts and telephone conversations.
            We do not collect any “Special Categories of Personal Data” about you such as your race, ethnicity, religious or philosophical beliefs, sex life, sexual orientation, political opinions, or information about your health.
            This website may include links to third-parties. Clicking on those links may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements. We encourage you to read the privacy notice of every website you visit.
            This website is not intended for children and we do not knowingly collect data relating to children.

            </Paragraph>

            <Title level={3}> How is your personal data collected?</Title>
            <Paragraph>
            Automated technologies or interactions. As you interact with our website, we may automatically collect: internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website (“Technical Data”) about your equipment, browsing actions and patterns. We collect this personal data by using cookies, 
            server logs and other similar technologies. Please see our cookie policy below for further details.
            </Paragraph>
            <Title level={3}>How we use your information</Title>
            <Paragraph>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data where we need to perform the contract we are about to enter
             into or have entered into with you, or where we need to comply with a legal or regulatory obligation.
            </Paragraph>
            <Title level={3}>How we collect your information</Title>
            <Paragraph>
            We collect your personal information when you interact with us or use our services, such as when you use our Sites to place an order. We also look at
             how visitors use our Sites, to help us improve our services and optimise customer experience.
            </Paragraph>


            <Title level={3}>Information that we collect from you</Title>
            <Paragraph>
            As part of our commitment to the privacy of our customers and visitors 
            to our Sites more generally, we want to be clear about the sorts of information we will collect from you.
            </Paragraph>

            <Title level={3}>Use of your information</Title>
            <Paragraph>
            We will only process the data we collect 
            about you if there is a reason for doing so, and if that reason is permitted under data protection law.
            </Paragraph>



            <Title level={3}>Cookies</Title>
            <Paragraph>
            You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of the Site may become inaccessible or not function properly. For more 
            information about the cookies we use, please see our Cookie Policy  https://deliveryguru.co.uk/cookies
            </Paragraph>


            <Title level={3}>Direct marketing</Title>
            <Paragraph>
            Where you have given your consent we will use your information to let you know about our other products and services that may be of interest to you and we may contact you to do so by email or phone. You can control your email marketing preferences by:
            visiting our website, www.deliveryguru.co.uk/marketing, or mobile application;

            </Paragraph>


            <Title level={3}>Retention of your information</Title>
            <Paragraph>
            We will not retain your information for any longer than necessary. We will require to retain 
            personal data for at least as long as you operate an active account with the website. </Paragraph>


            <Title level={3}>Disclosure of your information</Title>
            <Paragraph>
            The information we collect about you will be transferred to and stored on our servers located
             within the UK. We are very careful and transparent about who else your information is shared with.
            </Paragraph>



            <Title level={3}>Security</Title>
            <Paragraph>
            We adopt robust technologies and policies to ensure the personal 
            information we hold about you is suitably protected. Our servers are monitored and secured 24 hours a day.
             </Paragraph>


            <Title level={3}>Data Security</Title>
            <Paragraph>
            We have put in place enhanced security measures to prevent your personal data from being used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to authorised employees, agents, contractors and other third parties who have a legitimate business need to know. They will only process your personal data on our instructions,
             in accordance with this policy and data protection law, and they are subject to a duty of confidentiality.
            </Paragraph>



            <Title level={3}>Your rights</Title>
            <Paragraph>
            You have many rights concerning the data we hold about you. If you wish to exercise any of these rights, including any subject access request, please contact our Data Protection Officer. If you would like further information relating to your rights please visit the ICO website www.ico.org.uk  or contact them direct for further information.
If you’re not satisfied with our response to any complaint or believe our processing of your information does not comply with data protection law, you can make a complaint to the Information Commissioner’s Office (ICO). Roofoods Limited, The River Building, 1 Cousin Lane, London, EC4R 3TE, United Kingdom.
 </Paragraph>


            <Title level={3}>Changes to our privacy policy</Title>
            <Paragraph>
            Any changes to our privacy policy will be posted to the Sites and, where appropriate, we will notify you of the changes for example by email or push notification.
This privacy policy was last updated: 14/10/2020.</Paragraph>
          </Typography>
        </Card>
      </div>

      <Footer />
    </> 
  );
}
