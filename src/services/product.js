import {apiServices} from './shared/api-service';

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
  return apiServices.get('/product/list',params);
}

function fetchSimpleList(params) {
  return apiServices.get('/product/simpleList',params);
}

function updateDeleteStatus(params) {
  return apiServices.post('/product/update/deleteStatus',params);
}

function updateNewStatus(params) {
  return apiServices.post('/product/update/newStatus',params);
}

function updateRecommendStatus(params) {
  return apiServices.post('/product/update/recommendStatus',params);
}

function updatePublishStatus(params) {
  return apiServices.post('/product/update/publishStatus',params);
}

function createProduct(data) {
  return apiServices.post('/product/create',data);
}

function updateProduct(id,data) {
  return apiServices.post('/product/update/'+id,data);
}

function getProduct(id) {
  return apiServices.get('/product/updateInfo/'+id,null);
}

