import request from './shared/axios';

export const resourceServices = {
  fetchList,
  createResource,
  updateResource,
  deleteResource,
  fetchAllResourceList
}

 function fetchList(params) {
  return request({
    url: '/resource/list',
    method: 'get',
    params: params
  })
}

 function createResource(data) {
  return request({
    url: '/resource/create',
    method: 'post',
    data: data
  })
}

 function updateResource(id, data) {
  return request({
    url: '/resource/update/' + id,
    method: 'post',
    data: data
  })
}

 function deleteResource(id) {
  return request({
    url: '/resource/delete/' + id,
    method: 'post'
  })
}

 function fetchAllResourceList() {
  return request({
    url: '/resource/listAll',
    method: 'get'
  })
}
