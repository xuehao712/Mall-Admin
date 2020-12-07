import React, {useState, useEffect} from 'react';
import { Button, Card, Form, Input, message, Table } from 'antd';
import { ProfileOutlined, SearchOutlined } from '@ant-design/icons';
import Column from 'antd/lib/table/Column';
import Modal from 'antd/lib/modal/Modal';
import Search from 'antd/lib/transfer/search';
import {flashProductRelationServices} from 'services/flashProductRelation';
import {productServices} from 'services/product';
import { useLocation } from 'react-router-dom';
import confirm from 'antd/lib/modal/confirm';

function ProductRelationList(){
    const { Search } = Input;
    const route = useLocation();
    //Initial
    useEffect(() => {
        getList();
    }, [])

    //Data
    const defaultListQuery = {
        pageNum: 1,
        pageSize: 5,
        flashPromotionId: route.state.flashPromotionId,
        flashPromotionSessionId: route.state.flashPromotionSessionId
    };
    const [listQuery, setListQuery] = useState(defaultListQuery);
    const [list, setList] = useState(null);
    const [total, setTotal] = useState(null);
    const [listLoading, setListLoading] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [selectDialogVisible, setSelectDialogVisible] = useState(false);
    const [dialogData, setDialogData] = useState({
        list: null,
        total: null,
        multipleSelection:[],
        listQuery:{
          keyword: null,
          pageNum: 1,
          pageSize: 5
        }
    });
    const [editDialogVisible, setEditDialogVisible] = useState(false);
    const [flashProductRelation, setFlashProductRelation] = useState({
        product:{}
    })

    //Methods
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
    const handleSelectProduct=()=>{
        setSelectDialogVisible(true);
        getDialogList();
    }
    const handleUpdate=(index,row)=>{
        setEditDialogVisible(true);
        setFlashProductRelation(row);
    }
    const handleDelete=(index,row)=>{
        confirm({
            title:"Are you sure to delete this product?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                flashProductRelationServices.deleteFlashProductRelation(row.id).then(response => {
                    message.success("Delete Success");
                    getList();
                });
            },
            onCancel(){}
        });
    }
    const handleSelectSearch=()=>{
        getDialogList();
    }
    const handleDialogSizeChange=(val)=>{
        let query = dialogData;
        query.listQuery.pageNum = 1;
        query.listQuery.pageSize = val;
        setDialogData(query);
        getDialogList();
    }
    const handleDialogCurrentChange=(val)=>{
        let query = dialogData;
        query.listQuery.pageNum = val;
        setDialogData(query);
        getDialogList();
    }
    const handleDialogSelectionChange=(val)=>{
        setDialogData({...dialogData,multipleSelection:val});
    }
    const handleSelectDialogConfirm=()=>{
        if(dialogData.multipleSelection < 1) {
            message.warning("Please select a record",5);
            return;
        }
        let selectProducts = [];
        for (let i = 0; i < dialogData.multipleSelection.length; i++) {
          selectProducts.push({
            productId:dialogData.multipleSelection[i].id,
            flashPromotionId:listQuery.flashPromotionId,
            flashPromotionSessionId:listQuery.flashPromotionSessionId
          });
        }
        confirm({
            title:"Are you sure to add?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                flashProductRelationServices.createFlashProductRelation(selectProducts).then(response=>{
                    setSelectDialogVisible(false);
                    let temp = dialogData;
                    temp.multipleSelection=[];
                    setDialogData(temp);
                    getList();
                    message.success("Add Success");
                });
            },
            onCancel(){
            }
        });
    }
    const handleEditDialogConfirm=()=>{
        confirm({
            title:"Are you sure to confirm?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                flashProductRelationServices.updateFlashProductRelation(flashProductRelation.id,flashProductRelation).then(response=>{
                    message.success("Modify Success");
                    setEditDialogVisible(false);
                    getList();
                });
            },
            onCancel(){}
        });
    }
    const getList=()=>{
        setListLoading(true);
        flashProductRelationServices.fetchList(listQuery).then(response=>{
            setListLoading(false);
            setList(response.data.list);
            setTotal(response.data.total);
        })
    }
    const getDialogList=()=>{
        productServices.fetchList(dialogData.listQuery).then(response=>{
            setDialogData({...dialogData,list:response.data.list,total:response.data.total});
        })
    }
    const mainTableStatus = {
        pagination:{ 
        position: 'bottomRight',pageSize:listQuery.pageSize,
        showQuickJumper:true,showSizeChanger:true,showTotal:(total)=>`Total ${total} items`,
        pageSizeOptions:[5,10,15],total:total, current:listQuery.pageNum,
        onShowSizeChange:(current, size)=>handleSizeChange(size), onChange:(page, pageSize)=>handleCurrentChange(page)},
        bordered:true,
        size:'default'
    };
    const dialogTableStatus = {
        pagination:{ 
        position: 'bottomRight',pageSize:dialogData.listQuery.pageSize,
        showQuickJumper:true,showSizeChanger:true,showTotal:(total)=>`Total ${total} items`,
        pageSizeOptions:[5,10,15],total:dialogData.total, current:dialogData.listQuery.pageNum,
        onShowSizeChange:(current, size)=>handleDialogSizeChange(size), onChange:(page, pageSize)=>handleDialogCurrentChange(page)},
        bordered:true,
        size:'default'
    };
    const dialogRowSelection={
        onChange:(e,value)=>{
            handleDialogSelectionChange(value);
        }
    }
    const handleFlashProductRelationChange=(e)=>{
        const {value,name}=e.target;
        setFlashProductRelation({...flashProductRelation,[name]:value});
    }
    return(
        <div className="app-container">
            <Card className="operate-container">
                <ProfileOutlined/>
                <span>Data List</span>
                <Button size="small" className="btn-add" onClick={handleSelectProduct} style={{marginLeft:'20px'}}>Add</Button>
            </Card>
            <div className="table-container">
                <Table rowKey="id" {...mainTableStatus} dataSource={list} style={{width:'100%'}} loading={listLoading}>
                    <Column width="100px" align="center" title="Id" render={(text,record,index)=>
                        <div>
                            {record.id}
                        </div>}/>
                    <Column align="center" title="Name" render={(text,record,index)=>
                        <div>
                            {record.product.name}
                        </div>}/>
                    <Column align="center" width="140px" title="Sn" render={(text,record,index)=>
                        <div>
                            NO.{record.product.productSn}
                        </div>}/>
                    <Column width="100px" align="center" title="Price" render={(text,record,index)=>
                        <div>
                            ${record.product.price}
                        </div>}/>
                    <Column width="100px" align="center" title="Stock" render={(text,record,index)=>
                        <div>
                            {record.product.stock}
                        </div>}/>
                    <Column width="100px" align="center" title="FlashPrice" render={(text,record,index)=>
                        <div>
                            {record.flashPromotionPrice!==null &&
                            <div>${record.flashPromotionPrice}</div>}
                        </div>}/>
                    <Column width="100px" align="center" title="FlashCount" render={(text,record,index)=>
                        <div>
                            {record.flashPromotionCount}
                        </div>}/>
                    <Column width="100px" align="center" title="FlashLimit" render={(text,record,index)=>
                        <div>
                            {record.flashPromotionLimit}
                        </div>}/>
                    <Column width="100px" align="center" title="Sort" render={(text,record,index)=>
                        <div>
                            {record.sort}
                        </div>}/>
                    <Column width="100px" align="center" title="Operation" render={(text,record,index)=>
                        <div>
                            <Button size="small" type="text" onClick={()=>handleUpdate(index,record)}>Modify</Button>
                            <Button size="small" danger type="text" onClick={()=>handleDelete(index,record)}>Delete</Button>
                        </div>}/>
                </Table>
            </div>
            <Modal title="Select Product" visible={selectDialogVisible} style={{minWidth:'600px'}} width="50%" onCancel={()=>setSelectDialogVisible(false)} onOk={handleSelectDialogConfirm}>
                <Search value={dialogData.listQuery.keyword} name="keyword" size="small" onChange={(e)=>setDialogData({...dialogData,listQuery:{...dialogData.listQuery,keyword:e.target.value}})} onSearch={handleSelectSearch}
                placeholder="Product Name Search" />
                <Table rowKey="productSn" rowSelection={{...dialogRowSelection}} {...dialogTableStatus} dataSource={dialogData.list}>
                    <Column title="Name" align="center" render={(text,record,index)=>
                        <div>
                            {record.name}
                        </div>
                    }/>
                    <Column title="Sn" width="160px" align="center" render={(text,record,index)=>
                        <div>
                            NO.{record.productSn}
                        </div>
                    }/>
                    <Column title="Price" width="120px" align="center" render={(text,record,index)=>
                        <div>
                            ${record.price}
                        </div>
                    }/>
                </Table>
            </Modal>
            <Modal title="Modify Flash Product" visible={editDialogVisible} width="40%" onCancel={()=>setEditDialogVisible(false)} onOk={handleEditDialogConfirm}>
                <Form labelCol={{span:5}} size="small">
                    <Form.Item label="Name: ">
                        <span>{flashProductRelation.product.name}</span>
                    </Form.Item>
                    <Form.Item label="Sn: ">
                        <span>{flashProductRelation.product.productSn}</span>
                    </Form.Item>
                    <Form.Item label="Price: ">
                        <span>${flashProductRelation.product.price}</span>
                    </Form.Item>
                    <Form.Item label="FlashPrice: ">
                        <Input value={flashProductRelation.flashPromotionPrice} name="flashPromotionPrice" onChange={handleFlashProductRelationChange} className="ProductRelation_input-width"
                        prefix="$"/>
                    </Form.Item>
                    <Form.Item label="Stock: ">
                        <span>{flashProductRelation.product.stock}</span>
                    </Form.Item>
                    <Form.Item label="FlashCount: ">
                        <Input value={flashProductRelation.flashPromotionCount} name="flashPromotionCount" onChange={handleFlashProductRelationChange} className="ProductRelation_input-width"/>
                    </Form.Item>
                    <Form.Item label="FlashLimit: ">
                        <Input value={flashProductRelation.flashPromotionLimit} name="flashPromotionLimit" onChange={handleFlashProductRelationChange} className="ProductRelation_input-width"/>
                    </Form.Item>
                    <Form.Item label="Sort: ">
                        <Input value={flashProductRelation.sort} name="sort" onChange={handleFlashProductRelationChange} className="ProductRelation_input-width"/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default ProductRelationList;