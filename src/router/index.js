import renderRoutes from './renderRoutes';
import {default as routerConfig} from './routerConfig';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {getToken} from 'utils/auth'
import {userActions} from 'actions/user-actions';
import {store} from '../redux/store';
import { permissionActions } from '../redux/actions/permission-actions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


// function CustomRouter(){
//     const dispatch = useDispatch();
//     const data = useSelector(state => state.permissionReducer.routers);
//     useEffect(() => {  
//         if(getToken()){
//             var t1 = store.getState().userReducer;
//             if(store.getState().userReducer.roles.length===0){
//                 dispatch(userActions.GetInfo()).then(res=>{
//                     let menus = res.data.menus;
//                     let username = res.data.username;
//                     dispatch(permissionActions.GenerateRoutes({menus,username}));
//                 }).catch(error=>{
//                     console.log(error);
//                 })
//             }
//         }
//     }, [])

//     return renderRoutes({
//         routes: data
//     })
// }

const CustomRouter=()=>(
    renderRoutes({
        routes: routerConfig
    })
)

export default CustomRouter