import { Button, Card, Col, Image, Input, message, Row, Select, Space, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import React, {useState, useEffect, useMemo} from 'react';
import {returnApplyServices} from 'services/returnApply';
import {companyAddressServices} from 'services/companyAddress';
import {formatDate} from 'utils/date';
import {history} from '../../../redux/shared/history-redux';
import './applyDetail.scss';
import { useLocation } from 'react-router-dom';
import confirm from 'antd/lib/modal/confirm';

const {Option} = Select;
function ReturnApplyDetail(){
    const route = useLocation();
    const defaultUpdateStatusParam = {
        companyAddressId: null,
        handleMan: 'admin',
        handleNote: null,
        receiveMan: 'admin',
        receiveNote: null,
        returnAmount: 0,
        status: 0
      };
      const defaultOrderReturnApply = {
        id: null,
        orderId: null,
        companyAddressId: null,
        productId: null,
        orderSn: null,
        createTime: null,
        memberUsername: null,
        returnAmount: null,
        returnName: null,
        returnPhone: null,
        status: null,
        handleTime: null,
        productPic: null,
        productName: null,
        productBrand: null,
        productAttr: null,
        productCount: null,
        productPrice: null,
        productRealPrice: null,
        reason: null,
        description: null,
        proofPics: null,
        handleNote: null,
        handleMan: null,
        receiveMan: null,
        receiveTime: null,
        receiveNote: null
    };

    //Data
    const [id, setId] = useState(route.state.id);
    const [orderReturnApply, setOrderReturnApply] = useState(defaultOrderReturnApply);
    const [productList, setProductList] = useState([]);
    const [proofPics, setProofPics] = useState([]);
    const [updateStatusParam, setUpdateStatusParam] = useState(defaultUpdateStatusParam);
    const [companyAddressList, setCompanyAddressList] = useState([]);

    //Initial
    useEffect(() => {
        getDetail();
    }, [])

    //Filter
    const formatStatus=(status)=>{
        if(status === 0) {
            return "Unsolved";
        } else if(status === 1) {
            return "Returning";
        } else if (status === 2) {
            return "Solved";
        } else {
            return "Rejected";
        }
    }
    const formatTime=(time)=>{
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
    const formatRegion=(address)=>{
        let str = "";
        if (address.city != null) {
          str +=address.city;
        }
        str += " " + address.state;
        return str;
    }

    //Method
    const handleViewOrder=()=>{
        history.push("/oms/orderDetail",{id:orderReturnApply.orderId});
    }
    const getDetail=()=>{
        returnApplyServices.getApplyDetail(id).then(response=>{
            console.log("getDetail");
            setOrderReturnApply(response.data);
            let tempProductList=[];
            tempProductList.push(response.data);
            setProductList(tempProductList);
            if(response.data.proofPics !=null) {
                setProofPics(response.data.proofPics.split(","));
            }
            //Returning and complete
            if(response.data.status === 1 || response.data.status===2) {
                let temp = updateStatusParam;
                temp.returnAmount = response.data.returnAmount;
                temp.companyAddressId= response.data.companyAddressId;
                setUpdateStatusParam(temp);
            }
            getCompanyAddressList();
        })
    }
    const getCompanyAddressList=()=>{
        companyAddressServices.fetchList().then(response=>{
            console.log("getcompanyaddress");
            setCompanyAddressList([...response.data]);
            let tempId = null;
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].receiveStatus === 1&&orderReturnApply.status===0) {
                  tempId=response.data[i].id;
                }
            }
            if(tempId!=null){
                setUpdateStatusParam({...updateStatusParam,companyAddressId:tempId});
            }
        })
    }
    const handleUpdateStatus=(status)=>{
        setUpdateStatusParam({...updateStatusParam,status:status});
        confirm({
            title:"Are you sure to perform this operation?",
            okText:'OK',
            okType:'primary',
            onOk(){returnApplyServices.updateApplyStatus(id,updateStatusParam).then(response=>{
                message.success("Operation Success!",5);
                history.goBack();
            })},
            onCancel(){}
        })
    }
    const handleUpdateStatusParamChange=(e,param)=>{
        if(param){
            setUpdateStatusParam({...updateStatusParam,[param]:e});
        }else {
            const {value,name} = e.target;
            setUpdateStatusParam({...updateStatusParam,[name]:value});
        }
    }
    const tableStatus = {
        bordered:true,
        size:'default'
    };
    //Computed
    const totalAmount = useMemo(() => {
        if(orderReturnApply !=null){
            return orderReturnApply.productRealPrice * orderReturnApply.productCount;
        }else {
            return 0;
        }
    }, [orderReturnApply])
    const currentAddress = useMemo(() => {
        let id = updateStatusParam.companyAddressId;
        if(companyAddressList == null) {
            return {};
        }
        for(let i =0;i<companyAddressList.length;i++){
            let address = companyAddressList[i];
            if(address.id === id) {
                return address;
            }
        }
        return null;
    }, [updateStatusParam.companyAddressId,companyAddressList])
    return(
        <div className="detail-container">
            <Card>
                <span className="font-title-medium">Return Product</span>
                <Table rowKey="id" {...tableStatus} className="standard-margin" dataSource={productList}>
                    <Column title="Picture" width="160px" align="center" 
                    render={(text,record,index)=><Image style={{height:'80px'}} src={record.productPic}/>}/>
                    <Column title="Name" align="center" 
                    render={(text,record,index)=>
                        <div>
                            <span className="font-small">{record.productName}</span><br></br>
                            <span className="font-small">Brand: {record.productBrand}</span>
                        </div>}/>
                    <Column title="Price/Id" width="180px" align="center" 
                    render={(text,record,index)=>
                        <div>
                            <span className="font-small">Price: ${record.productRealPrice}</span><br></br>
                            <span className="font-small">Id: NO.{record.productId}</span>
                        </div>}/>
                    <Column title="Attribute" width="200px" align="center" 
                    render={(text,record,index)=><div>{record.productAttr}</div>}/>
                    <Column title="Quantity" width="100px" align="center" 
                    render={(text,record,index)=><div>{record.productCount}</div>}/>
                    <Column title="Picture" width="100px" align="center" 
                    render={(text,record,index)=><div>${totalAmount}</div>}/>
                </Table>
                <div style={{float:'right',marginTop:'15px',marginBottom:'15px'}}>
                    <span className="font-title-medium">Total: </span>
                    <span className="font-title-medium color-danger">${totalAmount}</span>
                </div>
            </Card>
            <Card className="standard-margin">
                <span className="font-title-medium">Ticket Info</span>
                <div className="form-container-border">
                    <Row>
                        <Col span={6} className="form-border form-left-bg font-small">TicketId</Col>
                        <Col span={18} className="form-border font-small">{orderReturnApply.id}</Col>
                    </Row>
                    <Row>
                        <Col className="form-border form-left-bg font-small" span={6}>ApplyStatus</Col>
                        <Col className="form-border font-small" span={18}>{formatStatus(orderReturnApply.status)}</Col>
                    </Row>
                    <Row>
                        <Col span={6} className="form-border form-left-bg font-small" style={{height:'50px',lineHeight:'30px'}}>
                            OrderSn
                        </Col>
                        <Col className="form-border font-small" span={18} style={{height:'50px'}}>
                            {orderReturnApply.orderSn}
                            <Button type="text" size="small" onClick={handleViewOrder}>View</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6} className="form-border form-left-bg font-small">ApplyTime</Col>
                        <Col span={18} className="form-border font-small">{formatTime(orderReturnApply.createTime)}</Col>
                    </Row>
                    <Row>
                        <Col span={6} className="form-border form-left-bg font-small">Username</Col>
                        <Col span={18} className="form-border font-small">{orderReturnApply.memberUsername}</Col>
                    </Row>
                    <Row>
                        <Col span={6} className="form-border form-left-bg font-small">Name</Col>
                        <Col span={18} className="form-border font-small">{orderReturnApply.returnName}</Col>
                    </Row>
                    <Row>
                        <Col span={6} className="form-border form-left-bg font-small">Phone</Col>
                        <Col span={18} className="form-border font-small">{orderReturnApply.returnPhone}</Col>
                    </Row>
                    <Row>
                        <Col span={6} className="form-border form-left-bg font-small">Reason</Col>
                        <Col span={18} className="form-border font-small">{orderReturnApply.reason}</Col>
                    </Row>
                    <Row>
                        <Col span={6} className="form-border form-left-bg font-small">Description</Col>
                        <Col span={18} className="form-border font-small">{orderReturnApply.description}</Col>
                    </Row>
                    <Row>
                        <Col span={6} className="form-border form-left-bg font-small" style={{height:'100px',lineHeight:'80px'}}>Picture</Col>
                        <Col span={18} className="form-border font-small" style={{height:'100px'}}>
                            {proofPics.map((item)=>{
                                if(item.length>0){
                                    return <img key={item} style={{width:'80px',height:'80px'}} src={item}/>
                                }
                            })}
                        </Col>
                    </Row>
                </div>
                <div className="form-container-border">
                    <Row>
                        <Col className="form-border form-left-bg font-small" span={6}>Amount</Col>
                        <Col className="form-border font-small" span={18}>{totalAmount}</Col>
                    </Row>
                    <Row>
                        <Col className="form-border form-left-bg font-small" span={6} style={{height:'52px',lineHeight:'32px'}}>ConfirmAmount</Col>
                        <Col className="form-border font-small" span={18} style={{height:'52px'}}>
                            <Input prefix="$" size="small" value={updateStatusParam.returnAmount} disabled={orderReturnApply.status!==0}
                            onChange={handleUpdateStatusParamChange} name="returnAmount" style={{widows:'200px'}}/>
                        </Col>
                    </Row>
                    {orderReturnApply.status !==3 && 
                    <div>
                        <Row>
                            <Col className="form-border form-left-bg font-small" span={6} style={{height:'52px',lineHeight:'32px'}}>ReceiveLocation</Col>
                            <Col className="form-border font-small" span={18} style={{height:'52px'}}>
                                <Select size="small" style={{width:'200px'}} disabled={orderReturnApply.status!==0}
                                value={updateStatusParam.companyAddressId} name="companyAddressId" onChange={(e)=>handleUpdateStatusParamChange(e,'companyAddressId')}>
                                    {companyAddressList.map((item)=>{
                                        return <Option key={item.id} value={item.id}>{item.addressName}</Option>
                                    })}
                                </Select>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="form-border form-left-bg font-small" span={6}>Receiver</Col>
                            <Col className="form-border font-small" span={18}>{currentAddress?currentAddress.name:null}</Col>
                        </Row>
                        <Row>
                            <Col className="form-border form-left-bg font-small" span={6}>Address</Col>
                            <Col className="form-border font-small" span={18}>{currentAddress?formatRegion(currentAddress):null}</Col>
                        </Row>
                        <Row>
                            <Col className="form-border form-left-bg font-small" span={6}>AddressDetail</Col>
                            <Col className="form-border font-small" span={18}>{currentAddress?currentAddress.detailAddress:null}</Col>
                        </Row>
                        <Row>
                            <Col className="form-border form-left-bg font-small" span={6}>Phone</Col>
                            <Col className="form-border font-small" span={18}>{currentAddress?currentAddress.phone:null}</Col>
                        </Row>
                    </div>}
                </div>
                {orderReturnApply.status!==0 &&
                <div className="form-container-border">
                    <Row>
                        <Col className="form-border form-left-bg font-small" span={6}>Staff</Col>
                        <Col className="form-border font-small" span={18}>{orderReturnApply.handleMan}</Col>
                    </Row>
                    <Row>
                        <Col className="form-border form-left-bg font-small" span={6}>ResolveTime</Col>
                        <Col className="form-border font-small" span={18}>{formatTime(orderReturnApply.handleTime)}</Col>
                    </Row>
                    <Row>
                        <Col className="form-border form-left-bg font-small" span={6}>ResolveNote</Col>
                        <Col className="form-border font-small" span={18}>{orderReturnApply.handleNote}</Col>
                    </Row>
                </div>}
                {orderReturnApply.status ===2 &&
                <div className="form-container-border">
                    <Row>
                        <Col className="form-border form-left-bg font-small" span={6}>Receiver</Col>
                        <Col className="form-border font-small" span={18}>{orderReturnApply.receiveMan}</Col>
                    </Row>
                    <Row>
                        <Col className="form-border form-left-bg font-small" span={6}>ReceiveTime</Col>
                        <Col className="form-border font-small" span={18}>{formatTime(orderReturnApply.receiveTime)}</Col>
                    </Row>
                    <Row>
                        <Col className="form-border form-left-bg font-small" span={6}>ReceiveNote</Col>
                        <Col className="form-border font-small" span={18}>{orderReturnApply.receiveNote}</Col>
                    </Row>
                </div>}
                {orderReturnApply.status === 0 &&
                <div className="form-container-border">
                    <Row>
                        <Col className="form-border form-left-bg font-small" span={6} style={{height:'52px',lineHeight:'32px'}}>ResolveNote</Col>
                        <Col className="form-border font-small" span={18}>
                            <Input size="small" value={updateStatusParam.handleNote} style={{width:'200px',marginLeft:'10px'}}
                            onChange={handleUpdateStatusParamChange} name="handleNote"/>
                        </Col>
                    </Row>
                </div>}
                {orderReturnApply.status === 1 &&
                <div className="form-container-border">
                    <Row>
                        <Col className="form-border form-left-bg font-small" span={6} style={{height:'52px',lineHeight:'32px'}}>ReceiveNote</Col>
                        <Col className="form-border font-small" span={18}>
                            <Input size="small" value={updateStatusParam.receiveNote} style={{width:'200px',marginLeft:'10px'}}
                            onChange={handleUpdateStatusParamChange} name="receiveNote"/>
                        </Col>
                    </Row>
                </div>}
                {orderReturnApply.status === 0 &&
                <Space style={{marginTop:'15px',textAlign:'center'}}>
                    <Button type="primary" size="small" onClick={()=>handleUpdateStatus(1)}>Confirm Return</Button>
                    <Button danger size="small" onClick={()=>handleUpdateStatus(3)}>Refuse Return</Button>
                </Space>}
                {orderReturnApply.status === 1 &&
                <Space style={{marginTop:'15px',textAlign:'center'}}>
                    <Button type="primary" size="small" onClick={()=>handleUpdateStatus(2)}>Confirm Receive</Button>
                </Space>}
            </Card>
        </div>
    )
}
export default ReturnApplyDetail ;