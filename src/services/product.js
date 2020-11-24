import request from './shared/axios';

export const productServices = {
  fetchList,
  fetchSimpleList,
  updateDeleteStatus,
  updateNewStatus,
  updateRecommendStatus,
  updatePublishStatus,
  createProduct,
  updateProduct,
  getProduct
}

 function fetchList(params) {
  return request({
    url:'/product/list',
    method:'get',
    params:params
  })
}

 function fetchSimpleList(params) {
  return request({
    url:'/product/simpleList',
    method:'get',
    params:params
  })
}

 function updateDeleteStatus(params) {
  return request({
    url:'/product/update/deleteStatus',
    method:'post',
    params:params
  })
}

 function updateNewStatus(params) {
  return request({
    url:'/product/update/newStatus',
    method:'post',
    params:params
  })
}

 function updateRecommendStatus(params) {
  return request({
    url:'/product/update/recommendStatus',
    method:'post',
    params:params
  })
}

 function updatePublishStatus(params) {
  return request({
    url:'/product/update/publishStatus',
    method:'post',
    params:params
  })
}

 function createProduct(data) {
  return request({
    url:'/product/create',
    method:'post',
    data:data
  })
}

 function updateProduct(id,data) {
  return request({
    url:'/product/update/'+id,
    method:'post',
    data:data
  })
}

 function getProduct(id) {
  return request({
    url:'/product/updateInfo/'+id,
    method:'get',
  })
}

