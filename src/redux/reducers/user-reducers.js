import { userConstants } from '../actions/user-actions';
import {getToken} from 'utils/auth'

const initialstate = {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
}
export function userReducer(state =initialstate,action){
    switch (action.type){
        case userConstants.SET_TOKEN:
            state.token = action.value;
            return {
                ...state
            };
        case userConstants.SET_NAME:
            state.name = action.value;
            return {
                ...state
            };
        case userConstants.SET_AVATAR:
            state.avatar = action.value;
            return {
                ...state
            };
        case userConstants.SET_ROLES:
            state.roles = action.value;
            return {
                ...state
            };
        default:
            return state;
    }
}