import request from './shared/axios';

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
  return request({
    url: '/role/list',
    method: 'get',
    params: params
  })
}

 function createRole(data) {
  return request({
    url: '/role/create',
    method: 'post',
    data: data
  })
}

 function updateRole(id, data) {
  return request({
    url: '/role/update/' + id,
    method: 'post',
    data: data
  })
}

 function updateStatus(id, params) {
  return request({
    url: '/role/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

 function deleteRole(data) {
  return request({
    url:'/role/delete',
    method:'post',
    data:data
  })
}

 function fetchAllRoleList() {
  return request({
    url: '/role/listAll',
    method: 'get'
  })
}

 function listMenuByRole(roleId) {
  return request({
    url: '/role/listMenu/'+roleId,
    method: 'get'
  })
}

 function listResourceByRole(roleId) {
  return request({
    url: '/role/listResource/'+roleId,
    method: 'get'
  })
}

 function allocMenu(data) {
  return request({
    url: '/role/allocMenu',
    method: 'post',
    data:data
  })
}

 function allocResource(data) {
  return request({
    url: '/role/allocResource',
    method: 'post',
    data:data
  })
}

