import {apiServices} from './shared/api-service';

export const flashServices = {
    fetchList,
    updateStatus,
    deleteFlash,
    createFlash,
    updateFlash
}

function fetchList(params) {
    return apiServices.get('/flash/list',params);
}

function updateStatus(id,params) {
    return apiServices.post('/flash/update/status/'+id,params);
}

function deleteFlash(id) {
    return apiServices.post('/flash/delete/'+id,null);
}

function createFlash(data) {
    return apiServices.post('/flash/create',data);
}

function updateFlash(id,data) {
    return apiServices.post('/flash/update/'+id,data);
}