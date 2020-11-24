import request from './shared/axios';

export const newProductServices = {
  fetchList,
  updateRecommendStatus,
  deleteNewProduct,
  createNewProduct,
  updateNewProductSort
}

 function fetchList(params) {
  return request({
    url:'/home/newProduct/list',
    method:'get',
    params:params
  })
}

 function updateRecommendStatus(data) {
  return request({
    url:'/home/newProduct/update/recommendStatus',
    method:'post',
    data:data
  })
}

 function deleteNewProduct(data) {
  return request({
    url:'/home/newProduct/delete',
    method:'post',
    data:data
  })
}

 function createNewProduct(data) {
  return request({
    url:'/home/newProduct/create',
    method:'post',
    data:data
  })
}

 function updateNewProductSort(params) {
  return request({
    url:'/home/newProduct/update/sort/'+params.id,
    method:'post',
    params:params
  })
}
