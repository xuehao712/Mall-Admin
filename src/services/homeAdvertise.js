import request from './shared/axios';

export const homeAdvertiseServices = {
  fetchList,
  updateStatus,
  deleteHomeAdvertise,
  createHomeAdvertise,
  getHomeAdvertise,
  updateHomeAdvertise
}

 function fetchList(params) {
  return request({
    url:'/home/advertise/list',
    method:'get',
    params:params
  })
}
 function updateStatus(id,params) {
  return request({
    url:'/home/advertise/update/status/'+id,
    method:'post',
    params:params
  })
}
 function deleteHomeAdvertise(data) {
  return request({
    url:'/home/advertise/delete',
    method:'post',
    data:data
  })
}
 function createHomeAdvertise(data) {
  return request({
    url:'/home/advertise/create',
    method:'post',
    data:data
  })
}
 function getHomeAdvertise(id) {
  return request({
    url:'/home/advertise/'+id,
    method:'get',
  })
}

 function updateHomeAdvertise(id,data) {
  return request({
    url:'/home/advertise/update/'+id,
    method:'post',
    data:data
  })
}
