import {apiServices} from './shared/api-service';

export const homeSubjectServices = {
  fetchList,
  updateRecommendStatus,
  deleteHomeSubject,
  createHomeSubject,
  updateHomeSubjectSort
}

function fetchList(params) {
  return apiServices.get('/home/recommendSubject/list',params);
}

function updateRecommendStatus(data) {
  return apiServices.post('/home/recommendSubject/update/recommendStatus',data);
}

function deleteHomeSubject(data) {
  return apiServices.post('/home/recommendSubject/delete',data);
}

function createHomeSubject(data) {
  return apiServices.post('/home/recommendSubject/create',data);
}

function updateHomeSubjectSort(params) {
  return apiServices.post('/home/recommendSubject/update/sort/'+params.id,params);
}
