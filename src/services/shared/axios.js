import axios from 'axios';
import './axios.scss';
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { message, Spin } from 'antd';
import config from 'config';
import {getToken} from '../../utils/auth';
import { store } from '../../redux/store';
import NProgress from 'nprogress' 
import 'nprogress/nprogress.css'

const Axios = axios.create({
    timeout:2000000,
})

Axios.defaults.baseURL = config.apiUrl;
Axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

Axios.interceptors.request.use((config) =>{
    if(config.headers.isLoading !== false) {
        NProgress.start();
    }
    if (store.getState().userReducer.token) {
        config.headers['Authorization'] = getToken() 
    }
    return Promise.resolve(config);
},(error)=>{
    if(error.config.headers.isLoading !==false) {
        NProgress.done();
    }
    return Promise.reject(error);
})

Axios.interceptors.response.use((response) => {
    if(response.config.headers.isLoading !==false) {
        NProgress.done();
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
        return Promise.resolve(response.data);
    }
},(error) => {
    if(error.config.headers.isLoading!== false) {
        NProgress.done();
    }
    console.log('err' + error)// for debug
    message.error(error.message,5);
    return Promise.reject(error)
})
Component.prototype.$axios = Axios;

export default Axios;