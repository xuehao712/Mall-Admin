import request from './shared/axios';

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
  return request({
    url:'/order/list',
    method:'get',
    params:params
  })
}

 function closeOrder(params) {
  return request({
    url:'/order/update/close',
    method:'post',
    params:params
  })
}

 function deleteOrder(params) {
  return request({
    url:'/order/delete',
    method:'post',
    params:params
  })
}

 function deliveryOrder(data) {
  return request({
    url:'/order/update/delivery',
    method:'post',
    data:data
  });
}

 function getOrderDetail(id) {
  return request({
    url:'/order/'+id,
    method:'get'
  });
}

 function updateReceiverInfo(data) {
  return request({
    url:'/order/update/receiverInfo',
    method:'post',
    data:data
  });
}

 function updateMoneyInfo(data) {
  return request({
    url:'/order/update/moneyInfo',
    method:'post',
    data:data
  });
}

 function updateOrderNote(params) {
  return request({
    url:'/order/update/note',
    method:'post',
    params:params
  })
}