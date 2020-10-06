import {apiServices} from './shared/api-service';

export const homeBrandServices = {
  fetchList,
  updateRecommendStatus,
  deleteHomeBrand,
  createHomeBrand,
  updateHomeBrandSort
}

function fetchList(params) {
  return apiServices.get('/home/brand/list',params);
}

function updateRecommendStatus(data) {
  return apiServices.post('/home/brand/update/recommendStatus',data);
}

function deleteHomeBrand(data) {
  return apiServices.post('/home/brand/delete',data);
}

function createHomeBrand(data) {
  return apiServices.post('/home/brand/create',data);
}

function updateHomeBrandSort(params) {
  return apiServices.post('/home/brand/update/sort/'+params.id,params);
}
