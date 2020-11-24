import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import { Button, Menu } from 'antd';
import {history} from '../../../../redux/shared/history-redux';
import SidebarItem from './SideBarItem';
import {store} from '../../../../redux/store';
import Icons from 'icons/index';
import { CScrollbar } from '../../../../components/ScrollBar';
import {asyncRouterMap} from '../../../../router/routerConfig';
import CSvgIcon from '../../../../components/CSvgIcon';


const {SubMenu} = Menu;
function CSidebar(props){


    const hasOneShowingChildren = (children)=>{
        const showingChildren = children.filter(item => {
            return !item.hidden;
        })
        if (showingChildren.length === 1) {
            return true;
        } 
        return false;
    }
    return(
            <CScrollbar>
                <Menu defaultSelectedKeys={[history.location.pathname]}
                mode="inline" theme="dark" style={{backgroundColor:'#304156',color:'#bfcbd9'}}>
                        {asyncRouterMap.map((item,index)=>{
                        if(!item.hidden&&item.children) {
                            return hasOneShowingChildren(item.children) && !item.children[0].children?(
                                <Menu.Item key={item.children[0].name+item.children[0].path}> 
                                    <Link to={item.children[0].path}>
                                        {item.children[0].meta&&item.children[0].meta.icon &&
                                            <CSvgIcon iconClass={item.children[0].meta.icon}></CSvgIcon>
                                        }
                                        {item.children[0].meta&&item.children[0].meta.title &&
                                            <span>
                                                {item.children[0].meta.title}
                                            </span>
                                        }
                                    </Link> 
                                </Menu.Item>
                            ):(
                                <SubMenu key={item.name + item.path} icon={(item.meta&&item.meta.icon &&
                                    <CSvgIcon iconClass={item.meta.icon}></CSvgIcon>)}
                                title={(item.meta&&item.meta.icon &&
                                    <span>{item.meta.title}</span>)}
                                >
                                    {item.children.map((child)=>{
                                        return (!child.hidden?
                                                        (<Menu.Item  key={child.name + child.path}> 
                                                            <Link to={child.path}>
                                                                {child.meta&&child.meta.icon &&
                                                                    <CSvgIcon iconClass={child.meta.icon}></CSvgIcon>
                                                                }
                                                                {child.meta&&child.meta.title &&
                                                                    <span>
                                                                        {child.meta.title}
                                                                    </span>
                                                                }
                                                            </Link> 
                                                        </Menu.Item>)
                                                    :null
                                                )
                                            }
                                        )    
                                    }
                                </SubMenu>
                            )
                        }
                    })  }
                </Menu>
        </CScrollbar>
    )
}
export default withRouter(CSidebar);