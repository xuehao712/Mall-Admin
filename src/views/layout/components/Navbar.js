import React, {useState, useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, withRouter } from 'react-router-dom';
import CBreadcrumb  from 'components/Breadcrumb';
import CHamburger from 'components/Hamburger';
import { userActions } from 'actions/user-actions';
import './Navbar.scss';
import { appActions } from 'actions/app-actions';
import { Dropdown, Image, Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import {store} from '../../../redux/store';

function CNavbar(props){
    const dispatch= useDispatch();
    const avatar = useSelector(state => state.userReducer.avatar); 
    const [sideBarState, setSideBarState] = useState(null);
    store.subscribe(()=>{
        setSideBarState({...store.getState().appReducer.sidebar});
    })
    const logout=()=>{
        dispatch(userActions.LogOut()).then(()=>{
            location.reload();
        })
    }

    const toggleSideBar=()=>{
        dispatch(appActions.ToggleSidebar());
    }
    return(
        <Menu className="navbar" mode="horizontal">
            <Menu.Item key="hamburger">
                <CHamburger className="hamburger-container"toggleClick={toggleSideBar} isActive={sideBarState?sideBarState.opened:false}></CHamburger>
            </Menu.Item>
            <SubMenu key="icon" className="avatar-container" 
            icon={<div className="avatar-wrapper">
            <img className="user-avatar" src={avatar} style={{verticalAlign:'top'}}/>
            <CaretDownOutlined />
            </div>} popupClassName="user-dropdown">
                <Menu.Item key="home">
                    <Link className="inlineBlock" to="/">
                        Home
                    </Link>
                </Menu.Item>
                <Menu.Item key="logout">
                    <span onClick={logout} style={{display:'block'}}>Logout</span>
                </Menu.Item>
            </SubMenu>
        </Menu>        
    )
}
export default withRouter(CNavbar);