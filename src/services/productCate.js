import {apiServices} from './shared/api-service';

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
  return apiServices.get('/productCategory/list/'+parentId,params);
}
function deleteProductCate(id) {
  return apiServices.post('/productCategory/delete/'+id,null);
}

function createProductCate(data) {
  return apiServices.post('/productCategory/create',data);
}

function updateProductCate(id,data) {
  return apiServices.post('/productCategory/update/'+id,data);
}

function getProductCate(id) {
  return apiServices.get('/productCategory/'+id,null);
}

function updateShowStatus(data) {
  return apiServices.post('/productCategory/update/showStatus',data);
}

function updateNavStatus(data) {
  return apiServices.post('/productCategory/update/navStatus',data);
}

function fetchListWithChildren() {
  return apiServices.get('/productCategory/list/withChildren',null);
}
