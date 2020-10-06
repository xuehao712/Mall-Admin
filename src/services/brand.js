import {apiServices} from './shared/api-service';

export const brandServices = {
    fetchList,
    createBrand,
    updateShowStatus,
    updateFactoryStatus,
    deleteBrand,
    getBrand,
    updateBrand
}

function fetchList(params) {
    return apiServices.get('/brand/list',params);
}

function createBrand(data) {
    return apiServices.post('/brand/create',data);
}

function updateShowStatus(data) {
    return apiServices.post('/brand/update/showStatus',data);
}

function updateFactoryStatus(data) {
    return apiServices.post('/brand/update/factoryStatus',data);
}

function deleteBrand(id) {
    return apiServices.get('/brand/delete/'+id,null);
}

function getBrand(id) {
    return apiServices.get('/brand/'+id,null);
}

function updateBrand(data) {
    return apiServices.post('/brand/update/'+id,data);
}