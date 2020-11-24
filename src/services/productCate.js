import request from './shared/axios';

export const productCateServices = {
  fetchList,
  deleteProductCate,
  createProductCate,
  updateProductCate,
  getProductCate,
  updateShowStatus,
  updateNavStatus,
  fetchListWithChildren
}

 function fetchList(parentId,params) {
  return request({
    url:'/productCategory/list/'+parentId,
    method:'get',
    params:params
  })
}
 function deleteProductCate(id) {
  return request({
    url:'/productCategory/delete/'+id,
    method:'post'
  })
}

 function createProductCate(data) {
  return request({
    url:'/productCategory/create',
    method:'post',
    data:data
  })
}

 function updateProductCate(id,data) {
  return request({
    url:'/productCategory/update/'+id,
    method:'post',
    data:data
  })
}

 function getProductCate(id) {
  return request({
    url:'/productCategory/'+id,
    method:'get',
  })
}

 function updateShowStatus(data) {
  return request({
    url:'/productCategory/update/showStatus',
    method:'post',
    data:data
  })
}

 function updateNavStatus(data) {
  return request({
    url:'/productCategory/update/navStatus',
    method:'post',
    data:data
  })
}

 function fetchListWithChildren() {
  return request({
    url:'/productCategory/list/withChildren',
    method:'get'
  })
}
