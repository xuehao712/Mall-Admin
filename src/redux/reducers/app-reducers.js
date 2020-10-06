import { appConstants } from '../actions/app-actions';
import Cookies from 'js-cookie';

const initialstate = {
    sidebar: {
        opened: !+Cookies.get("sidebarStatus"),
        withoutAnimation:false
    },
    device: 'desktop'
}
export function appReducer(state =initialstate,action){
    switch (action.type){
        case appConstants.TOGGLE_SIDEBAR:
            if(state.sidebar.opened) {
                Cookies.set('sidebarStatus',1);
            } else {
                Cookies.set('sidebarStatus',0);
            }
            state.sidebar.opened=!state.sidebar.opened;
            return {
                ...state
            }
        case appConstants.CLOSE_SIDEBAR:
            Cookies.set('sidebarStatus',1);
            state.sidebar.opened = false;
            state.sidebar.withoutAnimation = action.value;
            return {
                ...state
            }
        case appConstants.TOGGLE_DEVICE:
            state.device = action.value;
            return {
                ...state
            }
    }
    return state;
}