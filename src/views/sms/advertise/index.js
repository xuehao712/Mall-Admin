import React, {useState, useEffect} from 'react';
import { Button, Card, DatePicker, Form, Image, Input, message, Select, Switch, Table } from 'antd';
import { ProfileOutlined, SearchOutlined } from '@ant-design/icons';
import {formatDate} from 'utils/date';
import {homeAdvertiseServices} from 'services/homeAdvertise';
import { history } from '../../../redux/shared/history-redux';
import './index.scss';
import moment from 'moment';
import Column from 'antd/lib/table/Column';
import confirm from 'antd/lib/modal/confirm';

function HomeAdvertise(){
    //Initial
    useEffect(() => {
        getList();
    }, [])

    //Data
    const defaultListQuery = {
        pageNum: 1,
        pageSize: 5,
        name: null,
        type: null,
        endTime:null
    };
    const defaultTypeOptions = [
        {
          label: 'PC',
          value: 0
        },
        {
          label: 'APP',
          value: 1
        }
    ];
    const [listQuery, setListQuery] = useState(defaultListQuery);
    const [typeOptions, setTypeOptions] = useState(defaultTypeOptions);
    const [list, setList] = useState(null);
    const [total, setTotal] = useState(null);
    const [listLoading, setListLoading] = useState(false);
    const [multipleSelection, setMultipleSelection] = useState([]);
    const [operates, setOperates] = useState([
        {
          label: "Delete",
          value: 0
        }
    ]);
    const [operateType, setOperateType] = useState(null);
    
    //Filter
    const formatTime=(time)=> {
        if(time==null||time===''){
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    };
    const formatType=(type)=>{
        if(type===1){
            return 'APP';
        }else{
            return 'PC';
        }
    };

    //Methods
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
    const handleUpdateStatus=(value,row)=>{
        value=value?1:0;
        confirm({
            title:"Are you sure to modify status?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                homeAdvertiseServices.updateStatus(row.id,{status:value}).then(response=>{
                    getList();
                    message.success("Modify Success",5);
                });
            },
            onCancel(){
                message.success("Cancel Operation",5);
                getList();
            }
        });
    }
    const handleDelete=(index,row)=>{
        deleteHomeAdvertise(row.id);
    }
    const handleBatchOperate=()=>{
        if( multipleSelection.length<1) {
            message.warning("Please select the operation",5);
            return;
        }
        let ids = [];
        for (let i = 0; i < multipleSelection.length; i++) {
            ids.push(multipleSelection[i].id);
        }
        if(operateType === 0){
            //Delete
            deleteHomeAdvertise(ids);
        } else {
            message.warning("Please select multiple operation type!",5);
        }
    }
    const handleAdd=()=>{
        history.push('/sms/addAdvertise');
    }
    const handleUpdate=(index,row)=>{
        history.push('/sms/updateAdvertise',{id: row.id});
    }
    const getList=()=>{
        setListLoading(true);
        homeAdvertiseServices.fetchList(listQuery).then(response=>{
            setListLoading(false);
            setList(response.data.list);
            setTotal(response.data.total);
        })
    }
    const deleteHomeAdvertise=(ids)=>{
        confirm({
            title:"Are you sure to delete this advertise?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                let params=new URLSearchParams();
                params.append("ids",ids);
                homeAdvertiseServices.deleteHomeAdvertise(params).then(response=>{
                    getList();
                    message.success("Delete Success",5);
                });
            },
            onCancel(){}
        });
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
                <div>
                    <Form layout="inline" size="small" labelCol={{span:6}}>
                        <Form.Item style={{marginTop:'15px'}} label="Name: ">
                            <Input value={listQuery.name} name="name" onChange={(e)=>setListQuery({...listQuery,name:e.target.value})} className="Advertise_input-width" placeholder="Advertise Name"/>
                        </Form.Item>
                        <Form.Item style={{marginTop:'15px'}} label="Type: ">
                            <Select value={listQuery.type} onChange={(e)=>setListQuery({...listQuery,type:e})} placeholder="All" allowClear name="type" className="Advertise_input-width">
                                {typeOptions.map((item)=>{
                                    return <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item style={{marginTop:'15px'}} label="EndDate: ">
                            <DatePicker className="Advertise_input-width" value={listQuery.endTime?moment(listQuery.endTime):null} format="YYYY-MM-DD"
                            placeholder="Please select a date" name="endTime" onChange={(date,dateString)=>setListQuery({...listQuery,endTime:dateString})}/>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
            <Card className="operate-container">
                <ProfileOutlined/>
                <span>Data List</span>
                <Button size="small" className="btn-add" onClick={handleAdd}>Add Ad</Button>
            </Card>
            <div className="table-container">
                <Table rowKey="id" rowSelection={{...rowSelection}} {...tableStatus} dataSource={list} style={{width:'100%'}} loading={listLoading}>
                    <Column width="120px" align="center" title="Id" render={(text,record,index)=>
                        <div>
                            {record.id}
                        </div>}/>
                    <Column align="center" title="Name" render={(text,record,index)=>
                        <div>
                            {record.name}
                        </div>}/>
                    <Column align="center" width="120px" title="Type" render={(text,record,index)=>
                        <div>
                            {formatType(record.type)}
                        </div>}/>
                    <Column width="120px" align="center" title="Picture" render={(text,record,index)=>
                        <div style={{minWidth:'120px'}}>
                            <Image style={{height:'80px'}} src={record.pic}/>
                        </div>}/>
                    <Column width="220px" align="center" title="Time" render={(text,record,index)=>
                        <div style={{minWidth:'220px'}}>
                            <p>StartTime: {formatTime(record.startTime)}</p>
                            <p>EndTime: {formatTime(record.endTime)}</p>
                        </div>}/>
                    <Column width="120px" align="center" title="Un/Publish" render={(text,record,index)=>
                        <div>
                            <Switch onChange={(e)=>handleUpdateStatus(e,record)} checked={record.status}/>
                        </div>}/>
                    <Column width="120px" align="center" title="ClickCount" render={(text,record,index)=>
                        <div>
                            {record.clickCount}
                        </div>}/>
                    <Column width="120px" align="center" title="OrderCount" render={(text,record,index)=>
                        <div>
                            {record.orderCount}
                        </div>}/>
                    <Column width="120px" align="center" title="Operation" render={(text,record,index)=>
                        <div>
                            <Button size="small" type="text" onClick={()=>handleUpdate(index,record)}>Edit</Button>
                            <Button size="small" danger type="text" onClick={()=>handleDelete(index,record)}>Delete</Button>
                        </div>}/>
                </Table>
            </div>
            <div className="batch-operate-container">
                <Select size="small" value={operateType} placeholder="Multiple" onChange={(e)=>setOperateType(e)}>
                    {operates.map((item)=>{
                        return <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                    })}
                </Select>
                <Button style={{marginLeft:'20px'}} className="search-button" onClick={handleBatchOperate} type="primary"size="small">
                    Confirm
                </Button>
            </div>
        </div>
    )
}
export default HomeAdvertise;