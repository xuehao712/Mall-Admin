import { Button, Card, DatePicker, Form, Input, message, Select, Space, Table } from 'antd';
import React, {useState, useEffect} from 'react';
import {SearchOutlined, ProfileOutlined } from '@ant-design/icons';
import Column from 'antd/lib/table/Column';
import {formatDate} from 'utils/date';
import {orderServices} from 'services/order';
import { history } from '../../../redux/shared/history-redux';
import Modal from 'antd/lib/modal/Modal';
import TextArea from 'antd/lib/input/TextArea';
import LogisticsDialog from './components/logisticsDialog';
import './index.scss';
import moment from 'moment';
import confirm from 'antd/lib/modal/confirm';

const {Option} = Select;
function Order(){
    //Initial
    useEffect(() => {
        getList();
    }, [])

    //Data
    const defaultListQuery = {
        pageNum: 1,
        pageSize: 10,
        orderSn: null,
        receiverKeyword: null,
        status: null,
        orderType: null,
        sourceType: null,
        createTime: null
    };
     
    const [listQuery, setListQuery] = useState(defaultListQuery);
    const [listLoading, setListLoading] = useState(false);
    const [list, setList] = useState(null);
    const [total, setTotal] = useState(null);
    const [operateType, setOperateType] = useState(null);
    const [multipleSelection, setMultipleSelection] = useState([]);
    const [closeOrder, setCloseOrder] = useState({
        dialogVisible:false,
        content:null,
        orderIds:[]
    })
    const [statusOptions, setStatusOptions] = useState([
        {
            label: 'Unpaid',
            value: 0
        },
        {
            label: 'Unshipped',
            value: 1
        },
        {
            label: 'Shipped',
            value: 2
        },
        {
            label: 'Done',
            value: 3
        },
        {
            label: 'Closed',
            value: 4
        }
    ])
    const [orderTypeOptions, setOrderTypeOptions] = useState([
        {
            label: 'Normal',
            value: 0
        },
        {
            label: 'Flash',
            value: 1
        }
    ])
    const [sourceTypeOptions, setSourceTypeOptions] = useState([
        {
            label: 'PC',
            value: 0
        },
        {
            label: 'APP',
            value: 1
        }
    ])
    const [operateOptions, setOperateOptions] = useState([
        {
            label: 'MultiShip',
            value: 1
        },
        {
            label: 'Close',
            value: 2
        },
        {
            label: 'Delete',
            value: 3
        }
    ])
    const [logisticsDialogVisible, setLogisticsDialogVisible] = useState(false);
    //Filter
    const formatCreateTime=(time)=> {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    };
    const formatPayType=(value)=> {
        if (value === 1) {
          return 'Card';
        } else if (value === 2) {
          return 'Paypal';
        } else {
          return 'Unpaid';
        }
    }
    const formatSourceType=(value)=> {
        if (value === 1) {
          return 'APP';
        } else {
          return 'PC';
        }
    }
    const formatStatus=(value)=> {
        if (value === 1) {
          return 'Unshipped';
        } else if (value === 2) {
          return 'Shipped';
        } else if (value === 3) {
          return 'Done';
        } else if (value === 4) {
          return 'Closed';
        } else if (value === 5) {
          return 'Invalid';
        } else {
          return 'Unpaid';
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
    const handleViewOrder=(index,row)=>{
        history.push('/oms/orderDetail',{id:row.id});
    }
    const handleCloseOrder=(index,row)=>{
        setCloseOrder({...closeOrder,dialogVisible:true,orderIds:[row.id]});
    }
    const handleDeliveryOrder=(index,row)=>{
        let listItem = convertOrder(row);
        history.push('/oms/deliverOrderList',{list:[listItem]});
    }
    const handleViewLogistics=(index,row)=>{
        setLogisticsDialogVisible(true);
    }
    const handleDeleteOrder=(index,row)=>{
        let ids=[];
        ids.push(row.id);
        deleteOrder(ids);
    }
    const handleBatchOperate=()=>{
        if(multipleSelection==null || multipleSelection.length<1) {
            message.warning("Please select the operation",5);
            return;
        }
        if(operateType === 1){
            let list=[];
            for(let i=0;i<multipleSelection.length;i++){
                if(multipleSelection[i].status===1){
                    list.push(convertOrder(multipleSelection[i]));
                }
            }
            if(list.length===0){
                message.warning("No orders are available to ship",5);
                return;
            }
            history.push('/oms/deliverOrderList',{list:list})
        }else if(operateType===2){
            //Close
            let tempCloseOrder = closeOrder;
            tempCloseOrder.orderIds=[];
            for(let i=0;i< multipleSelection.length;i++){
                tempCloseOrder.orderIds.push(multipleSelection[i].id);
            }
            tempCloseOrder.dialogVisible=true;
            setCloseOrder(tempCloseOrder);
        }else if(operateType===3){
          //Delete
          let ids=[];
          for(let i=0;i<multipleSelection.length;i++){
            ids.push(multipleSelection[i].id);
          }
           deleteOrder(ids);
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
    const handleCloseOrderConfirm=()=>{
        if (closeOrder.content == null || closeOrder.content === '') {
            message.warning("Note cannot be empty",5);
            return;
        }
        let params = new URLSearchParams();
        params.append('ids', closeOrder.orderIds);
        params.append('note', closeOrder.content);
        orderServices.closeOrder(params).then(response=>{
            setCloseOrder({...closeOrder,orderIds:[],dialogVisible:false});
            getList();
            message.success("Modify Success",5);
        });
    }
    const getList=()=>{
        setListLoading(true);
        orderServices.fetchList(listQuery).then(response=>{
            setListLoading(false);
            setList(response.data.list);
            setTotal(response.data.total);
        })
    }
    const deleteOrder=(ids)=>{
        confirm({
            title:"Are you sure to delete?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                let params = new URLSearchParams();
                params.append("ids",ids);
                orderServices.deleteOrder(params).then(response=>{
                    message.success("Delete Success!",5);
                    getList();
                });
            },
            onCancel(){}
        });
    }
    const convertOrder=(order)=>{
        let address=order.receiverDetailAddress+", "+order.receiverCity+", "+order.receiverState;
        let listItem={
          orderId:order.id,
          orderSn:order.orderSn,
          receiverName:order.receiverName,
          receiverPhone:order.receiverPhone,
          receiverZipCode:order.receiverZipCode,
          address:address,
          deliveryCompany:null,
          deliverySn:null
        };
        return listItem;
    }
    const handleDateListQueryChange=(date,dateString)=>{
        setListQuery({...listQuery,createTime:dateString});
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
                <div style={{marginTop:'5px'}}>
                    <Form layout="inline" size="small" labelCol={{span:10}}>
                        <Form.Item style={{marginTop:'10px'}} label="Search: ">
                            <Input value={listQuery.orderSn} name="orderSn" onChange={handleListQueryChange} className="Order_input-width" placeholder="Order Sn"/>
                        </Form.Item>
                        <Form.Item style={{marginTop:'10px'}} label="Receiver: ">
                            <Input value={listQuery.receiverKeyword} name="receiverKeyword" onChange={handleListQueryChange} className="Order_input-width" placeholder="Receiver Name/Phone"/>
                        </Form.Item>
                        <Form.Item style={{marginTop:'10px'}} label="ApplyDate: ">
                            <DatePicker className="Order_input-width" value={listQuery.createTime?moment(listQuery.createTime):null} format="YYYY-MM-DD"
                            placeholder="Please select a date" name="createTime" onChange={handleDateListQueryChange}/>
                        </Form.Item>
                        <Form.Item style={{marginTop:'10px'}} label="Status: ">
                            <Select className="Order_input-width" value={listQuery.status} onChange={(e)=>handleListQueryChange(e,"status")} placeholder="All" allowClear name="status" >
                                {statusOptions.map((item)=>{
                                    return <Option key={item.value} value={item.value}>{item.label}</Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item style={{marginTop:'10px'}} label="Type: ">
                            <Select className="Order_input-width" value={listQuery.orderType} onChange={(e)=>handleListQueryChange(e,"orderType")} placeholder="All" allowClear name="orderType">
                                {orderTypeOptions.map((item)=>{
                                    return <Option key={item.value} value={item.value}>{item.label}</Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item style={{marginTop:'10px'}} label="Source: ">
                            <Select className="Order_input-width" value={listQuery.sourceType} onChange={(e)=>handleListQueryChange(e,"sourceType")} placeholder="All" allowClear name="sourceType">
                                {sourceTypeOptions.map((item)=>{
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
            </Card>
            <div className="table-container">
                <Table rowKey="id" rowSelection={{...rowSelection}} {...tableStatus} dataSource={list} style={{width:'100%'}} loading={listLoading}>
                    <Column width="80px" align="center" title="Id" render={(text,record,index)=>
                        <div>
                            {record.id}
                        </div>}/>
                    <Column width="180px" align="center" title="Sn" render={(text,record,index)=>
                        <div>
                            {record.orderSn}
                        </div>}/>
                    <Column width="180px" align="center" title="ApplyDate" render={(text,record,index)=>
                        <div>
                            {formatCreateTime(record.createTime)}
                        </div>}/>
                    <Column align="center" title="Username" render={(text,record,index)=>
                        <div>
                            {record.memberUsername}
                        </div>}/>
                    <Column width="120px" align="center" title="Amount" render={(text,record,index)=>
                        <div>
                            ${record.totalAmount}
                        </div>}/>
                    <Column width="120px" align="center" title="Payment" render={(text,record,index)=>
                        <div>
                            {formatPayType(record.payType)}
                        </div>}/>
                    <Column width="120px" align="center" title="Source" render={(text,record,index)=>
                        <div>
                            {formatSourceType(record.sourceType)}
                        </div>}/>
                    <Column width="120px" align="center" title="Status" render={(text,record,index)=>
                        <div>
                            {formatStatus(record.status)}
                        </div>}/>
                    <Column width="200px" align="center" title="Operation" render={(text,record,index)=>
                        <Space>
                            <Button size="small" onClick={()=>handleViewOrder(index,record)}>Detail</Button>
                            {record.status===0 &&
                            <Button size="small" onClick={()=>handleCloseOrder(index,record)}>Close</Button>}
                            {record.status===1 &&
                            <Button size="small" onClick={()=>handleDeliveryOrder(index,record)}>Delivery</Button>}
                            {(record.status===2||record.status===3) &&
                            <Button size="small" onClick={()=>handleViewLogistics(index,record)}>Track</Button>}
                            {record.status===4 &&
                            <Button size="small" danger onClick={()=>handleDeleteOrder(index,record)}>Delete</Button>}
                        </Space>}/>
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
            <Modal title="Close Order" visible={closeOrder.dialogVisible} width="30%" onOk={handleCloseOrderConfirm} onCancel={()=>setCloseOrder({...closeOrder,dialogVisible:false})}>
                <span style={{verticalAlign:'top'}}>Operation Note: </span>
                <TextArea style={{width:'80%'}} rows={5} placeholder="Please enter content" value={closeOrder.content}
                name="content" onChange={(e)=>setCloseOrder({...closeOrder,content:e.target.value})}/>
            </Modal>
            <LogisticsDialog onChange={setLogisticsDialogVisible} value={logisticsDialogVisible}></LogisticsDialog>
        </div>
    )
}
export default Order;