import { ProfileOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@material-ui/icons';
import { Button, Card, DatePicker, Form, Input, message, Radio, Switch, Table, TimePicker } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import Modal from 'antd/lib/modal/Modal';
import Column from 'antd/lib/table/Column';
import React, {useState, useEffect} from 'react';
import {flashSessionServices} from 'services/flashSession';
import {formatDate} from 'utils/date';
import {history} from '../../../redux/shared/history-redux';
import './sessionList.scss';
import moment from "moment";

function FlashSession(){
    //Initial
    useEffect(() => {
        getList();
    }, [])

    //Data
    const defaultFlashSession={
        name:null,
        startTime:null,
        endTime:null,
        status:0
    };
    const [list, setList] = useState(null);
    const [listLoading, setListLoading] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [flashSession, setFlashSession] = useState(defaultFlashSession);
    const [isEdit, setIsEdit] = useState(false);

    //Filter
    const formatTime=(time)=>{
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'hh:mm:ss')
    }

    //Methods
    const handleAdd=()=>{
        setDialogVisible(true);
        setIsEdit(false);
        setFlashSession(defaultFlashSession);
    }
    const handleStatusChange=(value,row)=>{
        confirm({
            title:"Are you sure to modify this status?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                value=value?1:0;
                flashSessionServices.updateStatus(row.id, {status: value}).then(response => {
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
    const handleUpdate=(index,row)=>{
        setDialogVisible(true);
        setIsEdit(true);
        let tempSession = row;
        row.startTime=new Date(row.startTime);
        row.startTime=new Date(row.endTime);
        setFlashSession(tempSession);
    }
    const handleDelete=(index,row)=>{
        confirm({
            title:"Are you sure to delete this time?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                flashSessionServices.deleteSession(row.id).then(response => {
                    message.success("Delete Success");
                    getList();
                });
            },
            onCancel(){}
        });
    }
    const handleDialogConfirm=()=>{
        confirm({
            title:"Are you sure to confirm?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                if(isEdit){
                    flashSessionServices.updateSession(flashSession.id,flashSession).then(response => {
                        message.success("Modify Success");
                        setDialogVisible(false);
                        getList();
                    })
                } else {
                    flashSessionServices.createSession(flashSession).then(response => {
                        message.success("Add Success");
                        setDialogVisible(false);
                        getList();
                    })
                }
            },
            onCancel(){}
        });
    }
    const getList=()=>{
        setListLoading(true);
        flashSessionServices.fetchList({}).then(response=>{
            setListLoading(false);
            setList(response.data);
        })
    }
    
    return(
        <div className="app-container">
            <Card className="operate-container">
                <ProfileOutlined/>
                <span>Data List</span>
                <Button size="small" className="btn-add" onClick={handleAdd}>Add</Button>
            </Card>
            <div className="table-container">
                <Table rowKey="id" dataSource={list} style={{width:'100%'}} bordered loading={listLoading}>
                    <Column width="100px" align="center" title="Id" render={(text,record,index)=>
                        <div>
                            {record.id}
                        </div>}/>
                    <Column align="center" title="FlashName" render={(text,record,index)=>
                        <div>
                            {record.name}
                        </div>}/>
                    <Column align="center" title="DailyStartTime" render={(text,record,index)=>
                        <div>
                            {formatTime(record.startTime)}
                        </div>}/>
                    <Column align="center" title="DailyEndTime" render={(text,record,index)=>
                        <div>
                            {formatTime(record.endTime)}
                        </div>}/>
                    <Column align="center" title="Status" render={(text,record,index)=>
                        <div>
                            <Switch onChange={(e)=>handleStatusChange(e,record)} checked={record.status}/>
                        </div>}/>
                    <Column width="180px" align="center" title="Operation" render={(text,record,index)=>
                        <div>
                            <Button size="small" type="text" onClick={()=>handleUpdate(index,record)}>Modify</Button>
                            <Button size="small" type="text" onClick={()=>handleDelete(index,record)}>Delete</Button>
                        </div>}/>
                </Table>
            </div>
            <Modal title="Add Time" visible={dialogVisible} width="40%" onCancel={()=>setDialogVisible(false)} onOk={handleDialogConfirm}>
                <Form labelCol={{span:5}} size="small">
                    <Form.Item label="Name: ">
                        <Input value={flashSession.name} name="title" style={{width:'250px'}} onChange={(e)=>setFlashSession({...flashSession,name:e.target.value})}/>
                    </Form.Item>
                    <Form.Item label="DailyStartTime: ">
                        <TimePicker value={flashSession.startTime?moment(flashSession.startTime,'HH:mm:ss'):null} name="startTime" placeholder="Please select time" format="HH:mm:ss"
                        onChange={(date,dateString)=>setFlashSession({...flashSession,startTime:date})}/>
                    </Form.Item>
                    <Form.Item label="DailyEndTime: ">
                        <TimePicker value={flashSession.endTime?moment(flashSession.endTime,'HH:mm:ss'):null} name="endTime" placeholder="Please select time" format="HH:mm:ss"
                        onChange={(date,dateString)=>setFlashSession({...flashSession,endTime:date})}/>
                    </Form.Item>
                    <Form.Item label="Status: ">
                        <Radio.Group value={flashSession.status} name="status" onChange={(e)=>setFlashSession({...flashSession,status:e.target.value})}>
                            <Radio value={1}>Enable</Radio>
                            <Radio value={0}>Disable</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default FlashSession;