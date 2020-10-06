import {apiServices} from './shared/api-service';

export const flashSessionServices = {
    fetchList,
    fetchSelectList,
    updateStatus,
    deleteSession,
    createSession,
    updateSession
}

function fetchList(params) {
    return apiServices.get('/flashSession/list',params);
}

function fetchSelectList(params) {
    return apiServices.get('/flashSession/selectList',params);
}

function updateStatus(id, params) {
    return apiServices.post('/flashSession/update/status/' + id,params);
}

function deleteSession(id) {
    return apiServices.post('/flashSession/delete/' + id,null);
}

function createSession(data) {
    return apiServices.post('/flashSession/create',data);
}

function updateSession(id, data) {
    return apiServices.post('/flashSession/update/' + id,data);
}