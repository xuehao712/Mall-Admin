import request from './shared/axios';

export const hotProductServices = {
  fetchList,
  updateRecommendStatus,
  deleteHotProduct,
  createHotProduct,
  updateHotProductSort
}

 function fetchList(params) {
  return request({
    url:'/home/recommendProduct/list',
    method:'get',
    params:params
  })
}

 function updateRecommendStatus(data) {
  return request({
    url:'/home/recommendProduct/update/recommendStatus',
    method:'post',
    data:data
  })
}

 function deleteHotProduct(data) {
  return request({
    url:'/home/recommendProduct/delete',
    method:'post',
    data:data
  })
}

 function createHotProduct(data) {
  return request({
    url:'/home/recommendProduct/create',
    method:'post',
    data:data
  })
}

 function updateHotProductSort(params) {
  return request({
    url:'/home/recommendProduct/update/sort/'+params.id,
    method:'post',
    params:params
  })
}

