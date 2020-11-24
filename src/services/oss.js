import request from './shared/axios';

export const ossServices = {
  policy
}

function policy() {
  return request({
    url:'/aliyun/oss/policy',
    method:'get',
  })
}