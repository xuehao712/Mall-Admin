import React, { lazy, Suspense, useEffect } from "react";
import { message, Spin } from "antd";
import {
  Router, 
  HashRouter, 
  Link,
  NavLink, 
  Route, 
  Switch,
  Redirect,
} from "react-router-dom";
import {getToken} from 'utils/auth';
import {store} from '../redux/store';
import { userActions } from "../redux/actions/user-actions";
import { permissionActions } from "../redux/actions/permission-actions";
import {history} from '../redux/shared/history-redux';
import { useDispatch, useSelector } from "react-redux";
import {asyncRouterMap} from './routerConfig';

const ErrorRoute = lazy(()=> import("views/404"));
const Login = lazy(()=> import('views/login/index'));
const Layout = lazy(()=> import('views/layout/MainLayout'));

/* first level */
export const AppRoutes = (props) => {
  return (
    <Router history={history}>
      <Suspense
      fallback={
        <div className="spin-container">
          <Spin size="large" tip="Loading..." />
        </div>
        }
      >
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/404" component={ErrorRoute} />
            <AuthRoute path="/" component={Layout} />
            <Route component={ErrorRoute}/>
        </Switch>
      </Suspense>
    </Router>
  );
};
/* second level */
export const MainRoutes = () => {
    const dispatch = useDispatch();
    // useEffect(() => {
    //     if(store.getState().userReducer.roles.length === 0) {
    //         dispatch(userActions.GetInfo()).then(res=>{
    //             let menus = res.data.menus;
    //             let username = res.data.username;
    //             dispatch(permissionActions.GenerateRoutes({menus,username}));
    //         }).catch((error)=>{
    //             dispatch(userActions.FedLogOut()).then(()=>{
    //                 message.error(error || 'Verification failed, please login again');
    //                 history.push('/');
    //             })
    //         })
    //     }
    // }, [])
    useEffect(() => {
      dispatch(userActions.GetInfo())
    }, [])
    return (
    <Suspense
      fallback={
        <div className="spin-container">
          <Spin size="large" tip="Loading..." />
        </div>
      }
    >
      <section className="app-main">
        <Switch>
            {
              asyncRouterMap.map((item,index)=>{
                if(item.children) {
                  return[
                      item.children.map((citem,index)=>{
                        return <Route exact path={citem.path} key={citem.path} component={citem.component}/>
                      }),
                      <Redirect exact from={item.path} to={item.redirect} key={item.path +"redirect"}/>
                    ]
                  
                } else {
                  if(item.redirect){
                    if(!item.component){
                      return <Redirect exact from={item.path} key={item.path+"redirect"} to ={item.redirect}/>
                    }else {
                      return[
                        <Route key={item.path} exact path={item.path} component={item.component}/>,
                        <Redirect exact from={item.path} key={item.path+"redirect"} to={item.redirect}/>
                      ]
                    }
                  }else {
                    return <Route key={item.path} exact path={item.path} component={item.component}/>
                  }
                }
              })
            }
        </Switch>
      </section>
    </Suspense>
  );
};

// Login Auth
const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        getToken() ? 
        <Component {...props} /> 
        : 
        <Redirect to="/login" />
      }
    />
  );
};