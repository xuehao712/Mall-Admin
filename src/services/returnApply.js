import request from './shared/axios';

export const returnApplyServices = {
  fetchList,
  deleteApply,
  updateApplyStatus,
  getApplyDetail
}

 function fetchList(params) {
  return request({
    url:'/returnApply/list',
    method:'get',
    params:params
  })
}

 function deleteApply(params) {
  return request({
    url:'/returnApply/delete',
    method:'post',
    params:params
  })
}
 function updateApplyStatus(id,data) {
  return request({
    url:'/returnApply/update/status/'+id,
    method:'post',
    data:data
  })
}

 function getApplyDetail(id) {
  return request({
    url:'/returnApply/'+id,
    method:'get'
  })
}