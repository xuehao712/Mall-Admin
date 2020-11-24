import { ProfileOutlined } from '@ant-design/icons';
import { Button, Card, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import {flashSessionServices} from 'services/flashSession';
import {formatDate} from 'utils/date';
import { history } from '../../../redux/shared/history-redux';

function SelectSession(){
    const route = useLocation();
    //Initial
    useEffect(() => {
        getList();
    }, []);

    //Data
    const [list, setList] = useState(null);
    const [listLoading, setListLoading] = useState(false);

    //Filter
    const formatTime=(time)=>{
        if (time == null || time === '') {
            return 'N/A';
        }
          let date = new Date(time);
          return formatDate(date, 'hh:mm:ss');
    }

    //Methods
    const handleShowRelation=(index,row)=>{
        history.push('/sms/flashProductRelation',{flashPromotionId:route.state.flashPromotionId, flashPromotionSessionId:row.id});
    }
    const getList=()=>{
        setListLoading(true);
        flashSessionServices.fetchSelectList({flashPromotionId:route.state.flashPromotionId}).then(response => {
            setListLoading(false);
            setList(response.data);
        });
    }
    return(
        <div className="app-container">
            <Card className="operate-container">
                <ProfileOutlined/>
                <span>Data List</span>
            </Card>
            <div className="table-container">
                <Table rowKey="id" bordered dataSource={list} style={{width:'100%'}} loading={listLoading}>
                    <Column width="100px" align="center" title="Id" render={(text,record,index)=>
                        <div>
                            {record.id}
                        </div>}/>
                    <Column align="center" title="FlashName" render={(text,record,index)=>
                        <div>
                            {record.name}
                        </div>}/>
                    <Column align="center"title="DailyStartTime" render={(text,record,index)=>
                        <div>
                            {formatTime(record.startTime)}
                        </div>}/>
                    <Column align="center" title="DailyEndTime" render={(text,record,index)=>
                        <div>
                            {formatTime(record.endTime)}
                        </div>}/>
                    <Column align="center" title="Count" render={(text,record,index)=>
                        <div>
                            {record.productCount}
                        </div>}/>
                    <Column align="center" title="Operation" render={(text,record,index)=>
                        <div>
                            <Button size="small" type="text" onClick={()=>handleShowRelation(index,record)}>ProductList</Button>
                        </div>}/>
                </Table>
            </div>
        </div>
    )
}
export default SelectSession;