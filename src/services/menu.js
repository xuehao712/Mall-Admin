import request from './shared/axios';

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
  return request({
    url: '/menu/list/' + parentId,
    method: 'get',
    params: params
  })
}

 function deleteMenu(id) {
  return request({
    url: '/menu/delete/' + id,
    method: 'post'
  })
}

 function createMenu(data) {
  return request({
    url: '/menu/create',
    method: 'post',
    data: data
  })
}

 function updateMenu(id, data) {
  return request({
    url: '/menu/update/' + id,
    method: 'post',
    data: data
  })
}

 function getMenu(id) {
  return request({
    url: '/menu/' + id,
    method: 'get',
  })
}

 function updateHidden(id, params) {
  return request({
    url: '/menu/updateHidden/' + id,
    method: 'post',
    params: params
  })
}

 function fetchTreeList() {
  return request({
    url: '/menu/treeList',
    method: 'get'
  })
}
