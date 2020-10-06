import {apiServices} from './shared/api-service';
import request from './shared/axios';

export const skuStockServices = {
  fetchList,
  update
}

function fetchList(pid,params) {
  return request({
    url:'/sku/'+pid,
    method:'get',
    params:params
  })
}

function update(pid,data) {
  return request({
    url:'/sku/update/'+pid,
    method:'post',
    data:data
  })
}

