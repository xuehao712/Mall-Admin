import { permissionConstants } from '../actions/permission-actions';
import routes from 'router/routerConfig';

const initialstate = {
    routers: routes,
    addRouters:[]
}
export function permissionReducer(state =initialstate,action){
    switch (action.type){
        case permissionConstants.SET_ROUTERS:
            state.addRouters = action.value;
            state.routers = routes.concat(action.value);
            return {
                ...state
            }
        default:
            return state;
    }
    
}