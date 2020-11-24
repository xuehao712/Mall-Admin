import { Button, Card, Form, Input, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import confirm from 'antd/lib/modal/confirm';
import React, {useState, useEffect} from 'react';
import {orderSettingServices} from 'services/orderSetting';

function OrderSetting(){
    //Data
    const [form] = useForm();
    const defaultOrderSetting = {
        id: null,
        flashOrderOvertime: 0,
        normalOrderOvertime: 0,
        confirmOvertime: 0,
        finishOvertime: 0,
        commentOvertime: 0
    };
    const checkTime = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Time cannot be empty'));
        }
        console.log("checkTime",value);
        let intValue = parseInt(value);
        if (!Number.isInteger(intValue)) {
          return callback(new Error('Please enter number'));
        }
        callback();
    };
    const [orderSetting, setOrderSetting] = useState(defaultOrderSetting);

    //Initial
    useEffect(() => {
        getDetail();
    }, []);
    useEffect(() => {
        form.setFieldsValue(orderSetting);
    }, [orderSetting]);

    //Method
    const onConfirm=()=>{
        confirm({
            title:'Are you sure to submit update?',
            okText:'Yes',
            cancelText:'Cancel',
            type:'warning',
            onOk(){
                orderSettingServices.updateOrderSetting(1,orderSetting).then(response=>{
                    message.success("Submit Success!",10);
                })
            },
            onCancel(){}
        })
    }
    const onConfirmFail=()=>{
        message.warning("Submit param is not valid");
        return false;
    }
    const getDetail=()=>{
        orderSettingServices.getOrderSetting(1).then(response=>{
            setOrderSetting(response.data);
        })
    }
    const handleOrderSettingChange =(e)=>{
        const {value,name} = e.target;
        setOrderSetting({...orderSetting,[name]:value});
    }
    return(
        <Card className="form-container">
            <Form form={form} labelCol={{span:6}} onFinish={onConfirm} onFinishFailed={onConfirmFail}>
                <Form.Item label="FlashOrder: " name="flashOrderOvertime"
                rules={[{validator:checkTime}]}>
                    <Input value={OrderSetting.flashOrderOvertime} name="flashOrderOvertime" onChange={handleOrderSettingChange}
                    className="Setting_input-width" suffix="min" />
                    <spam className="Setting_note-margin">Unpaid, close order</spam>
                </Form.Item>
                <Form.Item label="NormalOrder: " name="normalOrderOvertime"
                rules={[{validator:checkTime}]}>
                    <Input value={OrderSetting.normalOrderOvertime} name="normalOrderOvertime" onChange={handleOrderSettingChange}
                    className="Setting_input-width" suffix="min"/>
                    <spam className="Setting_note-margin">Unpaid, close order</spam>
                </Form.Item>
                <Form.Item label="Shipped: " name="confirmOvertime"
                rules={[{validator:checkTime}]}>
                    <Input value={OrderSetting.confirmOvertime} name="confirmOvertime" onChange={handleOrderSettingChange}
                    className="Setting_input-width" suffix="day"/>
                    <spam className="Setting_note-margin">Unconfirm, complete order</spam>
                </Form.Item>
                <Form.Item label="OrderComplete: " name="finishOvertime"
                rules={[{validator:checkTime}]}>
                    <Input value={OrderSetting.finishOvertime} name="finishOvertime" onChange={handleOrderSettingChange}
                    className="Setting_input-width" suffix="day"/>
                    <spam className="Setting_note-margin">Finish transaction, no customer service</spam>
                </Form.Item>
                <Form.Item label="OrderComplete: " name="commentOvertime"
                rules={[{validator:checkTime}]}>
                    <Input value={OrderSetting.commentOvertime} name="commentOvertime" onChange={handleOrderSettingChange}
                    className="Setting_input-width" suffix="day"/>
                    <spam className="Setting_note-margin">Positive Review</spam>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}
export default OrderSetting;