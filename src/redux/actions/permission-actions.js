import {asyncRouterMap} from 'router/routerConfig';

//Check if has permission
function hasPermission(menus, route) {
    if (route.name) {
      let currMenu = getMenu(route.name, menus);
      if (currMenu!=null) {
        //Set menu title,icon and visible
        if (currMenu.title != null && currMenu.title !== '') {
          route.meta.title = currMenu.title;
        }
        if (currMenu.icon != null && currMenu.title !== '') {
          route.meta.icon = currMenu.icon;
        }
        if(currMenu.hidden!=null){
          route.hidden = currMenu.hidden !== 0;
        }
        if (currMenu.sort != null && currMenu.sort !== '') {
          route.sort = currMenu.sort;
        }
        return true;
      } else {
        route.sort = 0;
        if (route.hidden !== undefined && route.hidden === true) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return true
    }
}

//Get menu base on router name
function getMenu(name, menus) {
    for (let i = 0; i < menus.length; i++) {
      let menu = menus[i];
      if (name===menu.name) {
        return menu;
      }
    }
    return null;
}

//Sort menu
function sortRouters(accessedRouters) {
    for (let i = 0; i < accessedRouters.length; i++) {
      let router = accessedRouters[i];
      if(router.children && router.children.length > 0){
        router.children.sort(compare("sort"));
      }
    }
    accessedRouters.sort(compare("sort"));
}

//compare
function compare(p){
    return function(m,n){
      let a = m[p];
      let b = n[p];
      return b - a;
    }
}

export const permissionConstants = {
    SET_ROUTERS: "SET_ROUTERS",
}

export const permissionActions = {
    GenerateRoutes
};

function GenerateRoutes(data){
    return dispatch=>{
      return new Promise((resolve) =>{
        const { menus } = data;
        const { username } = data;
        const accessedRouters = asyncRouterMap.filter(v=>{
            //Admin return all menus
            if(hasPermission(menus,v)){
                if(v.children && v.children.length >0){
                    v.children = v.children.filter(child =>{
                        if(hasPermission(menus,child)){
                            return child;
                        }
                        return false;
                    });
                    return v;
                } else {
                    return v;
                }
            }
            return false;
        })
        //sort menu
        sortRouters(accessedRouters);
        dispatch({type:permissionConstants.SET_ROUTERS,value:accessedRouters});
        resolve();
    })   
  }
}