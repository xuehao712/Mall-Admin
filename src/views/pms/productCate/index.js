import { ProfileOutlined } from '@ant-design/icons';
import { Button, Card, message, Switch, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import React, {useState, useEffect} from 'react';
import { history } from '../../../redux/shared/history-redux';
import {productCateServices} from 'services/productCate';
import { useLocation } from 'react-router-dom';

function ProductCate(){
    const route = useLocation();
    //Data
    const [list, setList] = useState(null);
    const [total, setTotal] = useState(null);
    const [listLoading, setListLoading] = useState(true);
    const [listQuery, setListQuery] = useState({pageNum:1,pageSize:5});
    const [parentId, setParentId] = useState(0);

    //Initial
    useEffect(() => {
        resetParentId();
        getList();
    }, []);

    //Watch value change
    useEffect(() => {
        resetParentId();
        getList();
    }, [route])
    
    //Method
    const resetParentId=()=>{
        setListQuery({...listQuery,pageNum:1});
        if(route.state && route.state.parentId!=null) {
            setParentId(route.state.parentId);
        } else {
            setParentId(0);
        }
    }
    const handleAddProductCate=()=>{
        history.push("/pms/addProductCate");
    }
    const getList=()=>{
        setListLoading(true);
        productCateServices.fetchList(parentId,listQuery).then(response=>{
            setListLoading(false);
            setList(response.data.list);
            setTotal(response.data.total);
        });
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
    const handleNavStatusChange=(value,row)=>{
        let data = new URLSearchParams();
        let ids =[];
        value = value?1:0;
        ids.push(row.id);
        data.append('ids',ids);
        data.append('navStatus',value);
        productCateServices.updateNavStatus(data).then(response=>{
            message.success("Modify Success",10);
            getList();
        })
    }
    const handleShowStatusChange=(value,row)=>{
        let data = new URLSearchParams();
        let ids=[];
        value = value?1:0;
        ids.push(row.id)
        data.append('ids',ids);
        data.append('showStatus',value);
        productCateServices.updateShowStatus(data).then(response=>{
            message.success("Modify Success",10);
            getList();
        })
    }
    const handleShowNextLevel=(index,row)=>{
        history.push("/pms/productCate",{parentId:row.id});
    }
    const handleTransferProduct=(index,row)=>{
        console.log('handleAddProductCate');
    }
    const handleUpdate=(index,row)=>{
        history.push("/pms/updateProductCate",{id:row.id});
    }
    const handleDelete = (index,row)=>{
        confirm({
            title:"Are you sure to delete this brand?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                productCateServices.deleteProductCate(row.id).then(response=>{
                    message.success("Delete Success",10);
                    getList();
                })
            },
            onCancel(){}
        });
    }
    const levelFilter=(value)=>{
        if(value === 0) {
            return "First";
        } else if(value === 1){
            return "Second";
        }
    }
    const disableNextLevel = (value)=>{
        if(value === 0) {
            return false;
        } else {
            return true;
        }
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
                <Button className="btn-add" onClick={handleAddProductCate} size="small">Add</Button>
            </Card>
            <div className="table-container">
                <Table rowKey="id" {...tableStatus} style={{width:'100%'}} dataSource={list} loading={listLoading}>
                    <Column title="Id" width="100px" align="center" render={(text,record,index)=><div>{record.id}</div>}/>
                    <Column title="Name" align="center" render={(text,record,index)=><div>{record.name}</div>}/>
                    <Column title="Level" width="100px" align="center" render={(text,record,index)=><div>{levelFilter(record.level)}</div>}/>
                    <Column title="Count" width="100px" align="center" render={(text,record,index)=><div>{record.productCount}</div>}/>
                    <Column title="Unit" width="100px" align="center" render={(text,record,index)=><div>{record.productUnit}</div>}/>
                    <Column title="Nav" width="100px" align="center" render={(text,record,index)=><Switch onChange={(e)=>handleNavStatusChange(e,record)} checked={record.navStatus}></Switch>}/>
                    <Column title="Display" width="100px" align="center" render={(text,record,index)=><Switch onChange={(e)=>handleShowStatusChange(e,record)} checked={record.showStatus}></Switch>}/>
                    <Column title="Sort" width="100px" align="center" render={(text,record,index)=><div>{record.sort}</div>}/>
                    <Column title="Setting" width="200px" align="center" render={(text,record,index)=>
                        <div>
                            <Button size="small"disabled={disableNextLevel(record.level)}  onClick={()=>handleShowNextLevel(record.level)} onClick={()=>handleShowNextLevel(index,record)}>Next Level</Button>
                            <Button size="small" onClick={()=>handleTransferProduct(index,record)}>Transfer</Button>
                        </div>}/>
                    <Column title="Operation" width="200px" align="center" render={(text,record,index)=>
                        <div>
                            <Button size="small" onClick={()=>handleUpdate(index,record)}>Modify</Button>
                            <Button size="small" danger onClick={()=>handleDelete(index,record)}>Delete</Button>
                        </div>}/>
                </Table>
            </div>
        </div>
    )
}
export default ProductCate;