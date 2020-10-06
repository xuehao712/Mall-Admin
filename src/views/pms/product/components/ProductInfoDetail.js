import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { Button, Cascader, Form, Input, Select } from 'antd';
import {productCateServices} from 'services/productCate';
import {brandServices} from 'services/brand';
import {productServices} from 'services/product';

const { Option } = Select;
const { TextArea } = Input;
function ProductInfoDetail(props){
    const productInfoForm = useRef({});
    let {value,isEdit} = props;
    const [form] = Form.useForm();
    const [hasEditCreated, sethasEditCreated] = useState(false);
    const [selectProductCateValue, setselectProductCateValue] = useState([]);
    const [productCateOptions, setproductCateOptions] = useState([]);
    const [brandOptions, setbrandOptions] = useState([]);

    const handleEditCreated=()=>{
        let selectProductCate = selectProductCateValue;
        if(value.productCategoryId!=null){
            selectProductCate.push(value.cateParentId);
            selectProductCate.push(value.productCategoryId);
        }
        setselectProductCateValue(selectProductCate);
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

    const handleNext=(formName)=>{
        console.log(success);
    }
    
    const handleBrandChange=(val)=> {
        let brandName = '';
        for (let i = 0; i < brandOptions.length; i++) {
          if (brandOptions[i].value === val) {
            brandName = brandOptions[i].label;
            break;
          }
        }
        value.brandName = brandName;
    }
    return(
        <div style={{marginTop:'50px'}}>
            <Form ref={productInfoForm} onFinish={handleNext('productInfoForm')} form={form} name="productInfoForm" style={{width:'600px'}} size="small">
                <Form.Item label="Product Cate: " name="selectProductCateValue"
                rules={[{required:true,message:'Please enter product cate',validateTrigger:'blur'}]}>
                    <Cascader options={productCateOptions} onChange={handleChange}></Cascader>
                </Form.Item>
                <Form.Item label="Product Name: " name="name" 
                rules={[{ required:true,message:'Please enter product name',validateTrigger:'blur' },
                {min:2,max:140,message:"Length must between 2 and 140",validateTrigger:'blur'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Subtitle: " name="subTitle"
                rules={[{required:true,message:'Please enter product subtitle',validateTrigger:'blur'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Product Brand: " name="brandId"
                rules={[{required:true,message:'Please enter product brand',validateTrigger:'blur'}]}>
                    <Select onChange={handleBrandChange} placeholder="Select Brand">
                        {brandOptions.map((item)=>{
                            return <Option key={item.value} value={item.value}>{item.label}</Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="Product Detail: " name="description"
                rules={[{required:true,message:'Please enter product description',validateTrigger:'blur'}]}>
                    <TextArea placeholder="Please enter content"/>
                </Form.Item>
                <Form.Item label="Product Sn: "name="productSn">
                    <Input/>
                </Form.Item>
                <Form.Item label="Product Price: "name="price">
                    <Input/>
                </Form.Item>
                <Form.Item label="Original Price: "name="originalPrice">
                    <Input/>
                </Form.Item>
                <Form.Item label="Product Stock: "name="stock">
                    <Input/>
                </Form.Item>
                <Form.Item label="Product Unit: "name="unit">
                    <Input/>
                </Form.Item>
                <Form.Item label="Product Weight: "name="weight">
                    <Input style={{width:'300px'}}/>
                    <span style={{marginLeft:'20px'}}>g</span>
                </Form.Item>
                <Form.Item label="Sort" name="sort">
                    <Input/>
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