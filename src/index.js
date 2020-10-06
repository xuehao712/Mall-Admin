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
import PublicLayout from './views/layout/PublicLayout';
import ProtectedLayout from './views/layout/ProtectedLayout';

renderWithHotReload(PublicLayout);
function renderWithHotReload(RootElement) {

    ReactDom.render(
        <AppContainer>
            <Router history={history}>
                <Provider store={store}>
                    <Switch>
                        <Route exact path="/login" component={ProtectedLayout}/>
                        <Route exact path="/404" component={ProtectedLayout}/>
                        <Route component={RootElement}/>
                        <Redirect to="/404"/>
                    </Switch>
                </Provider>
            </Router>
        </AppContainer>,
        document.getElementById('app')
    )
};
