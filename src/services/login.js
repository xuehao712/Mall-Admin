import request from './shared/axios';


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
  return request({
    url: '/admin/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

 function getInfo() {
  return request({
    url: '/admin/info',
    method: 'get',
  })
}

 function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

 function fetchList(params) {
  return request({
    url: '/admin/list',
    method: 'get',
    params: params
  })
}

 function createAdmin(data) {
  return request({
    url: '/admin/register',
    method: 'post',
    data: data
  })
}

 function updateAdmin(id, data) {
  return request({
    url: '/admin/update/' + id,
    method: 'post',
    data: data
  })
}

 function updateStatus(id, params) {
  return request({
    url: '/admin/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

 function deleteAdmin(id) {
  return request({
    url: '/admin/delete/' + id,
    method: 'post'
  })
}

 function getRoleByAdmin(id) {
  return request({
    url: '/admin/role/' + id,
    method: 'get'
  })
}

 function allocRole(data) {
  return request({
    url: '/admin/role/update',
    method: 'post',
    data: data
  })
}

