import request from './shared/axios';

export const memberLevelServices = {
  fetchList
}

function fetchList(params) {
  return request({
    url:'/memberLevel/list',
    method:'get',
    params:params
  })
}
