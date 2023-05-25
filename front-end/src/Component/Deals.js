import React from 'react'
import { Card, Avatar } from 'antd';
import img from '../image/img3.jpg'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Meta } = Card;
export default function Deals() {
    return (
        <div>
             <Card
                    style={{ margin:7 }}
                    cover={
                    <img
                        alt="Restaurants food"
                        src={img}
                        style={{borderRadius: '0.25rem', backgroundColor: 'rgba(255,255,255,0.1)',boxShadow: '0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%)'}}
                    />
                    }
                    actions={[
                    "20 - 30 mins",
                    "min order $10",
                    "20% off",
                    ]}
                >
                    <Meta
                    avatar={<Avatar src="https://mpng.subpng.com/20180420/xye/kisspng-royalty-free-stock-photography-clip-art-offers-vector-5ad9cbb941c609.9995917615242229052694.jpg" size={74}/>}
                    title="Grill Guru"
                    description="Jerk,Peri Peri"
                    />
                </Card>
        </div>
    )
}
