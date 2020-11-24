import request from './shared/axios';

export const subjectServices = {
  fetchListAll,
  fetchList
}

 function fetchListAll() {
  return request({
    url:'/subject/listAll',
    method:'get',
  })
}

 function fetchList(params) {
  return request({
    url:'/subject/list',
    method:'get',
    params:params
  })
}
