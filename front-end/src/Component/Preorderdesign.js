import React from 'react'
import { Card, Result, Button,Row,Col,Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';


export default function Preorderdesign() {
  return (
    <div>
        

        <Card style={{  textAlign:'left',marginBottom:4,width:500,marginLeft:30}}>
            <p><b>#DG165701430100024255</b></p>
            <p>2022-07-05 |1 Items | $ -12.00 | Order Type: Collection</p>
            <p style={{color:'orange'}}>Click here To Review Order</p>
        </Card>
        <Card style={{  textAlign:'left',marginBottom:4,width:500,marginLeft:30}}>
            <p style={{fontSize:22,fontWeight:'bold'}}></p>
            <Row>
                <Col span={12}>
                <p><b>FROM</b></p>
                <p> <Avatar size="small" icon={<UserOutlined />} /> &nbsp;<b>Grill Guru</b></p>
                <p>Oswald Street,GlassGow, Uk</p>
                <br />
                <br />
                <p><b>COLLECT BY</b></p>
                <p><Avatar size="small" icon={<UserOutlined />} /> &nbsp;<b>Test</b> <br /> Test@gmail.com</p>
                
                <br/>
                <p>7574344346</p>

                </Col>
                <Col span={12}>
                    <p><Avatar size="small" icon={<UserOutlined />} /> &nbsp;<b>2 ITEMS</b></p>
                    <p style={{padding:'4px 10px'}}><span>Marghret Pizza   x 1</span><span style={{float:'right'}}>&#163; 9.00</span></p>
                    <p style={{padding:'4px 10px'}}><span>Marghret Pizza   x 1</span><span style={{float:'right'}}>&#163; 9.00</span></p>
                    <p style={{padding:'4px 10px'}}><span>Marghret Pizza   x 1</span><span style={{float:'right'}}>&#163; 9.00</span></p>
                    <br />
                    <hr />
                    <p><b>Discount</b><b style={{float:'right'}}>&#163; 9.00</b></p>
                    <p><b>Admin & Carry Bag Fee</b><b style={{float:'right'}}>&#163; 9.00</b></p>
                    <p><b>Total</b><b style={{float:'right'}}>&#163; 9.00</b></p>
                    <p style={{color:'orange'}}>NOT PAID</p>
                </Col>
                </Row>
           
        </Card>

        <Card style={{  textAlign:'left',marginBottom:4,width:500,marginLeft:30}}>
        <Result style={{  fontSize:14,textAlign:'left'}}
    status="success"
    title="PreOrder Placed "
    subTitle="Order number: #DG165701430100024255 Please Wait Restaurant configuration takes 1-5 minutes, please wait."
    extra={[
      
      <Button key="buy" danger>Order Again</Button>,
    ]}
  />
        </Card>
    </div>
  )
}
