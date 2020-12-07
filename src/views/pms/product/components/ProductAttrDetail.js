import React, {useState, useEffect, useMemo} from 'react';
import { Button, Card, Checkbox, Form, Input, message, Select, Space, Table, Tabs } from 'antd';
import Column from 'antd/lib/table/Column';
import {productAttrCateServices} from 'services/productAttrCate'
import {productAttrServices} from 'services/productAttr'
import SingleUpload from 'components/Upload/singleUpload'
import MultiUpload from 'components/Upload/multiUpload'
import Tinymce from 'components/Tinymce';
import './ProductAttrDetail.scss';
import confirm from 'antd/lib/modal/confirm';

const { Option } = Select;
function ProductAttrDetail(props){
    let {form,value,isEdit,handleProductParamChange,prevStep,nextStep,setProductParam} = props;
    const { TabPane } = Tabs;

    //Initial
    useEffect(() => {
        getProductAttrCateList();
    }, []);

    //Watch
    useEffect(() => {
        if(!isEdit){
            return;
        }
        if(hasEditCreated){
            return;
        }
        if(productId===undefined||productId==null||productId===0)return;
        handleEditCreated();
    }, [productId]);

    //Data
    const [hasEditCreated, setHasEditCreated] = useState(false);
    const [productAttributeCategoryOptions, setProductAttributeCategoryOptions] = useState([]);
    const [selectProductAttr, setSelectProductAttr] = useState([]);
    const [selectProductParam, setSelectProductParam] = useState([]);
    const [selectProductAttrPics, setSelectProductAttrPics] = useState([]);
    const [addProductAttrValue, setAddProductAttrValue] = useState('');
    const [activeHtmlName, setActiveHtmlName] = useState('pc');

    //Compute
    const hasAttrPic = useMemo(() => {
      if (selectProductAttrPics.length < 1) {
        return false;
      }
      return true;
    }, [selectProductAttrPics])
    const productId = useMemo(() => {
        return value.id;
    }, [value]);
    const selectProductPics = useMemo(() => {
      let pics=[];
      if(value.pic===undefined||value.pic==null||value.pic===''){
        return pics;
      }
      pics.push(value.pic);
      if(value.albumPics===undefined||value.albumPics==null||value.albumPics===''){
        return pics;
      }
      let albumPics = value.albumPics.split(',');
      for(let i=0;i<albumPics.length;i++){
        pics.push(albumPics[i]);
      }
      return pics;
    }, [value]);
    const handleSelectProductPicsChange=(newValue)=>{
      let temp = value;
        if (newValue == null || newValue.length === 0) {
          temp.pic = null;
          temp.albumPics = null;
        } else {
          temp.pic = newValue[0];
          temp.albumPics = '';
            if (newValue.length > 1) {
              for (let i = 1; i < newValue.length; i++) {
                temp.albumPics += newValue[i];
                if (i !== newValue.length - 1) {
                  temp.albumPics += ',';
                }
              }
            }
        }
      setProductParam({...temp});
    }

    //Methods
    const handleEditCreated=()=>{
        if(value.productAttributeCategoryId!=null) {
            handleProductAttrChange(value.productAttributeCategoryId);
        }
        setHasEditCreated(true);
    }
    const getProductAttrCateList=()=>{
        let param = {pageNum: 1, pageSize: 100};
        productAttrCateServices.fetchList(param).then(response => {
          let tempOptions=[];
          let list = response.data.list;
          for (let i = 0; i < list.length; i++) {
            tempOptions.push({label: list[i].name, value: list[i].id});
          }
          setProductAttributeCategoryOptions(tempOptions);
        });
    }
    const getProductAttrList=(type,cid)=>{
        let param = {pageNum: 1, pageSize: 100, type: type};
        productAttrServices.fetchList(cid, param).then(response => {
          let list = response.data.list;
          if (type === 0) {
            let tempProductAttr = [];
            for (let i = 0; i < list.length; i++) {
              let options = [];
              let values = [];
              if (isEdit) {
                if (list[i].handAddStatus === 1) {
                  options = getEditAttrOptions(list[i].id);
                }
                values = getEditAttrValues(i);
              }
              tempProductAttr.push({
                id: list[i].id,
                name: list[i].name,
                handAddStatus: list[i].handAddStatus,
                inputList: list[i].inputList,
                values: values,
                options: options
            });
          }
          setSelectProductAttr([...tempProductAttr]);
          if(isEdit){
            refreshProductAttrPics();
            }
        } else {
            let tempSelectProductParam = [];
            for (let i = 0; i < list.length; i++) {
              let value=null;
              if(isEdit){
                value= getEditParamValue(list[i].id);
              }
              tempSelectProductParam.push({
                id: list[i].id,
                name: list[i].name,
                value: value,
                inputType: list[i].inputType,
                inputList: list[i].inputList
              });
            }
            setSelectProductParam([...tempSelectProductParam]);
          }
        });
    }
    const getEditAttrOptions=(id)=>{
        let options = [];
        for (let i = 0; i < value.productAttributeValueList.length; i++) {
          let attrValue = value.productAttributeValueList[i];
          if (attrValue.productAttributeId === id) {
            let strArr = attrValue.value.split(',');
            for (let j = 0; j < strArr.length; j++) {
              options.push(strArr[j]);
            }
            break;
          }
        }
        return options;
    }
    const getEditAttrValues=(index)=>{
        let values = new Set();
        if (index === 0) {
          for (let i = 0; i < value.skuStockList.length; i++) {
            let sku = value.skuStockList[i];
            let spData = JSON.parse(sku.spData);
            if (spData!= null && spData.length>=1) {
              values.add(spData[0].value);
            }
          }
        } else if (index === 1) {
          for (let i = 0; i < value.skuStockList.length; i++) {
            let sku = value.skuStockList[i];
            let spData = JSON.parse(sku.spData);
            if (spData!= null && spData.length>=2) {
              values.add(spData[1].value);
            }
          }
        } else {
          for (let i = 0; i < value.skuStockList.length; i++) {
            let sku = value.skuStockList[i];
            let spData = JSON.parse(sku.spData);
            if (spData!= null && spData.length>=3) {
              values.add(spData[2].value);
            }
          }
        }
        return Array.from(values);
    }
    const getEditParamValue=(id)=>{
        for(let i=0;i<value.productAttributeValueList.length;i++){
            if(id===value.productAttributeValueList[i].productAttributeId){
              return value.productAttributeValueList[i].value;
            }
        }
    }
    const handleProductAttrChange=(value)=>{
        getProductAttrList(0, value);
        getProductAttrList(1, value);
    }
    const getInputListArr=(inputList)=>{
        return inputList.split(',');
    }
    const handleAddProductAttrValue=(idx)=>{
      let options = selectProductAttr[idx].options;
        if (addProductAttrValue == null || addProductAttrValue == '') {
          message.warning("AttrValue cannot be repeated",5);
          return
        }
        if (options.indexOf(addProductAttrValue) !== -1) {
            message.warning("AttrValue cannot be repeated",5);
          return;
        }
        let tempOptions = selectProductAttr;
        tempOptions[idx].options.push(addProductAttrValue);
        setSelectProductAttr([...tempOptions]);
        setAddProductAttrValue(null);
    }
    const handleRemoveProductAttrValue=(idx,index)=>{
        let temp = selectProductAttr;
        temp[idx].options.splice(index, 1);
        setSelectProductAttr([...temp]);
    }
    const getProductSkuSp=(row,index)=>{
        let spData = JSON.parse(row.spData);
        if(spData!=null&&index<spData.length){
          return spData[index].value;
        }else{
          return null;
        }
    }
    const handleRefreshProductSkuList=()=>{
        confirm({
            title:"Refresh list will regenerate sku info, are you sure to refresh?",
            okText:'OK',
            okType:'primary',
            onOk(){
                refreshProductAttrPics();
                refreshProductSkuList();
            },
            onCancel(){}
        })
    }
    const handleSyncProductSkuPrice=()=>{
        confirm({
            title:"Will sync the first sku price to all sku, continue?",
            okText:'OK',
            okType:'primary',
            onOk(){
                if(value.skuStockList!==null&&value.skuStockList.length>0){
                  let tempSkuList = [];
                  tempSkuList = tempSkuList.concat(tempSkuList,value.skuStockList);
                  let price=value.skuStockList[0].price;
                  for(let i=0;i<tempSkuList.length;i++){
                    tempSkuList[i].price=price;
                  }
                  let tempList = [];
                  tempList =  tempList.concat(tempList,tempSkuList);
                  setProductParam({...value,skuStockList:tempList});
                }
            },
            onCancel(){}
        })
    }
    const handleSyncProductSkuStock=()=>{
        confirm({
            title:"Will sync the first sku stock to all sku, continue?",
            okText:'OK',
            okType:'primary',
            onOk(){
                if(value.skuStockList!==null&&value.skuStockList.length>0){
                    let tempSkuList = [];
                    tempSkuList = tempSkuList.concat(tempSkuList,value.skuStockList);
                    let stock=value.skuStockList[0].stock;
                    let lowStock=value.skuStockList[0].lowStock;
                    for(let i=0;i<tempSkuList.length;i++){
                      tempSkuList[i].stock=stock;
                      tempSkuList[i].lowStock=lowStock;
                    }
                    let tempList = [];
                    tempList=tempList.concat(tempList,tempSkuList);
                    setProductParam({...value,skuStockList:tempList});
                }
            },
            onCancel(){}
        })
    }
    const refreshProductSkuList=()=>{
        let skuList = [];
        if (selectProductAttr.length === 1) {
          const attr = selectProductAttr[0];
          for (let i = 0; i < attr.values.length; i++) {
            skuList.push({
              spData: JSON.stringify([{key:attr.name,value:attr.values[i]}])
            });
          }
        } else if (selectProductAttr.length === 2) {
          const attr0 = selectProductAttr[0];
          const attr1 = selectProductAttr[1];
          for (let i = 0; i < attr0.values.length; i++) {
            if (attr1.values.length === 0) {
              skuList.push({
                spData: JSON.stringify([{key:attr0.name,value:attr0.values[i]}])
              });
              continue;
            }
            for (let j = 0; j < attr1.values.length; j++) {
              let spData = [];
              spData.push({key:attr0.name,value:attr0.values[i]});
              spData.push({key:attr1.name,value:attr1.values[j]});
              skuList.push({
                spData: JSON.stringify(spData)
              });
            }
          }
        } else {
          const attr0 = selectProductAttr[0];
          const attr1 = selectProductAttr[1];
          const attr2 = selectProductAttr[2];
          for (let i = 0; i < attr0.values.length; i++) {
            if (attr1.values.length === 0) {
              skuList.push({
                spData: JSON.stringify([{key:attr0.name,value:attr0.values[i]}])
              });
              continue;
            }
            for (let j = 0; j < attr1.values.length; j++) {
              if (attr2.values.length === 0) {
                let spData = [];
                spData.push({key:attr0.name,value:attr0.values[i]});
                spData.push({key:attr1.name,value:attr1.values[j]});
                skuList.push({
                  spData: JSON.stringify(spData)
                });
                continue;
              }
              for (let k = 0; k < attr2.values.length; k++) {
                let spData = [];
                spData.push({key:attr0.name,value:attr0.values[i]});
                spData.push({key:attr1.name,value:attr1.values[j]});
                spData.push({key:attr2.name,value:attr2.values[k]});
                skuList.push({
                  spData: JSON.stringify(spData)
                });
              }
            }
          }
        }
        setProductParam({...value,skuStockList:skuList});
    }
    const refreshProductAttrPics=()=>{
        let temp = [];
        if (selectProductAttr.length >= 1) {
          let values = selectProductAttr[0].values;
          for (let i = 0; i < values.length; i++) {
            let pic=null;
            if(isEdit){
              pic=getProductSkuPic(values[i]);
            }
            temp.push({name: values[i], pic: pic})
          }
          setSelectProductAttrPics(temp);
        }
    }
    const getProductSkuPic=(name)=>{
        for(let i=0;i<value.skuStockList.length;i++){
          let spData = JSON.parse(value.skuStockList[i].spData);
          if(name===spData[0].value){
            return value.skuStockList[i].pic;
          }
        }
        return null;
    }
    const mergeProductAttrValue=()=>{
        let tempList = [];
        for (let i = 0; i < selectProductAttr.length; i++) {
          let attr = selectProductAttr[i];
          if (attr.handAddStatus === 1 && attr.options != null && attr.options.length > 0) {
            tempList.push({
              productAttributeId: attr.id,
              value: getOptionStr(attr.options)
            });
          }else if (attr.handAddStatus === 0 && attr.values != null && attr.values.length > 0) {
            tempList.push({
              productAttributeId: attr.id,
              value: getOptionStr(attr.values)
            });
          }
        }
        for (let i = 0; i < selectProductParam.length; i++) {
          let param = selectProductParam[i];
          tempList.push({
            productAttributeId: param.id,
            value: param.value
          });
        }
        let list = value;
        for (let i = 0; i < selectProductAttrPics.length; i++) {
          for (let j = 0; j < list.skuStockList.length; j++) {
            let spData = JSON.parse(list.skuStockList[j].spData);
            if (spData[0].value === selectProductAttrPics[i].name) {
              list.skuStockList[j].pic = selectProductAttrPics[i].pic;
            }
          }
        }
        setProductParam({...list,productAttributeValueList:tempList});
    }
    const handleSkuStockListChange=(e,index)=>{
      let temp = value;
      temp.skuStockList[index][e.target.name] =e.target.value;
      setProductParam({...temp}); 
    }
    const handleselectProductAttrPicsChange=(e,index)=>{
      let temp = selectProductAttrPics;
      temp[index][e.target.name] = e.target.value;;
      setSelectProductAttrPics([...temp]);
    }
    const handleSelectProductAttrChange=(e,index)=>{
      let temp = selectProductAttr;
      temp[index]['values'] = e;
      setSelectProductAttr([...temp]);
    }
    const handleSelectProductParamChange=(e,index,param)=>{
      let temp = selectProductParam;
      if(param){
        temp[index][param] = e;
      }else {
        temp[index][e.target.name] = e.target.value;
      }
      setSelectProductParam([...temp]);
    }
    const getOptionStr=(arr)=>{
        let str = '';
        for (let i = 0; i < arr.length; i++) {
          str += arr[i];
          if (i != arr.length - 1) {
            str += ',';
          }
        }
        return str;
    }
    const handleRemoveProductSku=(index,row)=>{
        let list = value.skuStockList;
        if (list.length === 1) {
          list.pop();
        } else {
          list.splice(index, 1);
        }
        setProductParam({...value,skuStockList:list});
    }
    const getParamInputList=(inputList)=>{
        return inputList.split(',');
    }
    const handlePrev=()=>{
      prevStep();
    }
    const handleNext=()=>{
        mergeProductAttrValue();
        nextStep();
    }
    return(
        <div style={{marginTop:'50px'}}>
            <Form form={form} style={{width:'720px'}} size="small" labelCol={{span:5}}>
                <Form.Item name="productAttributeCategoryId" label="Attr Type: ">
                    <Select value={value.productAttributeCategoryId} placeholder="Please select attr type"
                    onChange={(e)=>{handleProductParamChange(e,"productAttributeCategoryId"),handleProductAttrChange(e)}}>
                        {productAttributeCategoryOptions.map((item)=>{
                            return <Option key={item.value} value={item.value}>{item.label}</Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="Product Attr: ">
                    <Card className="cardBg">
                        {selectProductAttr.map((productAttr,idx)=>{
                          return (<div key={idx}>
                            {productAttr.name}:
                            <div>
                              {productAttr.handAddStatus===0?
                                (<Checkbox.Group value={selectProductAttr[idx].values} onChange={(e)=>handleSelectProductAttrChange(e,idx)}>
                                    {getInputListArr(productAttr.inputList).map((item,i)=>{
                                      return <Checkbox value={item} key={i} className="littleMarginLeft">{item}</Checkbox> 
                                    })}
                                  </Checkbox.Group>):
                                (<div>
                                  <Checkbox.Group value={selectProductAttr[idx].values} onChange={(e)=>handleSelectProductAttrChange(e,idx)}>
                                    {selectProductAttr[idx].options.map((item,index)=>{
                                      return (<div key={index} className="littleMarginLeft" style={{display:'inline-block'}}>
                                        <Checkbox name={item} key={item} value={item}>{item}</Checkbox>
                                        <Button type="text" danger className="littleMarginLeft" onClick={()=>handleRemoveProductAttrValue(idx,index)}>Delete</Button>
                                      </div>)
                                    })}
                                  </Checkbox.Group>
                                  <Input value={addProductAttrValue} style={{width:'160px',marginLeft:'10px'}} allowClear onChange={(e)=>setAddProductAttrValue(e.target.value)}/>
                                  <Button className="littleMarginLeft" onClick={()=>handleAddProductAttrValue(idx)}>Add</Button>
                                </div>)    
                              }
                            </div>
                          </div>)
                        })}
                    </Card>
                    <Table dataSource={value.skuStockList} style={{width:'100%',marginTop:'20px'}} bordered pagination={false}
                    rowKey="spData">
                        {selectProductAttr.map((item,index)=>{
                            return <Column title={item.name} key={item.id} align="center" render={(value,record,idx)=>(
                                <div>
                                    {getProductSkuSp(record,index)}
                                </div>
                            )}/>
                        })}
                        <Column title="Price" width="80px" align="center" render={(value,record,index)=>(
                            <div>
                                <Input value={record.price} onBlur={(e)=>handleSkuStockListChange(e,index)} name="price"/>
                            </div>
                        )}/>
                        <Column title="Stock" width="80px" align="center" render={(value,record,index)=>(
                            <div>
                                <Input value={record.stock} onBlur={(e)=>handleSkuStockListChange(e,index)} name="stock"/>
                            </div>
                        )}/>
                        <Column title="LowStock" width="80px" align="center" render={(value,record,index)=>(
                            <div>
                                <Input value={record.lowStock} onBlur={(e)=>handleSkuStockListChange(e,index)} name="lowStock"/>
                            </div>
                        )}/>
                        <Column title="SKU" align="center" render={(value,record,index)=>(
                            <div>
                                <Input value={record.skuCode} onChange={(e)=>handleSkuStockListChange(e,index)} name="skuCode"/>
                            </div>
                        )}/>
                        <Column title="Operation " width="80px" align="center" render={(value,record,index)=>(
                            <div>
                                <Button type="text" danger onClick={()=>handleRemoveProductSku(index,record)}>Delete</Button>
                            </div>
                        )}/>
                    </Table>
                    <Space>
                      <Button type="primary" size="small" style={{marginTop:'20px'}} onClick={handleRefreshProductSkuList}>RefreshLists</Button>
                      <Button type="primary" size="small" style={{marginTop:'20px'}} onClick={handleSyncProductSkuPrice}>SyncSkuPrice</Button>
                      <Button type="primary" size="small" style={{marginTop:'20px'}} onClick={handleSyncProductSkuStock}>SyncSkyStock</Button>
                    </Space>
                </Form.Item>
                {hasAttrPic? 
                <Form.Item label="Attr Pic: ">
                  <Card className="cardBg">
                    {selectProductAttrPics.map((item,index)=>{
                          return <div key={index}>
                              <span>{item.name}:</span>
                              <SingleUpload value={item.pic} onChange={(e)=>handleselectProductAttrPicsChange(e,index)} name="pic" style={{width:'300px',
                              display:'inline-block',marginLeft:'10px'}}/>
                          </div>
                      })}
                  </Card> 
                </Form.Item>:null}
                <Form.Item label="Product Param: ">
                    <Card className="cardBg">
                        {selectProductParam.map((item,index)=>{
                            return <div key={index} className={index!==0?'littleMarginTop':null}>
                                <div className="paramInputLabel">{item.name}</div>
                                  {item.inputType===1?
                                  <Select className="paramInput" onChange={(e)=>handleSelectProductParamChange(e,index,"value")} value={selectProductParam[index].value}>
                                      {getParamInputList(item.inputList).map((item,idx)=>{
                                          return <Option key={idx} value={item}>{item}</Option>
                                      })}
                                  </Select>:
                                  <Input className="paramInput" name="value" onChange={(e)=>handleSelectProductParamChange(e,index)} value={selectProductParam[index].value}/>}
                            </div>
                        })}
                    </Card>
                </Form.Item>
                {/* <Form.Item label="Product Pic: " name="selectProductPics">
                    <MultiUpload value={selectProductPics} onChange={(e)=>handleSelectProductPicsChange(e)}/>
                </Form.Item>
                <Form.Item label="Parameter: ">
                  <Tabs type="card" activeKey={activeHtmlName}>
                    <TabPane tab="PC Detail" key="pc">
                        <Tinymce width="595" height="300" value={value.detailHtml} onChange={handleProductParamChange}></Tinymce>
                    </TabPane>
                  </Tabs>
                </Form.Item> */}
                <Form.Item style={{textAlign:'center'}}>
                    <Space>
                      <Button size="middle" onClick={handlePrev}>Prev, enter product promotion</Button>
                      <Button type="primary" size="middle" onClick={handleNext}>Next, select prodcut relation</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}
export default ProductAttrDetail ;