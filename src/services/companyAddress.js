import request from './shared/axios';

export const companyAddressServices = {
    fetchList
}

function fetchList() {
    return request({
      url:'/companyAddress/list',
      method:'get'
    })
  }