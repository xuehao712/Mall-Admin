import { Button, Checkbox, DatePicker, Form, Input, message, Radio, Space, Switch, Table, TimePicker } from 'antd';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import TextArea from 'antd/lib/input/TextArea';
import Column from 'antd/lib/table/Column';
import { get } from 'js-cookie';
import React, {useState, useEffect, useMemo} from 'react';
import {memberLevelServices} from 'services/memberLevel'
import './productSaleDetail.scss';
import moment from 'moment';

function ProductSaleDetail(props){
    let {form,value,isEdit,handleProductParamChange,nextStep,prevStep,setProductParam} = props;
    const [pickerOptions1, setPickerOptions1] = useState({
        disabledDate(time){
            return time.getTime() < Date.now();
        }
    })
    let selectServiceList= useMemo(() => {
        let list = [];
        if (value.serviceIds === undefined || value.serviceIds == null || value.serviceIds === '') {return list;}
        let ids = value.serviceIds.split(',');
        for (let i = 0; i < ids.length; i++) {
            list.push(Number(ids[i]));
        }
        return list;
    }, [value])
    const handleSelectServiceListChange=(newVal)=>{
        let serviceIds = '';
        if (newVal != null && newVal.length > 0) {
            for (let i = 0; i < newVal.length; i++) {
                serviceIds += newVal[i] + ',';
            }
            if (serviceIds.endsWith(',')) {
                serviceIds = serviceIds.substr(0, serviceIds.length - 1)
            }
            setProductParam({...value,serviceIds:serviceIds})
        } else {
            setProductParam({...value,serviceIds:null})
        }
    }
    //Initial
    useEffect(() => {
        if (isEdit) {
            handleEditCreated();
        } else {
            memberLevelServices.fetchList({defaultStatus: 0}).then(response => {
              let memberPriceList = [];
              for (let i = 0; i < response.data.length; i++) {
                let item = response.data[i];
                memberPriceList.push({memberLevelId: item.id, memberLevelName: item.name})
              }
              setProductParam({...value,memberPriceList:memberPriceList})
            });
        }
    }, [])
    
    //Method
    const handleProductLadderListChange=(e,index)=>{
        let temp = value;
        value.productLadderList[index][e.target.name] = e.target.value;
        setProductParam({...temp});
        
    }
    const handleEditCreated=()=>{
        let ids = value.serviceIds.split(',');
        console.log('handleEditCreated', ids);
        let list = [];
        for (let i = 0; i < ids.length; i++) {
            list.push(Number(ids[i]));
        }
        handleSelectServiceListChange(list);
    }
    const [productLadderKey, setProductLadderKey] = useState(1);
    const handleRemoveProductLadder=(index,row)=>{
        var temp = [...value.productLadderList];
        if (temp.length === 1) {
            setProductLadderKey(productLadderKey+1);
            temp.pop();
            temp.push({
                key:productLadderKey+1,
                count: 0,
                discount: 0,
                price: 0
            })
            setProductParam({...value,productLadderList:temp});
        } else {
            temp.splice(index, 1);
            setProductParam({...value,productLadderList:temp});
        }
        
    }
    const handleAddProductLadder=(index,row)=>{
        
        if (value.productLadderList.length < 3) {
            setProductLadderKey(productLadderKey+1);
            const newData = {
                key:productLadderKey+1,
                count: 0,
                discount: 0,
                price: 0
            };
            setProductParam({...value,productLadderList:[...value.productLadderList,newData]});
        } else {
          message.warning("Max 3 record");
        }
    }
    const [fullReductionKey, setFullReductionKey] = useState(1);
    const handleRemoveFullReduction=(index,row)=>{
        
        var temp = [...value.productFullReductionList];
        if (temp.length === 1) {
            setFullReductionKey(fullReductionKey+1);
            temp.pop();
            temp.push({
                key:fullReductionKey+1,
                fullPrice: 0,
                reducePrice: 0,
            })
            setProductParam({...value,productFullReductionList:temp});
        } else {
            temp.splice(index, 1);
            setProductParam({...value,productFullReductionList:temp});
        }
    }
    const handleAddFullReduction=(index,row)=>{
        if (value.productFullReductionList.length < 3) {
            setFullReductionKey(fullReductionKey+1);
            const newData = {
                key:fullReductionKey+1,
                fullPrice: 0,
                reducePrice: 0,
            };
            setProductParam({...value,productFullReductionList:[...value.productFullReductionList,newData]});
        } else {
          message.warning("Max 3 record");
        }
    }
    const handleMemberPriceListChange=(e,index)=>{
        let temp = value;
        value.memberPriceList[index][e.target.name] = e.target.value;
        setProductParam({...temp});
    }
    const handleProductFullReductionListChange=(e,index)=>{
        let temp = value;
        value.productFullReductionList[index][e.target.name] = e.target.value;
        setProductParam({...temp});
    }
    const conditionalRowKey=(e)=>{
        if(e.id){
            return 'id';
        }else{
            return 'key';
        }
    }
    const handlePrev=()=>{
        prevStep();
    }
    const handleNext=()=>{
        nextStep();
    }
    return(
        <div style={{marginTop:'50px'}}>
            <Form form={form} labelCol={{span:6}} style={{width:'600px'}} size="small">
                <Form.Item label="GiftPoint: ">
                    <Input value={value.giftPoint} name="giftPoint" onChange={handleProductParamChange}/>
                </Form.Item>
                <Form.Item label="GiftGrowth: ">
                    <Input value={value.giftGrowth} name="giftGrowth" onChange={handleProductParamChange}/>
                </Form.Item>
                <Form.Item label="PointLimit: " >
                    <Input value={value.usePointLimit} name="usePointLimit" onChange={handleProductParamChange}/>
                </Form.Item>
                <Form.Item label="Preview: " >
                    <Switch checked={value.previewStatus} name="previewStatus" onChange={(e)=>setProductParam({...value,previewStatus:e?1:0})}/>
                </Form.Item>
                <Form.Item label="PublishStatus: ">
                    <Switch checked={value.publishStatus} name="publishStatus" onChange={(e)=>setProductParam({...value,publishStatus:e?1:0})}/>
                </Form.Item>
                <Form.Item label="Recommend: ">
                    <span style={{marginRight:'10px'}}>New</span>
                    <Switch checked={value.newStatus} name="newStatus" onChange={(e)=>setProductParam({...value,newStatus:e?1:0})}/>
                    <span style={{marginRight:'10px',marginLeft:'10px'}}>Recommend</span>
                    <Switch checked={value.recommendStatus} name="recommendStatus" onChange={(e)=>setProductParam({...value,recommendStatus:e?1:0})}/>
                </Form.Item>
                <Form.Item label="Service: ">
                    <Checkbox.Group value={selectServiceList} onChange={handleSelectServiceListChange}>
                        <Checkbox value={1}>7 Day Return</Checkbox>
                        <Checkbox value={2}>Quick Refund</Checkbox>
                        <Checkbox value={3}>Free Return</Checkbox>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item label="DetailTitle: ">
                    <Input value={value.detailTitle} name="detailTitle" onChange={(e)=>handleProductParamChange(e)}/>
                </Form.Item>
                <Form.Item label="DetailDesc: " >
                    <Input value={value.detailDesc} name="detailDesc" onChange={(e)=>handleProductParamChange(e)}/>
                </Form.Item>
                <Form.Item label="Keyword: " >
                    <Input value={value.keywords} name="keywords" onChange={(e)=>handleProductParamChange(e)}/>
                </Form.Item>
                <Form.Item label="Note: " >
                    <TextArea value={value.note} name="note" autoSize="true" onChange={(e)=>handleProductParamChange(e)}/>
                </Form.Item>
                <Form.Item label="Promotion: ">
                    <Radio.Group value={value.promotionType} name="promotionType" size="small" onChange={(e)=>handleProductParamChange(e)}>
                        <Radio value={0}>None</Radio>
                        <Radio value={1}>Sale</Radio>
                        <Radio value={2}>Member</Radio>
                        <Radio value={3}>Ladder</Radio>
                        <Radio value={4}>FullReduct</Radio>
                    </Radio.Group>
                </Form.Item>
                {value.promotionType ===1 &&
                <Form.Item noStyle>
                    <div>
                        <Form.Item label="StartTime: ">
                            <TimePicker value={value.promotionStartTime?moment(value.promotionStartTime):null} name="promotionStartTime" onChange={(e)=>setProductParam({...value,promotionStartTime:e})}
                            hideDisabledOptions={pickerOptions1} placeholder="select start time"></TimePicker>
                        </Form.Item>
                    </div>
                    <div className="littleMargin">
                        <Form.Item  label="EndTime: ">
                            <TimePicker value={value.promotionEndTime?moment(value.promotionEndTime):null} name="promotionEndTime" onChange={(e)=>setProductParam({...value,promotionEndTime:e})}
                            hideDisabledOptions={pickerOptions1} placeholder="select end time"></TimePicker>
                        </Form.Item>
                    </div>
                    <div className="littleMargin">
                        <Form.Item  label="PromotionPrice: " >
                            <Input style={{width:'220px'}} value={value.promotionPrice} name="promotionPrice" onChange={(e)=>handleProductParamChange(e)}
                            placeholder="Enter promotion price"/>
                        </Form.Item>              
                    </div>
                </Form.Item>}
                {value.promotionType===2 && 
                <Form.Item noStyle>
                    {value.memberPriceList.map((item,index)=>{
                        return <div key={index} className={index!==0?'littleMargin':null}>
                            <Form.Item label={item.memberLevelName}>
                                <Input value={item.memberPrice} name="memberPrice" onChange={(e)=>handleMemberPriceListChange(e,index)} style={{width:'200px'}}/>
                            </Form.Item>
                        </div>
                    })}    
                </Form.Item>}
                {value.promotionType===3 && 
                <Form.Item name="productLadderList">
                    <Table bordered dataSource={value.productLadderList} rowKey={conditionalRowKey}>
                        <Column title="Count"align="center" width="120px" render={(text,record,index)=>(
                            <div >
                                <Input value={record.count} name="count" onChange={(e)=>handleProductLadderListChange(e,index)}/>
                            </div>
                        )}/>
                        <Column title="Discount" align="center" width="120px" render={(text,record,index)=>(
                            <div >
                                <Input value={record.discount} name="discount" onChange={(e)=>handleProductLadderListChange(e,index)}/>
                            </div>
                        )}/>
                        <Column title="Operation" align="center" render={(text,record,index)=>(
                            <Space>
                                <Button type="text" onClick={()=>handleRemoveProductLadder(index,record)}>Delete</Button>
                                <Button type="text" onClick={()=>handleAddProductLadder(index,record)}>Add</Button>
                            </Space>
                        )}/>
                    </Table>
                </Form.Item>}
                {value.promotionType===4 && 
                <Form.Item >
                    <Table bordered dataSource={value.productFullReductionList} rowKey={conditionalRowKey}>
                        <Column title="Full" align="center" width="120px" render={(text,record,index)=>(
                            <div>
                                <Input value={record.fullPrice} name="fullPrice" onChange={(e)=>handleProductFullReductionListChange(e,index)}/>
                            </div>
                        )}/>
                        <Column title="Reduction" align="center" width="120px" render={(text,record,index)=>(
                            <div >
                                <Input value={record.reducePrice} name="reducePrice" onChange={(e)=>handleProductFullReductionListChange(e,index)}/>
                            </div>
                        )}/>
                        <Column title="Operation" align="center" render={(text,record,index)=>(
                            <Space>
                                <Button type="text" onClick={()=>handleRemoveFullReduction(index,record)}>Delete</Button>
                                <Button type="text" onClick={()=>handleAddFullReduction(index,record)}>Add</Button>
                            </Space>
                        )}/>
                    </Table>
                </Form.Item>}
                <Form.Item style={{textAlign:'center'}}>
                    <Space>
                        <Button size="middle" onClick={handlePrev} style={{width:'220px'}}>Prev, enter product info</Button>
                        <Button type="primary" size="middle" onClick={handleNext} style={{width:'220px'}}>Next, enter product attribution</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}
export default ProductSaleDetail;