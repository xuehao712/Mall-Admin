import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { Menu } from 'antd';
import { PieChartOutlined } from '@material-ui/icons';


const {SubMenu} = Menu;
function CSidebar(props){
    let {routes} = props;
    const hasOneShowingChildren = (children)=>{
        const showingChildren = children.filter(item => {
            return !item.hidden;
        })
        if (showingChildren.length === 1) {
            return true;
        }
        return false;
    }

    const sidebarItem=(route)=>{
        return route.map((item,index)=>{
            if(!item.hidden&&item.children){
                return hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow?(
                    <Menu.Item key={index}>
                        <a href={item.children[0].path} target="_self">
                            {item.children[0].meta&&item.children[0].meta.icon &&
                                <PieChartOutlined/>
                            }
                            {item.children[0].meta&&item.children[0].meta.title &&
                                <span>
                                    {item.children[0].meta.title}
                                </span>
                            }
                        </a> 
                    </Menu.Item >
                ):(
                    <SubMenu key={index} title={<span>
                                                    {item.meta&&item.meta.icon &&
                                                    <PieChartOutlined />}
                                                    {item.meta&&item.meta.title &&
                                                    <span> {item.meta.title}
                                                    </span>}
                                                </span>}>
                            {item.children.map((child)=>{
                                if(!child.hidden){
                                    return child.children&&child.children.length>0?(
                                        sidebarItem(child)
                                        ):(
                                        <Menu.Item  key={child.name}>
                                            <a href={child.path} target="_self">
                                                {child.meta&&child.meta.icon&&
                                                        <PieChartOutlined />
                                                }
                                            </a>  
                                            {child.meta&&child.meta.title &&
                                                <span>
                                                    {child.meta.title}
                                                </span>
                                            }
                                        </Menu.Item>
                                    )
                                }
                            })}
                    </SubMenu>
                )
            }  
        })
    }
    return(
        <Menu defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark">
            { sidebarItem(routes)}  
        </Menu>
    )
}
export default CSidebar;