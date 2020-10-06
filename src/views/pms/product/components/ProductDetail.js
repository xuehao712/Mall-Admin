import React, {useState, useEffect} from 'react';
import { Card, message, Steps } from 'antd';
import ProductInfoDetail from './ProductInfoDetail';
import ProductSaleDetail from './ProductSaleDetail';
import productServices from 'services/product';
import './ProductDetail.scss';

const { Step } = Steps;
function ProductDetail(props){
    const {isEdit,route}= props;

    useEffect(() => {
        if(isEdit){
            getProduct(route.query.id).then(response=>{
                setproductParam(response.data);
            });
        }
    }, [])

    const defaultProductParam = {
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
        productFullReductionList: [{fullPrice: 0, reducePrice: 0}],
        //ladder price
        productLadderList: [{count: 0,discount: 0,price: 0}],
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
        recommandStatus: 0,
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
    const [productParam, setproductParam] = useState(defaultProductParam);
    const [showStatus, setshowStatus] = useState([true,false,false,false]);

    const prevStep=()=>{
        let act = active;
        let status = showStatus;
        if (active > 0 && active < showStatus.length) {
            act--;
            setactive(act);
            status.map=((item)=>false);
            status[act] = true;
            setshowStatus(status);
        }
    }
    const nextStep=()=>{
        let act = active;
        let status = showStatus;
        if (active < showStatus.length-1) {
            act++;
            setactive(act);
            status.map=((item)=>false);
            status[act] = true;
            setshowStatus(status);
        }
    }
    const finishCommit=(isEdit)=>{
        if(isEdit){
            productServices.updateProduct(route.query.id,productParam).then(response=>{
                message.success('Submit Success',10);
            })
        }else {
            productServices.createProduct(productParam).then(response=>{
                message.success('Submit Success',10);
            })
            location.reload();
        }
    }
    
    
    return(
        <Card>
            <Steps labelPlacement='vertical' className="form-container" finish >
                <Step title="Info"/>
                <Step title="Sale"/>
                <Step title="Attribution"/>
                <Step title="Related"/>
            </Steps>
            {showStatus[0] &&
            <ProductInfoDetail is-edit={isEdit} value={productParam} nextStep={nextStep}/>}
            {showStatus[1] &&
            <ProductInfoDetail is-edit={isEdit} value={productParam} nextStep={nextStep}/>}
            {/* {showStatus[2] &&
            <ProductInfoDetail is-edit={isEdit} nextStep={nextStep}/>}
            {showStatus[3] &&
            <ProductInfoDetail is-edit={isEdit} nextStep={nextStep}/>} */}
        </Card>
    )
}
export default ProductDetail;