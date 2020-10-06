import React, {useState, useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../login/index';
import NotFound from '../404';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {getToken} from 'utils/auth';

function ProtectedLayout(props){
    useEffect(() => {
        NProgress.start;
        let { history: { replace },location } = props;
        if(getToken()){
            if(location.path="/login"){
                NProgress.done();
                replace("/home");
            }
        }
    }, [])
    return(
        <Switch>
            <Route exact path="/login" component={Login}/>
            <Route path="/404" component={NotFound}/>
        </Switch>
    )
}
export default ProtectedLayout;