import request from './shared/axios';

export const couponServices = {
    fetchList,
    createCoupon,
    getCoupon,
    updateCoupon,
    deleteCoupon
}

 function fetchList(params) {
    return request({
      url:'/coupon/list',
      method:'get',
      params:params
    })
  }
  
   function createCoupon(data) {
    return request({
      url:'/coupon/create',
      method:'post',
      data:data
    })
  }
  
   function getCoupon(id) {
    return request({
      url:'/coupon/'+id,
      method:'get',
    })
  }
  
   function updateCoupon(id,data) {
    return request({
      url:'/coupon/update/'+id,
      method:'post',
      data:data
    })
  }
  
   function deleteCoupon(id) {
    return request({
      url:'/coupon/delete/'+id,
      method:'post',
    })
  }
  