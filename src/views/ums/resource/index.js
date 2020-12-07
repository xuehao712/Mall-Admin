import { ProfileOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Select, Space, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import React, {useState, useEffect} from 'react';
import {formatDate} from 'utils/date';
import {resourceCategoryServices} from 'services/resourceCategory';
import {resourceServices} from 'services/resource';
import {history} from '../../../redux/shared/history-redux';
import confirm from 'antd/lib/modal/confirm';
import Modal from 'antd/lib/modal/Modal';

function Resource(){
    const {Option} = Select;
    const { TextArea } = Input;
    //Initial
    useEffect(() => {
        getList();
        getCateList();
    }, [])

    //Data
    const defaultListQuery = {
        pageNum: 1,
        pageSize: 10,
        nameKeyword: null,
        urlKeyword: null,
        categoryId:null
    };
    const defaultResource = {
        id: null,
        name: null,
        url: null,
        categoryId: null,
        description:''
    };
    const [listQuery, setListQuery] = useState(defaultListQuery);
    const [list, setList] = useState(null);
    const [total, setTotal] = useState(null);
    const [listLoading, setListLoading] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [resource, setResource] = useState(defaultResource);
    const [isEdit, setIsEdit] = useState(false);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [defaultCategoryId, setDefaultCategoryId] = useState(null);

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
        let tempResource=defaultResource;
        tempResource.categoryId=defaultCategoryId;
        setResource(tempResource);
    }
    const handleDelete=(index,row)=>{
        confirm({
            title:"Are you sure to delete this resource?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                resourceServices.deleteResource(row.id).then(response=>{
                    getList();
                    message.success('Delete Success!',10);
                })
            },
            onCancel(){}
        });
    }
    const handleUpdate=(index,row)=>{
        setDialogVisible(true);
        setIsEdit(true);
        setResource(row);
    }
    const handleDialogConfirm=()=>{
        confirm({
            title:"Are you sure to confirm?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                if(isEdit) {
                    resourceServices.updateResource(resource.id,resource).then(response => {
                        message.success("Modify Success");
                        setDialogVisible(false);
                        getList();
                    })
                } else {
                    resourceServices.createResource(resource).then(response => {
                        message.success("Add Success");
                        setDialogVisible(false);
                        getList();
                    })
                }
            },
            onCancel(){}
        });
    }
    const handleShowCategory=()=>{
        history.push('/ums/resourceCategory');
    }
    const getList=()=>{
        setListLoading(true);
        resourceServices.fetchList(listQuery).then(response=>{
            setListLoading(false);
            setList(response.data.list);
            setTotal(response.data.total);
        })
    }
    const getCateList=()=>{
        resourceCategoryServices.listAllCate().then(response=>{
            let cateList = response.data;
            let tempCategory = categoryOptions;
            for(let i=0;i<cateList.length;i++){
              let cate = cateList[i];
              tempCategory.push({label:cate.name,value:cate.id});
            }
            setCategoryOptions(tempCategory);
            setDefaultCategoryId(cateList[0].id);
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
                <div>
                    <Form layout="inline" size="small" labelCol={{span:8}}>
                        <Form.Item style={{marginTop:'15px'}} label="Name: ">
                            <Input style={{width:'200px'}} value={listQuery.nameKeyword} name="nameKeyword" onChange={(e)=>setListQuery({...listQuery,nameKeyword:e.target.value})} 
                            className="input-width" placeholder="Resource Name"/>
                        </Form.Item>
                        <Form.Item style={{marginTop:'15px'}} label="Url: ">
                            <Input style={{width:'200px'}} value={listQuery.urlKeyword} name="urlKeyword" onChange={(e)=>setListQuery({...listQuery,urlKeyword:e.target.value})} 
                            className="input-width" placeholder="Resource Url"/>
                        </Form.Item>
                        <Form.Item style={{marginTop:'15px'}} label="Category: ">
                            <Select style={{width:'200px'}} value={listQuery.categoryId} placeholder="All" allowClear 
                            name="categoryId" className="input-width" onChange={(e)=>setListQuery({...listQuery,categoryId:e})}>
                                {categoryOptions.map((item)=>{
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
                <Button size="small" className="btn-add" style={{marginLeft:'20px'}} onClick={handleAdd}>Add</Button>
                <Button size="small" className="btn-add" onClick={handleShowCategory}>Resource</Button>
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
                    <Column align="center" title="Url" render={(text,record,index)=>
                        <div>
                            {record.url}
                        </div>}/>
                    <Column align="center" title="Description" render={(text,record,index)=>
                        <div>
                            {record.description}
                        </div>}/>
                    <Column width="160px" align="center" title="CreateTime" render={(text,record,index)=>
                        <div>
                            {formatDateTime(record.createTime)}
                        </div>}/>
                    <Column width="140px" align="center" title="Operation" render={(text,record,index)=>
                        <Space>
                            <Button size="small" type="text" onClick={()=>handleUpdate(index,record)}>Modify</Button>
                            <Button size="small" danger type="text" onClick={()=>handleDelete(index,record)}>Delete</Button>
                        </Space>}/>
                </Table>
            </div>
            <Modal title={isEdit?"Modify Resource":"Add Resource"} visible={dialogVisible} style={{minWidth:'450px'}} width="40%" onCancel={()=>setDialogVisible(false)} onOk={handleDialogConfirm}>
                <Form labelCol={{span:5}}>
                    <Form.Item label="Name: ">
                        <Input value={resource.name} style={{width:'250px'}} name="name" onChange={(e)=>setResource({...resource,name:e.target.value})}/>
                    </Form.Item>
                    <Form.Item label="Url: ">
                        <Input value={resource.url} style={{width:'250px'}} name="url" onChange={(e)=>setResource({...resource,url:e.target.value})}/>
                    </Form.Item>
                    <Form.Item label="Category: ">
                        <Select style={{width:'250px'}} value={resource.categoryId} placeholder="All" allowClear 
                        name="categoryId" className="input-width" onChange={(e)=>setResource({...resource,categoryId:e})}>
                            {categoryOptions.map((item)=>{
                                return <Option key={item.value} value={item.value}>{item.label}</Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Url: ">
                        <TextArea value={resource.description} row={5} style={{width:'250px'}} name="description" onChange={(e)=>setResource({...resource,description:e.target.value})}/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default Resource;