import axios from 'axios';
import './axios.scss';
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { message, Spin } from 'antd';
import config from 'config';
import {getToken} from '../../utils/auth';
import { store } from '../../redux/store';

const Axios = axios.create({
    timeout:2000000,
})

Axios.defaults.baseURL = config.apiUrl;
Axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

let requestCount = 0;

function showLoading() {
    if(requestCount === 0) {
        var dom = document.createElement('div');
        dom.setAttribute('id','loading');
        document.body.appendChild(dom);
        ReactDOM.render(
            <Spin tip="Loading..." size="large"/>,dom
        )
    }
    requestCount++;
}

function hideLoading() {
    requestCount--;
    if(requestCount === 0) {
        document.body.removeChild(document.getElementById('loading'));
    }
}

Axios.interceptors.request.use(config =>{
    if(config.headers.isLoading !== false) {
        showLoading();
    }
    if (store.getState().userReducer.token) {
        config.headers['Authorization'] = getToken() 
    }
    return config;
},error=>{
    if(error.config.headers.isLoading !==false) {
        hideLoading();
    }
    return Promise.reject(error);
})

Axios.interceptors.response.use(response => {
    if(response.config.headers.isLoading !==false) {
        hideLoading();
    }
    const res = response.data;
    if(res.code!==200) {
        message.error(res.message,5);

        if(res.code ===401) {
            store.dispatch(userActions.FedLogOut()).then(()=>{
                location.reload();
            }) 
        }
        return Promise.reject('error');
    } else {
        return response.data;
    }
},error => {
    if(error.config.headers.isLoading!== false) {
        hideLoading();
    }
    console.log('err' + error)// for debug
    message.error(error.message,5);
    return Promise.reject(error)
})
Component.prototype.$axios = Axios;

export default Axios;