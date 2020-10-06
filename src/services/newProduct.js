import {apiServices} from './shared/api-service';

export const newProductServices = {
  fetchList,
  updateRecommendStatus,
  deleteNewProduct,
  createNewProduct,
  updateNewProductSort
}

function fetchList(params) {
  return apiServices.get('/home/newProduct/list',params)
}

function updateRecommendStatus(data) {
  return apiServices.post('/home/newProduct/update/recommendStatus',data);
}

function deleteNewProduct(data) {
  return apiServices.post('/home/newProduct/delete',data);
}

function createNewProduct(data) {
  return apiServices.post('/home/newProduct/create',data);
}

function updateNewProductSort(params) {
  return apiServices.post('/home/newProduct/update/sort/'+params.id,params);
}
