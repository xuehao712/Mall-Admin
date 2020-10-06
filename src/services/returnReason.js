import {apiServices} from './shared/api-service';

export const returnReasonServices = {
  fetchList,
  deleteReason,
  updateStatus,
  addReason,
  getReasonDetail,
  updateReason
}

function fetchList(params) {
  return apiServices.get('/returnReason/list',params);
}

function deleteReason(params) {
  return apiServices.post('/returnReason/delete',params);
}

function updateStatus(params) {
  return apiServices.post('/returnReason/update/status',params);
}

function addReason(data) {
  return apiServices.post('/returnReason/create',data);
}

function getReasonDetail(id) {
  return apiServices.get('/returnReason/'+id,null);
}

function updateReason(id,data) {
  return apiServices.post('/returnReason/update/'+id,data);
}
