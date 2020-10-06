import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom'
import Loadable from 'react-loadable';
import { connect } from 'react-redux'
import renderRoutesMap from './renderRoutesMap'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {getToken} from 'utils/auth'


const mapStateToProps = state => (state)
const mapDispatchToProps = dispatch => ({ ...dispatch })
function Loading() {
    return <h3>Loading...</h3>;
  }
function RouterGuard(props){
    
    let { history: { replace },location } = props
    useEffect(()=>{
        NProgress.start();
        if(!getToken()){
            replace('/login');
            NProgress.done();
        }
        NProgress.done();
    },[]);

    let { component, children = []} = props
    console.log('before component', props)
    const LoadableComponent = Loadable({
        loader: () => import(`../${component}`),
        loading:Loading
    })
    NProgress.done();
    return (
        <div>
            <LoadableComponent {...props} />
            {renderRoutesMap(children)}
        </div>

    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RouterGuard))
