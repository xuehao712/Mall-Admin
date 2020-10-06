import {apiServices} from './shared/api-service';

export const orderSettingServices = {
  getOrderSetting,
  updateOrderSetting
}

function getOrderSetting(id) {
  return apiServices.get('/orderSetting/'+id,null);
}

function updateOrderSetting(id,data) {
  return apiServices.post('/orderSetting/update/'+id,data);
}
