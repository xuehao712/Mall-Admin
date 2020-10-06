import {apiServices} from './shared/api-service';

export const flashProductRelationServices = {
    fetchList,
    createFlashProductRelation,
    deleteFlashProductRelation,
    updateFlashProductRelation
}

function fetchList(params) {
    return apiServices.get('/flashProductRelation/list',params);
}

function createFlashProductRelation(data) {
    return apiServices.post('/flashProductRelation/create',data);
}

function deleteFlashProductRelation(id) {
    return apiServices.post('/flashProductRelation/delete/'+id,null);
}

function updateFlashProductRelation(id,data) {
    return apiServices.post('/flashProductRelation/update/'+id,data);
}