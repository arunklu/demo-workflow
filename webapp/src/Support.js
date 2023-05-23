import React, { useState } from "react";
import { Layout, Menu, Tabs, Row } from "antd";
import { isMobile } from "react-device-detect";
import { Collapse, Select } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import Header from "./Component/Aboutheader";


const { Panel } = Collapse;
const { Option } = Select;

const { TabPane } = Tabs;
const left = "left";
const top = "top";

const Support = () => {
  const [expandIconPosition, setExpandIconPosition] = useState("right");

 
  return (
    <div
     
    >
      <Header/>
      <div style={{margin:30}}>
        <h2>Help & Support</h2>
        Let's take a step ahead and help you better.
      </div>
      < div >
        <Tabs
          tabPosition={isMobile ? top : left}
        >
          <TabPane tab="Partner Onboarding" key="1">
            <Row>
              <h2>Partner Onboarding</h2>
              <Collapse accordion
              style={{width:"100vw"}}
                // onChange={onChange}
                bordered={false} 
                expandIconPosition={expandIconPosition}
              >
                <Panel header="I want to partner my restaurant with DeliveryGuru" key="1" style={{padding:10}}>
                </Panel>
                <Panel header="What are the mandatory documents needed to list my restaurant on DeliveryGuru?" key="2" style={{padding:10}}>
                </Panel>
                <Panel header="After I submit all documents, how long will it take for my restaurant to go live on DeliveryGuru?" key="3" style={{padding:10}}>
                </Panel>
                <Panel header="What is this one time Onboarding fees? Do I have to pay for it while registering?" key="4" style={{padding:10}}>
                </Panel>
                <Panel header="Who should I contact if I need help & support in getting onboarded?" key="5" style={{padding:10}}>
                </Panel>
                <Panel header="How much commission will I be charged by DeliveryGuru?" key="6" style={{padding:10}}>
                </Panel>
                <Panel header="I don’t have an FSSAI licence for my restaurant. Can it still be onboarded?" key="7" style={{padding:10}}>
                </Panel>
              </Collapse>
            </Row>
          </TabPane>

          <TabPane tab="Legal" key="2">
          <Row>
              <h2>Legal</h2>
              <Collapse accordion
              style={{width:"100vw"}}
                // onChange={onChange}
                bordered={false} 
                expandIconPosition={expandIconPosition}
              >
                <Panel header="Terms of Use" key="1" style={{padding:10}}>
                </Panel>
                <Panel header="Privacy Policy" key="2" style={{padding:10}}>
                </Panel>
                <Panel header="Cancellations and Refunds" key="3" style={{padding:10}}>
                </Panel>
                <Panel header="Terms of Use for DeliveryGuru ON-TIME / Assured" key="4" style={{padding:10}}>
                </Panel>
              </Collapse>
            </Row>
          </TabPane>
          <TabPane tab="FAQs" key="3">
          <Row>
              <h2>FAQs</h2>
              <Collapse accordion
              style={{width:"100vw"}}
                // onChange={onChange}
                bordered={false} 
                expandIconPosition={expandIconPosition}
              >
                <Panel header="What is DeliveryGuru Customer Care Number?" key="1" style={{padding:10}}>
                </Panel>
                <Panel header="I want to explore career opportunities with DeliveryGuru" key="2" style={{padding:10}}>
                </Panel>
                <Panel header="I want to provide feedback" key="3" style={{padding:10}}>
                </Panel>
                <Panel header="Can I edit my order?" key="4" style={{padding:10}}>
                </Panel>
                <Panel header="I want to cancel my order" key="5" style={{padding:10}}>
                </Panel>
                <Panel header="Will DeliveryGuru be accountable for quality/quantity?" key="6" style={{padding:10}}>
                </Panel>
                <Panel header="Is there a minimum order value?" key="7" style={{padding:10}}>
                </Panel>
                <Panel header="Do you charge for delivery?" key="8" style={{padding:10}}>
                </Panel>
                <Panel header="How long do you take to deliver?" key="9" style={{padding:10}}>
                </Panel>
                <Panel header="What are your delivery hours?" key="10" style={{padding:10}}>
                </Panel> 
                <Panel header="Can I order from any location?" key="11" style={{padding:10}}>
                </Panel>
                <Panel header="Do you support bulk orders?" key="12" style={{padding:10}}>
                </Panel>
                <Panel header="Can I order in advance?" key="13" style={{padding:10}}>
                </Panel>
                <Panel header="Can I change the address / number?" key="14" style={{padding:10}}>
                </Panel>
                <Panel header="Did not receive OTP?" key="15" style={{padding:10}}>
                </Panel>
                <Panel header="Did not receive referral coupon?" key="16" style={{padding:10}}>
                </Panel>
                <Panel header="Deactivate my account" key="17" style={{padding:10}}>
                </Panel>
                <Panel header="Unable to view the details in my profile" key="18" style={{padding:10}}>
                </Panel>
                <Panel header="What is DeliveryGuru Money?" key="19" style={{padding:10}}>
                </Panel>
                <Panel header="Do you accept Sodexo, Ticket Restaurant etc.?" key="20" style={{padding:10}}>
                </Panel>
                <Panel header="I want an invoice for my order" key="21" style={{padding:10}}>
                </Panel>
              
              </Collapse>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Support;
