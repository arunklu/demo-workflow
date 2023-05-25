
import React, { Component } from 'react'
import Detailscard from './Component/Detailscard';
import  MenuList  from './Component/Menulist';
import Aboutheader from './Component/Aboutheder'

export default class Details extends Component {
    render() {
        return (
            <div>
                <Aboutheader />
                <Detailscard />
                <MenuList />
            </div>
        )
    }
}
