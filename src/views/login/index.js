import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './index.scss'
import {isvalidUsername} from 'utils/validate';
import {setSupport,getSupport,setCookie,getCookie} from 'utils/support';
import {getToken as TokenAuth} from 'utils/auth';
import {userActions} from 'actions/user-actions';
import { Redirect, useHistory, useLocation } from "react-router-dom";
import login_center_bg from '../../assets/images/login_center_bg.png';
import { Button, Card, Form, Input, message, Space } from 'antd';
import {
    LockOutlined,
    UserOutlined
  } from '@ant-design/icons';
import { LocalMallOutlined } from '@material-ui/icons';
import { useForm } from 'antd/lib/form/Form';
import {history} from '../../redux/shared/history-redux';

function Login(){
    const dispatch = useDispatch();
    const validateUsername=(rule,value)=>{
        if(!isvalidUsername(value)){
            return Promise.reject("Please enter correct username!");
        }else {
            return Promise.resolve();
        }
    }
    const validatePassword=(rule,value)=>{
        if(value.length<3){
            return Promise.reject("Password length must be greater than 3!");
        }else {
            return Promise.resolve();
        }
    }
    //Initial
    const [loginForm] = useForm();
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        loginForm.setFieldsValue({username:getCookie("username"),password:getCookie("password")});
        if(loginForm.getFieldValue("username")===undefined ||loginForm.getFieldValue("username")===null
        ||loginForm.getFieldValue("username")===""){
            loginForm.setFieldsValue({...loginForm.getFieldsValue(),username:'admin'});
        }
        if(loginForm.getFieldValue("password")===undefined ||loginForm.getFieldValue("password")===null
        ||loginForm.getFieldValue("password")===""){
            loginForm.setFieldsValue({...loginForm.getFieldsValue(),password:'123456'});
        }
    }, []);

    //methods
    const handleLogin=()=>{
        setLoading(true);
        dispatch(userActions.Login(loginForm.getFieldsValue())).then((response)=>{
            setLoading(false);
            setCookie("username",loginForm.getFieldValue("username"),15);
            setCookie("password",loginForm.getFieldValue("password"),15);
            history.push("/");
        }).catch(()=>{
            setLoading(false);
        })
    }
    const handleLoginFail=()=>{
        message.warning("Validation error!",5);
        return false;
    }
    const handleKeyPress=(e)=>{
        console.log(e);
    }
    return(
        <div>
            <Card className="login-form-layout">
                <Form autoComplete="on" form={loginForm} labelAlign="left" onFinish={handleLogin} onFinishFailed={handleLoginFail}>
                    <div style={{textAlign:'center'}}>
                        <LocalMallOutlined style={{width:'56px',height:'56px',color:'#409EFF'}}></LocalMallOutlined>
                    </div>
                    <h2 className="login-title color-main">mall-admin-web</h2>
                    <Form.Item name="username" rules={[{required:true,validator:validateUsername}]}>
                        <Input prefix={<UserOutlined className="color-main"/>} type="text"autoComplete="on" placeholder="Please enter username"/>
                    </Form.Item>
                    <Form.Item name="password" rules={[{required:true,validator:validatePassword}]}>
                        <Input.Password prefix={<LockOutlined className="color-main"/>} onKeyUp={handleKeyPress} autoComplete="on" placeholder="Please enter password"/>
                    </Form.Item>
                    <Form.Item style={{marginBottom:'60px',textAlign:'center'}}>
                        <Space>
                            <Button type="primary" loading={loading} htmlType="submit">
                                Login
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
            <img src={login_center_bg} className="login-center-layout"/>
        </div>
    )
}
export default Login;