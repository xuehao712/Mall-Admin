import {apiServices} from './shared/api-service';


export const loginServices = {
  login,
  getInfo,
  logout,
  fetchList,
  createAdmin,
  updateAdmin,
  updateStatus,
  deleteAdmin,
  getRoleByAdmin,
  allocRole
}

function login(username, password) {
  return apiServices.post('/admin/login',{username,password});
}

function getInfo() {
  return apiServices.get('/admin/info',null);
}

function logout() {
  return apiServices.post('/admin/logout',null);
}

function fetchList(params) {
  return apiServices.get('/admin/list',params);
}

function createAdmin(data) {
  return apiServices.post('/admin/register',data);
}

function updateAdmin(id, data) {
  return apiServices.post('/admin/update/' + id,data);
}

function updateStatus(id, params) {
  return apiServices.post('/admin/updateStatus/' + id,params);
}

function deleteAdmin(id) {
  return apiServices.post('/admin/delete/' + id,null);
}

function getRoleByAdmin(id) {
  return apiServices.get('/admin/role/' + id,null)
}

function allocRole(data) {
  return apiServices.post('/admin/role/update',data);
}
