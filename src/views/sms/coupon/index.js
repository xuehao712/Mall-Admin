import { ProfileOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Select, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import React, {useState, useEffect} from 'react';
import {formatDate} from 'utils/date';
import {couponServices} from 'services/coupon';
import {history} from '../../../redux/shared/history-redux';
import './index.scss';
import confirm from 'antd/lib/modal/confirm';

function Coupon(){
    const {Option} = Select;
    //Initial
    useEffect(() => {
        getList();
    }, [])

    //Data
    const defaultListQuery = {
        pageNum: 1,
        pageSize: 10,
        name: null,
        type: null
    };
    const defaultTypeOptions=[
        {
          label: 'AllCoupon',
          value: 0
        },
        {
          label: 'MemberCoupon',
          value: 1
        },
        {
          label: 'ShoppingCoupon',
          value: 2
        },
        {
          label: 'RegisterCoupon',
          value: 3
        }
    ];
    const [listQuery, setListQuery] = useState(defaultListQuery);
    const [typeOptions, setTypeOptions] = useState(defaultTypeOptions);
    const [list, setList] = useState(null);
    const [total, setTotal] = useState(null);
    const [listLoading, setListLoading] = useState(false);
    const [multipleSelection, setMultipleSelection] = useState([]);

    //Filter
    const formatType=(type)=> {
        for(let i=0;i<defaultTypeOptions.length;i++){
            if(type===defaultTypeOptions[i].value){
              return defaultTypeOptions[i].label;
            }
        }
        return '';
    };
    const formatUseType=(useType)=>{
        if(useType===0){
          return 'All';
        }else if(useType===1){
          return 'Category';
        }else{
          return 'Product';
        }
    }
    const formatPlatform=(platform)=>{
        if(platform===1){
          return 'APP';
        }else if(platform===2){
          return 'PC';
        }else{
          return 'ALL';
        }
    }
    const localFormatDate=(time)=>{
        if(time==null||time===''){
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd')
    }
    const formatStatus=(endTime)=>{
        let now = new Date().getTime();
        let endDate = new Date(endTime);
        if(endDate>now){
          return 'Valid'
        }else{
          return 'Expired';
        }
    }
    //Methods
    const handleResetSearch=()=>{
        setListQuery(defaultListQuery);
    }
    const handleSearchList=()=>{
        setListQuery({...listQuery,pageNum:1});
        getList();
    }
    const handleSelectionChange=(val)=>{
        setMultipleSelection(val);
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
    const handleAdd=()=>{
        history.push("/sms/addCoupon");
    }
    const handleView=(index,row)=>{
        history.push("/sms/couponHistory",{id:row.id});
    }
    const handleUpdate=(index,row)=>{
        history.push("/sms/updateCoupon",{id:row.id});
    }
    const handleDelete=(index,row)=>{
        confirm({
            title:"Are you sure to delete?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                couponServices.deleteCoupon(row.id).then(response=>{
                    message.success("Delete Success!");
                    getList();
                })
            },
            onCancel(){}
        });
    }
    const getList=()=>{
        setListLoading(true);
        couponServices.fetchList(listQuery).then(response=>{
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
                <div >
                    <Form layout="inline" size="small" labelCol={{span:5}}>
                        <Form.Item style={{marginTop:'15px'}} label="Name: ">
                            <Input value={listQuery.name} name="name" onChange={(e)=>setListQuery({...listQuery,name:e.target.value})} className="HomeCoupon_input-width" placeholder="Coupon Name"/>
                        </Form.Item>
                        <Form.Item style={{marginTop:'15px'}} label="Status: ">
                            <Select value={listQuery.type} placeholder="All" onChange={(e)=>setListQuery({...listQuery,type:e})} allowClear name="type" className="HomeCoupon_input-width">
                                {typeOptions.map((item)=>{
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
                <Button size="small" className="btn-add" onClick={handleAdd}>Add</Button>
            </Card>
            <div className="table-container">
                <Table rowKey="id" rowSelection={{...rowSelection}} {...tableStatus} dataSource={list} style={{width:'100%'}} loading={listLoading}>
                    <Column width="100px" align="center" title="Id" render={(text,record,index)=>
                        <div>
                            {record.id}
                        </div>}/>
                    <Column align="center" title="Name" render={(text,record,index)=>
                        <div>
                            {record.name}
                        </div>}/>
                    <Column align="center" width="100px" title="Type" render={(text,record,index)=>
                        <div>
                            {formatType(record.type)}
                        </div>}/>
                    <Column width="100px" align="center" title="UseType" render={(text,record,index)=>
                        <div>
                            {formatUseType(record.useType)}
                        </div>}/>
                    <Column width="140px" align="center" title="MinPoint" render={(text,record,index)=>
                        <div>
                            Min:{record.minPoint}
                        </div>}/>
                    <Column width="100px" align="center" title="Amount" render={(text,record,index)=>
                        <div>
                            {record.amount}$
                        </div>}/>
                    <Column width="100px" align="center" title="Platform" render={(text,record,index)=>
                        <div>
                            {formatPlatform(record.platForm)}
                        </div>}/>
                    <Column width="180px" align="center" title="Valid" render={(text,record,index)=>
                        <div>
                            {localFormatDate(record.startTime)} To {localFormatDate(record.endTime)}
                        </div>}/>
                    <Column width="100px" align="center" title="Status" render={(text,record,index)=>
                        <div>
                            {formatStatus(record.endTime)}
                        </div>}/>
                    <Column width="180px" align="center" title="Operation" render={(text,record,index)=>
                        <div>
                            <Button size="small" type="text" onClick={()=>handleView(index,record)}>View</Button>
                            <Button size="small" type="text" onClick={()=>handleUpdate(index,record)}>Edit</Button>
                            <Button size="small" danger type="text" onClick={()=>handleDelete(index,record)}>Delete</Button>
                        </div>}/>
                </Table>
            </div>
        </div>
    )
}
export default Coupon;