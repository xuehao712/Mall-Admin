import { ProfileOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Radio, Row, Select, Switch, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import React, {useState, useEffect} from 'react';
import {formatDate} from 'utils/date';
import {roleServices} from 'services/role';
import {history} from '../../../redux/shared/history-redux';
import confirm from 'antd/lib/modal/confirm';
import Modal from 'antd/lib/modal/Modal';

function Role(){
    const { TextArea } = Input;
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
    const defaultRole = {
        id: null,
        name: null,
        description: null,
        adminCount: 0,
        status: 1
    };
    const [listQuery, setListQuery] = useState(defaultListQuery);
    const [list, setList] = useState(null);
    const [total, setTotal] = useState(null);
    const [listLoading, setListLoading] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [role, setRole] = useState(defaultRole);
    const [isEdit, setIsEdit] = useState(false);

    //Filter
    const formatDateTime=(time)=>{
        if(time==null||time===''){
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
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
        setRole(defaultRole);
    }
    const handleStatusChange=(value,row)=>{
        confirm({
            title:"Are you sure to modify this status?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                roleServices.updateStatus(row.id, {status: value?1:0}).then(response=>{
                    message.success('Modify Success!',10);
                    getList();
                })
            },
            onCancel(){
                message.info("Cancel Modify");
                getList();
            }
        });
    }
    const handleDelete=(index,row)=>{
        confirm({
            title:"Are you sure to delete this role?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                let ids = [];
                ids.push(row.id);
                let params=new URLSearchParams();
                params.append("ids",ids);
                roleServices.deleteRole(params).then(response => {
                    getList();
                    message.success('Delete Success!',10);
                });
            },
            onCancel(){}
        });
    }
    const handleUpdate=(index,row)=>{
        setDialogVisible(true);
        setIsEdit(true);
        setRole(row);
    }
    const handleDialogConfirm=()=>{
        confirm({
            title:"Are you sure to confirm?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                if(isEdit) {
                    roleServices.updateRole(role.id,role).then(response => {
                        message.success("Modify Success");
                        setDialogVisible(false);
                        getList();
                    })
                } else {
                    roleServices.createRole(role).then(response => {
                        message.success("Add Success");
                        setDialogVisible(false);
                        getList();
                    })
                }
            },
            onCancel(){}
        });
    }
    const handleSelectMenu=(index,row)=>{
        history.push('/ums/allocMenu',{roleId:row.id});
    }
    const handleSelectResource=(index,row)=>{
        history.push('/ums/allocResource',{roleId:row.id});
    }
    const getList=()=>{
        setListLoading(true);
        roleServices.fetchList(listQuery).then(response=>{
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
                    <Form layout="inline" size="small" labelCol={{span:6}}>
                        <Form.Item label="Search: ">
                            <Input value={listQuery.keyword} name="keyword" onChange={(e)=>setListQuery({...listQuery,keyword:e.target.value})} 
                            allowClear className="input-width" placeholder="Role Name"/>
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
                <Table rowKey="id" {...tableStatus} dataSource={list} style={{width:'100%'}} loading={listLoading}>
                    <Column width="100px" align="center" title="Id" render={(text,record,index)=>
                        <div>
                            {record.id}
                        </div>}/>
                    <Column align="center" title="Name" render={(text,record,index)=>
                        <div>
                            {record.name}
                        </div>}/>
                    <Column align="center" title="Description" render={(text,record,index)=>
                        <div>
                            {record.description}
                        </div>}/>
                    <Column align="center" width="100px" title="AdminCount" render={(text,record,index)=>
                        <div>
                            {record.adminCount}
                        </div>}/>
                    <Column width="160px" align="center" title="CreateTime" render={(text,record,index)=>
                        <div>
                            {formatDateTime(record.createTime)}
                        </div>}/>
                    <Column width="140px" align="center" title="Status" render={(text,record,index)=>
                        <div>
                            <Switch onChange={(e)=>handleStatusChange(e,record)} checked={record.status}/>
                        </div>}/>
                    <Column width="150px" align="center" title="Operation" render={(text,record,index)=>
                        <div style={{minWidth:'150px'}}>
                            <Row>
                                <Button size="small" type="text" onClick={()=>handleSelectMenu(index,record)}>Menu</Button>
                                <Button size="small" type="text" onClick={()=>handleSelectResource(index,record)}>Resource</Button>
                            </Row>
                            <Row>
                                <Button size="small" type="text" onClick={()=>handleUpdate(index,record)}>Modify</Button>
                                <Button size="small" danger type="text" onClick={()=>handleDelete(index,record)}>Delete</Button>
                            </Row>
                        </div>}/>
                </Table>
            </div>
            <Modal title={isEdit?"Modify Role":"Add Role"} visible={dialogVisible} style={{minWidth:'420px'}} width="40%" onCancel={()=>setDialogVisible(false)} onOk={handleDialogConfirm}>
                <Form labelCol={{span:6}} size="small">
                    <Form.Item label="Name: ">
                        <Input value={role.name} style={{width:'250px'}} name="name" onChange={(e)=>setRole({...role,name:e.target.value})}/>
                    </Form.Item>
                    <Form.Item label="Description: ">
                        <TextArea value={role.description} row={5} style={{width:'250px'}} name="description" onChange={(e)=>setRole({...role,description:e.target.value})}/>
                    </Form.Item>
                    <Form.Item label="Status: ">
                        <Radio.Group value={role.status} name="status" onChange={(e)=>setRole({...role,status:e.target.value})}>
                            <Radio value={1}>Yes</Radio>
                            <Radio value={0}>No</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default Role ;