import { permissionConstants } from '../actions/permission-actions';
import {constantRouterMap} from 'router/routerConfig';

const initialstate = {
    routers: constantRouterMap,
    addRouters:[]
}
export function permissionReducer(state =initialstate,action){
    switch (action.type){
        case permissionConstants.SET_ROUTERS:
            state.addRouters = action.value;
            state.routers = constantRouterMap.concat(action.value);
            return {
                ...state
            }
        default:
            return state;
    }
    
}