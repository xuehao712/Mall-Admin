import { EnvironmentOutlined, WarningOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, message, Popover, Row, Space, Steps, Table } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'antd/lib/modal/Modal';
import Column from 'antd/lib/table/Column';
import React, {useState, useEffect} from 'react';
import {formatDate} from 'utils/date';
import LogisticsDialog from './components/logisticsDialog';
import {orderServices} from 'services/order';
import { useLocation } from 'react-router-dom';
import confirm from 'antd/lib/modal/confirm';
import { history } from '../../../redux/shared/history-redux';
import './orderDetail.scss';

const { Step } = Steps;
const ModalMessage = message;
function OrderDetail(){
    const route = useLocation();
    //Data
    const defaultReceiverInfo = {
        orderId:null,
        receiverName:null,
        receiverPhone:null,
        receiverPostCode:null,
        receiverDetailAddress:null,
        receiverProvince:null,
        receiverCity:null,
        receiverRegion:null,
        status:null
    };
    
    const [id, setId] = useState(null);
    const [order, setOrder] = useState({});
    const [receiverDialogVisible, setReceiverDialogVisible] = useState(false);
    const [receiverInfo, setReceiverInfo] = useState(defaultReceiverInfo);
    const [moneyDialogVisible, setMoneyDialogVisible] = useState(false);
    const [moneyInfo, setMoneyInfo] = useState({orderId:null,freightAmount:0,discountAmount:0,status:null});
    const [messageDialogVisible, setMessageDialogVisible] = useState(false);
    const [message, setMessage] = useState({
        title:null,
        content:null
    });
    const [closeDialogVisible, setCloseDialogVisible] = useState(false);
    const [closeInfo, setCloseInfo] = useState({
        note:null,
        id:null
    });
    const [markOrderDialogVisible, setMarkOrderDialogVisible] = useState(false);
    const [markInfo, setMarkInfo] = useState({
        note:null
    });
    const [logisticsDialogVisible, setLogisticsDialogVisible] = useState(false);

    //Initial
    useEffect(() => {
        setId(route.state.id);
        orderServices.getOrderDetail(route.state.id).then(response => {
            setOrder(response.data);
        });
    }, []);

    //Filter
    const formatNull=(value)=> {
        if(value===undefined||value===null||value===''){
          return 'N/A';
        }else{
          return value;
        }
    }
    const formatLongText=(value)=> {
        if(value===undefined||value===null||value===''){
          return 'N/A';
        }else if(value.length>8){
          return value.substr(0, 8) + '...';
        }else{
          return value;
        }
    }
    const formatPayType=(value)=> {
        if (value === 1) {
          return 'Card';
        } else if (value === 2) {
          return 'Paypal';
        } else {
          return 'UnPaid';
        }
    }
    const formatSourceType=(value)=> {
        if (value === 1) {
          return 'APP';
        } else {
          return 'PC';
        }
    }
    const formatOrderType=(value)=> {
        if (value === 1) {
          return 'Flash';
        } else {
          return 'Normal';
        }
    }
    const formatAddress=(order)=> {
        let str = order.receiverDetailAddress;
        if (order.receiverCity != null) {
          str += ",  " + order.receiverCity;
        }
        str += ",  " + order.receiverState;
        return str;
    }
    const formatStatus=(value)=>{
        if (value === 1) {
          return 'Unship';
        } else if (value === 2) {
          return 'Shipped';
        } else if (value === 3) {
          return 'Done';
        } else if (value === 4) {
          return 'Closed';
        } else if (value === 5) {
          return 'Invalid';
        } else {
          return 'Unpaid';
        }
    }
    const formatPayStatus=(value)=> {
        if (value === 0) {
          return 'Unpaid';
        } else if(value===4){
          return 'Returned';
        }else{
          return 'Paid';
        }
      }
    const formatDeliverStatus=(value)=> {
        if (value === 0||value === 1) {
          return 'Unship';
        } else {
          return 'Shipped';
        }
    }
    const formatProductAttr=(value)=>{
        if(value==null){
          return '';
        }else{
          let attr = JSON.parse(value);
          let result='';
          for(let i=0;i<attr.length;i++){
            result+=attr[i].key;
            result+=":";
            result+=attr[i].value;
            result+=";";
          }
          return result;
        }
    }
    const formatTime=(time)=>{
        if (time == null || time === '') {
            return '';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
    const formatStepStatus=(value)=>{
        if (value === 1) {
          //Unship
          return 2;
        } else if (value === 2) {
          //Shipped
          return 3;
        } else if (value === 3) {
          //Done
          return 4;
        }else {
          return 1;
        }
    }
    //Method
    const handleReceiverInfoChange=(e)=>{
        const {value,name}=e.target;
        setReceiverInfo({...receiverInfo,[name]:value});
    }
    const showUpdateReceiverDialog=()=>{
        setReceiverDialogVisible(true);
        setReceiverInfo({
            orderId:order.id,
            receiverName:order.receiverName,
            receiverPhone:order.receiverPhone,
            receiverPostCode:order.receiverPostCode,
            receiverDetailAddress:order.receiverDetailAddress,
            receiverProvince:order.receiverProvince,
            receiverCity:order.receiverCity,
            receiverRegion:order.receiverRegion,
            status:order.status
        })
    }
    const handleUpdateReceiverInfo=()=>{
        confirm({
            title:'Are you sure to modify delivery info?',
            okText:'Yes',
            cancelText:'Cancel',
            type:'warning',
            onOk(){
                orderServices.updateReceiverInfo(receiverInfo).then(response=>{
                    setReceiverInfo(false);
                    ModalMessage.success("Modify Success");
                    orderServices.getOrderDetail(id).then(response => {
                      setOrder(response.data);
                    });
                });
            },
           onCancel(){}
        })
    }
    const showUpdateMoneyDialog=()=>{
        setMoneyDialogVisible(true);
        let temp = moneyInfo;
        temp.orderId=order.id;
        temp.freightAmount=order.freightAmount;
        temp.discountAmount=order.discountAmount;
        temp.status=order.status;
        setMoneyInfo(temp);
    }
    const handleUpdateMoneyInfo=()=>{
        confirm({
            title:'Are you sure to modify fee info?',
            okText:'Yes',
            cancelText:'Cancel',
            type:'warning',
            onOk(){
                orderServices.updateMoneyInfo(moneyInfo).then(response=>{
                    setMoneyDialogVisible(false);
                    ModalMessage.success("Modify Success");
                    orderServices.getOrderDetail(id).then(response => {
                      setOrder(response.data);
                    });
                });
            },
           onCancel(){}
        })
    }
    const showMessageDialog=()=>{
        setMessageDialogVisible(true);
        let temp = message;
        temp.message=null;
        temp.message=null;
        setMessage(temp);
    }
    const handleSendMessage=()=>{
        confirm({
            title:'Are you sure to send message?',
            okText:'Yes',
            cancelText:'Cancel',
            type:'warning',
            onOk(){
                setMessageDialogVisible(false);
                ModalMessage.success("Send Success");
            },
           onCancel(){}
        })
    }
    const showCloseOrderDialog=()=>{
        setCloseDialogVisible(true);
        let temp = closeInfo;
        temp.note=null;
        temp.id=id;
        setCloseInfo(temp);
    }
    const handleCloseOrder=()=>{
        confirm({
            title:'Are you sure to close order',
            okText:'Yes',
            cancelText:'Cancel',
            type:'warning',
            onOk(){
                let params = new URLSearchParams();
                params.append("ids",[closeInfo.id]);
                params.append("note",closeInfo.note);
                orderServices.closeOrder(params).then(response=>{
                    setCloseDialogVisible(false);
                    ModalMessage.success("Order close success")
                    orderServices.getOrderDetail(this.id).then(response => {
                        setOrder(response.data);
                    });
                });
            },
           onCancel(){}
        })
    }
    const showMarkOrderDialog=()=>{
        setMarkOrderDialogVisible(true);
        setMarkInfo({...markInfo,id:id});
        setCloseInfo({...closeInfo,note:null});
    }
    const handleMarkOrder=()=>{
        confirm({
            title:'Are you sure to note order',
            okText:'Yes',
            cancelText:'Cancel',
            type:'warning',
            onOk(){
                let params = new URLSearchParams();
                params.append("id",markInfo.id);
                params.append("note",markInfo.note);
                params.append("status",order.status);
                orderServices.updateOrderNote(params).then(response=>{
                    setMarkOrderDialogVisible(false);
                    ModalMessage.success("Order note success")
                    orderServices.getOrderDetail(this.id).then(response => {
                        setOrder(response.data);
                    });
                });
            },
           onCancel(){}
        })
    }
    const handleDeleteOrder=()=>{
        confirm({
            title:'Are you sure to delete',
            okText:'Yes',
            cancelText:'Cancel',
            type:'warning',
            onOk(){
                let params = new URLSearchParams();
                params.append("ids",[id]);
                orderServices.deleteOrder(params).then(response=>{
                    ModalMessage.success("Delete success",5);
                    history.goBack();
                });
            },
           onCancel(){}
        })
    }
    const showLogisticsDialog=()=>{
        setLogisticsDialogVisible(true);
    }
    const handleMarkInfoChange=(e)=>{
        const {value,name} = e.target;
        setMarkInfo({...markInfo,[name]:value});
    }
    const handleMessageChange =(e)=>{
        const {value,name} = e.target;
        setMessage({...message,[name]:value});
    }
    const handleCloseInfoChange=(e)=>{
        const {value,name} = e.target;
        setCloseInfo({...closeInfo,[name]:value});
    }
    const handleMoneyInfoChange=(e)=>{
        const {value,name} = e.target;
        setMoneyInfo({...moneyInfo,[name]:value});
    }
    return(
        <div className="OrderDetail_detail-container">
            <div>
                <Steps current={formatStepStatus(order.status)} status="finish" style={{alignContent:'center'}}>
                    <Step title="Submit" description={formatTime(order.createTime)}></Step>
                    <Step title="Payment" description={formatTime(order.paymentTime)}></Step>
                    <Step title="Shippment" description={formatTime(order.deliveryTime)}></Step>
                    <Step title="Confirm" description={formatTime(order.receiveTime)}></Step>
                    <Step title="Review" description={formatTime(order.commentTime)}></Step>
                </Steps>
            </div>
            <Card style={{marginTop:'15px'}}>
                <div className="OrderDetail_operate-container">
                    <WarningOutlined style={{marginLeft:'20px'}}/>
                    <span className="color-danger">Current Status: {formatStatus(order.status)}</span>
                    {order.status===0 && 
                    <Space className="OrderDetail_operate-button-container">
                        <Button size="small" onClick={showUpdateReceiverDialog}>ModifyReceiverInfo</Button>
                        <Button size="small">ModifyProductInfo</Button>
                        <Button size="small" onClick={showUpdateMoneyDialog}>ModifyFeeInfo</Button>
                        <Button size="small" onClick={showMessageDialog}>SendMessage</Button>
                        <Button size="small" onClick={showCloseOrderDialog}>CloseOrder</Button>
                        <Button size="small" onClick={showMarkOrderDialog}>Note</Button>
                    </Space>
                    }
                    {order.status===1 && 
                    <Space className="OrderDetail_operate-button-container">
                        <Button size="small" onClick={showUpdateReceiverDialog}>ModifyReceiverInfo</Button>
                        <Button size="small" onClick={showMessageDialog}>SendMessage</Button>
                        <Button size="small">CancelOrder</Button>
                        <Button size="small" onClick={showMarkOrderDialog}>Note</Button>
                    </Space>
                    }
                    {(order.status===2||order.status===3) && 
                    <Space className="OrderDetail_operate-button-container">
                        <Button size="small" onClick={showLogisticsDialog}>TrackOrder</Button>
                        <Button size="small" onClick={showMessageDialog}>SendMessage</Button>
                        <Button size="small" onClick={showMarkOrderDialog}>Note</Button>
                    </Space>
                    }
                    {order.status===4 && 
                    <Space className="OrderDetail_operate-button-container">
                        <Button size="small" onClick={handleDeleteOrder}>DeleteOrder</Button>
                        <Button size="small" onClick={showMarkOrderDialog}>Note</Button>
                    </Space>
                    }
                </div>
                <div style={{marginTop:'20px'}}>
                    <EnvironmentOutlined/>
                    <span className="font-small">Basic Info</span>
                </div>
                <div className="OrderDetail_table-layout">
                    <Row>
                        <Col span={4} className="OrderDetail_table-cell-title">OrderSn</Col>
                        <Col span={4} className="OrderDetail_table-cell-title">DeliverySn</Col>
                        <Col span={4} className="OrderDetail_table-cell-title">Username</Col>
                        <Col span={4} className="OrderDetail_table-cell-title">Payment</Col>
                        <Col span={4} className="OrderDetail_table-cell-title">Source</Col>
                        <Col span={4} className="OrderDetail_table-cell-title">Type</Col>
                    </Row>
                    <Row>
                        <Col span={4} className="OrderDetail_table-cell">{order.orderSn}</Col>
                        <Col span={4} className="OrderDetail_table-cell">N/A</Col>
                        <Col span={4} className="OrderDetail_table-cell">{order.memberUsername}</Col>
                        <Col span={4} className="OrderDetail_table-cell">{formatPayType(order.payType)}</Col>
                        <Col span={4} className="OrderDetail_table-cell">{formatSourceType(order.sourceType)}</Col>
                        <Col span={4} className="OrderDetail_table-cell">{formatOrderType(order.orderType)}</Col>
                    </Row>
                    <Row>
                        <Col span={4} className="OrderDetail_table-cell-title">Freight</Col>
                        <Col span={4} className="OrderDetail_table-cell-title">Sn</Col>
                        <Col span={4} className="OrderDetail_table-cell-title">AntoConfirmTime</Col>
                        <Col span={4} className="OrderDetail_table-cell-title">PointReceive</Col>
                        <Col span={4} className="OrderDetail_table-cell-title">GrowReceive</Col>
                        <Col span={4} className="OrderDetail_table-cell-title">EventDetail</Col>
                    </Row>
                    <Row>
                        <Col span={4} className="OrderDetail_table-cell">{formatNull(order.deliveryCompany)}</Col>
                        <Col span={4} className="OrderDetail_table-cell">{formatNull(order.deliverySn)}</Col>
                        <Col span={4} className="OrderDetail_table-cell">{order.autoConfirmDay} Day</Col>
                        <Col span={4} className="OrderDetail_table-cell">{order.integration}</Col>
                        <Col span={4} className="OrderDetail_table-cell">{order.growth}</Col>
                        <Col span={4} className="OrderDetail_table-cell">
                            <Popover placement="top" title="EventDetail" style={{width:'200px'}} trigger="hover"
                            content={order.promotionInfo}>
                                <span>{formatLongText(order.promotionInfo)}</span>
                            </Popover>
                        </Col>
                    </Row>
                </div>
                <div style={{marginTop:'20px'}}>
                    <EnvironmentOutlined/>
                    <span className="font-small">Receiver Info</span>
                </div>
                <div className="OrderDetail_table-layout">
                    <Row>
                        <Col span={6} className="OrderDetail_table-cell-title">Receiver</Col>
                        <Col span={6} className="OrderDetail_table-cell-title">Phone</Col>
                        <Col span={6} className="OrderDetail_table-cell-title">ZipCode</Col>
                        <Col span={6} className="OrderDetail_table-cell-title">Address</Col>
                    </Row>
                    <Row>
                        <Col span={6} className="OrderDetail_table-cell">{order.receiverName}</Col>
                        <Col span={6} className="OrderDetail_table-cell">{order.receiverPhone}</Col>
                        <Col span={6} className="OrderDetail_table-cell">{order.receiverZipCode}</Col>
                        <Col span={6} className="OrderDetail_table-cell">{formatAddress(order)}</Col>
                    </Row>
                </div>
                <div style={{marginTop:'20px'}}>
                    <EnvironmentOutlined/>
                    <span className="font-small">Product Info</span>
                </div>
                <Table rowKey="id" pagination={false} bordered dataSource={order.orderItemList} style={{width:'100%',marginTop:'20px'}}>
                    <Column title="Picture" width="120" align="center" render={(text,record,index)=>
                        <div>
                            <img src={record.productPic} style={{height:'80px'}}/>
                        </div>
                    }/>
                    <Column title="Name" align="center" render={(text,record,index)=>
                        <div>
                            <p>{record.productName}</p>
                            <p>Brand: {record.productBrand}</p>
                        </div>
                    }/>
                    <Column title="Price/Sn" width="120" align="center" render={(text,record,index)=>
                        <div>
                            <p>Price: ${record.productPrice}</p>
                            <p>Sn: {record.productSn}</p>
                        </div>
                    }/>
                    <Column title="Attribute" width="120" align="center" render={(text,record,index)=>
                        <div>
                            {formatProductAttr(record.productAttr)}
                        </div>
                    }/>
                    <Column title="Quantity" width="120" align="center" render={(text,record,index)=>
                        <div>
                            {record.productQuantity}
                        </div>
                    }/>
                    <Column title="Subtotal" width="120" align="center" render={(text,record,index)=>
                        <div>
                            ${record.productPrice*record.productQuantity}
                        </div>
                    }/>
                </Table>
                <div style={{float:'right',margin:'20px'}}>
                    Total: <span className="color-danger">${order.totalAmount}</span>
                </div>
                <div style={{marginTop:'60px'}}>
                    <EnvironmentOutlined/>
                    <span className="font-small">Fee Info</span>
                </div>
                <div className="OrderDetail_table-layout">
                    <Row>
                        <Col span={6} className="OrderDetail_table-cell-title">Total</Col>
                        <Col span={6} className="OrderDetail_table-cell-title">Freight</Col>
                        <Col span={6} className="OrderDetail_table-cell-title">Coupon</Col>
                        <Col span={6} className="OrderDetail_table-cell-title">Point</Col>
                    </Row>
                    <Row>
                        <Col span={6} className="OrderDetail_table-cell">${order.totalAmount}</Col>
                        <Col span={6} className="OrderDetail_table-cell">${order.freightAmount}</Col>
                        <Col span={6} className="OrderDetail_table-cell">-${order.couponAmount}</Col>
                        <Col span={6} className="OrderDetail_table-cell">-${order.integrationAmount}</Col>
                    </Row>
                    <Row>
                        <Col span={6} className="OrderDetail_table-cell-title">Event</Col>
                        <Col span={6} className="OrderDetail_table-cell-title">Discount</Col>
                        <Col span={6} className="OrderDetail_table-cell-title">Total</Col>
                        <Col span={6} className="OrderDetail_table-cell-title">Pay</Col>
                    </Row>
                    <Row>
                        <Col span={6} className="OrderDetail_table-cell">-${order.promotionAmount}</Col>
                        <Col span={6} className="OrderDetail_table-cell">-${order.discountAmount}</Col>
                        <Col span={6} className="OrderDetail_table-cell">
                            <span className="color-danger">${order.totalAmount + order.freightAmount}</span>
                        </Col>
                        <Col span={6} className="OrderDetail_table-cell">
                            <span className="color-danger">${order.payAmount + order.freightAmount - order.discountAmount}</span>
                        </Col>
                    </Row>
                </div>
                <div style={{marginTop:'20px'}}>
                    <EnvironmentOutlined/>
                    <span className="font-small">Operation Info</span>
                </div>
                <Table rowKey="id" pagination={false} bordered dataSource={order.historyList} style={{width:'100%',marginTop:'20px'}}>
                    <Column title="Operator" width="120" align="center" render={(text,record,index)=>
                        <div>
                            {record.operateMan}
                        </div>
                    }/>
                    <Column title="Time" align="center" render={(text,record,index)=>
                        <div>
                            {formatTime(record.createTime)}
                        </div>
                    }/>
                    <Column title="OrderStatus" width="120" align="center" render={(text,record,index)=>
                        <div>
                            {formatStatus(record.orderStatus)}
                        </div>
                    }/>
                    <Column title="PaymentStatus" width="120" align="center" render={(text,record,index)=>
                        <div>
                            {formatPayStatus(record.orderStatus)}
                        </div>
                    }/>
                    <Column title="ShipStatus" width="120" align="center" render={(text,record,index)=>
                        <div>
                            {formatDeliverStatus(record.orderStatus)}
                        </div>
                    }/>
                    <Column title="Note" align="center" render={(text,record,index)=>
                        <div>
                            {record.note}
                        </div>
                    }/>
                </Table>
            </Card>
            <Modal title="Modify Delivery Info" visible={receiverDialogVisible} width="40%" onOk={handleUpdateReceiverInfo} onCancel={()=>setReceiverDialogVisible(false)}>
                <Form labelCol={{span:4}}>
                    <Form.Item label="Name: ">
                        <Input value={receiverInfo.receiverName} name="receiverName" onChange={handleReceiverInfoChange} style={{width:'200px'}}/>
                    </Form.Item>
                    <Form.Item label="Phone: ">
                        <Input value={receiverInfo.receiverPhone} name="receiverPhone" onChange={handleReceiverInfoChange} style={{width:'200px'}}/>
                    </Form.Item>
                    <Form.Item label="ZipCode: ">
                        <Input value={receiverInfo.receiverZipCode} name="receiverZipCode" onChange={handleReceiverInfoChange} style={{width:'200px'}}/>
                    </Form.Item>
                    <Form.Item label="City: ">
                        <Input value={receiverInfo.receiverCity} name="receiverCity" onChange={handleReceiverInfoChange} style={{width:'200px'}}/>
                    </Form.Item>
                    <Form.Item label="State: ">
                        <Input value={receiverInfo.receiverState} name="receiverState" onChange={handleReceiverInfoChange} style={{width:'200px'}}/>
                    </Form.Item>
                    <Form.Item label="Address: ">
                        <TextArea value={receiverInfo.receiverDetailAddress} name="receiverDetailAddress" onChange={handleReceiverInfoChange} style={{width:'200px'}}/>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="Modify Fee Info" visible={moneyDialogVisible} width="40%" onOk={handleUpdateMoneyInfo} onCancel={()=>setMoneyDialogVisible(false)}> 
                <div className="OrderDetail_table-layout">
                    <Row>
                        <Col span={6} className="OrderDetail_table-cell-title">Total</Col>
                        <Col span={6} className="OrderDetail_table-cell-title">Freight</Col>
                        <Col span={6} className="OrderDetail_table-cell-title">Coupon</Col>
                        <Col span={6} className="OrderDetail_table-cell-title">Point</Col>
                    </Row>
                    <Row>
                        <Col span={6} className="OrderDetail_table-cell">${order.totalAmount}</Col>
                        <Col span={6} className="OrderDetail_table-cell">
                            <Input type="number" value={moneyInfo.freightAmount} name="freightAmount" onChange={handleMoneyInfoChange} size="small" suffix="$"/>
                        </Col>
                        <Col span={6} className="OrderDetail_table-cell">${order.couponAmount}</Col>
                        <Col span={6} className="OrderDetail_table-cell">${order.integrationAmount}</Col>
                    </Row>
                    <Row>
                        <Col span={6} className="OrderDetail_table-cell-title">Event</Col>
                        <Col span={6} className="OrderDetail_table-cell-title">Discount</Col>
                        <Col span={6} className="OrderDetail_table-cell-title">Total</Col>
                        <Col span={6} className="OrderDetail_table-cell-title">Pay</Col>
                    </Row>
                    <Row>
                        <Col span={6} className="OrderDetail_table-cell">-${order.promotionAmount}</Col>
                        <Col span={6} className="OrderDetail_table-cell">
                            <Input type="number" value={moneyInfo.discountAmount} name="discountAmount" onChange={handleMoneyInfoChange} size="small" suffix="-$"/>
                        </Col>
                        <Col span={6} className="OrderDetail_table-cell">
                            <span className="color-danger">${order.totalAmount + moneyInfo.freightAmount}</span>
                        </Col>
                        <Col span={6} className="OrderDetail_table-cell">
                            <span className="color-danger">${order.payAmount+moneyInfo.freightAmount-moneyInfo.discountAmount}</span>
                        </Col>
                    </Row>
                </div>
            </Modal>
            <Modal title="Send Message" visible={messageDialogVisible} width="40%" onCancel={()=>setMessageDialogVisible(false)} onOk={handleSendMessage}>
                <Form labelCol={{span:4}}>
                    <Form.Item label="Title: ">
                        <Input value={message.title} style={{width:'200px'}} name="title" onChange={handleMessageChange}></Input>
                    </Form.Item>
                    <Form.Item label="Content: ">
                        <TextArea value={message.content} rows={3} name="content" onChange={handleMessageChange}></TextArea>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="Close Order" visible={closeDialogVisible} width="40%" onCancel={()=>setCloseDialogVisible(false)} onOk={handleCloseOrder}>
                <Form labelCol={{span:4}}>
                    <Form.Item label="Note: ">
                        <TextArea value={closeInfo.note} rows={3} name="note" onChange={handleCloseInfoChange}></TextArea>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="Note" visible={markOrderDialogVisible} width="40%" onCancel={()=>setMarkOrderDialogVisible(false)} onOk={handleMarkOrder}>
                <Form labelCol={{span:4}}>
                    <Form.Item label="Note: ">
                        <TextArea value={markInfo.note} rows={3} name="note" onChange={handleMarkInfoChange}></TextArea>
                    </Form.Item>
                </Form>
            </Modal>
            <LogisticsDialog onChange={setLogisticsDialogVisible} value={logisticsDialogVisible}/>
        </div>
    )
}
export default OrderDetail;