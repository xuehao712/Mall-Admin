import { Button, Card, Form, Input, message, Radio } from 'antd';
import React, {useState, useEffect, useRef} from 'react';
import { useLocation } from 'react-router-dom';
import SingleUpload from 'components/Upload/singleUpload';
import {brandServices} from 'services/brand';
import confirm from 'antd/lib/modal/confirm';

function BrandDetail(props){
    const {isEdit} = props;
    const route = useLocation();
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const defaultBrand={
        bigPic: '',
        brandStory: '',
        factoryStatus: 0,
        firstLetter: '',
        logo: '',
        name: '',
        showStatus: 0,
        sort: 0
    };
    const [brand, setbrand] = useState(defaultBrand);
    useEffect(() => {
        if(isEdit) {
            brandServices.getBrand(route.state.id).then(response=>{
                setbrand(response.data);
            })
        } else {
            setbrand(defaultBrand);
        }
    }, []);
    useEffect(() => {
        form.setFieldsValue(brand);
    }, [brand]);
    
    const onSubmit=()=> {
        confirm({
            title:"Are you sure to submit data?",
            okText:'OK',
            okType:'primary',
            onOk(){
                if(isEdit) {
                    brandServices.updateBrand(route.state.id,brand).then(response =>{
                        form.resetFields();
                        message.success("Modify Success",10);
                        history.back();
                    })
                } else {
                    brandServices.createBrand(brand).then(response =>{
                        form.resetFields();
                        setbrand(defaultBrand);
                        message.success("Submit Success",10);
                    })
                }
            },
            onCancel(){}
        })
    }
    const handleBrandChange=(e,param)=>{
        if(param){
            setbrand({...brand,[param]:e});
        }else {
            const {name,value} = e.target;
            setbrand({...brand,[name]:value});
        }
    }
    const onSubmitFail=()=>{
        message.error("Validate Fail",10);
        return false;
    }
    const resetForm=()=>{
        form.resetFields();
        setbrand(defaultBrand);
    }
    return(
        <Card className="form-container">
            <Form labelCol={{span:5}} form={form} onFinish={onSubmit} onFinishFailed={onSubmitFail}>
                <Form.Item label="Name: " name="name"
                rules={[{ required:true,message:'Please enter brand name',validateTrigger:'blur' },
                {min:2,max:140,message:"Length must between 2 and 140",validateTrigger:'blur'}]}>
                    <Input value={brand.name} name="name" onChange={handleBrandChange}/>
                </Form.Item>
                <Form.Item label="Alphabet: " name="firstLetter" >
                    <Input value={brand.firstLetter} name="firstLetter" onChange={handleBrandChange}/>
                </Form.Item>
                <Form.Item label="Logo: " name="logo">
                    <SingleUpload value={brand.logo} name="logo" onChange={handleBrandChange}/>
                    {/* rules={[{ required:true,message:'Please enter brand logo',validateTrigger:'blur' }]}/> */}
                </Form.Item>
                <Form.Item label="Bigpic: " name="bigPic">
                    <Input value={brand.bigPic} name="bigPic" onChange={handleBrandChange}/>
                </Form.Item>
                <Form.Item label="Story: " name="brandStory">
                    <TextArea placeholder="Please enter content" value={brand.brandStory} name="brandStory" onChange={handleBrandChange}/>
                </Form.Item>
                <Form.Item label="Sort: " name="sort">
                    <Input type="number" value={brand.sort} name="sort" onChange={handleBrandChange}/>
                </Form.Item>
                <Form.Item label="ShowStatus: " name="showStatus">
                    <Radio.Group onChange={handleBrandChange} name="showStatus" value={brand.showStatus}>
                        <Radio value={1}>Yes</Radio>
                        <Radio value={0}>No</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Manufactory: " name="factoryStatus">
                    <Radio.Group onChange={handleBrandChange} name="factoryStatus" value={brand.factoryStatus}>
                        <Radio value={1}>Yes</Radio>
                        <Radio value={0}>No</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item style={{textAlign:'center'}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    {!isEdit &&
                        <Button onClick={resetForm}>Reset</Button>
                    }
                </Form.Item>
            </Form>
        </Card>
    )
}
export default BrandDetail;