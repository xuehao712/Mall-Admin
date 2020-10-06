import React from 'react';
import { Redirect, Route } from 'react-router-dom'
import RouterGuard from './routerGuard'

const renderRoutesMap = (routes) => (
    routes.map((route, index) => {
        if(route.redirect){
            return( <Redirect key={index} from={route.path} to={route.redirect}/> && (route.children && renderRoutesMap(route.children)))
        }else{
            return (
                <Route key={index} path={route.path} exact render={props => (
                    <RouterGuard {...route} {...props} />
                )}/>
            )
        }
        
    })
)
export default renderRoutesMap