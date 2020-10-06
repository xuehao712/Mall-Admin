import {apiServices} from './shared/api-service';

export const ossServices = {
  policy
}

function policy() {
  return apiServices.get('/aliyun/oss/policy',null);
}
