import React from 'react'
import Aboutheader from './Aboutheader';
import footer from './footer'
import {Row,Col} from 'antd';
import Recomended from './Recomended';
export default function OfferListPage() {
  return (
    <div>
      <Aboutheader />
      <h1>List Of All Offer On Dish Food </h1>
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
