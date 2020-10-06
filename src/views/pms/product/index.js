import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { Button, Card, Col, message, Row, Table,Form, Input, Dropdown, Select, Menu, Switch, Modal, Popconfirm } from 'antd';
import { CloseCircleFilled, DatabaseOutlined, DownOutlined, EditOutlined, EditTwoTone, SearchOutlined } from '@ant-design/icons';
import {productServices} from 'services/product';
import {skuStockServices} from 'services/skuStock'
import {productAttrServices} from 'services/productAttr'
import {brandServices} from 'services/brand'
import {productCateServices} from 'services/productCate'
import Search from 'antd/lib/input/Search';
import Column from 'antd/lib/table/Column';
import Item from 'antd/lib/list/Item';
import {history} from '../../../redux/shared/history-redux'

// const InputTag = React.memo((props)=>{
//   let {style,onchange,name,value,placeholder,size} = props;
//   return(
//     <Input size={size} placeholder={placeholder} onChange={onchange}name={name} value={value} style={style}/>
//   )
// });
const confirm = Modal.confirm;
const { Option } = Select;
function Product(){
    const [form] = Form.useForm();
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
    const [listQuery, setlistQuery] = useState(defaultListQuery);
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
          setlistQuery({...listQuery,productCategoryId:selectProductCateValue[1]});
      } else {
        setlistQuery({...listQuery,productCategoryId:''});
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
    const handleHideSkuEditDialog=()=>{
      seteditSkuInfo({...editSkuInfo,dialogVisible:false});
    }
    const handleSearchEditSku=()=>{
      skuStockServices.fetchList(editSkuInfo.productId,{keyword:editSkuInfo.keyword}).then(response=>{
        seteditSkuInfo({...editSkuInfo,stockList:response.data});
      });
    }

    const skuConfirm =()=>{
      confirm({
        title:"Are you sure to edit this info?",
        okText:'OK',
        okType:'primary',
        onOk(){handleEditSkuConfirmPopup},
        onCancel(){}
      })
    }
    const handleSkuEditChange=(current,record)=>{
      let name = current.target.name;
      let currentData = current.target.defaultValue.concat(current.nativeEvent.data);

      let index = editSkuInfo.stockList.findIndex(index=>index.id==record.id);
      const sku = [...editSkuInfo.stockList];
      sku[index]={...sku[index],name:currentData};
      seteditSkuInfo({...editSkuInfo,stockList:sku});
      console.log(editSkuInfo);
    }
    const handleEditSkuConfirm=()=>{
      if(editSkuInfo.stockList==null||editSkuInfo.stockList.length<=0){
        message.warning("No Sku Info!",10);
        return;
      }
    }
    const handleEditSkuConfirmPopup=()=>{
      skuStockServices.update(editSkuInfo.productId,editSkuInfo.stockList).then(response=>{
        message.success("Modify Success!",10);
        seteditSkuInfo({...editSkuInfo,dialogVisible:false});
      });
    }

    const handleSearchList=()=>{
      setlistQuery({...listQuery,pageNum:1});
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
    }
    const handleBatchOperateConfirmPopup=()=>{
      let ids=[];
      for(let i=0;i<multipleSelection.length;i++){
        ids.push(multipleSelection[i].id);
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
    }
    const handleSizeChange=(val)=>{
      setlistQuery({...listQuery,pageNum:1,pageSize:val});
      getList();
    }

    const handleCurrentChange=(val)=>{
      setlistQuery({...listQuery,pageNum:val});
      getList();
    }
    const handleSelectionChange=(val)=>{
      setmultipleSelection(val);
    }
    const handlePublishStatusChange=(check,row)=>{
      let ids=[];
      ids.push(row.id);
      updatePublishStatus(check?'1':'0',ids);
    }
    const handleNewStatusChange=(check, row)=>{
      let ids = [];
      ids.push(row.id);
      updateNewStatus(check?'1':'0', ids);
    }
    const handleRecommendStatusChange=(check, row)=> {
      let ids = [];
      ids.push(row.id);
      updateRecommendStatus(check?'1':'0', ids);
    }

    const handleResetSearch=()=>{
      setselectProductCateValue([]);
      setlistQuery(defaultListQuery);
    }

    const handleDelete=(index, row)=>{
        let ids = [];
        ids.push(row.id);
        updateDeleteStatus(1,ids);
    }

    const handleUpdateProduct=(index,row)=>{
      history.push({
        pathname: '/pms/updateProduct',
        state:{id:row.id}
      })
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
      params.append('ids', ids);
      params.append('publishStatus', publishStatus);
      productServices.updatePublishStatus(params).then(response=>{
        message.success("Modify Success!",10);
      });
      getList();
    }

    const updateNewStatus=(newStatus, ids)=>{
      let params = new URLSearchParams();
      params.append('ids', ids);
      params.append('newStatus', newStatus);
      productServices.updateNewStatus(params).then(response => {
        message.success("Modify Success!",10);
      });
      getList();
    }
    const updateRecommendStatus=(recommendStatus, ids)=>{
      let params = new URLSearchParams();
      params.append('ids', ids);
      params.append('recommendStatus', recommendStatus);
      productServices.updateRecommendStatus(params).then(response => {
        message.success("Modify Success!",10);
      });
      getList();
    }
    const updateDeleteStatus=(deleteStatus, ids)=>{
      let params = new URLSearchParams();
      params.append('ids', ids);
      params.append('deleteStatus', deleteStatus);
      productServices.updateDeleteStatus(params).then(response => {
        message.success("Modify Success!",10);

      });
      getList();
    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      setlistQuery({...listQuery,[name]:value});
    };
    const handleBrandSelection =(e)=>{
      setlistQuery({...listQuery,brandId:e});
    }
    const handlePublishSelection=(e)=>{
      setlistQuery({...listQuery,publishStatus:e});
    }
    const handleVerifySelection=(e)=>{
      setlistQuery({...listQuery,verifyStatus:e});
    }
    const handleSelectProductionCate =(e)=>{
      setselectProductCateValue(e.target.value);
    }

    //Sku stock table details
    const [skuTableStatus, setskuTableStatus] = useState({
      loading:false,
      bordered:true,
      pagination:{ position: 'bottomRight',defaultPageSize:'5'},
      size:'default',
      showHeader:true,
      scroll:undefined,
    })
    
    //Table details
    const [tableStatus, settableStatus] = useState({
      loading:false,
      bordered:true,
      pagination:{ position: 'bottomRight',defaultPageSize:'5',
      showQuickJumper:true,showSizeChanger:true},
      size:'default',
      showHeader:true,
      rowSelection:{},
      scroll:undefined,
      hasData:true,
    })
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
            <p>Publish:
              <Switch checked={record.publishStatus} onChange={(value)=>handlePublishStatusChange(value,record)}
              />
            </p>
            <p>New:
              <Switch checked={record.newStatus} onChange={(value)=>handleNewStatusChange(value,record)}
              />
            </p>
            <p>Recommend:
              <Switch checked={record.recommendStatus} onChange={(value)=>handleRecommendStatusChange(value,record)}/>
            </p>
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
          <div>
            <p>
              <Button size="small" onClick={()=>handleShowProduct(index,record)}>
                View
              </Button>
              <Button size="small"onClick={()=>handleShowVerifyDetail(index, record)}>
                Edit
              </Button>
            </p>
            <p>
              <Button size="small" onClick={()=>handleShowProduct(index,record)}>
                Daily
              </Button>
              <Button size="small" danger onClick={()=>handleShowVerifyDetail(index, record)}>
                Delete
              </Button>
            </p>
          </div>
        )
      }
    ]

    return(
        <div className="app-container">
            <Card className="filter-container" >
              <div>
                <SearchOutlined />
                <span className="font-medium">Filter Search</span>
                <Button onClick={handleSearchList} size="small" type="primary">
                    Result
                </Button>
                <Button onClick={handleResetSearch} size="small" >
                    Reset
                </Button>
              </div>
              <div style={{marginTop:'15px'}}>
                  <Form form={form}>
                    <Form.Item label="Search">
                      {/* <InputTag size="small" placeholder="Product Name" onChange={handleChange}name="keyword" value={listQuery.keyword} style={{width:'203px'}}/> */}
                      <Input size="small" placeholder="Product Name" onChange={handleChange}name="keyword" value={listQuery.keyword} style={{width:'203px'}}/>
                    </Form.Item>
                  </Form>
                  <Form form={form}>
                    <Form.Item label="Sn">
                      <Input size="small" placeholder="Product Sn" onChange={handleChange}name="productSn" value={listQuery.productSn} style={{width:'203px'}}/>
                    </Form.Item>
                  </Form>
                  <Form form={form}>
                    <Form.Item label="Category">
                      <Dropdown overlay={
                        <Menu>
                          {productCateOptions.map((option) => (
                            <Menu.Item key={option.value} value={option.value}>
                              {option.label}
                            </Menu.Item>))}
                        </Menu>
                        }>
                        <Button>
                          Product Category<DownOutlined />
                        </Button>
                      </Dropdown>
                    </Form.Item>
                    <Form.Item label="Brand">
                      <Select style={{width:'203px'}} onChange={handleBrandSelection} value={listQuery.brandId} size="small" name="brandId" placeholder="Product Brand" allowClear>
                        {brandOptions.map((option) => (
                          <Option key={option.value} >
                            {option.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Published">
                      <Select style={{width:'203px'}} onChange={handlePublishSelection} value={listQuery.publishStatus} name="publishStatus" size="small" placeholder="All" allowClear>
                        {publishStatusOptions.map((option) => (
                          <Option key={option.value} >
                            {option.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Verify">
                      <Select style={{width:'203px'}} onChange={handleVerifySelection} value={listQuery.verifyStatus} name="verifyStatus" size="small" placeholder="All" allowClear>
                        {verifyStatusOptions.map((option) => (
                          <Option key={option.value} >
                            {option.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Form>
              </div>
            </Card>
            <Card>
              <DatabaseOutlined />
              <span>Data List</span>
              <Button onClick={handleAddProduct} size="small">
                Add
              </Button>
            </Card>
            <div className="table-container">
              <Table {...tableStatus} loading={listLoading} columns={columns} dataSource={list}/>
            </div>
            <Modal title="Edit Sku Info" visible={editSkuInfo.dialogVisible} width="40%"
             onCancel={handleHideSkuEditDialog} okType="primary" onOk={handleEditSkuConfirm,skuConfirm}>
              <span>Sku:</span>
              <span>{editSkuInfo.productSn}</span>
              <Search placeholder="Search by sku number" value={editSkuInfo.keyword} size="small" style={{width:"50%",marginLeft:"20px"}}
              onSearch={handleSearchEditSku}/>
              <Table {...skuTableStatus} dataSource={editSkuInfo.stockList} style={{width:"100%",marginTop:'20px'}}>
                <Column title='SKU' dataIndex='sku' align='center' render={(text, record, index) =><Input defaultValue={record.skuCode} name="skuCode" onChange={(e)=>handleSkuEditChange(e,record)}/>}/>
                {editSkuInfo.productAttr.map((item,indexa)=>{
                return <Column title={item.name} dataIndex={item.id} align='center' render={(text,record,index)=><div>{getProductSkuSp(record,indexa)}</div>}/>})}
                <Column title='Price' dataIndex='price' width="100px" align='center' render={(text, record, index) =><Input name="price" defaultValue={record.price}/>}/>
                <Column title='Stock' dataIndex='stock' width="100px" align='center' render={(text, record, index) =><Input name="stock" defaultValue={record.stock}/>}/>
                <Column title='Low Stock' dataIndex='low'  align='center' render={(text, record, index) =><Input name="lowStock" defaultValue={record.lowStock}/>}/>
              </Table>
            </Modal>
        </div>
    )
}
export default Product;