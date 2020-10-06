import {apiServices} from './shared/api-service';

export const returnApplyServices = {
  fetchList,
  deleteApply,
  updateApplyStatus,
  getApplyDetail
}

function fetchList(params) {
  return apiServices.get('/returnApply/list',params);
}

function deleteApply(params) {
  return apiServices.post('/returnApply/delete',params);
}
function updateApplyStatus(id,data) {
  return apiServices.post('/returnApply/update/status/'+id,data);
}

function getApplyDetail(id) {
  return apiServices.get('/returnApply/'+id,null);
}
