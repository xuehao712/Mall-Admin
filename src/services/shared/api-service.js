import Axios from './axios';
import {getToken} from '../../utils/auth';

export const apiServices = {
    get,
    post
}
const jwtStr = getToken();

function get(url,params){
    return Axios({
        url:url,
        method:'get',
        params:params
    })
}

function post(url,data){
    return Axios({
        url:url,
        method:'post',
        data:data
    })
}


