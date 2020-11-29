import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

import './index.scss'
import {str2Date} from 'utils/date';
import img_home_order from '../../assets/images/home_order.png'
import img_home_today_amount from 'assets/images/home_today_amount.png';
import img_home_yesterday_amount from 'assets/images/home_yesterday_amount.png';
import { Button, Col, Row } from 'antd';

function Home(props){
    var moment = require('moment');
    useEffect(() => {
        getData();
    }, [])
    /* States init */
    let start = new moment();
    start.year(2020);
    start.month(10);
    start.date(1);
    let end = new moment(start);
    end.date(7);

    const [dateRange, setdateRange] = useState({
        startDate: start,
        endDate: end
      });
    const [hFocusedInput, setHFocusedInput] = useState(null);
    

    //Dummy data
    const BACKEND_DATA =[
          {date: '2020-11-01', orderCount: 43, orderAmount: 1093},
          {date: '2020-11-02', orderCount: 21, orderAmount: 2230},
          {date: '2020-11-03', orderCount: 45, orderAmount: 22212},
          {date: '2020-11-04', orderCount: 50, orderAmount: 6423},
          {date: '2020-11-05', orderCount: 80, orderAmount: 3321},
          {date: '2020-11-06', orderCount: 77, orderAmount: 6293},
          {date: '2020-11-07', orderCount: 20, orderAmount: 2293},
          {date: '2020-11-08', orderCount: 12, orderAmount: 127},
          {date: '2020-11-09', orderCount: 30, orderAmount: 1547},
          {date: '2020-11-10', orderCount: 30, orderAmount: 3293},
          {date: '2020-11-11', orderCount: 10, orderAmount: 2293},
          {date: '2020-11-12', orderCount: 225, orderAmount: 8293},
          {date: '2020-11-13', orderCount: 100, orderAmount: 21321},
          {date: '2020-11-14', orderCount: 112, orderAmount: 1293},
          {date: '2020-11-15', orderCount: 543, orderAmount: 42930}
        ];
        
    const [chartData, setChartData] = useState([]);

    // Handle initial
   
    const hHandleDateChange = (startDate, endDate) =>{

        setdateRange({startDate,endDate}) 
    }

    useEffect(() => {
        getData();
    }, [dateRange])

    const hHandleFocusChange = (focusedInput) => {
        setHFocusedInput(focusedInput);
    }
    function getData(){
        setTimeout(()=>{
            var chartdata=[];
            for(let i=0;i<BACKEND_DATA.length;i++){
                let item = BACKEND_DATA[i];
                let currDate = str2Date(item.date);
                let start = dateRange.startDate;
                let end = dateRange.endDate;
                if(currDate.getTime()>=start.valueOf()&&currDate.getTime()<=end.valueOf()){
                    chartdata.push(item);
                }
            }
            setChartData(chartdata);
        },1000)
    }
    
    return(
        <div className="app-container app-container_home">
            <div className="address-layout_home">
                <Row gutter={20}>
                    <Col span={6}>
                        <div className="out-border_home">
                            <div className="layout-title_home">BackEnd</div>
                            <div className="text-primary address-content_home">
                                <Button type="link" href="https://github.com/xuehao712/Mall">
                                    mall
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className="out-border_home">
                            <div className="layout-title_home">FrontEnd</div>
                            <div className="text-primary address-content_home">
                                <Button type="link" href="https://github.com/xuehao712/Mall-Admin">
                                    mall-admin
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className="out-border_home">
                            <div className="layout-title_home">Welcome</div>
                            <div className="text-primary address-content_home">
                                <Button type="link" href="https://github.com/xuehao712">
                                    My Github
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="total-layout_home">
                <Row gutter={20}>
                    <Col span={6}>
                        <div className="total-frame_home">
                            <img src={img_home_order} className="total-icon_home"></img>
                            <div className="total-title_home">Today order total:</div>
                            <div className="total-value_home">50</div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className="total-frame_home">
                            <img src={img_home_today_amount} className="total-icon_home"></img>
                            <div className="total-title_home">Today sale total:</div>
                            <div className="total-value_home">$5000.00</div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className="total-frame_home">
                            <img src={img_home_yesterday_amount} className="total-icon_home"></img>
                            <div className="total-title_home">Yesterday sale total:</div>
                            <div className="total-value_home">$4000.00</div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="un-handle-layout_home">
                <div className="layout-title_home">Unhandle Business</div>
                <div className="un-handle-content_home">
                    <Row gutter={20}>
                        <Col span={8}>
                            <div className="un-handle-item_home">
                                <span className="font-medium">Unpaid order</span>
                                <span style={{float:"right"}} className="color-danger">(20)</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="un-handle-item_home">
                                <span className="font-medium">Completed order</span>
                                <span style={{float:"right"}} className="color-danger">(20)</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="un-handle-item_home">
                                <span className="font-medium">Wait to confirm order</span>
                                <span style={{float:"right"}} className="color-danger">(20)</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="un-handle-item_home">
                                <span className="font-medium">Unshipped order</span>
                                <span style={{float:"right"}} className="color-danger">(20)</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="un-handle-item_home">
                                <span className="font-medium">Out of stock</span>
                                <span style={{float:"right"}} className="color-danger">(20)</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="un-handle-item_home">
                                <span className="font-medium">Unsolved return application</span>
                                <span style={{float:"right"}} className="color-danger">(20)</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="un-handle-item_home">
                                <span className="font-medium">Shipped order</span>
                                <span style={{float:"right"}} className="color-danger">(20)</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="un-handle-item_home">
                                <span className="font-medium">Unsolved return order</span>
                                <span style={{float:"right"}} className="color-danger">(20)</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="un-handle-item_home">
                                <span className="font-medium">Advertise almost expire</span>
                                <span style={{float:"right"}} className="color-danger">(20)</span>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="overview-layout_home">
                <Row gutter={20}>
                    <Col span={12}>
                        <div className="out-border_home">
                            <div className="layout-title_home">Product Overview</div>
                            <div style={{padding:"40px"}}>
                                <Row>
                                    <Col span={6} className="color-danger overview-item-value_home">200</Col>
                                    <Col span={6} className="color-danger overview-item-value_home">100</Col>
                                    <Col span={6} className="color-danger overview-item-value_home">200</Col>
                                    <Col span={6} className="color-danger overview-item-value_home">5000</Col>
                                </Row>
                                <Row>
                                    <Col span={6} className="overview-item-title_home">Unpublished</Col>
                                    <Col span={6} className="overview-item-title_home">Published</Col>
                                    <Col span={6} className="overview-item-title_home">Low-Stock</Col>
                                    <Col span={6} className="overview-item-title_home">Total Products</Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="out-border_home">
                            <div className="layout-title_home">User Overview</div>
                            <div style={{padding:"40px"}}>
                                <Row>
                                    <Col span={6} className="color-danger overview-item-value_home">20</Col>
                                    <Col span={6} className="color-danger overview-item-value_home">100</Col>
                                    <Col span={6} className="color-danger overview-item-value_home">220</Col>
                                    <Col span={6} className="color-danger overview-item-value_home">4500</Col>
                                </Row>
                                <Row>
                                    <Col span={6} className="overview-item-title_home">Today Increase</Col>
                                    <Col span={6} className="overview-item-title_home">Yesterday Increase</Col>
                                    <Col span={6} className="overview-item-title_home">Month Increase</Col>
                                    <Col span={6} className="overview-item-title_home">Total Users</Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="statistics-layout_home">
                <div className="layout-title_home">Order Statistics</div>
                <Row>
                    <Col span={4}>
                        <div style={{padding:'20px'}}>
                            <div>
                                <div style={{color:'#909399'}} className="m-size-medium">Monthly Order Amount</div>
                                <div style={{color:'#606266',fontSize:'24px'}}>500000</div>
                                <div>
                                    <span className="color-success m-size-medium">+50% </span>
                                    <span style={{color:'#C0C4CC'}} className="m-size-medium">From last month</span>
                                </div>
                            </div>
                            <div style={{marginTop:'20px'}}>
                                <div style={{color:'#909399'}} className="m-size-medium">Weekly Order Amount</div>
                                <div style={{color:'#606266',fontSize:'24px'}}>25000</div>
                                <div>
                                    <span className="color-danger m-size-medium">-30% </span>
                                    <span style={{color:'#C0C4CC'}} className="m-size-medium">From last week</span>
                                </div>
                            </div>
                            <div style={{marginTop:'20px'}}>
                                <div style={{color:'#909399'}} className="m-size-medium">Monthly Sale Amount</div>
                                <div style={{color:'#606266',fontSize:'24px'}}>45000</div>
                                <div>
                                    <span className="color-success m-size-medium">+20% </span>
                                    <span style={{color:'#C0C4CC'}} className="m-size-medium">From last month</span>
                                </div>
                            </div>
                            <div style={{marginTop:'20px'}}>
                                <div style={{color:'#909399'}} className="m-size-medium">Weekly Sale Amount</div>
                                <div style={{color:'#606266',fontSize:'24px'}}>31000</div>
                                <div>
                                    <span className="color-danger m-size-medium"> -12%</span>
                                    <span style={{color:'#C0C4CC'}} className="m-size-medium">From last week</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={20}>
                        <div style={{borderLeft:'1px solid #DCDFE6'}} className="m-padding-small">
                            <DateRangePicker 
                                startDate={dateRange.startDate}
                                startDateId="m-home-start_date"
                                endDate={dateRange.endDate}
                                endDateId="m-home-end_date"
                                onDatesChange={({startDate,endDate})=>hHandleDateChange(startDate,endDate)}
                                focusedInput={hFocusedInput}
                                onFocusChange={hHandleFocusChange}
                                isOutsideRange={() => false}
                            />
                            <ResponsiveContainer width="95%" height={350}>
                                <LineChart data={chartData}>
                                    <Line type="monotone" dataKey="orderAmount" stroke="#8884d8" />
                                    <CartesianGrid stroke="#ccc" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                </LineChart>
                            </ResponsiveContainer>   
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default Home ;