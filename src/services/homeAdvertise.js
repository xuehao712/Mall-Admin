import {apiServices} from './shared/api-service';

export const homeAdvertiseServices = {
  fetchList,
  updateStatus,
  deleteHomeAdvertise,
  createHomeAdvertise,
  getHomeAdvertise,
  updateHomeAdvertise
}

function fetchList(params) {
  return apiServices.get('/home/advertise/list',params);
}

function updateStatus(id,params) {
  return apiServices.post('/home/advertise/update/status/'+id,params);
}

function deleteHomeAdvertise(data) {
  return apiServices.post('/home/advertise/delete',data);
}

function createHomeAdvertise(data) {
  return apiServices.post('/home/advertise/create',data);
}

function getHomeAdvertise(id) {
  return apiServices.get('/home/advertise/'+id,null);
}

function updateHomeAdvertise(id,data) {
  return apiServices.post('/home/advertise/update/'+id,data);
}
