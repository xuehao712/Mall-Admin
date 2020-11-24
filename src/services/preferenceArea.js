import request from './shared/axios';

export const preferenceAreaServices = {
  fetchList
}

function fetchList() {
  return request({
    url:'/preferenceArea/listAll',
    method:'get',
  })
}
