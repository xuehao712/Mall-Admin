import { loginServices } from "../../services/login";
import {getToken, setToken, removeToken} from "utils/auth"
import {store} from '../store';

export const userConstants = {
    SET_NAME: "SET_NAME",
    SET_AVATAR: "SET_AVATAR",
    SET_TOKEN: "SET_TOKEN",
    SET_ROLES: "SET_ROLES"
}

export const userActions = {
    Login,
    GetInfo,
    LogOut,
    FedLogOut
};

function Login(userInfo){
    const username = userInfo.username.trim();
    return dispatch =>{
        return new Promise((resolve,reject) =>{
            loginServices.login(username,userInfo.password).then(response =>{
                const data = response.data;
                const tokenStr = data.tokenHead+data.token;
                setToken(tokenStr);  
                dispatch({type: userConstants.SET_TOKEN,value:tokenStr});
                resolve(response);
            }).catch((error)=> {
                reject(error);
            })
        })
    }
}

function GetInfo(){
    return dispatch =>{
        return new Promise((resolve,reject)=>{
            loginServices.getInfo().then( response =>{
                const data = response.data;
                if(data.roles && data.roles.length>0){
                    dispatch({type:userConstants.SET_ROLES,value:data.roles});
                    dispatch({type:userConstants.SET_NAME,value:data.username});
                    dispatch({type:userConstants.SET_AVATAR,value:data.icon});
                }
                resolve(response);
            }).catch(error =>{
                reject(error);
            })
        })
    }
}

function LogOut(){
    return dispatch =>{
        return new Promise((resolve,reject)=> {
            loginServices.logout().then(()=>{      
                removeToken();   
                dispatch({type: userConstants.SET_TOKEN,value:''});
                dispatch({type: userConstants.SET_ROLES,value:[]});   
                resolve();
            }).catch(error =>{
                reject(error);
            })
        })      
    }
}

function FedLogOut(){
    return dispatch => {
        return new Promise((resolve)=>{
            dispatch({type: userConstants.SET_TOKEN,val:''});
            removeToken();
            resolve();
        })
    }
}