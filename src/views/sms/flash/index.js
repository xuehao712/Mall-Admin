import { ProfileOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Form, Input, message, Radio, Switch, Table } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, {useState, useEffect} from 'react';
import {flashServices} from 'services/flash';
import {formatDate} from 'utils/date';
import {history} from '../../../redux/shared/history-redux';
import moment from 'moment';
import Column from 'antd/lib/table/Column';
import confirm from 'antd/lib/modal/confirm';

function Flash(){
    //Initial
    useEffect(() => {
        getList();
    }, [])

    //Data
    const defaultListQuery = {
        pageNum: 1,
        pageSize: 5,
        keyword: null
    };
      const defaultFlashPromotion = {
        id: null,
        title: null,
        startDate: null,
        endDate: null,
        status: 0
    };
    const [listQuery, setListQuery] = useState(defaultListQuery);
    const [list, setList] = useState(null);
    const [total, setTotal] = useState(null);
    const [listLoading, setListLoading] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [flashPromotion, setFlashPromotion] = useState(defaultFlashPromotion);
    const [isEdit, setIsEdit] = useState(false);

    //Filter
    const formatActiveStatus=(row)=> {
        let nowTime = new Date().getTime();
        if (nowTime >= row.startDate && nowTime <= row.endDate) {
          return 'Event starting';
        } else if (nowTime > row.endDate) {
          return 'Event ended';
        } else {
          return 'Event preparing';
        }
    }
    const localFormatDate=(time)=>{
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd')
    }

    //Methods
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
    const handleAdd=()=>{
        setDialogVisible(true);
        setIsEdit(false);
        setFlashPromotion(defaultFlashPromotion);
    }
    const handleShowSessionList=()=>{
        history.push("/sms/flashSession");
    }
    const handleStatusChange=(value,row)=>{
        confirm({
            title:"Are you sure to modify this status?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                value=value?1:0;
                flashServices.updateStatus(row.id, {status: value}).then(response => {
                    message.success("Modify Success");
                    getList();
                });
            },
            onCancel(){
                message.info("Cancel Modify");
                getList();
            }
        });
    }
    const handleDelete=(index,row)=>{
        confirm({
            title:"Are you sure to delete this event?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                flashServices.deleteFlash(row.id).then(response => {
                    message.success("Delete Success");
                    getList();
                });
            },
            onCancel(){}
        });
    }
    const handleUpdate=(index,row)=>{
        setDialogVisible(true);
        setIsEdit(true);
        setFlashPromotion(row);
    }
    const handleDialogConfirm=()=>{
        confirm({
            title:"Are you sure to confirm?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                if(isEdit){
                    flashServices.updateFlash(flashPromotion.id,flashPromotion).then(response => {
                        message.success("Modify Success");
                        setDialogVisible(false);
                        getList();
                    })
                } else {
                    flashServices.createFlash(flashPromotion).then(response => {
                        message.success("Add Success");
                        setDialogVisible(false);
                        getList();
                    })
                }
            },
            onCancel(){}
        });
    }
    const handleSelectSession=(index,row)=>{
        history.push('/sms/selectSession',{flashPromotionId:row.id});
    }
    const getList=()=>{
        setListLoading(true);
        flashServices.fetchList(listQuery).then(response=>{
            setListLoading(false);
            setList(response.data.list);
            setTotal(response.data.total);
        })
    }
    const tableStatus = {
        pagination:{ 
        position: 'bottomRight',pageSize:listQuery.pageSize,
        showQuickJumper:true,showSizeChanger:true,showTotal:(total)=>`Total ${total} items`,
        pageSizeOptions:[5,10,15],total:total, current:listQuery.pageNum,
        onShowSizeChange:(current, size)=>handleSizeChange(size), onChange:(page, pageSize)=>handleCurrentChange(page)},
        bordered:true,
        size:'default'
    };
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
                        <Form.Item label="EventName: ">
                            <Input value={listQuery.keyword} name="keyword" onChange={e=>setListQuery({...listQuery,keyword:e.target.value})} className="input-width" placeholder="Event Name"/>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
            <Card className="operate-container">
                <ProfileOutlined/>
                <span>Data List</span>
                <Button size="small" className="btn-add" onClick={handleAdd} style={{marginLeft:'20px'}}>Add</Button>
                <Button size="small" className="btn-add" onClick={handleShowSessionList}>FlashList</Button>
            </Card>
            <div className="table-container">
                <Table rowSelection rowKey="id" {...tableStatus} dataSource={list} style={{width:'100%'}} loading={listLoading}>
                    <Column width="100px" align="center" title="Id" render={(text,record,index)=>
                        <div>
                            {record.id}
                        </div>}/>
                    <Column align="center" title="Title" render={(text,record,index)=>
                        <div>
                            {record.title}
                        </div>}/>
                    <Column align="center" width="140px" title="Status" render={(text,record,index)=>
                        <div>
                            {formatActiveStatus(record)}
                        </div>}/>
                    <Column width="140px" align="center" title="StartTime" render={(text,record,index)=>
                        <div>
                            {localFormatDate(record.startDate)}
                        </div>}/>
                    <Column width="140px" align="center" title="EndDate" render={(text,record,index)=>
                        <div>
                            {localFormatDate(record.endDate)}
                        </div>}/>
                    <Column width="140px" align="center" title="Publish/Unpublish" render={(text,record,index)=>
                        <div>
                            <Switch onChange={(e)=>handleStatusChange(e,record)} checked={record.status}/>
                        </div>}/>
                    <Column width="180px" align="center" title="Operation" render={(text,record,index)=>
                        <div>
                            <Button size="small" type="text" onClick={()=>handleSelectSession(index,record)}>SetProduct</Button><br/>
                            <Button size="small" type="text" onClick={()=>handleUpdate(index,record)}>Modify</Button><br/>
                            <Button size="small" danger type="text" onClick={()=>handleDelete(index,record)}>Delete</Button>
                        </div>}/>
                </Table>
            </div>
            <Modal title="Add Event" visible={dialogVisible} style={{minWidth:'500px'}} width="40%" onCancel={()=>setDialogVisible(false)} onOk={handleDialogConfirm}>
                <Form labelCol={{span:5}} size="small">
                    <Form.Item label="Title: ">
                        <Input value={flashPromotion.title} name="title" style={{width:'250px'}} onChange={(e)=>setFlashPromotion({...flashPromotion,title:e.target.value})}/>
                    </Form.Item>
                    <Form.Item label="StartTime: ">
                        <DatePicker value={flashPromotion.startDate?moment(flashPromotion.startDate):null} name="startDate" placeholder="Please select time" format="YYYY-MM-DD"
                        onChange={(date,dateString)=>setFlashPromotion({...flashPromotion,startDate:dateString})}/>
                    </Form.Item>
                    <Form.Item label="EndTime: ">
                        <DatePicker value={flashPromotion.endDate?moment(flashPromotion.endDate):null} name="endDate" placeholder="Please select time" format="YYYY-MM-DD"
                        onChange={(date,dateString)=>setFlashPromotion({...flashPromotion,endDate:dateString})}/>
                    </Form.Item>
                    <Form.Item label="Status: ">
                        <Radio.Group value={flashPromotion.status} name="status" onChange={(e)=>setFlashPromotion({...flashPromotion,status:e.target.value})}>
                            <Radio value={1}>Publish</Radio>
                            <Radio value={0}>Unpublish</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default Flash;