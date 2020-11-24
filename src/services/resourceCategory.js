import request from './shared/axios';

export const resourceCategoryServices = {
  listAllCate,
  createResourceCategory,
  updateResourceCategory,
  deleteResourceCategory
}

 function listAllCate() {
  return request({
    url: '/resourceCategory/listAll',
    method: 'get'
  })
}

 function createResourceCategory(data) {
  return request({
    url: '/resourceCategory/create',
    method: 'post',
    data: data
  })
}

 function updateResourceCategory(id, data) {
  return request({
    url: '/resourceCategory/update/' + id,
    method: 'post',
    data: data
  })
}

 function deleteResourceCategory(id) {
  return request({
    url: '/resourceCategory/delete/' + id,
    method: 'post'
  })
}
