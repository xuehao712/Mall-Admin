import { Breadcrumb } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import {asyncRouterMap} from '../../router/routerConfig';
import './index.scss';

function CBreadcrumb(props){
    useEffect(() => {
        getBreadcrumb();
    }, []);
    const route = useLocation();
    useEffect(() => {
        getBreadcrumb();
    }, [route]);
    const getBreadcrumb=()=>{
        let list = route.pathname.split("/");
        let matched = filterDeep(list,[]);
        const first = matched[0];
        if(!first){
            matched=[{path:'/home',meta:{title:'home'}}];
        }else if(first && first.name!=='home'){
            matched=[{path:'/home',meta:{title:'home'}}].concat(matched);
        }
        
        setLevelList([...matched]);
    }; 

    const [levelList, setLevelList] = useState([]);
    const filterDeep=(list,result)=>{
        for(let i =0;i<asyncRouterMap.length;i++){
            if(list.indexOf(asyncRouterMap[i].name)!==-1){
                result = result.concat(asyncRouterMap[i]);
            }
            if(asyncRouterMap[i].children){
                for(let j = 0;j<asyncRouterMap[i].children.length;j++){
                    if(list.indexOf(asyncRouterMap[i].children[j].name)!==-1){
                        result = result.concat(asyncRouterMap[i].children[j]);
                    }
                }
            }
        }
        return result;
    }

    return(
        <Breadcrumb className="app-breadcrumb" separator="/">
            {levelList.map((item,index)=>{
                return (item.meta.title && 
                    <Breadcrumb.Item key={item.path}>
                        {(item.redirect ==='noredirect'||index==levelList.length-1)?
                        <span className="no-redirect">{item.meta.title}</span>
                        :
                        <a href={item.redirect||item.path}>{item.meta.title}</a>}
                    </Breadcrumb.Item>)
            })}
        </Breadcrumb>
    )
}
export default CBreadcrumb;