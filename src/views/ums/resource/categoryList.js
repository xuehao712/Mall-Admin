import { ProfileOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Select, Space, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import React, {useState, useEffect} from 'react';
import {formatDate} from 'utils/date';
import {resourceCategoryServices} from 'services/resourceCategory';
import {history} from '../../../redux/shared/history-redux';
import Modal from 'antd/lib/modal/Modal';
import confirm from 'antd/lib/modal/confirm';

function ResourceCategory(){
    //Initial
    useEffect(() => {
        getList();
    }, [])

    //Data
    const defaultResourceCategory={
        name:null,
        sort:0
    };
    const [list, setList] = useState(null);
    const [listLoading, setListLoading] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [resourceCategory, setResourceCategory] = useState(defaultResourceCategory);

    //Filter
    const formatDateTime=(time)=>{
        if(time==null||time===''){
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }

    //Methods
    const handleAdd=()=>{
        setDialogVisible(true);
        setIsEdit(false);
        setResourceCategory(defaultResourceCategory);
    }
    const handleUpdate=(index,row)=>{
        setDialogVisible(true);
        setIsEdit(true);
        setResourceCategory(row);
    }
    const handleDelete=(index,row)=>{
        confirm({
            title:"Are you sure to delete this category?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                resourceCategoryServices.deleteResourceCategory(row.id).then(response=>{
                    getList();
                    message.success('Delete Success!',10);
                })
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
                if(isEdit) {
                    resourceCategoryServices.updateResourceCategory(resourceCategory.id,resourceCategory).then(response => {
                        message.success("Modify Success");
                        setDialogVisible(false);
                        getList();
                    })
                }else {
                    resourceCategoryServices.createResourceCategory(resourceCategory).then(response => {
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
        resourceCategoryServices.listAllCate({}).then(response=>{
            setListLoading(false);
            setList(response.data);
        })
    }
    const tableStatus = {
        bordered:true,
        size:'default'
    };
    return(
        <div className="app-container">
            <Card className="operate-container">
                <ProfileOutlined/>
                <span>Data List</span>
                <Button size="small" className="btn-add" onClick={handleAdd}>Add</Button>
            </Card>
            <div className="table-container">
                <Table rowKey="id" {...tableStatus} rowKey="id" dataSource={list} style={{width:'100%'}} loading={listLoading}>
                    <Column width="100px" align="center" title="Id" render={(text,record,index)=>
                        <div>
                            {record.id}
                        </div>}/>
                    <Column align="center" title="Name" render={(text,record,index)=>
                        <div>
                            {record.name}
                        </div>}/>
                    <Column align="center" title="CreateTime" render={(text,record,index)=>
                        <div>
                            {formatDateTime(record.createTime)}
                        </div>}/>
                    <Column align="center" title="Sort" render={(text,record,index)=>
                        <div>
                            {record.sort}
                        </div>}/>
                    <Column width="180px" align="center" title="Operation" render={(text,record,index)=>
                        <Space>
                            <Button size="small" type="text" onClick={()=>handleUpdate(index,record)}>Modify</Button>
                            <Button size="small" danger type="text" onClick={()=>handleDelete(index,record)}>Delete</Button>
                        </Space>}/>
                </Table>
            </div>
            <Modal title="Add Category" visible={dialogVisible} style={{minWidth:'500px'}} width="40%" onOk={handleDialogConfirm} onCancel={()=>setDialogVisible(false)}>
                <Form labelCol={{span:5}} size="small">
                    <Form.Item label="Name: ">
                        <Input value={resourceCategory.name} style={{width:'250px'}} name="name" onChange={(e)=>setResourceCategory({...resourceCategory,name:e.target.value})}/>
                    </Form.Item>
                    <Form.Item label="Sort: ">
                        <Input value={resourceCategory.sort} style={{width:'250px'}} name="sort" onChange={(e)=>setResourceCategory({...resourceCategory,sort:e.target.value})}/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default ResourceCategory;