export const appConstants = {
    TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR",
    CLOSE_SIDEBAR: "CLOSE_SIDEBAR",
    TOGGLE_DEVICE: "TOGGLE_DEVICE"
}

export const appActions = {
    ToggleSidebar,
    CloseSidebar,
    ToggleDevice
};

function ToggleSidebar(){
    return dispatch =>{
        dispatch({type:appConstants.TOGGLE_SIDEBAR});
    }
}

function CloseSidebar(withoutAnimation){
    return dispatch =>{
        dispatch({ type: appConstants.CLOSE_SIDEBAR,value:withoutAnimation});
    }
}

function ToggleDevice(device){
    return dispatch =>{
        dispatch({type:appConstants.TOGGLE_DEVICE,value:device});
    }
}