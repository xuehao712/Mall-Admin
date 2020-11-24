import { Button, Card, DatePicker, Form, Input, message, Select, Table } from 'antd';
import React, {useState, useEffect} from 'react';
import {SearchOutlined, ProfileOutlined } from '@ant-design/icons';
import Column from 'antd/lib/table/Column';
import {formatDate} from 'utils/date';
import {returnApplyServices} from 'services/returnApply';
import { history } from '../../../redux/shared/history-redux';
import './index.scss';
import moment from 'moment';

const {Option} = Select;
function ReturnApply(){

    //Initial
    useEffect(() => {
        getList();
    }, [])

    //Data
    const defaultListQuery = {
        pageNum: 1,
        pageSize: 10,
        id: null,
        receiverKeyword: null,
        status: null,
        createTime: null,
        handleMan: null,
        handleTime: null
    };
      const defaultStatusOptions=[
        {
          label: 'Unsolved',
          value: 0
        },
        {
          label: 'Returning',
          value: 1
        },
        {
          label: 'Solved',
          value: 2
        },
        {
          label: 'Rejected',
          value: 3
        }
    ];
    const [listQuery, setListQuery] = useState(defaultListQuery);
    const [statusOptions, setStatusOptions] = useState(defaultStatusOptions);
    const [list, setList] = useState(null);
    const [total, setTotal] = useState(null);
    const [listLoading, setListLoading] = useState(false);
    const [multipleSelection, setMultipleSelection] = useState([]);
    const [operateType, setOperateType] = useState(1);
    const [operateOptions, setOperateOptions] = useState([
        {
          label: "Multiple Delete",
          value: 1
        }
    ]);
    
    //Filter
    const formatTime=(time)=> {
        if(time==null||time===''){
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    };
    const formatStatus=(status)=>{
        for(let i=0;i<defaultStatusOptions.length;i++){
          if(status===defaultStatusOptions[i].value){
            return defaultStatusOptions[i].label;
          }
        }
    };
    const formatReturnAmount=(row)=>{
        return row.productRealPrice*row.productCount;
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
    const handleViewDetail=(index,row)=>{
        history.push('/oms/returnApplyDetail',{id:row.id});
    }
    const handleBatchOperate=()=>{
        if(multipleSelection==null || multipleSelection.length<1) {
            message.warning("Please select the operation",10);
            return;
        }
        if(operateType === 1){
            //Multiple delete
            confirm({
                title:"Are you sure to delete?",
                okText:'Yes',
                okType:'primary',
                onOk(){
                    let params = new URLSearchParams();
                    let ids=[];
                    for(let i=0;i<multipleSelection.length;i++){
                    ids.push(multipleSelection[i].id);
                    }
                    params.append("ids",ids);
                    returnApplyServices.deleteApply(params).then(response=>{
                        getList();
                        message.success("Delete Success!",10);
                    });
                },
                onCancel(){}
            });
        }
    }
    const handleListQueryChange=(e,param)=>{
        if(param){
            setListQuery({...listQuery,[param]:e});
        }else {
            const {value,name} = e.target;
            setListQuery({...listQuery,[name]:value});
        }
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
    const getList=()=>{
        setListLoading(true);
        returnApplyServices.fetchList(listQuery).then(response=>{
            setListLoading(false);
            setList(response.data.list);
            setTotal(response.data.total);
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
                    <Button style={{float:'right'}} type="primary" onClick={handleSearchList} size='small'>
                        Search
                    </Button>
                    <Button style={{float:'right',marginRight:'15px'}} onClick={handleResetSearch} size="small">
                        Reset
                    </Button>
                </div>
                <div style={{marginTop:'15px'}}>
                    <Form layout="inline" size="small" labelCol={{span:8}}>
                        <Form.Item label="Search: ">
                            <Input value={listQuery.id} name="id" onChange={handleListQueryChange} className="input-width" placeholder="Service Id"/>
                        </Form.Item>
                        <Form.Item label="Status: ">
                            <Select style={{width:'203px'}} value={listQuery.status} onChange={(e)=>handleListQueryChange(e,"status")} placeholder="All" allowClear name="status" className="input-width">
                                {statusOptions.map((item)=>{
                                    return <Option key={item.value} value={item.value}>{item.label}</Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item label="ApplyDate: ">
                            <DatePicker className="input-width" value={listQuery.createTime?moment(listQuery.createTime):null} format="YYYY-MM-DD"
                            placeholder="Please select a date" name="createTime" onChange={(date,dateString)=>setListQuery({...listQuery,createTime:dateString})}/>
                        </Form.Item>
                        <Form.Item label="Staff: ">
                            <Input value={listQuery.handleMan} onChange={handleListQueryChange} name="handleMan" className="input-width"/>
                        </Form.Item>
                        <Form.Item label="ResolveDate: ">
                            <DatePicker className="input-width" value={listQuery.handleTime?moment(listQuery.handleTime):null} format="YYYY-MM-DD"
                            placeholder="Please select a date" name="handleTime" onChange={(date,dateString)=>setListQuery({...listQuery,handleTime:dateString})}/>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
            <Card className="operate-container">
                <ProfileOutlined/>
                <span>Data List</span>
            </Card>
            <div className="table-container">
                <Table rowKey="id" rowSelection={{...rowSelection}} {...tableStatus} dataSource={list} style={{width:'100%'}} loading={listLoading}>
                    <Column width="180px" align="center" title="Id" render={(text,record,index)=>
                        <div>
                            {record.id}
                        </div>}/>
                    <Column width="180px" align="center" title="ApplyDate" render={(text,record,index)=>
                        <div>
                            {formatTime(record.createTime)}
                        </div>}/>
                    <Column align="center" title="Username" render={(text,record,index)=>
                        <div>
                            {record.memberUsername}
                        </div>}/>
                    <Column width="180px" align="center" title="Amount" render={(text,record,index)=>
                        <div>
                            ${formatReturnAmount(record)}
                        </div>}/>
                    <Column width="180px" align="center" title="Status" render={(text,record,index)=>
                        <div>
                            {formatStatus(record.status)}
                        </div>}/>
                    <Column width="180px" align="center" title="ResolvedDate" render={(text,record,index)=>
                        <div>
                            {formatTime(record.handleTime)}
                        </div>}/>
                    <Column width="180px" align="center" title="Operation" render={(text,record,index)=>
                        <div>
                            <Button size="small" onClick={()=>handleViewDetail(index,record)}>Detail</Button>
                        </div>}/>
                </Table>
            </div>
            <div className="batch-operate-container">
                <Select size="small" value={operateType} placeholder="Multiple" onChange={(e)=>setOperateType(e)}>
                    {operateOptions.map((item)=>{
                        return <Option key={item.value} value={item.value}>{item.label}</Option>
                    })}
                </Select>
                <Button style={{marginLeft:'20px'}} className="search-button" onClick={handleBatchOperate} type="primary"size="small">
                    Confirm
                </Button>
            </div>
        </div>
    )
}
export default ReturnApply;