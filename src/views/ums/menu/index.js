import { ProfileOutlined } from '@ant-design/icons';
import { Button, Card, message, Switch, Table } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import Column from 'antd/lib/table/Column';
import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import {menuServices} from 'services/menu';
import { history } from '../../../redux/shared/history-redux';

function Menu(){
    const route = useLocation();
    //Initial
    useEffect(() => {
        resetParentId();
        getList();
    }, [])

    //Watch value
    useEffect(() => {
        resetParentId();
        getList();
    }, [route])

    //Data
    const [listQuery, setListQuery] = useState({
        pageNum:1,
        pageSize:5
    });
    const [list, setList] = useState(null);
    const [total, setTotal] = useState(null);
    const [listLoading, setListLoading] = useState(false);
    const [parentId, setParentId] = useState(0);

    //Filters
    const levelFilter=(value)=>{
        if(value === 0 ) {
            return "FirstLevel";
        } else if(value === 1) {
            return "SecondLevel";
        }
    }
    const disableNextLevel=(value)=>{
        if(value === 0) {
            return false;
        } else {
            return true;
        }
    }

    //Methods
    const resetParentId=()=>{
        setListQuery({...listQuery,pageNum:1});
        if(route.state && route.state.parentId != null && route.state.parentId!=0) {
            setParentId(route.state.parentId);
        } else {
            setParentId(0);
        }
    }
    const handleAddMenu=()=>{
        history.push('/ums/addMenu');
    }
    const getList=()=>{
        setListLoading(true);
        menuServices.fetchList(route.state&&route.state.parentId||0,listQuery).then(response=>{
            setListLoading(false);
            setList(response.data.list);
            setTotal(response.data.total);
        })
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
    const handleHiddenChange=(value,row)=>{
        menuServices.updateHidden(row.id,{hidden:value?1:0}).then(response=>{
            message.success("Modify Success",10);
            getList();
        });
    }
    const handleShowNextLevel=(index,row)=>{
        history.push("/ums/menu",{parentId:row.id});
    }
    const handleShowParentLevel=(index,row)=>{
        history.push("/ums/menu",{parentId:0});
    }
    const handleUpdate=(index,row)=>{
        history.push("/ums/updateMenu",{id:row.id});
    }
    const handleDelete=(index,row)=>{
        confirm({
            title:"Are you sure to delete this menu?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                menuServices.deleteMenu(row.id).then(response => {
                    message.success("Delete Success",10);
                    getList();
                });
            },
            onCancel(){}
        });
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
            <Card className="operate-container">
                <ProfileOutlined style={{marginTop:'5px'}}/>
                <span style={{marginTop:'5px'}}>Data List</span>
                <Button size="small" className="btn-add" onClick={handleAddMenu}>Add</Button>
            </Card>
            <div className="table-container">
                <Table rowKey="id" {...tableStatus} loading={listLoading} dataSource={list} style={{width:'100%'}} bordered>
                    <Column width="100px" align="center" title="Id" render={(text,record,index)=>
                        <div>
                            {record.id}
                        </div>}/>
                    <Column align="center" title="MenuName" render={(text,record,index)=>
                        <div>
                            {record.title}
                        </div>}/>
                    <Column align="center" title="Level" width="100px" render={(text,record,index)=>
                        <div>
                            {levelFilter(record.level)}
                        </div>}/>
                    <Column align="center" title="FrontEndName" render={(text,record,index)=>
                        <div>
                            {record.name}
                        </div>}/>
                    <Column align="center" title="FrontEndIcon" width="100px" render={(text,record,index)=>
                        <div>
                            {record.icon}
                        </div>}/>
                    <Column align="center" title="Hidden" width="100px" render={(text,record,index)=>
                        <div>
                            <Switch onChange={(e)=>handleHiddenChange(e,record)} checked={record.hidden}/>
                        </div>}/>
                    <Column align="center" title="sort" width="100px" render={(text,record,index)=>
                        <div>
                            {record.sort}
                        </div>}/>
                    <Column align="center" title="Setting" width="120px" render={(text,record,index)=>
                        <div>
                            <Button size="small" type="text" disabled={disableNextLevel(record.level)}
                            onClick={()=>handleShowNextLevel(index,record)}>NextLevel</Button>
                        </div>}/>
                    <Column width="200px" align="center" title="Operation" render={(text,record,index)=>
                        <div>
                            <Button size="small" type="text" onClick={()=>handleUpdate(index,record)}>Modify</Button>
                            <Button size="small" type="text" onClick={()=>handleDelete(index,record)}>Delete</Button>
                        </div>}/>
                </Table>
            </div>
            <div className="operate-container">
                <Button size="middle" type="primary" style={{float:'left'}} onClick={handleShowParentLevel}>Back</Button>
            </div>
        </div>
    )
}
export default Menu;