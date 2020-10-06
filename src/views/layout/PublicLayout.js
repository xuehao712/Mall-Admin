import React, {useState, useEffect} from 'react';
import {Layout } from 'antd';
import CNavbar from 'views/layout/components/Navbar';
import CSidebar from 'views/layout/components/sidebar';
import Login from 'views/login/index';
import CustomRouter from 'router/index';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../../redux/actions/app-actions';

const {
    Sider, Content,Header
} = Layout;

function PublicLayout(props){
    const dispatch = useDispatch();
    const sidebar = useSelector(state => state.appReducer)
    const toggleSideBar=()=>{
        dispatch(appActions.ToggleSidebar());
    }
    const routes = useSelector(state => state.permissionReducer.routers);
    return(
            <Layout>
                <Sider className="App-customMenu" style={{
                                                        overflow: "auto",
                                                        height: "100vh",
                                                        position: "sticky",
                                                        top: 0,
                                                        left: 0
                                                        }} 
                collapsible collapsed={sidebar.sidebar.opened} onCollapse={toggleSideBar}>
                    <CSidebar {...props} routes={routes}/>
                </Sider>
                <Layout>
                    <Header>
                        <CNavbar/>
                    </Header>
                    <Content className="App-contentMain" >
                        <CustomRouter/>
                    </Content>
                </Layout>
            </Layout> 
        
    )
}
export default PublicLayout;