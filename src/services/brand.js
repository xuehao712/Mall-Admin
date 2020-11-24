import request from './shared/axios';

export const brandServices = {
    fetchList,
    createBrand,
    updateShowStatus,
    updateFactoryStatus,
    deleteBrand,
    getBrand,
    updateBrand
}

 function fetchList(params) {
    return request({
      url:'/brand/list',
      method:'get',
      params:params
    })
  }
   function createBrand(data) {
    return request({
      url:'/brand/create',
      method:'post',
      data:data
    })
  }
   function updateShowStatus(data) {
    return request({
      url:'/brand/update/showStatus',
      method:'post',
      data:data
    })
  }
  
   function updateFactoryStatus(data) {
    return request({
      url:'/brand/update/factoryStatus',
      method:'post',
      data:data
    })
  }
  
   function deleteBrand(id) {
    return request({
      url:'/brand/delete/'+id,
      method:'get',
    })
  }
  
   function getBrand(id) {
    return request({
      url:'/brand/'+id,
      method:'get',
    })
  }
  
   function updateBrand(id,data) {
    return request({
      url:'/brand/update/'+id,
      method:'post',
      data:data
    })
  }