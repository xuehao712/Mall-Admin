import {apiServices} from './shared/api-service';

export const companyAddressServices = {
    fetchList
}

function fetchList() {
    return apiServices.get('/companyAddress/list',null);
}