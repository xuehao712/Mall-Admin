import request from './shared/axios';

export const homeBrandServices = {
  fetchList,
  updateRecommendStatus,
  deleteHomeBrand,
  createHomeBrand,
  updateHomeBrandSort
}

 function fetchList(params) {
  return request({
    url:'/home/brand/list',
    method:'get',
    params:params
  })
}

 function updateRecommendStatus(data) {
  return request({
    url:'/home/brand/update/recommendStatus',
    method:'post',
    data:data
  })
}

 function deleteHomeBrand(data) {
  return request({
    url:'/home/brand/delete',
    method:'post',
    data:data
  })
}

 function createHomeBrand(data) {
  return request({
    url:'/home/brand/create',
    method:'post',
    data:data
  })
}

 function updateHomeBrandSort(params) {
  return request({
    url:'/home/brand/update/sort/'+params.id,
    method:'post',
    params:params
  })
}

