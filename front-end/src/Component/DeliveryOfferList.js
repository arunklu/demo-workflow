import React from 'react'
import Aboutheader from './Aboutheader'
import {Row,Col} from 'antd';
import Recomended from './Recomended';

export default function DeliveryOfferList() {
  return (
    <div>
        
        <Aboutheader />
        <h1>Places With Delivery Offer</h1>
      <br />
      <br />
      <Row>


        

        <br />
        <br />
            <Col lg={6}>
            <Recomended />
            </Col>
            <Col lg={6}>
            <Recomended />
            </Col >
            <Col lg={6}>
            <Recomended />
            </Col>
            <Col lg={6}>
            <Recomended />
            </Col>
        <br />
        <br />
        <Col lg={6} style={{marginTop:16}}>
            <Recomended />
            </Col>
            <Col lg={6} style={{marginTop:16}}>
            <Recomended />
            </Col >
            <Col lg={6} style={{marginTop:16}}>
            <Recomended />
            </Col>
            <Col lg={6} style={{marginTop:16}}>
            <Recomended />
            </Col>

            <br/>
            <br />
            <Col lg={6} style={{marginTop:16}}>
            <Recomended />
            </Col>
         
            <Col lg={6} style={{marginTop:16}}>
            <Recomended />
            </Col >
           
            <Col lg={6} style={{marginTop:16}}>
            <Recomended />
            </Col>
            
            <Col lg={6} style={{marginTop:16}}>
            <Recomended />
            </Col>
        </Row>


        <footer />
    </div>
  )
}
