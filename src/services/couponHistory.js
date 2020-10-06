import {apiServices} from './shared/api-service';

export const couponHistoryServices = {
    fetchList
}

function fetchList(params) {
    return apiServices.get('/couponHistory/list',params);
}