import { Steps } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, {useState} from 'react';

function LogisticsDialog(props){
    //Data
    const defaultLogisticsList=[
        {name: 'Order submited, waiting to be paid',time:'2020-10-01 12:00:00 '},
        {name: 'Order paid',time:'2020-10-05 12:00:00 '},
        {name: 'Shipper created a label, UPS has not received the package yet.',time:'2020-10-06 12:00:00 '},
        {name: 'Arrived at Facility at New York',time:'2020-10-07 12:00:00 '},
        {name: 'Destination Scan ',time:'2020-10-08 12:00:00 '},
        {name: 'Package transferred to post office ',time:'2020-10-09 12:00:00 '},
        {name: 'Package delivered by local post office',time:'2020-10-09 12:00:00 '}
    ];
    const {value,onChange} = props;

    const [logisticsList, setLogisticsList] = useState(defaultLogisticsList);
    return(
        <Modal title="Order Tracking" width="600px" visible={value} onCancel={()=>onChange(false)}
        okButtonProps={{ style: { display: 'none' } }}>
            <Steps direction="vertical" current={6} status="finish">
                {logisticsList.map((item)=>{
                    return <Steps.Step key={item.name} description={item.time} title={item.name}></Steps.Step>
                })}
            </Steps>
        </Modal>
    )
}
export default LogisticsDialog;