import renderRoutesMap from './renderRoutesMap'
import React from 'react';
import { Redirect, Router, Switch } from 'react-router-dom';
import {history} from '../redux/shared/history-redux';

/**
 * renderRoutes 
 * @param  {array}      routes              routelist
 * @param  {object}     extraProps  = {}    extra
 * @param  {object}     switchProps = {}    switch
 */
const renderRoutes = ({ routes, extraProps = {}, switchProps = {} }) => (

    <Router history ={history}>
        <Switch {...switchProps}>
            {renderRoutesMap(routes)}
            <Redirect from="/" to="/home"/>
            <Redirect to="/404"/>
        </Switch>
    </Router>
)

export default renderRoutes