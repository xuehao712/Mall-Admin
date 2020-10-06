import {apiServices} from './shared/api-service';

export const recourceServices = {
  fetchList,
  createResource,
  updateResource,
  deleteResource,
  fetchAllResourceList
}

function fetchList(params) {
  return apiServices.get('/resource/list',params);
}

function createResource(data) {
  return apiServices.post('/resource/create',data);
}

function updateResource(id, data) {
  return apiServices.post('/resource/update/' + id,data);
}

function deleteResource(id) {
  return apiServices.post('/resource/delete/' + id,null);
}

function fetchAllResourceList() {
  return apiServices.get('/resource/listAll',null);
}
