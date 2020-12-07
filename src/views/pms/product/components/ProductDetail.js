import React, {useState, useEffect} from 'react';
import { Card, Form, message, Steps } from 'antd';
import ProductInfoDetail from './ProductInfoDetail';
import ProductSaleDetail from './ProductSaleDetail';
import {productServices} from 'services/product';
import './ProductDetail.scss';
import ProductAttrDetail from './ProductAttrDetail';
import ProductRelationDetail from './ProductRelationDetail';
import { useLocation } from 'react-router-dom';
import { history } from '../../../../redux/shared/history-redux';
import { min } from 'moment';

const { Step } = Steps;
function ProductDetail(props){
    const {isEdit}= props;
    const [form]=Form.useForm();
    const route = useLocation();
    const defaultStatus=[true,false,false,false];
    useEffect(() => {
        if(isEdit){
            productServices.getProduct(route.state.id).then(response=>{
                setProductParam(response.data);
            });
        }
    }, []);

    const defaultProductParam = {
        id:null,
        albumPics: '',
        brandId: null,
        brandName: '',
        deleteStatus: 0,
        description: '',
        detailDesc: '',
        detailHtml: '',
        detailMobileHtml: '',
        detailTitle: '',
        feightTemplateId: 0,
        flashPromotionCount: 0,
        flashPromotionId: 0,
        flashPromotionPrice: 0,
        flashPromotionSort: 0,
        giftPoint: 0,
        giftGrowth: 0,
        keywords: '',
        lowStock: 0,
        name: '',
        newStatus: 0,
        note: '',
        originalPrice: 0,
        pic: '',
        //member price{memberLevelId: 0,memberPrice: 0,memberLevelName: null}
        memberPriceList: [],
        //full reduction
        productFullReductionList: [{key:0,fullPrice: 0, reducePrice: 0}],
        //ladder price
        productLadderList: [{key:0,count: 0,discount: 0,price: 0}],
        previewStatus: 0,
        price: 0,
        productAttributeCategoryId: null,
        //Product attribute related{productAttributeId: 0, value: ''}
        productAttributeValueList: [],
        //sku stock info{lowStock: 0, pic: '', price: 0, sale: 0, skuCode: '', spData: '', stock: 0}
        skuStockList: [],
        //product related subject{subjectId: 0}
        subjectProductRelationList: [],
        //product related prefer{preferenceAreaId: 0}
        preferenceAreaProductRelationList: [],
        productCategoryId: null,
        productCategoryName: '',
        productSn: '',
        promotionEndTime: '',
        promotionPerLimit: 0,
        promotionPrice: null,
        promotionStartTime: '',
        promotionType: 0,
        publishStatus: 0,
        recommendStatus: 0,
        sale: 0,
        serviceIds: '',
        sort: 0,
        stock: 0,
        subTitle: '',
        unit: '',
        usePointLimit: 0,
        verifyStatus: 0,
        weight: 0
    };
    
    const [active, setactive] = useState(0);
    const [productParam, setProductParam] = useState(defaultProductParam);
    const [showStatus, setshowStatus] = useState(defaultStatus);

    useEffect(() => {
        form.setFieldsValue(productParam);
    }, [productParam])
    const handleProductParamChange=(e,param)=>{
        if(param) {
            setProductParam({...productParam,[param]:e});
        }else {
            const {name,value} = e.target;
            setProductParam({...productParam,[name]:value});
        }  
    }
    const prevStep=()=>{
        let act = active;
        let status = showStatus;
        if (active > 0 && active < showStatus.length) {
            act--;
            for(let i =0;i<status.length;i++){
                status[i] = false;
            }
            status[act] = true;
            setshowStatus(status);
            setactive(act);
        }
    }
    const nextStep=()=>{
        let act = active;
        let status = showStatus;
        if (active < status.length-1) {
            act++;
            for(let i =0;i<status.length;i++){
                status[i] = false;
            }
            status[act] = true;
            setshowStatus(status);
            setactive(act);
        }
    }
    const finishCommit=(isEdit)=>{
        if(isEdit){
            productServices.updateProduct(route.state.id,productParam).then(response=>{
                message.success('Submit Success',10);
                history.push("/pms/product");
            })
        }else {
            productServices.createProduct(productParam).then(response=>{
                message.success('Submit Success',10);
                location.reload();
            })
        }
    }
    
    
    return(
        <div className="ProductDetail_form-wrapper">
            <Card size='small' className="ProductDetail_form-container" >
                <Steps labelPlacement='vertical'current={active}>
                    <Step title="Info"/>
                    <Step title="Sale"/>
                    <Step title="Attribute"/>
                    <Step title="Related"/>
                </Steps>
                {showStatus[0] &&
                <ProductInfoDetail isEdit={isEdit} form={form} value={productParam} setProductParam={setProductParam} handleProductParamChange={handleProductParamChange} nextStep={nextStep}/>}
                {showStatus[1] &&
                <ProductSaleDetail isEdit={isEdit} form={form} value={productParam} setProductParam={setProductParam} handleProductParamChange={handleProductParamChange} nextStep={nextStep} prevStep={prevStep}/>}
                {showStatus[2] &&
                <ProductAttrDetail isEdit={isEdit} form={form} value={productParam} setProductParam={setProductParam} handleProductParamChange={handleProductParamChange} nextStep={nextStep} prevStep ={prevStep}/>}
                {showStatus[3] &&
                <ProductRelationDetail isEdit={isEdit} form={form} value={productParam} setProductParam={setProductParam} handleProductParamChange={handleProductParamChange} prevStep ={prevStep} finishCommit = {finishCommit}/>}
            </Card>
        </div>
       
    )
}
export default ProductDetail;