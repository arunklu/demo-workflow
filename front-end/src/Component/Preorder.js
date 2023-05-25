import React, { useState } from 'react';
import { Modal, Button ,DatePicker, Space,TimePicker, Select,} from 'antd'
const { Option } = Select;
export default function Preorder() {
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [type, setType] = useState('time');
    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

      function onChange(date, dateString) {
        console.log(date, dateString);
      }
      function PickerWithType({ type, onChange }) {
        if (type === 'time') return <TimePicker onChange={onChange} />;
        if (type === 'date') return <DatePicker onChange={onChange} />;
        return <DatePicker picker={type} onChange={onChange} />;
      }
  return (
    <>
    <Button type="primary" onClick={showModal}>
      Only Temprory Preorder
    </Button>
    <Modal title="CLOSED NOW !" className="hotelsdetails" footer={null} width={400}  style={{height:'30vh !important'}}visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <p style={{marginLeft:'15px'}}><b>Date</b></p>
      <Space direction="vertical">
    <DatePicker onChange={onChange} style={{width:'350px',marginLeft:'15px'}}/>

<p style={{clear:'both',fontWeight:'bold',marginLeft:'15px'}}> Time</p>
    <PickerWithType className="timepicker" type="time" style={{width:'350px !important', marginLeft:'15px'}} onChange={value => console.log(value)}  />
  </Space>
  <br /><br />
  <Button type="primary" danger shape="round"  block>
         PRE-ORDER
        </Button>
    </Modal>
  </>
  )
}
