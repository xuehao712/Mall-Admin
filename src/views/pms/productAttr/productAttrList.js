import { ProfileOutlined } from '@ant-design/icons';
import { Button, Card, message, Select, Table } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import Column from 'antd/lib/table/Column';
import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import {productAttrServices} from 'services/productAttr';
import { history } from '../../../redux/shared/history-redux';

const { Option } = Select;
function ProductAttrList(){
    const route = useLocation();
    //Data
    const [list, setList] = useState(null);
    const [total, setTotal] = useState(null);
    const [listLoading, setListLoading] = useState(true);
    const [listQuery, setListQuery] = useState({pageNum:1,pageSize:5,type:route.state.type});
    const [operateType, setOperateType] = useState(null);
    const [multipleSelection, setMultipleSelection] = useState([]);
    const [operates, setOperates] = useState([{label:"Delete",value:"deleteProductAttr"}]);

    //Initial
    useEffect(() => {
        getList();
    }, [])

    //Method
    const getList=()=>{
        setListLoading(true);
        productAttrServices.fetchList(route.state.cid,listQuery).then(response=>{
            setListLoading(false);
            setList(response.data.list);
            setTotal(response.data.total);
        })
    }
    const addProductAttr=()=>{
        history.push("/pms/addProductAttr",{cid:route.state.cid,type:route.state.type});
    }
    const handleSelectionChange=(val)=>{
        setMultipleSelection(val);
    }
    const handleBatchOperate=()=>{
        if(multipleSelection<1) {
            message.warning("Please select a record",10);
            return;
        }
        if(operateType !=='deleteProductAttr') {
            message.warning("Please select multiple operation type",10);
            return;
        }
        let ids =[];
        for(let i =0; i< multipleSelection.length;i++){
            ids.push(multipleSelection[i].id);
        }
        handleDeleteProductAttr(ids);
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
    const handleUpdate=(index,row)=>{
        history.push("/pms/updateProductAttr",{id:row.id});
    }
    const handleDeleteProductAttr=(ids)=>{
        confirm({
            title:"Are you sure to delete this attr?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                let data = new URLSearchParams();
                data.append("ids",ids);
                productAttrServices.deleteProductAttr(data).then(response=>{
                    message.success("Delete Success",10);
                    getList();
                })
            },
            onCancel(){}
        });
    }
    const handleDelete=(index,row)=>{
        let ids = [];
        ids.push(row.id);
        handleDeleteProductAttr(ids);
    }
    const inputTypeFilter=(value)=>{
        if(value===1) {
            return "Get From List";
        } else {
            return "Type Input";
        }
    }
    const selectTypeFilter=(value)=>{
        if(value ===1){
            return "Single";
        } else if(value ===2) {
            return "Multiple";
        } else {
            return "Unique";
        }
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
            <Card className="operate-container">
                <ProfileOutlined style={{marginTop:'5px'}}/>
                <span style={{marginTop:'5px'}}>Data List</span>
                <Button className="btn-add" onClick={addProductAttr} size="small">
                    Add
                </Button>
            </Card>
            <div className="table-container">
                <Table rowSelection={{...rowSelection}} rowKey="id" dataSource={list} style={{width:'100%'}} loading={listLoading} {...tableStatus}>
                    <Column title="Id" width="100px" align="center" render={(text,record,index)=><div>{record.id}</div>}/>
                    <Column title="Name" width="140px" align="center" render={(text,record,index)=><div>{record.name}</div>}/>
                    <Column title="Type" width="140px" align="center" render={(text,record,index)=><div>{route.state.cname}</div>}/>
                    <Column title="SelectType" width="120px" align="center" render={(text,record,index)=><div>{selectTypeFilter(record.selectType)}</div>}/>
                    <Column title="InputType" width="150px" align="center" render={(text,record,index)=><div>{inputTypeFilter(record.inputType)}</div>}/>
                    <Column title="InputList" align="center" render={(text,record,index)=><div>{record.inputList}</div>}/>
                    <Column title="Sort" align="center" width="100px" render={(text,record,index)=><div>{record.sort}</div>}/>
                    <Column title="Operation" align="center" width="200px" render={(text,record,index)=>
                        <div>
                            <Button size="small" onClick={()=>handleUpdate(index,record)}>Edit</Button>
                            <Button size="small" danger onClick={()=>handleDelete(index,record)}>Delete</Button>
                        </div>}/>
                </Table>
            </div>
            <div className="batch-operate-container">
                <Select size="small" value={operateType} onChange={(e)=>setOperateType(e)} placeholder="Multiple Operation">
                    {operates.map((item)=>{
                        return <Option key={item.value} value={item.value}>{item.label}</Option>
                    })}
                </Select>
                <Button style={{marginLeft:'20px'}} className="search-button" onClick={handleBatchOperate} type="primary" size="small">
                    Confirm
                </Button>
            </div>
        </div>
    )
}
export default ProductAttrList;