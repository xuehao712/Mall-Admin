import React, {useState, useEffect} from 'react';
import { Button, Col } from 'antd';
import img_404 from '../assets/images/404.png';
import { history } from '../redux/shared/history-redux';
import './404.scss';

function NotFound(){
    const handleGoMain=()=>{
        history.push('/');
    }
    
    return(
        <div>
            <div className="Error_app-container app-container">
                <Col span={12}>
                    <img src={img_404} alt='404' className="img-style"/>
                </Col>
                <Col span={12}>
                    <div style={{marginLeft:'100px',marginTop:'60px'}}>
                        <h1 className="color-main">OPPS!</h1>
                        <h2 style={{color:'#606266'}}>Sorry, Your page has lost!</h2>
                        <div style={{color:'#909399',fontSize:'14px'}}>Please Check the address you entered or press below button to return to main page</div>
                        <Button style={{marginTop:'20px'}} type="primary" shape="round" onClick={handleGoMain}>Home</Button>
                    </div> 
                </Col>
            </div>
        </div>
    )
};
export default NotFound;