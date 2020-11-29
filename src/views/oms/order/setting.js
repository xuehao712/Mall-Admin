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
    const checkTime = (rule, value) => {
        if (!value) {
          return Promise.reject('Time cannot be empty');
        }
        console.log("checkTime",value);
        let intValue = parseInt(value);
        if (!Number.isInteger(intValue)) {
          return Promise.reject('Please enter number');
        }
        return Promise.resolve();
    };

    //Initial
    useEffect(() => {
        getDetail();
    }, []);

    //Method
    const onConfirm=()=>{
        confirm({
            title:'Are you sure to submit update?',
            okText:'Yes',
            cancelText:'Cancel',
            type:'warning',
            onOk(){
                orderSettingServices.updateOrderSetting(1,form.getFieldsValue()).then(response=>{
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
            form.setFieldsValue(response.data);
        })
    }
    return(
        <Card className="form-container">
            <Form form={form} labelCol={{span:6}} onFinish={onConfirm} onFinishFailed={onConfirmFail}>
                <Form.Item label="FlashOrder: " name="flashOrderOvertime" extra="Unpaid, close order"
                rules={[{validator:checkTime}]}>
                    <Input type="number" className="Setting_input-width" suffix="min" />
                </Form.Item>
                <Form.Item label="NormalOrder: " name="normalOrderOvertime" extra="Unpaid, close order"
                rules={[{validator:checkTime}]}>
                    <Input type="number" className="Setting_input-width" suffix="min"/>
                </Form.Item>
                <Form.Item label="Shipped: " name="confirmOvertime" extra="Unconfirm, complete order"
                rules={[{validator:checkTime}]}>
                    <Input type="number" className="Setting_input-width" suffix="day"/>
                </Form.Item>
                <Form.Item label="OrderComplete: " name="finishOvertime" extra="Finish transaction, no customer service"
                rules={[{validator:checkTime}]}>
                    <Input type="number" className="Setting_input-width" suffix="day"/>
                </Form.Item>
                <Form.Item label="OrderComplete: " name="commentOvertime" extra="Positive Review"
                rules={[{validator:checkTime}]}>
                    <Input type="number" className="Setting_input-width" suffix="day"/>
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