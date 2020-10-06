import {apiServices} from './shared/api-service';

export const memberLevelServices = {
  fetchList
}

function fetchList(params) {
  return apiServices.get('/memberLevel/list',params);
}
