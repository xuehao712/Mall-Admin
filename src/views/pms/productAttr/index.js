import { Button, Card, Form, Input, message, Modal, Space, Table } from 'antd';
import { ProfileOutlined, SearchOutlined } from '@ant-design/icons';
import React, {useState, useEffect, useRef} from 'react';
import Column from 'antd/lib/table/Column';
import {productAttrCateServices} from 'services/productAttrCate';
import {history} from '../../../redux/shared/history-redux';
import confirm from 'antd/lib/modal/confirm';

function ProductAttr(){
    const [form] = Form.useForm();

    //Data
    const defaultProductAttr = {name:'',id:null}
    const [list, setList] = useState(null);
    const [total, setTotal] = useState(null);
    const [listLoading, setListLoading] = useState(true);
    const [listQuery, setListQuery] = useState({pageNum: 1, pageSize: 5});
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');
    const [productAttrCate, setProductAttrCate] = useState(defaultProductAttr);

    useEffect(() => {
        getList();
    }, []);
    useEffect(() => {
        form.setFieldsValue(productAttrCate);
    }, [productAttrCate])

    //Method
    const getList=()=>{
        setListLoading(true);
        productAttrCateServices.fetchList(listQuery).then(response=>{
            setListLoading(false);
            setList(response.data.list);
            setTotal(response.data.total);
        })
    }
    const addProductAttrCate=()=>{
        setDialogVisible(true);
        setDialogTitle("Add Type");
        setProductAttrCate(defaultProductAttr);
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
    const handleDelete=(index,row)=>{
        confirm({
            title:"Are you sure to delete this brand?",
            okText:'OK',
            okType:'primary',
            onOk(){
                productAttrCateServices.deleteProductAttrCate(row.id).then(response=>{
                    message.success("Delete Success",5);
                    getList();
                })
            },
            onCancel(){}
        })
    }
    const handleUpdate=(index,row)=>{
        setDialogVisible(true);
        setDialogTitle("Update Type");
        setProductAttrCate({name:row.name,id:row.id});
    }
    const getAttrList=(index,row)=>{
        history.push("/pms/productAttrList",{cid:row.id,cname:row.name,type:0});
    }
    const getParamList=(index,row)=>{
        history.push("/pms/productAttrList",{cid:row.id,cname:row.name,type:1});
    }
    const handleConfirm=()=>{
        let data = new URLSearchParams();
        data.append("name",productAttrCate.name);
        if(dialogTitle==="Add Type"){
            productAttrCateServices.createProductAttrCate(data).then(response=>{
                message.success("Add Success",5);
                setDialogVisible(false);
                getList();
            })
        } else {
            productAttrCateServices.updateProductAttrCate(productAttrCate.id,data).then(response=>{
                message.success("Modify Success",5);
                setDialogVisible(false);
                getList();
            })
        }
    }
    const handleConfirmFail=()=>{
        message.error("Error Submit",5);
        return false;
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
    return(
        <div className="app-container">
            <Card className="operate-container">
                <ProfileOutlined style={{marginTop:'5px'}}/>
                <span style={{marginTop:'5px'}}>Data List</span>
                <Button className="btn-add" onClick={addProductAttrCate} size="small">
                    Add
                </Button>
            </Card>
            <div className="table-container">
                <Table dataSource={list} loading={listLoading} rowKey="id" style={{width:'100%'}} {...tableStatus}>
                    <Column title="Id" align="center" width="100px" render={(text,record,index)=><div>{record.id}</div>}/>
                    <Column title="CateName" align="center" render={(text,record,index)=><div>{record.name}</div>}/>
                    <Column title="AttrCount" align="center" width="200px" render={(text,record,index)=><div>{record.attributeCount==null?0:record.attributeCount}</div>}/>
                    <Column title="ParamCount" align="center" width="200px" render={(text,record,index)=><div>{record.paramCount==null?0:record.paramCount}</div>}/>
                    <Column title="Setting" align="center" width="200px" render={(text,record,index)=>
                        <Space>
                            <Button size="small" onClick={()=>getAttrList(index,record)}>
                                AttrList
                            </Button>
                            <Button size="small" onClick={()=>getParamList(index,record)}>
                                ParamList
                            </Button>
                        </Space>}/>
                    <Column title="Operation" align="center" width="200px" render={(text,record,index)=>
                        <Space>
                            <Button size="small" onClick={()=>handleUpdate(index,record)}>
                                Edit
                            </Button>
                            <Button size="small" danger onClick={()=>handleDelete(index,record)}>
                                Delete
                            </Button>
                        </Space>}/>
                </Table>
                <Modal forceRender title={dialogTitle} visible={dialogVisible} width="500px" onOk={handleConfirm} onCancel={()=>setDialogVisible(false)}>
                    <Form form={form} labelCol={{span:6}}>
                        <Form.Item label="Cate Name" name="name" rules={[{required:true,message:"Please enter category name"}]} >
                            <Input value={productAttrCate.name} name="name" onChange={(e)=>setProductAttrCate({...productAttrCate,name:e.target.value})}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    )
}
export default ProductAttr;