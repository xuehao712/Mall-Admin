import { Button, Card, Cascader, DatePicker, Form, Input, message, Radio, Select, Space, Table } from 'antd';
import Item from 'antd/lib/list/Item';
import confirm from 'antd/lib/modal/confirm';
import Column from 'antd/lib/table/Column';
import { relativeTimeRounding } from 'moment';
import React, {useState, useEffect, useReducer} from 'react';
import { useLocation } from 'react-router-dom';
import {couponServices} from 'services/coupon';
import {productServices} from 'services/product';
import {productCateServices} from 'services/productCate'
import { history } from '../../../../redux/shared/history-redux';
import './couponDetail.scss';
import moment from 'moment';

function CouponDetail(props){
    const route = useLocation();
    const [couponForm] = Form.useForm();
    const {Option} = Select;
    const { RangePicker } = DatePicker;
    const {TextArea} = Input;
    const {isEdit} = props;
    //Initial
    useEffect(() => {
        if(isEdit) {
            couponServices.getCoupon(route.state.id).then(response=>{
                couponForm.setFieldsValue(response.data);
                couponForm.setFieldsValue({...couponForm.getFieldValue(),formTime:[moment(response.data.startTime),moment(response.data.endTime)]})
                setCoupon(response.data);
            })
        }else {
            couponForm.setFieldsValue(defaultCoupon);
            setCoupon(defaultCoupon);
        }
        
        getProductCateList();
    }, [])

    //Data
    const defaultCoupon = {
        type: 0,
        name: null,
        platform: 0,
        amount: null,
        perLimit: 1,
        minPoint: null,
        startTime: null,
        endTime: null,
        useType: 0,
        note: null,
        publishCount: null,
        productRelationList: [],
        productCategoryRelationList: []
    };
      const defaultTypeOptions = [
        {
          label: 'AllCoupon',
          value: 0
        },
        {
          label: 'MemberCoupon',
          value: 1
        },
        {
          label: 'ShoppingCoupon',
          value: 2
        },
        {
          label: 'RegisterCoupon',
          value: 3
        }
    ];
      const defaultPlatformOptions = [
        {
          label: 'All',
          value: 0
        },
        {
          label: 'App',
          value: 1
        },
        {
          label: 'PC',
          value: 2
        }
    ];
    const [typeOptions, setTypeOptions] = useState(defaultTypeOptions);
    const [platformOptions, setPlatformOptions] = useState(defaultPlatformOptions);
    const [selectProduct, setSelectProduct] = useState(null);
    const [selectProductLoading, setSelectProductLoading] = useState(false);
    const [selectProductOptions, setSelectProductOptions] = useState([]);
    const [selectProductCate, setSelectProductCate] = useState(null);
    const [productCateOptions, setProductCateOptions] = useState([]);
    const [coupon, setCoupon] = useState(defaultCoupon);
    //Methods
    const onSubmit=()=>{
        confirm({
            title:"Are you sure to submit data?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                couponForm.setFieldsValue({...couponForm.getFieldValue(),startTime:couponForm.getFieldValue().formTime[0],endTime:couponForm.getFieldValue().formTime[1]})
                let {formTime:Remove,...temp} = couponForm.getFieldValue();
                if(isEdit){
                    couponServices.updateCoupon(route.state.id,couponForm.getFieldValue()).then(response=>{
                        resetForm();
                        message.success('Modify Success',10);
                        history.goBack();
                    })
                } else {
                    couponServices.createCoupon(couponForm.getFieldValue()).then(response=>{
                        resetForm();
                        message.success('Add Success',10);
                        history.goBack();
                    })
                }
            },
            onCancel(){}
        });
    }
    const onSubmitFail=()=>{
        message.error('Validation Fail',10);
        return false;
    }
    const resetForm=()=>{
        couponForm.setFieldsValue(defaultCoupon);
        setCoupon(defaultCoupon);
    }
    const searchProductMethod=(query)=>{
        if(query !== '') {
            setSelectProductLoading(true);
            productServices.fetchSimpleList({keyword:query}).then(response=>{
                setSelectProductLoading(false);
                let productList = response.data;
                let tempOptions = [];
                for(let i=0;i<productList.length;i++){
                    let item = productList[i];
                    tempOptions.push({productId:item.id,productName:item.name,productSn:item.productSn});
                }
                setSelectProductOptions(tempOptions);
            });
        } else {
            setSelectProductOptions([]);
        }
    }
    const handleAddProductRelation=()=>{
        if(selectProduct === null) {
            message.warning("Please select product");
            return;
        }
        let tempList = couponForm.getFieldValue();
        tempList.productRelationList.push(getProductById(selectProduct));
        couponForm.setFieldsValue(tempList);
        setCoupon({...coupon,productRelationList:[...tempList.productRelationList]});
        setSelectProduct(null);
    }
    const handleDeleteProductRelation=(index,row)=>{
        let tempList = couponForm.getFieldValue();
        tempList.productRelationList.splice(index,1);
        couponForm.setFieldsValue(tempList);
        setCoupon({...tempList});
    }
    const handleAddProductCategoryRelation=()=>{
        if(selectProductCate===null||selectProductCate.length===0) {
            message.warning("Please select product cate");
            return;
        }
        let tempList = couponForm.getFieldValue();
        tempList.productCategoryRelationList.push(getProductCateByIds(selectProductCate));
        couponForm.setFieldsValue(tempList);
        setSelectProductCate(null);
        setCoupon({...coupon,productCategoryRelationList:[...tempList.productCategoryRelationList]});
    }
    const handleDeleteProductCateRelation=(index,row)=>{
        let tempList = couponForm.getFieldValue();
        tempList.productCategoryRelationList.splice(index,1);
        couponForm.setFieldsValue(tempList);
        setCoupon({...tempList});
    }
    const getProductById=(id)=>{
        for(let i=0;i<selectProductOptions.length;i++){
            if(id===selectProductOptions[i].productId){
              return selectProductOptions[i];
            }
        }
        return null;
    }
    const getProductCateList=()=>{
        productCateServices.fetchListWithChildren().then(response => {
            let list = response.data;
            let tempOptions =[];
            for (let i = 0; i < list.length; i++) {
              let children = [];
              if (list[i].children != null && list[i].children.length > 0) {
                for (let j = 0; j < list[i].children.length; j++) {
                  children.push({label: list[i].children[j].name, value: list[i].children[j].id});
                }
              }
              tempOptions.push({label: list[i].name, value: list[i].id, children: children});
            }
            setProductCateOptions(tempOptions);
        });
    }
    const getProductCateByIds=(ids)=>{
        let name;
        let parentName;
        for (let i = 0; i < productCateOptions.length; i++) {
          if (productCateOptions[i].value === ids[0]) {
            parentName = productCateOptions[i].label;
            for (let j = 0; j <productCateOptions[i].children.length; j++) {
              if (productCateOptions[i].children[j].value === ids[1]) {
                name = productCateOptions[i].children[j].label;
              }
            }
          }
        }
        return {productCategoryId: ids[1], productCategoryName: name, parentCategoryName: parentName};
    }
    return(
        <div className="form-wrapper">
            <Card className="form-container">
                <Form form={couponForm} labelCol={{span:5}} size="small" onFinish={onSubmit} onFinishFailed={onSubmitFail}>
                    <Form.Item label="CouponType: " name="type">
                        <Select className="HomeCouponDetail_input-width">
                            {typeOptions.map((type)=>{
                                return <Option key={type.value} value={type.value}>{type.label}</Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item label="CouponName: " name="name"
                    rules={[{required:true,message:"Please enter coupon name"},
                    {min:2,max:140,message:'Length must be between 2 and 140'}]}>
                        <Input className="HomeCouponDetail_input-width"/>
                    </Form.Item>
                    <Form.Item label="Platform: " name="platform">
                        <Select className="HomeCouponDetail_input-width">
                            {platformOptions.map((item)=>{
                                return <Option key={item.value} value={item.value}>{item.label}</Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item label="PublishCount: " name="publishCount"
                    rules={[{required:true,message:"Enter only position number"}]}>
                        <Input type="number"className="HomeCouponDetail_input-width" placeholder="Only positive number"/>
                    </Form.Item>
                    <Form.Item label="Amount: " name="amount"
                    rules={[{required:true,message:"Enter only position number"}]}>
                        <Input type="number"className="HomeCouponDetail_input-width" placeholder="Two decimal numbers" suffix="Dollar"/>
                    </Form.Item>
                    <Form.Item label="Limit: " name="perLimit">
                        <Input type="number" className="HomeCouponDetail_input-width" placeholder="Only positive number" suffix="Piece"/>
                    </Form.Item>
                    <Form.Item label="MinPoint: " name="minPoint"
                    rules={[{required:true,message:"Enter only position number"}]}>
                        <Input type="number" className="HomeCouponDetail_input-width" placeholder="Only positive number" suffix="Dollar" prefix="Min"/>
                    </Form.Item>
                    <Form.Item label="ValidDate: " name="formTime" >
                        <RangePicker/>
                    </Form.Item>
                    <Form.Item label="UseType: " name="useType">
                        <Radio.Group onChange={(e)=>setCoupon({...coupon,useType:e.target.value})}>
                            <Radio value={0}>All</Radio>
                            <Radio value={1}>Category</Radio>
                            <Radio value={2}>Product</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {couponForm.getFieldValue().useType === 1 &&
                    <Form.Item>
                        <Cascader allowClear placeholder="Please select category" value={selectProductCate}
                        onChange={(e)=>setSelectProductCate(e)} options={productCateOptions}/>
                        <Button onClick={handleAddProductCategoryRelation} >Add</Button>
                        <Table rowKey="id" dataSource={coupon.productCategoryRelationList} style={{width:'100%',marginTop:'20px'}} bordered size="small">
                            <Column title="Name" align="center" render={(text,record,index)=>
                                <div>
                                    {record.parentCategoryName}
                                </div>
                            }/>
                            <Column title="Operation" align="center" width="100px" render={(text,record,index)=>
                                <div>
                                    <Button size="small" type="text" danger onClick={()=>handleDeleteProductCateRelation(index,record)}>Delete</Button>
                                </div>
                            }/>
                        </Table>
                    </Form.Item>}
                    {couponForm.getFieldValue().useType === 2 && 
                    <Form.Item>
                        <Select value={selectProduct} onChange={(e)=>setSelectProduct(e)} filterOption={false } onSearch={searchProductMethod}
                        loading={selectProductLoading} placeholder="Name/Id" showSearch>
                            {selectProductOptions.map((item)=>{
                                return <Option value={item.productId} key={item.productId}>
                                            <span style={{float:'left'}}>{item.productName}</span>
                                            <span style={{float:'right',color:'#8492a6',fontSize:'13px'}}>NO.{Item.productSn}</span>
                                        </Option>
                            })}
                        </Select>
                        <Button onClick={handleAddProductRelation}>Add</Button>
                        <Table rowKey="productId" dataSource={coupon.productRelationList} style={{width:'100%',marginTop:'20px'}} bordered size="small">
                            <Column title="Name" align="center" render={(text,record,index)=>
                                <div>
                                    {record.productName}
                                </div>
                            }/>
                            <Column title="Sn" width="120px" align="center" render={(text,record,index)=>
                                <div>
                                    NO.{record.productSn}
                                </div>
                            }/>
                            <Column title="Operation" width="100px" align="center" render={(text,record,index)=>
                                <div>
                                    <Button size="small" danger type="text" onClick={()=>handleDeleteProductRelation(index,record)}>Delete</Button>
                                </div>
                            }/>
                        </Table>
                    </Form.Item>}
                    <Form.Item label="Note: " name="note">
                        <TextArea className="HomeCouponDetail_input-width" rows={5} placeholder="Please enter content"/>
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">Submit</Button>
                            {!isEdit &&<Button onClick={resetForm}>Reset</Button>}
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
export default CouponDetail;