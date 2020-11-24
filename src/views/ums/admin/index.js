import { ProfileOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@material-ui/icons';
import { Button, Card, DatePicker, Form, Input, message, Radio, Select, Switch, Table } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import Modal from 'antd/lib/modal/Modal';
import Column from 'antd/lib/table/Column';
import React, {useState, useEffect} from 'react';
import {loginServices} from 'services/login';
import {roleServices} from 'services/role';
import {formatDate} from 'utils/date';
import {history} from '../../../redux/shared/history-redux';

function Admin(){
    const {TextArea} = Input;
    const {Option} = Select;
    const { Search } = Input;
    //Initial
    useEffect(() => {
        getList();
        getAllRoleList();
    }, [])

    //Data
    const defaultListQuery = {
        pageNum: 1,
        pageSize: 10,
        keyword: null
    };
      const defaultAdmin = {
        id: null,
        username: null,
        password: null,
        nickName: null,
        email: null,
        note: null,
        status: 1
    };
    const [listQuery, setListQuery] = useState(defaultListQuery);
    const [list, setList] = useState(null);
    const [total, setTotal] = useState(null);
    const [listLoading, setListLoading] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [admin, setAdmin] = useState(defaultAdmin);
    const [isEdit, setIsEdit] = useState(false);
    const [allocDialogVisible, setAllocDialogVisible] = useState(false);
    const [allocRoleIds, setAllocRoleIds] = useState([]);
    const [allRoleList, setAllRoleList] = useState([]);
    const [allocAdminId, setAllocAdminId] = useState(null);

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
        setAdmin(defaultAdmin);
    }
    const handleStatusChange=(value, row)=>{
        confirm({
            title:"Are you sure to modify status?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                loginServices.updateStatus(row.id, {status:value?1:0}).then(response => {
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
    const handleDelete=(index, row)=>{
        confirm({
            title:"Are you sure to delete this user?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                loginServices.deleteAdmin(row.id).then(response=>{
                    message.success("Delete Success!");
                    getList();
                });
            },
            onCancel(){}
        });
    }
    const handleUpdate=(index,row)=>{
        setDialogVisible(true);
        setIsEdit(true);
        setAdmin(row);
    }
    const handleDialogConfirm=()=>{
        confirm({
            title:"Are you sure to confirm?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                if(isEdit) {
                    loginServices.updateAdmin(admin.id,admin).then(response => {
                        message.success("Modify Success");
                        setDialogVisible(false);
                        getList();
                    })
                } else {
                    loginServices.createAdmin(admin).then(response => {
                        message.success("Add Success");
                        setDialogVisible(false);
                        getList();
                    })
                }
            },
            onCancel(){}
        });
    }
    const handleAllocDialogConfirm=()=>{
        confirm({
            title:"Are you sure to confirm?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                let params = new URLSearchParams();
                params.append("adminId", allocAdminId);
                params.append("roleIds", allocRoleIds);
                loginServices.allocRole(params).then(response => {
                    message.success("Alloc Success");
                    setAllocDialogVisible(false);
                })
            },
            onCancel(){}
        });
    }
    const handleSelectRole=(index,row)=>{
        setAllocAdminId(row.id);
        setAllocDialogVisible(true);
        getRoleListByAdmin(row.id);
    }
    const getList=()=>{
        setListLoading(true);
        loginServices.fetchList(listQuery).then(response=>{
            setListLoading(false);
            setList(response.data.list);
            setTotal(response.data.total);
        })
    }
    const getAllRoleList=()=>{
        roleServices.fetchList().then(response=>{
            setAllRoleList(response.data.list);
        })
    }
    const getRoleListByAdmin=(adminId)=>{
        loginServices.getRoleByAdmin(adminId).then(response => {
            let allocRoleList = response.data;
            let tempIds = [];
            if(allocRoleList!=null&&allocRoleList.length>0){
              for(let i=0;i<allocRoleList.length;i++){
                tempIds.push(allocRoleList[i].id);
              }
            }
            setAllocRoleIds(tempIds);
        });
    }
    const handleAdminChange=(e)=>{
        const {value,name} = e.target;
        setAdmin({...admin,[name]:value})
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
                        <Form.Item label="Search: ">
                            <Input value={listQuery.keyword} name="keyword" onChange={(e)=>setListQuery({...listQuery,keyword:e.target.value})} 
                            className="input-width" placeholder="Username/Name"/>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
            <Card className="operate-container">
                <ProfileOutlined/>
                <span>Data List</span>
                <Button size="small" className="btn-add" style={{marginLeft:'20px'}} onClick={handleAdd}>Add</Button>
            </Card>
            <div className="table-container">
                <Table rowKey="id" {...tableStatus} dataSource={list} style={{width:'100%'}} loading={listLoading}>
                    <Column width="100px" align="center" title="Id" render={(text,record,index)=>
                        <div>
                            {record.id}
                        </div>}/>
                    <Column align="center" title="Username" render={(text,record,index)=>
                        <div>
                            {record.username}
                        </div>}/>
                    <Column align="center" title="Nickname" render={(text,record,index)=>
                        <div>
                            {record.nickName}
                        </div>}/>
                    <Column align="center" title="Email" render={(text,record,index)=>
                        <div>
                            {record.email}
                        </div>}/>
                    <Column align="center" title="CreateTime" width="160px" render={(text,record,index)=>
                        <div>
                            {formatDateTime(record.createTime)}
                        </div>}/>
                    <Column align="center" title="LoginTime" width="160px" render={(text,record,index)=>
                        <div>
                            {formatDateTime(record.loginTime)}
                        </div>}/>
                    <Column align="center" title="Status" width="140px" render={(text,record,index)=>
                        <div>
                            <Switch onChange={(e)=>handleStatusChange(e,record)} checked={record.status}/>
                        </div>}/>
                    <Column width="180px" align="center" title="Operation" render={(text,record,index)=>
                        <div>
                            <Button size="small" type="text" onClick={()=>handleSelectRole(index,record)}>Role</Button><br/>
                            <Button size="small" type="text" onClick={()=>handleUpdate(index,record)}>Modify</Button><br/>
                            <Button size="small" type="text" onClick={()=>handleDelete(index,record)}>Delete</Button>
                        </div>}/>
                </Table>
            </div>
            <Modal title={isEdit?"Edit Admin":"Add Admin"} visible={dialogVisible} width="40%" onCancel={()=>setDialogVisible(false)} onOk={handleDialogConfirm}>
                <Form labelCol={{span:8}} size="small">
                    <Form.Item label="Username: ">
                        <Input value={admin.username} style={{width:'250px'}} name="username" onChange={handleAdminChange}/>
                    </Form.Item>
                    <Form.Item label="Nickname: ">
                        <Input value={admin.nickName} style={{width:'250px'}} name="nickName" onChange={handleAdminChange}/>
                    </Form.Item>
                    <Form.Item label="Email: ">
                        <Input value={admin.email} style={{width:'250px'}} name="email" onChange={handleAdminChange}/>
                    </Form.Item>
                    <Form.Item label="Password: ">
                        <Input value={admin.password} type="password" style={{width:'250px'}} name="password" onChange={handleAdminChange}/>
                    </Form.Item>
                    <Form.Item label="Note: ">
                        <TextArea value={admin.note} rows={5} style={{width:'250px'}} name="note" onChange={handleAdminChange}/>
                    </Form.Item>
                    <Form.Item label="Status: ">
                        <Radio.Group value={admin.status} name="status" onChange={handleAdminChange}>
                            <Radio value={1}>Yes</Radio>
                            <Radio value={0}>No</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="Assign Role" visible={allocDialogVisible} width="30%" onCancel={()=>setAllocDialogVisible(false)} onOk={handleAllocDialogConfirm}>
                <Select value={allocRoleIds} mode="multiple" onChange={(e)=>setAllocRoleIds(e)} placeholder="Please select" size="small"
                style={{width:'80%'}}>
                    {allRoleList.map((item)=>{
                        return <Option key={item.id} value={item.id}>{item.name}</Option>
                    })}
                </Select>
            </Modal>
        </div>
    )
}
export default Admin;