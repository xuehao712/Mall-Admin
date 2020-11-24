import request from './shared/axios';

export const homeSubjectServices = {
  fetchList,
  updateRecommendStatus,
  deleteHomeSubject,
  createHomeSubject,
  updateHomeSubjectSort
}

 function fetchList(params) {
  return request({
    url:'/home/recommendSubject/list',
    method:'get',
    params:params
  })
}

 function updateRecommendStatus(data) {
  return request({
    url:'/home/recommendSubject/update/recommendStatus',
    method:'post',
    data:data
  })
}

 function deleteHomeSubject(data) {
  return request({
    url:'/home/recommendSubject/delete',
    method:'post',
    data:data
  })
}

 function createHomeSubject(data) {
  return request({
    url:'/home/recommendSubject/create',
    method:'post',
    data:data
  })
}

 function updateHomeSubjectSort(params) {
  return request({
    url:'/home/recommendSubject/update/sort/'+params.id,
    method:'post',
    params:params
  })
}
