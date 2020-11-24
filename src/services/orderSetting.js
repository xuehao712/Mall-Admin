import request from './shared/axios';

export const orderSettingServices = {
  getOrderSetting,
  updateOrderSetting
}

function getOrderSetting(id) {
  return request({
    url:'/orderSetting/'+id,
    method:'get',
  })
}

function updateOrderSetting(id,data) {
  return request({
    url:'/orderSetting/update/'+id,
    method:'post',
    data:data
  })
}
