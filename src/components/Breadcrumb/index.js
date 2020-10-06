import { Breadcrumbs } from '@material-ui/core';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import './index.scss';

function CBreadcrumb(props){
    props = props.props;
    const getBreadcrumb=()=>{
        // var a = this;
        // let matched = props.route.matched.filter(item => item.name);
        // const first = matched[0];
        // if (first && first.name !== 'home') {
        //   matched = [{ path: '/home', meta: { title: 'Home' }}].concat(matched);
        // }
        // props.levelList = matched;
    }; 

    useLayoutEffect(()=> {
        getBreadcrumb();
    },[]);

    return(
        <Breadcrumbs className="app-breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                {/* {props.levelList.map((item,index) =>{
                    if(item.meta.title){
                        if(item.redirect==='nonredirect'||index==this.levelList.length-1){
                            return  <span class="no-redirect">{item.meta.title}</span>
                        } else {
                            return  <Link to={item.redirect||item.path}>{item.meta.title}</Link>
                            }
                        }
                    }
                )}            */}
        </Breadcrumbs>
    )
}
export default CBreadcrumb;