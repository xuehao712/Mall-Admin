import {apiServices} from './shared/api-service';

export const roleServices = {
  fetchList,
  createRole,
  updateRole,
  updateStatus,
  deleteRole,
  fetchAllRoleList,
  listMenuByRole,
  listResourceByRole,
  allocMenu,
  allocResource
}

function fetchList(params) {
  return apiServices.get('/role/list',params);
}

function createRole(data) {
  return apiServices.post('/role/create',data);
}

function updateRole(id, data) {
  return apiServices.post('/role/update/' + id,data);
}

function updateStatus(id, params) {
 return apiServices.post('/role/updateStatus/' + id,params);
}

function deleteRole(data) {
  return apiServices.post('/role/delete',data);
}

function fetchAllRoleList() {
  return apiServices.get('/role/listAll',null);
}

function listMenuByRole(roleId) {
  return apiServices.get('/role/listMenu/'+roleId,null);
}

function listResourceByRole(roleId) {
  return apiServices.get('/role/listResource/'+roleId,null);
}

function allocMenu(data) {
  return apiServices.post('/role/allocMenu',data);
}

function allocResource(data) {
  return apiServices.post('/role/allocResource',data);
}
