import {apiServices} from './shared/api-service';

export const subjectServices = {
  fetchListAll,
  fetchList
}

function fetchListAll() {
  return apiServices.get('/subject/listAll',null);
}

function fetchList(params) {
  return apiServices.get('/subject/list',params);
}
