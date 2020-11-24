import { ProfileOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Select, Switch, Table } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import Modal from 'antd/lib/modal/Modal';
import Column from 'antd/lib/table/Column';
import { set } from 'js-cookie';
import React, {useState, useEffect} from 'react';
import {brandServices} from 'services/brand';
import {history} from '../../../redux/shared/history-redux';

const { Option } = Select;
function Brand(){
    const [form] = Form.useForm();
    const [operates, setOperates] = useState([
        {
            label: "Show Brand",
            value: "showBrand"
        },
        {
            label: "Hide Brand",
            value: "hideBrand"
        }
    ]);
    const defaultList = {
        keyword:null,
        pageNum: 1,
        pageSize: 10}
    const [operateType, setoperateType] = useState(null);
    const [listQuery, setlistQuery] = useState(defaultList);
    const [list, setlist] = useState(null);
    const [total, settotal] = useState(null);
    const [listLoading, setlistLoading] = useState(true);
    const [multipleSelection, setmultipleSelection] = useState([]);

    useEffect(() => {
        getList();
    }, []);

    const getList=()=>{
        setlistLoading(true);
        brandServices.fetchList(listQuery).then(response =>{
            setlistLoading(false);
            setlist(response.data.list);
            settotal(response.data.total);
        })
    }
    const handleSelectionChange=(val)=>{
        setmultipleSelection(val);
    }
    const handleUpdate=(index,row)=>{
        history.push('/pms/updateBrand',{id:row.id});
    }
    const handleDelete=(index,row)=>{
        confirm({
            title:"Are you sure to delete this brand?",
            okText:'OK',
            okType:'primary',
            onOk(){
                brandServices.deleteBrand(row.id).then(response=>{
                    message.success("Delete Success",10);
                    getList();
                })
            },
            onCancel(){}
        })
    }
    const getProductList=(index,row)=>{
        console.log(index,row);
    }
    const getProductCommentList=(index,row)=>{
        console.log(index,row);
    }
    const handleFactoryStatusChange=(value,row)=>{
        var data=new URLSearchParams();
        value = value==false?0:1;
        data.append("ids", row.id);
        data.append("factoryStatus", value);
        brandServices.updateFactoryStatus(data).then(response =>{
            message.success("Modify Success",10);
            getList();
        }).catch(error=>{
            if(row.factoryStatus === 0) {
                row.factoryStatus = 1;
            }else {
                row.factoryStatus = 0;
            }
        })
    }
    const handleShowStatusChange=(value,row)=>{
        let data = new URLSearchParams();
        value = value==false?0:1;
        data.append("ids", row.id);
        data.append("showStatus", value);
        brandServices.updateShowStatus(data).then(response=>{
            message.success("Modify Success",10);
            getList();
        }).catch(error=>{
            if(row.showStatus === 0) {
                row.showStatus = 1;
            }else {
                row.showStatus = 0;
            }
        })
    }

    const handleSizeChange=(val)=>{
        let query = listQuery;
        query.pageNum = 1;
        query.pageSize = val;
        setlistQuery(query);
        getList();
    }
    const handleCurrentChange=(val)=>{
        let query = listQuery;
        query.pageNum = val;
        setlistQuery(query);
        getList();
    }
    const searchBrandList=()=>{
        set({...listQuery,pageNum:1});
        getList();
    }
    const handleBatchOperate=()=>{
        console.log(multipleSelection);
        if(multipleSelection<1){
            message.warning("Please select one record",10);
            return;
        }
        let showStatus = 0;
        if(operateType === 'showBrand'){
            showStatus = 1;
        } else if(operateType === 'hideBrand') {
            showStatus = 0;
        } else {
            message.warning("Please select multiple operation type",10);
            return;
        }
        let ids = [];
        for(let i = 0; i < multipleSelection.length;i++){
            ids.push(multipleSelection[i].id);
        }
        let data = new URLSearchParams();
        data.append("ids",ids);
        data.append("showStatus",showStatus);
        brandServices.updateShowStatus(data).then(response => {
            getList();
            message.success("Modify Success",10);
        });
    }
    const addBrand=()=>{
        history.push("/pms/addBrand");
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
        onChange:(e,a)=>{
            handleSelectionChange(e);
        }
    }
    return(
        <div className="app-container">
            <Card className="filter-container">
                <div>
                    <SearchOutlined />
                    <span>Filter Search</span>
                    <Button onClick={searchBrandList} type="primary" size="small"
                    style={{float:'right'}}>
                        Result
                    </Button>
                </div>
                <div style={{marginTop:'15px'}}>
                    <Form layout="inline" labelCol={{span:6}}  size="small" form={form}>
                        <Form.Item label="Search: " >
                            <Input onPressEnter={searchBrandList} value={listQuery.keyword} onChange={(e)=>setlistQuery({...listQuery,keyword:e.target.value})} placeholder="BrandName/Keyword"/>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
            <Card className="operate-container">
                <ProfileOutlined />
                <span>Data List</span>
                <Button className="btn-add" onClick={addBrand} size="small">
                    Add
                </Button>
            </Card>
            <div className="table-container">
                <Table rowSelection={{...rowSelection}}  {...tableStatus} dataSource={list} style={{width:'100%'}} loading={listLoading} rowKey="id">
                    <Column align="center" title="Id" width="100px" render={(text,record,index)=><div>{record.id}</div>}/>
                    <Column align="center" title="Name" render={(text,record,index)=><div>{record.name}</div>}/>
                    <Column align="center" title="Alphabet" width="100px" render={(text,record,index)=><div>{record.firstLetter}</div>}/>
                    <Column align="center" title="Sort" width="100px" render={(text,record,index)=><div>{record.sort}</div>}/>
                    <Column align="center" title="Manufactory" width="100px" render={(text,record,index)=><Switch onChange={(e)=>handleFactoryStatusChange(e,record)} checked={record.factoryStatus} />}/>
                    <Column align="center" title="Display" width="100px" render={(text,record,index)=><Switch onChange={(e)=>handleShowStatusChange(e,record)} checked={record.showStatus} />}/>
                    <Column align="center" title="Related" width="230px" render={(text,record,index)=>(
                        <div>
                            <span>Product: </span>
                            <Button size="small" type="text" onClick={()=>getProductList(index,record)}>
                                100
                            </Button>
                            <span>Review: </span>
                            <Button size="small" type="text" onClick={()=>getProductCommentList(index,record)}>1000</Button>
                        </div>
                    )}/>
                    <Column align="center" label="Opeartion" width="200px"render={(text,record,index)=>(
                        <div>
                            <Button size="small" onClick={()=>handleUpdate(index,record)}>
                                Edit
                            </Button>
                            <Button size="small" danger onClick={()=>handleDelete(index,record)}>
                                Delete
                            </Button>
                        </div>
                    )}/>
                </Table>
                <div className="batch-opearte-container">
                    <Select size="small" value={operateType} onChange={(e)=>setoperateType(e)}  placeholder="Multiple Operation">
                        {operates.map((item)=>{
                            return <Option key={item.value} value={item.value}>{item.label}</Option>
                        })}
                    </Select>
                    <Button style={{marginLeft:"20px"}} className="search-button" onClick={handleBatchOperate} type="primary" size="small">
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default Brand;