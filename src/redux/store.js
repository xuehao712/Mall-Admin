import { createStore, applyMiddleware } from 'redux';
import combineReducers from './reducers.js';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { history } from '../redux/shared/history-redux';

const loggerMiddleware = createLogger(history);

export const store = createStore(
    combineReducers,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
)

