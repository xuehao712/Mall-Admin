import {apiServices} from './shared/api-service';

export const orderServices = {
  fetchList,
  closeOrder,
  deleteOrder,
  deliveryOrder,
  getOrderDetail,
  updateReceiverInfo,
  updateMoneyInfo,
  updateOrderNote
}

function fetchList(params) {
  return apiServices.get('/order/list',params);
}

function closeOrder(params) {
  return apiServices.post('/order/update/close',params);
}

function deleteOrder(params) {
  return apiServices.post('/order/delete',params);
}

function deliveryOrder(data) {
  return apiServices.post('/order/update/delivery',data);
}

function getOrderDetail(id) {
  return apiServices.get('/order/'+id,null);
}

function updateReceiverInfo(data) {
  return apiServices.post('/order/update/receiverInfo',data);
}

function updateMoneyInfo(data) {
  return apiServices.post('/order/update/moneyInfo',data);
}

function updateOrderNote(params) {
  return apiServices.post('/order/update/note',params);
}
