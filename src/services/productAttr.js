import request from './shared/axios';

export const productAttrServices = {
  fetchList,
  deleteProductAttr,
  createProductAttr,
  updateProductAttr,
  getProductAttr,
  getProductAttrInfo,
}

function fetchList(cid,params) {
  return request({
    url:'/productAttribute/list/'+cid,
    method:'get',
    params:params
  })
}

function deleteProductAttr(data) {
  return request({
    url:'/productAttribute/delete',
    method:'post',
    data:data
  })
}

function createProductAttr(data) {
  return request({
    url:'/productAttribute/create',
    method:'post',
    data:data
  })
}
function updateProductAttr(id,data) {
  return request({
    url:'/productAttribute/update/'+id,
    method:'post',
    data:data
  })
}
function getProductAttr(id) {
  return request({
    url:'/productAttribute/'+id,
    method:'get'
  })
}

function getProductAttrInfo(productCategoryId) {
  return request({
    url:'/productAttribute/attrInfo/'+productCategoryId,
    method:'get'
  })
}
