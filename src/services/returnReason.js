import request from './shared/axios';

export const returnReasonServices = {
  fetchList,
  deleteReason,
  updateStatus,
  addReason,
  getReasonDetail,
  updateReason
}

 function fetchList(params) {
  return request({
    url:'/returnReason/list',
    method:'get',
    params:params
  })
}

 function deleteReason(params) {
  return request({
    url:'/returnReason/delete',
    method:'post',
    params:params
  })
}

 function updateStatus(params) {
  return request({
    url:'/returnReason/update/status',
    method:'post',
    params:params
  })
}

 function addReason(data) {
  return request({
    url:'/returnReason/create',
    method:'post',
    data:data
  })
}

 function getReasonDetail(id) {
  return request({
    url:'/returnReason/'+id,
    method:'get'
  })
}

 function updateReason(id,data) {
  return request({
    url:'/returnReason/update/'+id,
    method:'post',
    data:data
  })
}
