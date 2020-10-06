import {apiServices} from './shared/api-service';

export const resourceCategoryServices = {
  listAllCate,
  createResourceCategory,
  updateResourceCategory,
  deleteResourceCategory
}

function listAllCate() {
  return apiServices.get('/resourceCategory/listAll',null);
}

function createResourceCategory(data) {
  return apiServices.post('/resourceCategory/create',data);
}

function updateResourceCategory(id, data) {
  return apiServices.post('/resourceCategory/update/' + id,data);
}

function deleteResourceCategory(id) {
  return apiServices.post('/resourceCategory/delete/' + id,null);
}
