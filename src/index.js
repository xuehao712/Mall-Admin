import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import {BrowserRouter,Redirect,Route,Router, Switch } from 'react-router-dom';
import {store} from './redux/store';
import {history} from './redux/shared/history-redux';
import "antd/dist/antd.css";
import 'assets/Mall-Ui.scss';
import 'styles/index.scss';
import { AppRoutes } from "./router/routers";
import "./icons";

renderWithHotReload(AppRoutes);
function renderWithHotReload(RootElement) {

    ReactDom.render(
        <AppContainer>
            <Provider store={store}>
                <RootElement/>
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    )
};
