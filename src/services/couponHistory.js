import request from './shared/axios';

export const couponHistoryServices = {
    fetchList
}

function fetchList(params) {
    return request({
      url:'/couponHistory/list',
      method:'get',
      params:params
    })
}