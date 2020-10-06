import { combineReducers } from 'redux';
import {appReducer} from './reducers/app-reducers'
import {permissionReducer} from './reducers/permission-reducers'
import {userReducer} from './reducers/user-reducers'


export default combineReducers({
    appReducer,
    permissionReducer,
    userReducer
})