import { ProfileOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Select, Space, Switch, Table } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import Column from 'antd/lib/table/Column';
import React, {useState, useEffect} from 'react';
import {formatDate} from 'utils/date';
import {returnReasonServices} from 'services/returnReason';
import './reason.scss';
import confirm from 'antd/lib/modal/confirm';

const {Option} = Select;
function ReturnReason(){
    const [reasonForm] = Form.useForm();
    
    //Data
    const defaultListQuery = {
        pageNum: 1,
        pageSize: 5
    };
    const defaultReturnReason = {
        name:null,
        sort:0,
        status:1,
        createTime:null
    };
    const [list, setList] = useState(null);
    const [total, setTotal] = useState(null);
    const [multipleSelection, setMultipleSelection] = useState([]);
    const [listLoading, setListLoading] = useState(true);
    const [listQuery, setListQuery] = useState(defaultListQuery);
    const [operateType, setOperateType] = useState(null);
    const [operateOptions, setOperateOptions] = useState([{
        label:'Delete',
        value:1
    }]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [returnReason, setReturnReason] = useState(defaultReturnReason);
    const [operateReasonId, setOperateReasonId] = useState(null);
    
    //Initial
    useEffect(() => {
        getList();
    }, [])
    useEffect(() => {
        reasonForm.setFieldsValue(returnReason);
    }, [returnReason])
    //Filter
    const formatCreateTime=(time)=>{
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
    };

    //Methods
    const handleAdd=()=>{
        setDialogVisible(true);
        setOperateReasonId(null);
        setReturnReason(defaultReturnReason);
    };
    const handleConfirm=()=>{
        if(operateReasonId ==null) {
            //Add operation
            returnReasonServices.addReason(returnReason).then(response=>{
                setDialogVisible(false);
                setOperateReasonId(null);
                message.success("Add Success",5);
                getList();
            });
        } else {
            //Modify
            returnReasonServices.updateReason(operateReasonId,returnReason).then(response=>{
                setDialogVisible(false);
                setOperateReasonId(null);
                message.success("Update Success",5);
                getList();
            });
        }
    };
    const handleUpdate=(index,row)=>{
        setDialogVisible(true);
        setOperateReasonId(row.id);
        returnReasonServices.getReasonDetail(row.id).then(response=>{
            setReturnReason({...response.data});
        })
    };
    const handleDelete=(index,row)=>{
        let ids = [];
        ids.push(row.id);
        deleteReason(ids);
    };
    const handleSelectionChange=(val)=>{
        setMultipleSelection(val);
    };
    const handleStatusChange=(e,row)=>{
        let ids=[];
        ids.push(row.id);
        e = e?1:0;
        let param = new URLSearchParams();
        param.append("status",e);
        param.append("ids",ids);
        returnReasonServices.updateStatus(param).then(response=>{
          message.success("Status Modify Success",5);
          getList();
        });
    };
    const handleBatchOperate=()=>{
        if(multipleSelection==null||multipleSelection.length<1){
          message.warning("Please select the operation",5);
          return;
        }
        if(operateType===1){
          let ids=[];
          for(let i=0;i<multipleSelection.length;i++){
            ids.push(multipleSelection[i].id);
          }
          deleteReason(ids);
        }
    };
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
    const getList=()=>{
        setListLoading(true);
        returnReasonServices.fetchList(listQuery).then(response => {
          setListLoading(false);
          setList(response.data.list);
          setTotal(response.data.total);
        });
    };
    const deleteReason=(ids)=>{
        confirm({
            title:"Are you sure to delete?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                let params = new URLSearchParams();
                params.append("ids",ids);
                returnReasonServices.deleteReason(params).then(response=>{
                    message.success("Delete Success",5);
                    setListQuery({...listQuery,pageNum:1})
                    getList();
                });
            },
            onCancel(){}
        });
    }
    const handleReturnReasonChange=(e)=>{
        const {value,name}=e.target;
        setReturnReason({...returnReason,[name]:value});
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
                <ProfileOutlined/>
                <span>Data List</span>
                <Button size="small" onClick={handleAdd} className="btn-add">Add</Button>
            </Card>
            <div className="table-container">
                <Table rowSelection={{...rowSelection}} rowKey="id" {...tableStatus} dataSource={list} style={{width:'100%'}} loading={listLoading}>
                    <Column title="Id" width="80px" align="center"render={(text,record,index)=>
                        <div>
                            {record.id}
                        </div>}/>
                    <Column title="ReasonType" align="center"render={(text,record,index)=>
                        <div>
                            {record.name}
                        </div>}/>
                    <Column title="Sort" width="100px" align="center"render={(text,record,index)=>
                        <div>
                            {record.sort}
                        </div>}/>
                    <Column title="Status"align="center"render={(text,record,index)=>
                        <div>
                            <Switch checked={record.status} onChange={(e)=>handleStatusChange(e,record)}/>
                        </div>}/>
                    <Column title="CreateTime" width="180px" align="center"render={(text,record,index)=>
                        <div>
                            {formatCreateTime(record.createTime)}
                        </div>}/>
                    <Column title="Operation" width="160px" align="center"render={(text,record,index)=>
                        <Space>
                            <Button size="small" onClick={()=>handleUpdate(index,record)}>Edit</Button>
                            <Button size="small" danger onClick={()=>handleDelete(index,record)}>Delete</Button>
                        </Space>}/>
                </Table>
            </div>
            <div className="batch-operate-container">
                <Select size="small" value={operateType} onChange={(e)=>setOperateType(e)} placeholder="Multiple Operation">
                    {operateOptions.map((item)=>{
                        return <Option key={item.value} value={item.value}>{item.label}</Option>
                    })}
                </Select>
                <Button style={{marginLeft:'20px'}} className="search-button" onClick={handleBatchOperate} type="primary" size="small">
                    Confirm
                </Button>
            </div>
            <Modal forceRender title="Add Return Reason" visible={dialogVisible} style={{minWidth:'350px'}} width="30%" onOk={handleConfirm} onCancel={()=>setDialogVisible(false)}>
                <Form form={reasonForm} labelCol={{span:8}}>
                    <Form.Item label="ReasonType: " name="name">
                        <Input value={returnReason.name} name="name" onChange={handleReturnReasonChange} className="input-width"/>
                    </Form.Item>
                    <Form.Item label="Sort: " name="sort">
                        <Input value={returnReason.sort} name="sort" onChange={handleReturnReasonChange} className="input-width"/>
                    </Form.Item>
                    <Form.Item label="Status: " name="status">
                        <Switch checked={returnReason.status} name="status" onChange={(e)=>setReturnReason({...returnReason,status:e?1:0})}/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default ReturnReason;