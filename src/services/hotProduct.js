import {apiServices} from './shared/api-service';

const hotProductServices = {
  fetchList,
  updateRecommendStatus,
  deleteHotProduct,
  createHotProduct,
  updateHotProductSort
}

function fetchList(params) {
  return apiServices.get('/home/recommendProduct/list',params);
}

function updateRecommendStatus(data) {
  return apiServices.post('/home/recommendProduct/update/recommendStatus',data);
}

function deleteHotProduct(data) {
  return apiServices.post('/home/recommendProduct/delete',data);
}

function createHotProduct(data) {
  return apiServices.post('/home/recommendProduct/create',data);
}

function updateHotProductSort(params) {
  return apiServices.post('/home/recommendProduct/update/sort/'+params.id,params);
}
