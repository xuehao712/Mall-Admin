import request from './shared/axios';

export const flashServices = {
    fetchList,
    updateStatus,
    deleteFlash,
    createFlash,
    updateFlash
}

 function fetchList(params) {
    return request({
      url:'/flash/list',
      method:'get',
      params:params
    })
  }
   function updateStatus(id,params) {
    return request({
      url:'/flash/update/status/'+id,
      method:'post',
      params:params
    })
  }
   function deleteFlash(id) {
    return request({
      url:'/flash/delete/'+id,
      method:'post'
    })
  }
   function createFlash(data) {
    return request({
      url:'/flash/create',
      method:'post',
      data:data
    })
  }
   function updateFlash(id,data) {
    return request({
      url:'/flash/update/'+id,
      method:'post',
      data:data
    })
  }
  