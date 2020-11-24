import request from './shared/axios';

export const flashSessionServices = {
    fetchList,
    fetchSelectList,
    updateStatus,
    deleteSession,
    createSession,
    updateSession
}
function fetchList(params) {
    return request({
      url: '/flashSession/list',
      method: 'get',
      params: params
    })
  }
 function fetchSelectList(params) {
    return request({
      url: '/flashSession/selectList',
      method: 'get',
      params: params
    })
  }
  
   function updateStatus(id, params) {
    return request({
      url: '/flashSession/update/status/' + id,
      method: 'post',
      params: params
    })
  }
  
   function deleteSession(id) {
    return request({
      url: '/flashSession/delete/' + id,
      method: 'post'
    })
  }
  
   function createSession(data) {
    return request({
      url: '/flashSession/create',
      method: 'post',
      data: data
    })
  }
  
   function updateSession(id, data) {
    return request({
      url: '/flashSession/update/' + id,
      method: 'post',
      data: data
    })
  }