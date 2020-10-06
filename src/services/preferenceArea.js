import {apiServices} from './shared/api-service';

export const preferenceAreaServices = {
  fetchList
}

export function fetchList() {
  return apiServices.get('/preferenceArea/listAll',null);
}
