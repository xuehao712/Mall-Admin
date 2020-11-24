import { Button, Card, Col, Form, Input, Row, Select, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import React, {useState, useEffect} from 'react';
import {formatDate} from 'utils/date';
import {couponServices} from 'services/coupon';
import {couponHistoryServices} from 'services/couponHistory';
import './history.scss';
import { useLocation } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';

function CouponHistory(){
    const {Option} = Select;
    const route = useLocation();
    //Inital
    useEffect(() => {
        couponServices.getCoupon(route.state.id).then(response=>{
            setCoupon(response.data);
        })
        getList();
    }, [])

    //Data
    const defaultTypeOptions = [
        {
          label: 'AllCoupon',
          value: 0
        },
        {
          label: 'MemberCoupon',
          value: 1
        },
        {
          label: 'ShoppingCoupon',
          value: 2
        },
        {
          label: 'RegisterCoupon',
          value: 3
        }
    ];
    const defaultListQuery = {
        pageNum: 1,
        pageSize: 10,
        useStatus: null,
        orderSn: null,
        couponId: route.state.id
    };
    const defaultUseTypeOptions= [
        {
          label: "Unused",
          value: 0
        },
        {
          label: "Used",
          value: 1
        },
        {
          label: "Expired",
          value: 2
        }
    ];
    const [coupon, setCoupon] = useState({});
    const [listQuery, setListQuery] = useState(defaultListQuery);
    const [useTypeOptions, setUseTypeOptions] = useState(defaultUseTypeOptions);
    const [list, setList] = useState(null);
    const [total, setTotal] = useState(null);
    const [listLoading, setListLoading] = useState(false);

    //Filters  
    const formatType=(type)=>{
        for (let i = 0; i < defaultTypeOptions.length; i++) {
            if (type === defaultTypeOptions[i].value) {
              return defaultTypeOptions[i].label;
            }
        }
        return '';
    }
    const formatUseType=(useType)=>{
        if (useType === 0) {
          return 'All';
        } else if (useType === 1) {
          return 'Category';
        } else {
          return 'Product';
        }
    }
    const formatPlatform=(platform)=>{
        if (platform === 1) {
          return 'App';
        } else if (platform === 2) {
          return 'PC';
        } else {
          return 'All';
        }
    }
    const localFormatDate=(time)=>{
        if (time == null || time === '' || !time) {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd')
    }
    const formatStatus=(endTime)=>{
        let now = new Date().getTime();
        if (endTime > now) {
          return 'Unexpired'
        } else {
          return 'Expired';
        }
    }
    const formatGetType=(type)=>{
        if(type===1){
          return 'Initiative';
        }else{
          return 'Gift';
        }
    }
    const formatCouponHistoryUseType=(useType)=>{
        if (useType === 0) {
          return 'Unused';
        } else if (useType === 1) {
          return 'Used';
        } else {
          return 'Expired';
        }
    }
    const formatTime=(time)=>{
        if (time == null || time === ''||!time) {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
    
    //Methods 
    const getList=()=>{
        setListLoading(true);
        couponHistoryServices.fetchList(listQuery).then(response=>{
            setListLoading(false);
            setList(response.data.list);
            setTotal(response.data.total);
        })
    }
    const handleResetSearch=()=>{
        let temp = defaultListQuery;
        temp.couponId=route.state.id;
        setListQuery(temp);
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
        <div className="CouponHistory_app-container">
            <div className="CouponHistory_table-layout">
                <Row>
                    <Col span={4} className="CouponHistory_table-cell-title">Name</Col>
                    <Col span={4} className="CouponHistory_table-cell-title">Type</Col>
                    <Col span={4} className="CouponHistory_table-cell-title">UseType</Col>
                    <Col span={4} className="CouponHistory_table-cell-title">MinPoint</Col>
                    <Col span={4} className="CouponHistory_table-cell-title">Amount</Col>
                    <Col span={4} className="CouponHistory_table-cell-title">Status</Col>
                </Row>
                <Row>
                    <Col span={4} className="CouponHistory_table-cell">{coupon.name}</Col>
                    <Col span={4} className="CouponHistory_table-cell">{formatType(coupon.type)}</Col>
                    <Col span={4} className="CouponHistory_table-cell">{formatUseType(coupon.useType)}</Col>
                    <Col span={4} className="CouponHistory_table-cell">Min: {coupon.minPoint}$</Col>
                    <Col span={4} className="CouponHistory_table-cell">{coupon.amount}</Col>
                    <Col span={4} className="CouponHistory_table-cell">{formatStatus(coupon.endTime)}</Col>
                </Row>
                <Row>
                    <Col span={4} className="CouponHistory_table-cell-title">Valid</Col>
                    <Col span={4} className="CouponHistory_table-cell-title">PublishCount</Col>
                    <Col span={4} className="CouponHistory_table-cell-title">ReceiveCount</Col>
                    <Col span={4} className="CouponHistory_table-cell-title">AvailableCount</Col>
                    <Col span={4} className="CouponHistory_table-cell-title">Used</Col>
                    <Col span={4} className="CouponHistory_table-cell-title">Unused</Col>
                </Row>
                <Row>
                    <Col span={4} className="CouponHistory_table-cell" style={{fontSize:'13px'}}>
                        {localFormatDate(coupon.startTime)} To {localFormatDate(coupon.endTime)}
                    </Col>
                    <Col span={4} className="CouponHistory_table-cell">{coupon.publishCount}</Col>
                    <Col span={4} className="CouponHistory_table-cell">{coupon.receiveCount}</Col>
                    <Col span={4} className="CouponHistory_table-cell">{(coupon.publishCount &&coupon.receiveCount)?coupon.publishCount-coupon.receiveCount:'N/A'}</Col>
                    <Col span={4} className="CouponHistory_table-cell">{coupon.useCount}</Col>
                    <Col span={4} className="CouponHistory_table-cell">{(coupon.publishCount&&coupon.useCount)?coupon.publishCount-coupon.useCount:'N/A'}</Col>
                </Row>
            </div>
            <Card className="CouponHistory_filter-container">
                <div>
                    <SearchOutlined/>
                    <span>Filter Search</span>
                    <Button style={{float:'right'}} type="primary" onClick={handleSearchList} size="small">Search</Button>
                    <Button style={{float:'right',marginRight:'15px'}} onClick={handleResetSearch} size="small">Reset</Button>
                </div>
                <div style={{marginTop:'15px'}}>
                    <Form layout="inline" size="small" labelCol={{span:5}}>
                        <Form.Item label="Status: ">
                            <Select value={listQuery.useStatus} style={{width:'200px'}} name="useStatus" onChange={(e)=>setListQuery({...listQuery,useStatus:e})}
                            placeholder="all" allowClear className="input-width">
                                {useTypeOptions.map((item)=>{
                                    return <Option key={item.value} value={item.value}>{item.label}</Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Id: ">
                            <Input value={listQuery.orderSn} style={{width:'200px'}} name="orderSn" onChange={(e)=>setListQuery({...listQuery,orderSn:e.target.value})} placeholder="Order Sn" 
                            className="input-width"/>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
            <div className="table-container">
                <Table rowKey="id" dataSource={list} {...tableStatus} style={{width:'100%'}} loading={listLoading}>
                    <Column title="CouponCode" width="160px" align="center" render={(text,record,index)=>
                        <div>
                            {record.couponCode}
                        </div>
                    }/>
                    <Column title="MemberNickname" width="140px" align="center" render={(text,record,index)=>
                        <div>
                            {record.memberNickname}
                        </div>
                    }/>
                    <Column title="GetType" width="100px" align="center" render={(text,record,index)=>
                        <div>
                            {formatGetType(record.getType)}
                        </div>
                    }/>
                    <Column title="CreateTime" width="160px" align="center" render={(text,record,index)=>
                        <div>
                            {formatTime(record.createTime)}
                        </div>
                    }/>
                    <Column title="Status" width="140px" align="center" render={(text,record,index)=>
                        <div>
                            {formatCouponHistoryUseType(record.useStatus)}
                        </div>
                    }/>
                    <Column title="UseTime" width="160px" align="center" render={(text,record,index)=>
                        <div>
                            {formatTime(record.useTime)}
                        </div>
                    }/>
                    <Column title="OrderSn" width="140px" align="center" render={(text,record,index)=>
                        <div>
                            {record.orderSn===null?'N/A':record.orderSn}
                        </div>
                    }/>
                </Table>
            </div>
        </div>
    )
}
export default CouponHistory;