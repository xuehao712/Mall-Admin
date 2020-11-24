import { Button, Card, Form, Input, message, Radio, Select } from 'antd';
import React, {useState, useEffect} from 'react';
import {productAttrCateServices} from 'services/productAttrCate';
import {productAttrServices} from 'services/productAttr';
import ProductAttr from '..';
import {history} from '../../../../redux/shared/history-redux';
import { useLocation } from 'react-router-dom';
import confirm from 'antd/lib/modal/confirm';

const { Option } = Select;
function ProductAttrDetail(props){
    const route = useLocation();
    const {isEdit} = props;
    const [form] = Form.useForm();
    const defaultProductAttr = {
        filterType: 0,
        handAddStatus: 0,
        inputList: '',
        inputType: 0,
        name: '',
        productAttributeCategoryId: 0,
        relatedStatus: 0,
        searchType: 0,
        selectType: 0,
        sort: 0,
        type: 0
    };
    //Data
    const [productAttr, setProductAttr] = useState(defaultProductAttr);
    const [productAttrCateList, setProductAttrCateList] = useState([]);
    const [inputListFormat, setInputListFormat] = useState(null);
    //Initial
    useEffect(() => {
        getCateList();
        if(isEdit) {
            productAttrServices.getProductAttr(route.state.id).then(response=>{
                setProductAttr(response.data);
                setInputListFormat(response.data.inputList.replace(/,/g,'\n'));
            });
        }else {
            resetProductAttr();
        }
    }, []);

    //Watch value change
    useEffect(() => {
        form.setFieldsValue(productAttr);
    }, [productAttr])
    useEffect(() => {
        if(inputListFormat){
            var newValue = inputListFormat.replace(/\n/g,',');
            setProductAttr({...ProductAttr,inputList:newValue});
        }
    }, [inputListFormat])

    //Method
    const handleProductAttrChange=(e,param)=>{
        if(param){
            setProductAttr({...productAttr,[param]:e});
        }else{
            const {value,name}=e.target;
            setProductAttr({...productAttr,[name]:value});
        }
    }
    const getCateList=()=>{
        let listQuery = {pageNum: 1, pageSize:100};
        productAttrCateServices.fetchList(listQuery).then(response=>{
            setProductAttrCateList(response.data.list);
        })
    }
    const resetProductAttr=()=>{
        var tempProductAttr = defaultProductAttr;
        tempProductAttr.productAttributeCategoryId = Number(route.state.cid);
        tempProductAttr.type = Number(route.state.type);
        setProductAttr(tempProductAttr);
    }

    const onSubmit=()=>{
        confirm({
            title:"Are you sure to submit this data?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                if(isEdit) {
                    productAttrServices.updateProductAttr(route.state.id,productAttr).then(response=>{
                        message.success("Modify Success",10);
                        history.goBack();
                    })
                } else {
                    productAttrServices.createProductAttr(productAttr).then(response=>{
                        message.success("Submit Success",10);
                        form.resetFields();
                        resetForm();
                    })
                }
            },
            onCancel(){}
        });
    }
    const onSubmitFail=()=>{
        message.error("Validate Fail",10);
        return false;
    }
    const resetForm=()=>{
        form.resetFields();
        resetProductAttr();
    }
    return(
        <Card className="form-container">
            <Form form={form} labelCol={{span:5}} onFinish={onSubmit} onFinishFailed={onSubmitFail}>
                <Form.Item label="AttrName: " name="name"
                rules={[{required:true,message:'Please enter attr name'},{min:2,max:140,message:"Length must be between 2 and 140"}]}>
                    <Input value={productAttr.name} name="name" onChange={handleProductAttrChange}/>
                </Form.Item>
                <Form.Item label="Category: " name="productAttributeCategoryId">
                    <Select placeholder="Select" value={productAttr.productAttributeCategoryId} name="productAttributeCategoryId" 
                    onChange={(e)=>handleProductAttrChange(e,'productAttributeCategoryId')}>
                        {productAttrCateList.map((item)=>{
                            return <Option key={item.id} value={item.id}>{item.name}</Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="FilterType: " name="filterType">
                    <Radio.Group value={productAttr.filterType} name="filterType" onChange={handleProductAttrChange}>
                        <Radio value={0}>Normal</Radio>
                        <Radio value={1}>Color</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="SearchType: " name="searchType">
                    <Radio.Group value={productAttr.searchType} name="searchType" onChange={handleProductAttrChange}>
                        <Radio value={0}>No</Radio>
                        <Radio value={1}>Keyword</Radio>
                        <Radio value={2}>Range</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="AttrRelation: " name="relatedStatus">
                    <Radio.Group value={productAttr.relatedStatus} name="relatedStatus" onChange={handleProductAttrChange}>
                        <Radio value={0}>Yes</Radio>
                        <Radio value={1}>No</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="SelectType: " name="selectType">
                    <Radio.Group value={productAttr.selectType} name="selectType" onChange={handleProductAttrChange}>
                        <Radio value={0}>Unique</Radio>
                        <Radio value={1}>Single</Radio>
                        <Radio value={2}>Multiple</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="InputType: " name="inputType">
                    <Radio.Group value={productAttr.inputType} name="inputType" onChange={handleProductAttrChange}>
                        <Radio value={0}>Handy</Radio>
                        <Radio value={1}>Select</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="AttrInputList: " name="inputListFormat">
                    <Input value={inputListFormat} name="name" onChange={(e)=>setInputListFormat(e.target.value)}/>
                </Form.Item>
                <Form.Item label="HandAdded: " name="handAddStatus">
                    <Radio.Group value={productAttr.handAddStatus} name="handAddStatus" onChange={handleProductAttrChange}>
                        <Radio value={0}>Yes</Radio>
                        <Radio value={1}>No</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Sort: " name="sort">
                    <Input type="number" value={productAttr.sort} name="sort" onChange={handleProductAttrChange}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                    {!isEdit && <Button onClick={resetForm}>Reset</Button> }
                </Form.Item>
            </Form>
        </Card>
    )
}
export default ProductAttrDetail;