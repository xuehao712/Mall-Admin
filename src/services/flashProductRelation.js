import request from './shared/axios';

export const flashProductRelationServices = {
    fetchList,
    createFlashProductRelation,
    deleteFlashProductRelation,
    updateFlashProductRelation
}

 function fetchList(params) {
    return request({
      url:'/flashProductRelation/list',
      method:'get',
      params:params
    })
  }
   function createFlashProductRelation(data) {
    return request({
      url:'/flashProductRelation/create',
      method:'post',
      data:data
    })
  }
   function deleteFlashProductRelation(id) {
    return request({
      url:'/flashProductRelation/delete/'+id,
      method:'post'
    })
  }
   function updateFlashProductRelation(id,data) {
    return request({
      url:'/flashProductRelation/update/'+id,
      method:'post',
      data:data
    })
  }
  