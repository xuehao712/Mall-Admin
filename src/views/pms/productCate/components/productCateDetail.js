import { Button, Card, Cascader, Form, Input, message, Radio, Select, Space } from 'antd';
import React, {useState, useEffect} from 'react';
import {productCateServices} from 'services/productCate';
import {productAttrCateServices} from 'services/productAttrCate';
import {productAttrServices} from 'services/productAttr';
import SingleUpload from '../../../../components/Upload/singleUpload';
import { history } from '../../../../redux/shared/history-redux';
import { useLocation } from 'react-router-dom';
import confirm from 'antd/lib/modal/confirm';
import './productCateDetail.scss';

const { Option } = Select;
const {TextArea} = Input;
function ProductCateDetail(props){
     //Data
     const route = useLocation();
     const {isEdit} = props;
     const [productCateForm] = Form.useForm();
     const defaultProductCate = {
         description: '',
         icon: '',
         keywords: '',
         name: '',
         navStatus: 0,
         parentId: 0,
         productUnit: '',
         showStatus: 0,
         sort: 0,
         productAttributeIdList: []
     };
     const [selectProductCateList, setSelectProductCateList] = useState([]);
     const [filterAttrs, setFilterAttrs] = useState([]);
     const [filterProductAttrList, setFilterProductAttrList] = useState([{value:[]}]);
    //Initial
    useEffect(() => {
        if(isEdit) {
            productCateServices.getProductCate(route.state.id).then(response=>{
                productCateForm.setFieldsValue(response.data);
            })
            productAttrServices.getProductAttrInfo(route.state.id).then(response=>{
                if(response.data !=null && response.data.length>0) {
                    let filterList = [];
                    for(let i =0;i<response.data.length;i++){
                        filterList.push({
                            key: Date.now() +i,
                            value: [response.data[i].attributeCategoryId,response.data[i].attributeId]
                        })
                    }
                    setFilterProductAttrList(filterList);
                }
            });
        } else {
            productCateForm.setFieldsValue(defaultProductCate);
        }
        getSelectProductCateList();
        getProductAttrCateList();
    }, [])

    //Method
    const getSelectProductCateList=()=>{
        productCateServices.fetchList(0,{pageSize:100,pageNum:1}).then(response=>{
            let list = response.data.list;
            list.unshift({id:0,name:'No Parent'});
            setSelectProductCateList(list);
        })
    }
    const getProductAttrCateList=()=>{
        productAttrCateServices.fetchListWithAttr().then(response=>{
            let list = response.data;
            let filter = filterAttrs;
            for(let i =0;i<list.length;i++) {
                let productAttrCate = list[i];
                let children =[];
                if(productAttrCate.productAttributeList != null &&productAttrCate.productAttributeList.length > 0) {
                    for(let j =0;j<productAttrCate.productAttributeList.length;j++) {
                        children.push({
                            label: productAttrCate.productAttributeList[j].name,
                            value: productAttrCate.productAttributeList[j].id
                        })
                    }
                }
                filter.push({label: productAttrCate.name, value: productAttrCate.id, children: children});
            }
            setFilterAttrs(filter);
        })
    }
    const getProductAttributeIdList=()=>{
        //Get filter product Attribute
        let productAttributeIdList =[];
        for (let i = 0; i < filterProductAttrList.length; i++) {
            let item = filterProductAttrList[i];
            if (item.value !== null && item.value.length === 2) {
              productAttributeIdList.push(item.value[1]);
            }
          }
        return productAttributeIdList;
    }
    const onSubmit =()=>{
        confirm({
            title:"Are you sure to submit this data?",
            okText:'OK',
            okType:'primary',
            onOk(){
                productCateForm.setFieldsValue({productAttributeIdList:getProductAttributeIdList()});
                console.log(productCateForm.getFieldsValue());
                if(isEdit) {
                    productCateServices.updateProductCate(route.state.id,productCateForm.getFieldsValue()).then(response=>{
                        message.success("Modify Success",5);
                        history.goBack();
                    })
                } else {
                    productCateServices.createProductCate(productCateForm.getFieldsValue()).then(response=>{
                        resetForm();
                        message.success("Submit Success",5);
                    })
                }
            },
            onCancel(){}
        })
    }
    const onSubmitFail=()=>{
        message.error("Validation Fail",5);
        return false;
    }
    const resetForm=()=>{
        productCateForm.setFieldsValue(defaultProductCate);
        getSelectProductCateList();
        setFilterProductAttrList([{value:[]}]);
    }
    const removeFilterAttr=(productAttributeId)=>{
        if(filterProductAttrList.length === 1) {
            message.warning("At least one",5);
            return;
        }
        var index = filterProductAttrList.indexOf(productAttributeId);
        if(index!== -1) {
            let list = [...filterProductAttrList];
            list.splice(index,1);
            setFilterProductAttrList(list);
        }
    }
    const handleAddFilterAttr=()=>{
        if(filterProductAttrList.length === 3) {
            message.warning("Most three items",5);
            return;
        }
        const data={
            value: null,
            key: Date.now()
        }
        setFilterProductAttrList([...filterProductAttrList,data]);
    }
    const handleFilterProductAttrChange=(value,index)=>{
        let templist = filterProductAttrList;
        templist[index].value = value;
        setFilterProductAttrList([...templist]);
    }
    const filterLabelFilter = (index)=>{
        if(index === 0) {
            return "FilterAttr: ";
        } else {
            return ' ';
        }
    }
    return(
        <div className="productCateDetail_form-wrapper">
            <Card className="form-container">
                <Form labelCol={{span:5}} form={productCateForm} onFinish={onSubmit} onFinishFailed={onSubmitFail}>
                    <Form.Item label="Name: " name="name"
                    rules={[{required:true,message:'Please enter brand name'},{min:2,max:140,message:'Length must between 2 and 140'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Parent: " name="parentId">
                        <Select placeholder="Please select">
                            {selectProductCateList.map((item)=>{
                                return <Option key={item.id} value={item.id}>{item.name}</Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Unit: " name="productUnit">
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Sort: " name="sort">
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Display: " name="showStatus">
                        <Radio.Group>
                            <Radio value={1}>Yes</Radio>
                            <Radio value={0}>No</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Nav: " name="navStatus">
                        <Radio.Group>
                            <Radio value={1}>Yes</Radio>
                            <Radio value={0}>No</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Icon: " name="icon">
                        <SingleUpload/>
                    </Form.Item>
                    {filterProductAttrList.map((filterProductAttr,index)=>{
                        return( 
                        <Form.Item colon={index===0?true:false} label={filterLabelFilter(index)} key={index}>
                            <Cascader allowClear key={index} value={filterProductAttr.value} onChange={(e)=>handleFilterProductAttrChange(e,index)} 
                            options={filterAttrs} name="value"/>
                            <Button danger style={{marginTop:'10px'}} onClick={()=>removeFilterAttr(filterProductAttr)}>Delete</Button>
                        </Form.Item>)
                    })}
                    <Form.Item style={{textAlign:'center'}}>
                        <Button size="small" type="primary" onClick={handleAddFilterAttr}>Add</Button>
                    </Form.Item>
                    <Form.Item label="Keyword: " name="keywords">
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Description: " name="description">
                        <TextArea autoSize="true"/>
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            {!isEdit &&
                                <Button onClick={resetForm}>Reset</Button>
                            }
                        </Space>                   
                    </Form.Item>
                    <Form.Item name="productAttributeIdList" noStyle>
                        <Input hidden/>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
export default ProductCateDetail;