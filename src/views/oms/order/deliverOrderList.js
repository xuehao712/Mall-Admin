import { ProfileOutlined } from '@ant-design/icons';
import { Button, Card, Input, message, Select, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import {orderServices} from 'services/order';
import confirm from 'antd/lib/modal/confirm';
import { history } from '../../../redux/shared/history-redux';
import './orderDetail.scss';

const {Option} = Select;
function DeliverOrderList(){
    const defaultLogisticsCompanies=["UPS","FEDEX","USPS"];
    const route = useLocation();
    //Data
    const [list, setList] = useState([]);
    const [companyOptions, setCompanyOptions] = useState(defaultLogisticsCompanies);
    
    useEffect(() => {
        setList(route.state.list);
    }, []);

    //Method
    const onCancel=()=>{
        history.goBack();
    }
    const onConfirm=()=>{
        confirm({
            title:"Are you sure to ship?",
            okText:'Yes',
            okType:'primary',
            type:'warning',
            onOk(){
                orderServices.deliveryOrder(list).then(response=>{
                    history.goBack();
                    message.success('Shippment Success');
                });
            },
            onCancel(){
                message.info('Canceled shippment')
            }
        });
    }
    const handleTableValueChange=(e,param,index,record)=>{
        let temp = [...list];
        if(param){
            temp[index][param]=e;
            setList(temp);
        } else {
            const {value,name} = e.target;
            temp[index][name] = value;
            setList(temp);
        }
    }
    return(
        <div className="app-container">
            <Card className="OrderDetail_operate-container">
                <ProfileOutlined/>
                <span>Delivery List</span>
            </Card>
            <div className="table-container">
                <Table rowKey="orderId" pagination={false} style={{width:'100%'}} bordered dataSource={list}>
                    <Column width="180px" align="center" title="OrderSn" render={(text,record,index)=>
                        <div>
                            {record.orderSn}
                        </div>}
                    />
                    <Column width="180px" align="center" title="Receiver" render={(text,record,index)=>
                        <div>
                            {record.receiverName}
                        </div>}
                    />
                    <Column width="160px" align="center" title="Phone" render={(text,record,index)=>
                        <div>
                            {record.receiverPhone}
                        </div>}
                    />
                    <Column width="160px" align="center" title="ZipCode" render={(text,record,index)=>
                        <div>
                            {record.receiverZipCode}
                        </div>}
                    />
                    <Column align="center" title="Address" render={(text,record,index)=>
                        <div>
                            {record.address}
                        </div>}
                    />
                    <Column width="160px" align="center" title="Logistics" render={(text,record,index)=>
                        <div>
                            <Select placeholder="Please select company" value={record.deliveryCompany} onChange={(e)=>handleTableValueChange(e,'deliveryCompany',index,record)} size="small">
                                {companyOptions.map((item)=>{
                                    return <Option key={item} value={item}>{item}</Option>
                                })}
                            </Select>
                        </div>}
                    />
                    <Column width="180px" align="center" title="DeliverySn" render={(text,record,index)=>
                        <div>
                            <Input name="deliverySn" value={record.deliverySn} onChange={(e)=>handleTableValueChange(e,null,index,record)}/>
                        </div>}
                    />
                </Table>
                <div style={{marginTop:'15px',textAlign:'center'}}>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button onClick={onConfirm} type="primary">Confirm</Button>
                </div>
            </div>
        </div>
    )
}
export default DeliverOrderList;