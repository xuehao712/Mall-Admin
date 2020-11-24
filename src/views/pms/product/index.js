import React, {useState, useEffect, useRef} from 'react';
import { Card, Col, message, Row, Table,Form, Input, Dropdown, Select, Menu, Switch, Modal, Popconfirm, Button, Space, Cascader } from 'antd';
import { CloseCircleFilled, DatabaseOutlined, DownOutlined, EditOutlined, EditTwoTone, SearchOutlined } from '@ant-design/icons';
import {productServices} from 'services/product';
import {skuStockServices} from 'services/skuStock'
import {productAttrServices} from 'services/productAttr'
import {brandServices} from 'services/brand'
import {productCateServices} from 'services/productCate'
import Search from 'antd/lib/input/Search';
import Column from 'antd/lib/table/Column';
import {history} from '../../../redux/shared/history-redux';
import './index.scss'

const confirm = Modal.confirm;
const { Option } = Select;
function Product(){
    const defaultListQuery = {
      keyword: '',
      pageNum: 1,
      pageSize: 5,
      publishStatus: undefined,
      verifyStatus: undefined,
      productSn: '',
      productCategoryId: '',
      brandId: undefined
    };
    const defaultEditSkuInfo = {
      dialogVisible:false,
      productId:null,
      productSn:'',
      productAttributeCategoryId:null,
      stockList:[],
      productAttr:[],
      keyword:null
    }
    const [listQuery, setListQuery] = useState(defaultListQuery);
    const [editSkuInfo, seteditSkuInfo] = useState(defaultEditSkuInfo);

    const [operates,setoperates]=useState([{
        label: "Product Publish",
        value: "publishOn"
      },
      {
        label: "Product Unpublish",
        value: "publishOff"
      },
      {
        label: "Recommend",
        value: "recommendOn"
      },
      {
        label: "Unrecommend",
        value: "recommendOff"
      },
      {
        label: "Set New",
        value: "newOn"
      },
      {
        label: "Unset New",
        value: "newOff"
      },
      {
        label: "Transfer category",
        value: "transferCategory"
      },
      {
        label: "Recycle",
        value: "recycle"
    }])

    const [operateType, setoperateType] = useState(null);
    const [list, setlist] = useState(null);
    const [total, settotal] = useState(null);
    const [listLoading, setlistLoading] = useState(true);
    const [selectProductCateValue, setselectProductCateValue] = useState('');
    const [multipleSelection, setmultipleSelection] = useState([]);
    const [productCateOptions, setproductCateOptions] = useState([]);
    const [brandOptions, setbrandOptions] = useState([]);
    const [publishStatusOptions,setpublishStatusOptions]= useState([{
        value: 1,
        label: 'Publish'
      }, {
        value: 0,
        label: 'Unpublish'
    }])
    const [verifyStatusOptions, setverifyStatusOptions] = useState([{
      value: 1,
      label: 'Verified'
    }, {
      value: 0,
      label: 'Unverified'
  }])
  useEffect(()=>{
    getList();
    getBrandList();
    getProductCateList();
  },[])
  useEffect(() => {
      if (selectProductCateValue != null && selectProductCateValue.length == 2) {
          setListQuery({...listQuery,productCategoryId:selectProductCateValue[1]});
      } else {
        setListQuery({...listQuery,productCategoryId:''});
      }
  }, [selectProductCateValue])

    //Filter
    const verifyStatusFilter=(value)=>{
        if(value === 1){
            return 'Verified';
        }else {
            return 'Unverified';
        }
    }

    //Methods
    const getProductSkuSp =(row,index)=>{
        let spData = JSON.parse(row.spData);
        if(spData!=null&&index<spData.length){
          return spData[index].value;
        }else{
          return null;
        }
    }

    const getList=()=>{
      setlistLoading(true);
      productServices.fetchList(listQuery).then(response=>{
          setlistLoading(false);
          setlist(response.data.list);
          settotal(response.data.total);
      });
    }

    const getBrandList=()=>{
      brandServices.fetchList({pageNum: 1, pageSize: 100}).then(response => {
        let brandList = response.data.list;
        let brandoption = [];
        for (let i = 0; i < brandList.length; i++) {
          brandoption.push({label: brandList[i].name, value: brandList[i].id});

        }
        setbrandOptions(brandoption);
      });
    }

    const getProductCateList=()=>{
      productCateServices.fetchListWithChildren().then(response => {
        let list = response.data;
        let productCateOption = [];
        for (let i = 0; i < list.length; i++) {
          let children = [];
          if (list[i].children != null && list[i].children.length > 0) {
            for (let j = 0; j < list[i].children.length; j++) {
              children.push({label: list[i].children[j].name, value: list[i].children[j].id});
            }
          }
          productCateOption.push({label: list[i].name, value: list[i].id, children: children});
        }
        setproductCateOptions(productCateOption);
      });
    }

    const handleShowSkuEditDialog=(index,row)=>{
      var dialogVisible = true,productId = row.id,productSn = row.productSn,
      productAttributeCategoryId = row.productAttributeCategoryId,stockList = [],
      productAttr=[];
      
      skuStockServices.fetchList(row.id,{keyword:editSkuInfo.keyword}).then(response=>{
        stockList = response.data;
        seteditSkuInfo({...editSkuInfo,dialogVisible:dialogVisible,productId:productId,
        productSn:productSn,productAttributeCategoryId:productAttributeCategoryId,keyword:null,
        stockList:stockList,productAttr:productAttr});
      }).then(()=>{
        if(row.productAttributeCategoryId!=null){
          productAttrServices.fetchList(row.productAttributeCategoryId,{type:0}).then(response=>{
            productAttr = response.data.list;
            seteditSkuInfo({...editSkuInfo,dialogVisible:dialogVisible,productId:productId,
            productSn:productSn,productAttributeCategoryId:productAttributeCategoryId,keyword:null,
            stockList:stockList,productAttr:productAttr});
          });
        }
      })
      
      
    }
    const handleSearchEditSku=()=>{
      skuStockServices.fetchList(editSkuInfo.productId,{keyword:editSkuInfo.keyword}).then(response=>{
        seteditSkuInfo({...editSkuInfo,stockList:response.data});
      });
    }

    const handleSkuEditChange=(current,record,index)=>{
      const { name,value} = current.target;
      let tempList = editSkuInfo;
      tempList.stockList[index][name] = value;
      seteditSkuInfo({...tempList});
    }
    const handleEditSkuConfirm=()=>{
      if(editSkuInfo.stockList==null||editSkuInfo.stockList.length<=0){
        message.warning("No Sku Info!",10);
        return;
      }else {
        confirm({
          title:"Are you sure to edit this info?",
          okText:'OK',
          okType:'primary',
          onOk(){
            skuStockServices.update(editSkuInfo.productId,editSkuInfo.stockList).then(response=>{
              message.success("Modify Success!",10);
              seteditSkuInfo({...editSkuInfo,dialogVisible:false});
            });
          },
          onCancel(){
            
          }
        })
      }
    }

    const handleSearchList=()=>{
      setListQuery({...listQuery,pageNum:1});
      getList();
    }
    const handleAddProduct=()=>{
      history.push("/pms/addProduct");
    }
    const handleBatchOperate=()=>{
      if(operateType == null) {
        message.warning("Please select operate type！",10);
        return;
      }
      if(multipleSelection == null || multipleSelection.length<1) {
        message.warning("Please select the product you want to perform opeartion!",10);
        return;
      }
      confirm({
        title:"Are you sure to do multiple operation?",
        okText:'Yes',
        cancelText:'No',
        type:'warning',
        onOk(){
          let ids=[];
          for(let i=0;i<multipleSelection.length;i++){
            ids.push(multipleSelection[i]);
          }
          switch (operateType) {
            case operates[0].value:
              updatePublishStatus(1,ids);
              break;
            case operates[1].value:
              updatePublishStatus(0,ids);
              break;
            case operates[2].value:
              updateRecommendStatus(1,ids);
              break;
            case operates[3].value:
              updateRecommendStatus(0,ids);
              break;
            case operates[4].value:
              updateNewStatus(1,ids);
              break;
            case operates[5].value:
              updateNewStatus(0,ids);
              break;
            case operates[6].value:
              break;
            case operates[7].value:
              updateDeleteStatus(1,ids);
              break;
            default:
              break;
          }
          getList();
        },
        onCancel(){}
      })
    }
    const handleSizeChange=(val)=>{
      let query = listQuery;
      query.pageNum = 1;
      query.pageSize = val;
      setListQuery(query);
      getList();
    }
    const handleCurrentChange=(val)=>{
        let query = listQuery;
        query.pageNum = val;
        setListQuery(query);
        getList();
    }
    const handleSelectionChange=(val)=>{
      setmultipleSelection(val);
    }
    const handlePublishStatusChange=(check,row)=>{
      let ids=[];
      ids.push(row.id);
      updatePublishStatus(check?1:0,ids);
    }
    const handleNewStatusChange=(check, row)=>{
      let ids = [];
      ids.push(row.id);
      updateNewStatus(check?1:0, ids);
    }
    const handleRecommendStatusChange=(check, row)=> {
      let ids = [];
      ids.push(row.id);
      updateRecommendStatus(check?1:0, ids);
    }

    const handleResetSearch=()=>{
      setselectProductCateValue([]);
      setListQuery(defaultListQuery);
    }

    const handleDelete=(index, row)=>{
      confirm({
        title:"Are you sure to delete this record?",
        okText:'OK',
        okType:'primary',
        onOk(){
          let ids = [];
          ids.push(row.id);
          updateDeleteStatus(1,ids);
        },
        onCancel(){}
      })
    }
    const handleUpdateProduct=(index,row)=>{
      history.push(
        '/pms/updateProduct',
        {id:row.id}
      )
    }
    const handleShowProduct=(index,row)=>{
      console.log("handleShowProduct",row);
    }
    const handleShowVerifyDetail=(index,row)=>{
      console.log("handleShowVerifyDetail",row);
    }
    const handleShowLog=(index,row)=>{
      console.log("handleShowLog",row);
    }

    const updatePublishStatus=(publishStatus,ids)=>{
      let params = new URLSearchParams();
      publishStatus=publishStatus?1:0;
      params.append('ids', ids);
      params.append('publishStatus', publishStatus);
      productServices.updatePublishStatus(params).then(response=>{
        message.success("Modify Success!",10);
        getList();
      });
    }

    const updateNewStatus=(newStatus, ids)=>{
      let params = new URLSearchParams();
      newStatus=newStatus?1:0;
      params.append('ids', ids);
      params.append('newStatus', newStatus);
      productServices.updateNewStatus(params).then(response => {
        message.success("Modify Success!",10);
        getList();
      });
      
    }
    const updateRecommendStatus=(recommendStatus, ids)=>{
      let params = new URLSearchParams();
      recommendStatus=recommendStatus?1:0;
      params.append('ids', ids);
      params.append('recommendStatus', recommendStatus);
      productServices.updateRecommendStatus(params).then(response => {
        message.success("Modify Success!",10);
        getList();
      });
    }
    const updateDeleteStatus=(deleteStatus, ids)=>{
      let params = new URLSearchParams();
      params.append('ids', ids);
      params.append('deleteStatus', deleteStatus);
      productServices.updateDeleteStatus(params).then(response => {
        message.success("Modify Success!",10);
        getList();
      });
    }

    const handleListQueryChange = (e,cname) => {
      if(!cname){
        const { name, value } = e.target;
        setListQuery({...listQuery,[name]:value});
      } else {
        setListQuery({...listQuery,[cname]:e});
      }   
    };

    //Table details
    const tableStatus = {
      pagination:{ 
      position: 'bottomRight',pageSize:listQuery.pageSize,
      showQuickJumper:true,showSizeChanger:true,
      pageSizeOptions:[5,10,15],total:total, current:listQuery.pageNum,
      onShowSizeChange:(current, size)=>handleSizeChange(size), onChange:(page, pageSize)=>handleCurrentChange(page)},
      bordered:true,
      size:'default'
    };
    const rowSelection={
        onChange:(e,a)=>{
            handleSelectionChange(e);
        }
    }
    const skuTableStatus = {
      pagination:false,
      bordered:true,
      size:'default'
    };
    
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        align:'center'
      },
      {
        title: 'Image',
        dataIndex: 'image',
        width:"120px",
        align:'center',
        render: (text, record, index) =><img height="80px" src={record.pic}/>
      },
      {
        title: 'Name',
        dataIndex: 'name',
        align:'center',
        render:(text,record,index)=>(
          <div>
            <p>{record.name}</p>
            <p>Brand: {record.brandName}</p>
          </div>
        )
      },
      {
        title: 'Price/Sn',
        dataIndex: 'price',
        align:'center',
        width:'155px',
        render:(text,record,index)=>(
          <div>
            <p>Price: ${record.price}</p>
            <p>Sn: {record.productSn}</p>
          </div>
        )
      },
      {
        title: 'Label',
        dataIndex: 'label',
        align:'center',
        width:'170px',
        render:(text,record,index)=>(
          <div>
            <div>Publish:
              <Switch checked={record.publishStatus} onChange={(value)=>handlePublishStatusChange(value,record)}
              />
            </div>
            <div>New:
              <Switch checked={record.newStatus} onChange={(value)=>handleNewStatusChange(value,record)}
              />
            </div>
            <div>Recommend:
              <Switch checked={record.recommendStatus} onChange={(value)=>handleRecommendStatusChange(value,record)}/>
            </div>
          </div>
        )
      },
      {
        title: 'Sort',
        dataIndex: 'sort',
        align:'center',
        sorter:(a,b)=>a.sort-b.sort
      },
      {
        title: 'Sku Stock',
        dataIndex: 'sku',
        align:'center',
        render:(text,record,index)=>(
          <Button type="primary" shape="circle" icon={<EditOutlined />} size="large"
          onClick={()=>handleShowSkuEditDialog(index,record)}/>
        )
      },
      {
        title: 'Sale',
        dataIndex: 'sale',
        align:'center'
      },
      {
        title: 'Verify Status',
        dataIndex: 'verify',
        align:'center',
        render:(text,record,index)=>(
          <div>
            <p>{verifyStatusFilter(record.verifyStatus)}</p>
            <Button type="link" onClick={()=>handleShowVerifyDetail(record)}>
              Detail
            </Button>
          </div>
        )
      },
      {
        title: 'Operations',
        dataIndex: 'operations',
        align:'center',
        render:(text,record,index)=>(
          <div className="Product_operation">
            <div>
              <div className="Product_operation-section">
                <Button size="small" onClick={()=>handleShowProduct(index,record)}>
                  View
                </Button>
              </div>
              <div className="Product_operation-section">
                <Button size="small"onClick={()=>handleUpdateProduct(index, record)}>
                  Edit
                </Button>
              </div>
            </div>
            <div>
              <div className="Product_operation-section">
                <Button size="small" onClick={()=>handleShowLog(index,record)}>
                  Log
                </Button>
              </div>
              <div className="Product_operation-section">
                <Button size="small" danger onClick={()=>handleDelete(index, record)}>
                  Delete
                </Button>
              </div>  
            </div>
          </div>
        )
      }
    ]
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    return(
        <div className="app-container">
            <Card className="filter-container" >
              <div>
                <SearchOutlined />
                <span className="font-medium">Filter Search</span>
                <Button onClick={handleSearchList} style={{float:'right'}} size="small" type="primary">
                    Search
                </Button>
                <Button onClick={handleResetSearch} style={{float:'right',marginRight:'15px'}} size="small" >
                    Reset
                </Button>
              </div>
              <div style={{marginTop:'15px'}}>
                  <Form layout="inline" {...layout} >
                    <Form.Item label="Search">
                      <Input size="small" placeholder="Product Name" onChange={handleListQueryChange} value={listQuery.keyword} style={{width:'203px'}}/>
                    </Form.Item>
                    <Form.Item label="Sn">
                      <Input size="small" placeholder="Product Sn" onChange={handleListQueryChange}value={listQuery.productSn} style={{width:'203px'}}/>
                    </Form.Item>
                    <Form.Item label="Category">
                      <Cascader allowClear value={selectProductCateValue} onChange={(e)=>setselectProductCateValue(e)} options={productCateOptions}></Cascader>
                    </Form.Item>
                    <Form.Item label="Brand">
                      <Select style={{width:'203px'}} onChange={(e)=>handleListQueryChange(e,'brandId')} value={listQuery.brandId} size="small"placeholder="Product Brand" allowClear>
                        {brandOptions.map((option) => (
                          <Option key={option.value} >
                            {option.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Published">
                      <Select style={{width:'203px'}} onChange={(e)=>handleListQueryChange(e,'publishStatus')} value={listQuery.publishStatus} size="small" placeholder="All" allowClear>
                        {publishStatusOptions.map((option) => (
                          <Option key={option.value} >
                            {option.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Verify">
                      <Select style={{width:'203px'}} onChange={(e)=>handleListQueryChange(e,'verifyStatus')} value={listQuery.verifyStatus}size="small" placeholder="All" allowClear>
                        {verifyStatusOptions.map((option) => (
                          <Option key={option.value} value={option.value} >
                            {option.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Form>
              </div>
            </Card>
            <Card className="operate-container">
              <DatabaseOutlined />
              <span>Data List</span>
              <Button onClick={handleAddProduct} className="btn-add" size="small">
                Add
              </Button>
            </Card>
            <div className="table-container">
              <Table rowSelection={{...rowSelection}} {...tableStatus} rowKey="id" loading={listLoading} columns={columns} dataSource={list}/>
            </div>
            <div className="batch-operate-container">
                <Select style={{width:'170px'}} size="small" value={operateType} placeholder="Multiple Operation" onChange={(e)=>setoperateType(e)}>
                    {operates.map((item)=>{
                        return <Option key={item.value} value={item.value}>{item.label}</Option>
                    })}
                </Select>
                <Button style={{marginLeft:'20px'}} className="search-button" onClick={handleBatchOperate} type="primary" size="small">
                    Confirm
                </Button>
            </div>
            <Modal title="Edit Sku Info" visible={editSkuInfo.dialogVisible} width="40%"
             onCancel={()=>seteditSkuInfo({...editSkuInfo,dialogVisible:false,keyword:null})} okType="primary" onOk={handleEditSkuConfirm}>
              <span>Sku:</span>
              <span>{editSkuInfo.productSn}</span>
              <Search placeholder="Search by sku number" value={editSkuInfo.keyword} onChange={(e)=>seteditSkuInfo({...editSkuInfo,keyword:e.target.value})} 
              size="small" style={{width:"50%",marginLeft:"20px"}} onSearch={handleSearchEditSku}/>
              <Table {...skuTableStatus} dataSource={editSkuInfo.stockList} style={{width:"100%",marginTop:'20px'}} rowKey="skuCode">
                <Column title='SKU' align='center' render={(text, record, index) =><Input defaultValue={record.skuCode} name="skuCode" onBlur={(e)=>handleSkuEditChange(e,record,index)}/>}/>
                {editSkuInfo.productAttr.map((item,indexa)=>{
                return <Column key={item.id} title={item.name} align='center' render={(text,record,index)=><div>{getProductSkuSp(record,indexa)}</div>}/>})}
                <Column title='Price' width="100px" align='center' render={(text, record, index) =><Input name="price" defaultValue={record.price} onBlur={(e)=>handleSkuEditChange(e,record,index)}/>}/>
                <Column title='Stock' width="100px" align='center' render={(text, record, index) =><Input name="stock" defaultValue={record.stock} onBlur={(e)=>handleSkuEditChange(e,record,index)}/>}/>
                <Column title='Low Stock' align='center' render={(text, record, index) =><Input name="lowStock" defaultValue={record.lowStock} onBlur={(e)=>handleSkuEditChange(e,record,index)}/>}/>
              </Table>
            </Modal>
        </div>
    )
}
export default Product;