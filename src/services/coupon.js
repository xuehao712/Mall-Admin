import {apiServices} from './shared/api-service';

export const couponServices = {
    fetchList,
    createCoupon,
    getCoupon,
    updateCoupon,
    deleteCoupon
}

function fetchList(params) {
    return apiServices.get('/coupon/list',params);
}

function createCoupon(data) {
    return apiServices.post('/coupon/create',data);
}

function getCoupon(id) {
    return apiServices.get('/coupon/'+id,null);
}

function updateCoupon(id,data) {
    return apiServices.post('/coupon/update/'+id,data);
}

function deleteCoupon(id) {
    return apiServices.post('/coupon/delete/'+id,null);
}