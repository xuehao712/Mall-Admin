import {apiServices} from './shared/api-service';

export const menuServices = {
  fetchList,
  deleteMenu,
  createMenu,
  updateMenu,
  getMenu,
  updateHidden,
  fetchTreeList
}

function fetchList(parentId, params) {
  return apiServices.get('/menu/list/' + parentId,params);
}

function deleteMenu(id) {
  return apiServices.post('/menu/delete/' + id,null);
}

function createMenu(data) {
  return apiServices.post('/menu/create',data);
}

function updateMenu(id, data) {
  return apiServices.post('/menu/update/' + id,data);
}

function getMenu(id) {
  return apiServices.get('/menu/' + id,null);
}

function updateHidden(id, params) {
  return apiServices.post('/menu/updateHidden/' + id,params);
}

function fetchTreeList() {
  return apiServices.get('/menu/treeList',null);
}

