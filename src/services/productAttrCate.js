import {apiServices} from './shared/api-service';

export const productAttrCateServices = {
  fetchList,
  createProductAttrCate,
  deleteProductAttrCate,
  updateProductAttrCate,
  fetchListWithAttr
}

function fetchList(params) {
  return apiServices.get('/productAttribute/category/list',params);
}

function createProductAttrCate(data) {
  return apiServices.post('/productAttribute/category/create',data);
}

function deleteProductAttrCate(id) {
  return apiServices.post('/productAttribute/category/delete/'+id,null);
}

function updateProductAttrCate(id,data) {
  return apiServices.post('/productAttribute/category/update/'+id,data);
}
function fetchListWithAttr() {
  return apiServices.get('/productAttribute/category/list/withAttr',null);
}
