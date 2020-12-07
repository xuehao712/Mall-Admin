import React, {useState, useEffect, useRef, useMemo} from 'react';
import { Button, Cascader, Form, Input, message, Select } from 'antd';
import {productCateServices} from 'services/productCate';
import {brandServices} from 'services/brand';
import {productServices} from 'services/product';
import FormItem from 'antd/lib/form/FormItem';

const { Option } = Select;
const { TextArea } = Input;
function ProductInfoDetail(props){
    let {form,value,isEdit,handleProductParamChange,nextStep,setProductParam} = props;
    
    const [hasEditCreated, sethasEditCreated] = useState(false);
    const [selectProductCateValue, setselectProductCateValue] = useState([]);
    const [productCateOptions, setproductCateOptions] = useState([]);
    const [brandOptions, setbrandOptions] = useState([]);
    const productId = useMemo(() => {
        return value.id;
    }, [value]);
    
    useEffect(() => {
        getProductCateList();
        getBrandList();
    }, [])

    useEffect(() => {
        if(!isEdit){
            return;
        }
        if(hasEditCreated){
            return;
        }
        if(productId === undefined || productId == null || productId ===0){
            return;
        }
        handleEditCreated();
    }, [productId])
    useEffect(() => {
        let mounted = true;
        if(selectProductCateValue !=null && selectProductCateValue.length==2) {
            setProductParam({...value,productCategoryId:selectProductCateValue[1],productCategoryName:getCateNameById(value.productCategoryId)})
        }else {
            setProductParam({...value,productCategoryId:null,productCategoryName:null});
        }
        return () => mounted = false;
    }, [selectProductCateValue])

    const handleEditCreated=()=>{
        let selectProductCate = selectProductCateValue;
        if(value.productCategoryId!=null){
            selectProductCate.push(value.cateParentId);
            selectProductCate.push(value.productCategoryId);
        }
        setselectProductCateValue(selectProductCate);
        form.setFieldsValue({
            ...value,
            selectProductCateValue:selectProductCate
        });
        sethasEditCreated(true);
    }

    const getProductCateList =()=>{
        productCateServices.fetchListWithChildren().then(response=>{
            let list = response.data;
            let productCate = [];
            for (let i = 0; i < list.length; i++) {
                let children = [];
                if (list[i].children != null && list[i].children.length > 0) {
                    for (let j = 0; j < list[i].children.length; j++) {
                    children.push({label: list[i].children[j].name, value: list[i].children[j].id});
                    }
                }
                productCate.push({label: list[i].name, value: list[i].id, children: children});
            }
            setproductCateOptions(productCate);
        })
    }

    const getBrandList=()=>{
        brandServices.fetchList({pageNum: 1, pageSize: 100}).then(response => {
            let brandOption = [];
            let brandList = response.data.list;
            for (let i = 0; i < brandList.length; i++) {
                brandOption.push({label: brandList[i].name, value: brandList[i].id});
            }
            setbrandOptions(brandOption);
        });
    }

    const getCateNameById=(id)=>{
        let name = null;
        for(let i=0;i<productCateOptions.length;i++){
            for(let j=0;j<productCateOptions[i].children.length;j++){
              if(productCateOptions[i].children[j].value===id){
                name=productCateOptions[i].children[j].label;
                return name;
              }
            }   
        }
        return name;
    }

    const handleNext=()=>{
        nextStep();
    }
    const handleFormFail=()=>{
        message.error("Validation Fail",5);
        return false;
    }

    const handleBrandChange=(val)=> {
        let tempBrandName = '';
        for (let i = 0; i < brandOptions.length; i++) {
          if (brandOptions[i].value === val) {
            tempBrandName = brandOptions[i].label;
            break;
          }
        }
        setProductParam({...value,brandName:tempBrandName,brandId:val});
    }
    return(
        <div style={{marginTop:'50px'}}>
            <Form labelCol={{span:5}} form={form}  onFinish={handleNext} onFinishFailed={handleFormFail} name="productInfoForm" style={{width:'600px'}} size="small">
                <Form.Item label="Product Cate: " name="selectProductCateValue"
                rules={[{required:true,message:'Please enter product cate'}]} >
                    <Cascader value={selectProductCateValue} onChange={(value)=>setselectProductCateValue(value)} style={{width:'40%'}} options={productCateOptions} ></Cascader>
                </Form.Item>
                <Form.Item label="Product Name: "name="name" 
                rules={[{ required:true,message:'Please enter product name' },
                {min:2,max:140,message:"Length must between 2 and 140"}]}>
                    <Input value={value.name} name="name" onBlur={handleProductParamChange}/>
                </Form.Item>
                <Form.Item label="Subtitle: " name="subTitle"
                rules={[{required:true,message:'Please enter product subtitle'}]}>
                    <Input value={value.subTitle} name="subTitle" onBlur={handleProductParamChange}/>
                </Form.Item>
                <Form.Item label="Product Brand: " name="brandId"
                rules={[{required:true,message:'Please enter product brand'}]}>
                    <Select style={{width:'40%'}} value={value.brandId} name="brandId" onChange={(e)=>handleBrandChange(e)} placeholder="Select Brand">
                        {brandOptions.map((item)=>{
                            return <Option key={item.value} value={item.value}>{item.label}</Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="Product Detail: " name="description" 
                rules={[{required:true,message:'Please enter product description'}]}>
                    <TextArea name="description" value={value.description} onBlur={handleProductParamChange} placeholder="Please enter content"/>
                </Form.Item>
                <Form.Item label="Product Sn: " name="productSn">
                    <Input name="productSn" value={value.productSn} onBlur={handleProductParamChange}/>
                </Form.Item>
                <Form.Item label="Product Price: " name="price">
                    <Input name="price" value={value.price} type="number" onBlur={handleProductParamChange}/>
                </Form.Item>
                <Form.Item label="Original Price: " name="originalPrice">
                    <Input name="originalPrice" type="number" value={value.originalPrice} onBlur={handleProductParamChange}/>
                </Form.Item>
                <Form.Item label="Product Stock: " name="stock">
                    <Input name="stock" value={value.stock} type="number" onBlur={handleProductParamChange}/>
                </Form.Item>
                <Form.Item label="Product Unit: " name="unit">
                    <Input name="unit" value={value.unit} onBlur={handleProductParamChange}/>
                </Form.Item>
                <Form.Item label="Product Weight: " >
                    <Form.Item name="weight" noStyle>
                        <Input style={{width:'300px'}} name="weight" type="number" value={value.weight} 
                        onBlur={handleProductParamChange} suffix="lb"/>
                    </Form.Item>
                </Form.Item>
                <Form.Item label="Sort" name="sort">
                    <Input name="sort" value={value.sort} type="number" onBlur={handleProductParamChange}/>
                </Form.Item>
                <Form.Item style={{textAlign:'center'}}>
                    <Button type="primary" size="middle" htmlType="submit">
                        Next, enter product sale
                    </Button>
                </Form.Item>
            </Form>
    
        </div>
    )
}
export default ProductInfoDetail;