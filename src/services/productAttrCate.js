import request from './shared/axios';

export const productAttrCateServices = {
  fetchList,
  createProductAttrCate,
  deleteProductAttrCate,
  updateProductAttrCate,
  fetchListWithAttr
}

 function fetchList(params) {
  return request({
    url:'/productAttribute/category/list',
    method:'get',
    params:params
  })
}

 function createProductAttrCate(data) {
  return request({
    url:'/productAttribute/category/create',
    method:'post',
    data:data
  })
}

 function deleteProductAttrCate(id) {
  return request({
    url:'/productAttribute/category/delete/'+id,
    method:'get'
  })
}

 function updateProductAttrCate(id,data) {
  return request({
    url:'/productAttribute/category/update/'+id,
    method:'post',
    data:data
  })
}
 function fetchListWithAttr() {
  return request({
    url:'/productAttribute/category/list/withAttr',
    method:'get'
  })
}

