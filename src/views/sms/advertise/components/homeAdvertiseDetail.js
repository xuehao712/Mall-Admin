import { Button, Card, DatePicker, Form, Input, message, Radio, Select } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import React, {useState, useEffect} from 'react';
import {homeAdvertiseServices} from 'services/homeAdvertise';
import { history } from '../../../../redux/shared/history-redux';
import SingleUpload from 'components/Upload/singleUpload';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

function HomeAdvertiseDetail(props){
    const route = useLocation();
    //Data
    const {isEdit} = props;
    const [homeAdvertiseForm] = Form.useForm();
    const {Option} = Select;
    const {TextArea} = Input;
    const defaultTypeOptions = [
        {
          label: 'PC',
          value: 0
        },
        {
          label: 'APP',
          value: 1
        }
    ];
      const defaultHomeAdvertise = {
        name: null,
        type: 1,
        pic: null,
        startTime: null,
        endTime: null,
        status: 0,
        url: null,
        note: null,
        sort: 0
    };
    const [typeOptions, setTypeOptions] = useState(defaultTypeOptions);

    //Initial
    useEffect(() => {
        if(isEdit) {
            homeAdvertiseServices.getHomeAdvertise(route.state.id).then(response=>{
                homeAdvertiseForm.setFieldsValue({
                    ...response.data,
                    startTime:moment(response.data.startTime),
                    endTime:moment(response.data.endTime)
                });
            })
        } else {
            homeAdvertiseForm.setFieldsValue(defaultHomeAdvertise);
        }
    }, [])

    //Method
    const onSubmit=()=>{
        confirm({
            title:"Are you sure to submit data?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                if(isEdit) {
                    homeAdvertiseServices.updateHomeAdvertise(route.state.id, homeAdvertiseForm.getFieldValue()).then(response => {
                        homeAdvertiseForm.resetFields();
                        message.success("Modify Success",10);
                        history.goBack();
                    });
                } else {
                    homeAdvertiseServices.createHomeAdvertise( homeAdvertiseForm.getFieldValue()).then(response => {
                        resetForm();
                        message.success("Submit Success",10);
                    });
                }
            },
            onCancel(){}
        });
    }
    const onSubmitFail=()=>{
        message.error("Validation Fail",10);
        return false;
    }
    const resetForm=()=>{
        homeAdvertiseForm.setFieldsValue(defaultHomeAdvertise);
    }
    return(
        // <Card className="form-container">
        //     <Form form={homeAdvertiseForm} labelCol={{span:6}} size="small" onFinish={onSubmit} onFinishFailed={onSubmitFail}>
        //         <Form.Item label="Name: " name="name"
        //         rules={[{required:true,message:'Please enter advertise name'},
        //         {min:2,max:140,message:'Length must be between 2 and 140'}]}>
        //             <Input value={homeAdvertise.name} className="input-width" onChange={handleHomeAdvertiseChange} name="name"/>
        //         </Form.Item>
        //         <Form.Item label="Type: " name="type">
        //             <Select value={homeAdvertise.type} onChange={(e)=>handleHomeAdvertiseChange(e,"type")} name="type">
        //                 {defaultTypeOptions.map((item)=>{
        //                     return <Option key={item.value} value={item.value}>{item.label}</Option>
        //                 })}
        //             </Select>
        //         </Form.Item>
        //         <Form.Item label="StartTime: " name="startTime"
        //         rules={[{required:true,message:'Please enter start time'}]}>
        //             <DatePicker value={homeAdvertise.startTime?moment(homeAdvertise.startTime):null} format="YYYY-MM-DD HH:mm:ss" showTime
        //             onChange={(date,dateString)=>setHomeAdvertise({...homeAdvertise,startTime:dateString})} name="startTime" placeholder="Select Date"/>
        //         </Form.Item>
        //         <Form.Item label="EndTime: " name="endTime"
        //         rules={[{required:true,message:'Please enter end time'}]}>
        //             <DatePicker value={homeAdvertise.endTime?moment(homeAdvertise.endTime):null} format="YYYY-MM-DD HH:mm:ss" showTime
        //             onChange={(date,dateString)=>setHomeAdvertise({...homeAdvertise,endTime:dateString})} name="endTime" placeholder="Select Date"/>
        //         </Form.Item>
        //         <Form.Item label="Status: " name="status">
        //             <Radio.Group value={homeAdvertise.status} onChange={handleHomeAdvertiseChange} name="status">
        //                 <Radio value={0}>Unpublish</Radio>
        //                 <Radio value={1}>Publish</Radio>
        //             </Radio.Group>
        //         </Form.Item>
        //         <Form.Item label="Picture: " name="pic"
        //         rules={[{required:true,message:'Please select advertise picture'}]}>
        //             <SingleUpload value={homeAdvertise.pic} onChange={handleHomeAdvertiseChange} name="pic"/>
        //         </Form.Item>
        //         <Form.Item label="Sort: " name="sort">
        //             <Input value={homeAdvertise.sort} className="input-width" onChange={handleHomeAdvertiseChange} name="sort"/>
        //         </Form.Item>
        //         <Form.Item label="Url: " name="url"
        //         rules={[{required:true,message:'Please enter advertise url'}]}>
        //             <Input value={homeAdvertise.url} className="input-width" onChange={handleHomeAdvertiseChange} name="url"/>
        //         </Form.Item>
        //         <Form.Item label="Note: " name="note">
        //             <TextArea rows={5} value={homeAdvertise.note} className="input-width" 
        //             onChange={handleHomeAdvertiseChange} name="note" placeholder="Please enter content"/>
        //         </Form.Item>
        //         <Form.Item>
        //             <Button type="primary" htmlType="submit">Confirm</Button>
        //             {!isEdit && <Button onClick={resetForm}>Reset</Button>}
        //         </Form.Item>
        //     </Form>
        // </Card>
        <Card className="form-container">
            <Form form={homeAdvertiseForm} labelCol={{span:6}} size="small" onFinish={onSubmit} onFinishFailed={onSubmitFail}>
                <Form.Item label="Name: " name="name"
                rules={[{required:true,message:'Please enter advertise name'},
                {min:2,max:140,message:'Length must be between 2 and 140'}]}>
                    <Input className="input-width"/>
                </Form.Item>
                <Form.Item label="Type: " name="type">
                    <Select name="type">
                        {defaultTypeOptions.map((item)=>{
                            return <Option key={item.value} value={item.value}>{item.label}</Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="StartTime: " name="startTime"
                rules={[{required:true,message:'Please enter start time'}]}>
                    <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime showTimeplaceholder="Select Date"/>
                </Form.Item>
                <Form.Item label="EndTime: " name="endTime" 
                rules={[{required:true,message:'Please enter end time'}]}>
                    <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime showTimeplaceholder="Select Date"/>
                </Form.Item>
                <Form.Item label="Status: " name="status">
                    <Radio.Group name="status">
                        <Radio value={0}>Unpublish</Radio>
                        <Radio value={1}>Publish</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Picture: " name="pic"
                rules={[{required:true,message:'Please select advertise picture'}]}>
                    <SingleUpload form={homeAdvertiseForm}/>
                </Form.Item>
                <Form.Item label="Sort: " name="sort">
                    <Input className="input-width" />
                </Form.Item>
                <Form.Item label="Url: " name="url"
                rules={[{required:true,message:'Please enter advertise url'}]}>
                    <Input  className="input-width" />
                </Form.Item>
                <Form.Item label="Note: " name="note">
                    <TextArea rows={5} className="input-width" 
                     placeholder="Please enter content"/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Confirm</Button>
                    {!isEdit && <Button onClick={resetForm}>Reset</Button>}
                </Form.Item>
            </Form>
        </Card>
    )
}
export default HomeAdvertiseDetail;