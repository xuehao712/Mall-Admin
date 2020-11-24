import { ProfileOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Select, Switch, Table } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import Modal from 'antd/lib/modal/Modal';
import Column from 'antd/lib/table/Column';
import React, {useState, useEffect} from 'react';
import {brandServices} from 'services/brand';
import {homeBrandServices} from 'services/homeBrand';

function HomeBrand(){
    const {Option} = Select;
    const { Search } = Input;
    //Initial
    useEffect(() => {
        getList();
    }, [])

    //Data
    const defaultListQuery = {
        pageNum: 1,
        pageSize: 5,
        brandName: null,
        recommendStatus: null
    };
    const defaultRecommendOptions = [
        {
          label: 'Unrecommend',
          value: 0
        },
        {
          label: 'Recommending',
          value: 1
        }
    ];
    const [listQuery, setListQuery] = useState(defaultListQuery);
    const [recommendOptions, setRecommendOptions] = useState(defaultRecommendOptions);
    const [list, setList] = useState(null);
    const [total, setTotal] = useState(null);
    const [listLoading, setListLoading] = useState(false);
    const [multipleSelection, setMultipleSelection] = useState([]);
    const [operates, setOperates] = useState([
        {
            label: "Recommend",
            value: 0
        },
        {
            label: "Unrecommend",
            value: 1
        },
        {
            label: "Delete",
            value: 2
        }
    ]);
    const [operateType, setOperateType] = useState(null);
    const [selectDialogVisible, setSelectDialogVisible] = useState(false);
    const [dialogData, setDialogData] = useState({
        list: null,
        total: null,
        multipleSelection:[],
        listQuery:{
          keyword: null,
          pageNum: 1,
          pageSize: 5
        }
    });
    const [sortDialogVisible, setSortDialogVisible] = useState(false);
    const [sortDialogData, setSortDialogData] = useState({
        sort:0,
        id:null
    })

    //Filter
    const formatRecommendStatus=(status)=> {
        if(status===1){
            return 'Recommending';
        }else{
            return 'Unrecommend';
        }
    };

    //Methods
    const handleUpdateRecommendChange=(e,row)=>{
        e= e?1:0;
        updateRecommendStatus(row.id,e);
    }
    const handleSelectionChange=(val)=>{
        setMultipleSelection(val);
    }
    const handleResetSearch=()=>{
        setListQuery(defaultListQuery);
    }
    const handleSearchList=()=>{
        setListQuery({...listQuery,pageNum:1});
        getList();
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
    const handleDelete=(index,row)=>{
        deleteBrand(row.id);
    }
    const handleBatchOperate=()=>{
        if( multipleSelection.length<1) {
            message.warning("Please select the operation",10);
            return;
        }
        let ids = [];
        for (let i = 0; i < multipleSelection.length; i++) {
            ids.push(multipleSelection[i].id);
        }
        if(operateType === 0){
            //Set Recommend
            updateRecommendStatus(ids,1);
        } else if (operateType === 1){
            //Cancel Recommend
            updateRecommendStatus(ids,0);
        } else if( operateType === 2) {
            //Delete
            deleteBrand(ids);
        } else {
            message.warning('Please select the operation type',10);
            return;
        }
    }
    const handleSelectBrand=()=>{
        setSelectDialogVisible(true);
        getDialogList();
    }
    const handleSelectSearch=()=>{
        getDialogList();
    }
    const handleDialogSizeChange=(val)=>{
        let query = dialogData;
        query.listQuery.pageNum = 1;
        query.listQuery.pageSize = val;
        setDialogData(query);
        getDialogList();
    }
    const handleDialogCurrentChange=(val)=>{
        let query = dialogData;
        query.listQuery.pageNum = val;
        setDialogData(query);
        getDialogList();
    }
    const handleDialogSelectionChange=(val)=>{
        setDialogData({...dialogData,multipleSelection:val});
    }
    const handleSelectDialogConfirm=()=>{
        if(dialogData.multipleSelection<1) {
            message.warning('Please select a record',10);
            return;
        }
        let selectBrands =[];
        for (let i = 0; i < dialogData.multipleSelection.length; i++) {
            selectBrands.push({
              brandId:dialogData.multipleSelection[i].id,
              brandName:dialogData.multipleSelection[i].name
            });
        }
        confirm({
            title:"Are you sure to add this data?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                homeBrandServices.createHomeBrand(selectBrands).then(response=>{
                    setSelectDialogVisible(false);
                    setDialogData({...dialogData,multipleSelection:[]});
                    getList();
                    message.success('Add Success!',10);
                })
            },
            onCancel(){}
        });
    }

    const handleEditSort=(index,row)=>{
        setSortDialogVisible(true);
        setSortDialogData({...sortDialogData,sort:row.sort,id:row.id});
    }
    const handleUpdateSort=()=>{
        confirm({
            title:"Are you sure to modify sort?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                homeBrandServices.updateHomeBrandSort(sortDialogData).then(response=>{
                    setSortDialogVisible(false);
                    getList();
                    message.success("Update Success!",10);
                });
            },
            onCancel(){}
        });
    }
    const getList=()=>{
        setListLoading(true);
        homeBrandServices.fetchList(listQuery).then(response=>{
            setListLoading(false);
            setList(response.data.list);
            setTotal(response.data.total);
        })
    }
    const updateRecommendStatus=(ids,status)=>{
        confirm({
            title:"Are you sure to modify recommend status?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                let params=new URLSearchParams();
                params.append("ids",ids);
                params.append("recommendStatus",status);
                homeBrandServices.updateRecommendStatus(params).then(response=>{
                    getList();
                    message.success("Modify Success",10);
                });
            },
            onCancel(){
                message.success("Success Cancel Operate!",10);
                getList();
            }
        });
    }
    const deleteBrand=(ids)=>{
        confirm({
            title:"Are you sure to delete this brand?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                let params=new URLSearchParams();
                params.append("ids",ids);
                homeBrandServices.deleteHomeBrand(params).then(response=>{
                    getList();
                    message.success("Delete Success",10);
                });
            },
            onCancel(){}
        });
    }
    const getDialogList=()=>{
        brandServices.fetchList(dialogData.listQuery).then(response=>{
            setDialogData({...dialogData,list:response.data.list,total:response.data.total});
        })
    }
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
        onChange:(e,value)=>{
            handleSelectionChange(value);
        }
    }
    const modalTableStatus = {
        pagination:{ 
        position: 'bottomRight',pageSize:dialogData.listQuery.pageSize,
        showQuickJumper:true,showSizeChanger:true,
        pageSizeOptions:[5,10,15],total:dialogData.total, current:dialogData.listQuery.pageNum,
        onShowSizeChange:(current, size)=>handleDialogSizeChange(size), onChange:(page, pageSize)=>handleDialogCurrentChange(page)},
        bordered:true,
        size:'default'
    };
    const modalRowSelection={
        onChange:(e,value)=>{
            handleDialogSelectionChange(value);
        }
    }
    return(
        <div className="app-container">
            <Card className="filter-container">
                <div>
                    <SearchOutlined />
                    <span>Filter Search</span>
                    <Button style={{float:'right'}} type="primary" onClick={handleSearchList} size='small'>
                        Search
                    </Button>
                    <Button style={{float:'right',marginRight:'15px'}} onClick={handleResetSearch} size="small">
                        Reset
                    </Button>
                </div>
                <div style={{marginTop:'15px'}}>
                    <Form layout="inline" size="small" labelCol={{span:10}}>
                        <Form.Item label="Name: " >
                            <Input value={listQuery.brandName} onChange={(e)=>setListQuery({...listQuery,brandName:e.target.value})} className="input-width" placeholder="Brand Name"/>
                        </Form.Item>
                        <Form.Item label="Status: ">
                            <Select value={listQuery.recommendStatus} placeholder="All" allowClear 
                            className="input-width" style={{width:'200px'}} onChange={(e)=>setListQuery({...listQuery,recommendStatus:e})}>
                                {recommendOptions.map((item)=>{
                                    return <Option key={item.value} value={item.value}>{item.label}</Option>
                                })}
                            </Select>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
            <Card className="operate-container">
                <ProfileOutlined/>
                <span>Data List</span>
                <Button size="small" className="btn-add" onClick={handleSelectBrand}>Select</Button>
            </Card>
            <div className="table-container">
                <Table rowSelection={{...rowSelection}} rowKey="id" {...tableStatus} dataSource={list} style={{width:'100%'}} loading={listLoading}>
                    <Column width="120px" align="center" title="Id" render={(text,record,index)=>
                        <div>
                            {record.id}
                        </div>}/>
                    <Column align="center" title="Name" render={(text,record,index)=>
                        <div>
                            {record.brandName}
                        </div>}/>
                    <Column align="center" width="200px" title="Recommend" render={(text,record,index)=>
                        <div>
                            <Switch onChange={(e)=>handleUpdateRecommendChange(e,record)} checked={record.recommendStatus}/>
                        </div>}/>
                    <Column width="160px" align="center" title="Sort" render={(text,record,index)=>
                        <div>
                            {record.sort}
                        </div>}/>
                    <Column width="160px" align="center" title="Status" render={(text,record,index)=>
                        <div>
                            {formatRecommendStatus(record.recommendStatus)}
                        </div>}/>
                    <Column width="180px" align="center" title="Operation" render={(text,record,index)=>
                        <div>
                            <Button size="small" type="text" onClick={()=>handleEditSort(index,record)}>SetSort</Button>
                            <Button size="small" type="text" onClick={()=>handleDelete(index,record)}>Delete</Button>
                        </div>}/>
                </Table>
            </div>
            <div className="batch-operate-container">
                <Select style={{width:'200px'}} size="small" value={operateType} placeholder="Multiple" onChange={(e)=>setOperateType(e)}>
                    {operates.map((item)=>{
                        return <Option key={item.value} value={item.value}>{item.label}</Option>
                    })}
                </Select>
                <Button style={{marginLeft:'20px'}} className="search-button" onClick={handleBatchOperate} type="primary"size="small">
                    Confirm
                </Button>
            </div>
            <Modal title="Select Brand" visible={selectDialogVisible} width="40%" onCancel={()=>setSelectDialogVisible(false)} onOk={handleSelectDialogConfirm}>
                <Search value={dialogData.listQuery.keyword} name="keyword" onChange={(e)=>setDialogData({...dialogData,listQuery:{...dialogData.listQuery,keyword:e.target.value}})}
                style={{width:'250px',marginBottom:'20px'}} size="small" placeholder="Brand Search"
                onSearch={handleSelectSearch}/>
                <Table rowKey="id" dataSource={dialogData.list} {...modalTableStatus} rowSelection={{...modalRowSelection}}>
                    <Column title="Name" align="center" render={(text,record,index)=>
                        <div>
                            {record.name}
                        </div>
                    }/>
                    <Column title="Related" width="220px" align="center" render={(text,record,index)=>
                        <div>
                            Product: <span className="color-main">{record.productCount}</span><br/>
                            Comment: <span className="color-main">{record.productCommentCount}</span>
                        </div>
                    }/>
                </Table>
            </Modal>
            <Modal title="SetSort" visible={sortDialogVisible} width="40%" onOk={handleUpdateSort} onCancel={()=>setSortDialogVisible(false)}>
                <Form labelCol={{span:5}}>
                    <Form.Item label="Sort: ">
                        <Input value={sortDialogData.sort} style={{width:'200px'}} name="sort" onChange={(e)=>setSortDialogData({...sortDialogData,sort:e.target.value})}/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default HomeBrand;