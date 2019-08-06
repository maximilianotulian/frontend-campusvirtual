import {serviceCaller} from 'lib-core/services/service-caller';

export default {
    getOneAPICall({dispatch}, {service, data = {}, options = null}) {
        return new Promise((resolve, reject) => {
            const getService = service.getService('getOne');

            if (!options) {
                options = {
                    parameters: {
                        objectId: data.objectId
                    }
                };
            }


            serviceCaller.doRequest(getService, options)
                .then(response => resolve(response))
                .catch(error => {
                        dispatch('APIError', {error});
                        reject(error);
                    }
                );
        });
    },

    getAllAPICall({commit, state}, {service, data = {}, options = {}}) {
        return new Promise((resolve, reject) => {
            const getAllService = service.getService('getAll');

            serviceCaller.doRequest(getAllService, options, data)
                .then(response => resolve(response))
                .catch(error => {
                        dispatch('APIError', {error});
                        reject(error);
                    }
                );
        });
    },

    createAPICall({dispatch}, {service, data = {}, options = {}}) {
        return new Promise((resolve, reject) => {
            const createService = service.getService('create');

            serviceCaller.doRequest(createService, options, data)
                .then(response => resolve(response))
                .catch(error => {
                        dispatch('APIError', {error});
                        reject(error);
                    }
                );
        });
    },

    editAPICall({dispatch}, {service, data = {}, options = null}) {
        return new Promise((resolve, reject) => {
            const editService = service.getService('edit');

            if (!options) {
                options = {
                    parameters: {
                        objectId: data.objectId
                    }
                };
            }

            setTimeout(() => {
                serviceCaller.doRequest(editService, options, data)
                .then(response => resolve(response))
                .catch(error => {
                        dispatch('APIError', {error});
                        reject(error);
                    }
                );
            }, 100);
        });
    },

    deleteAPICall({dispatch}, {service, data = {}, options = null}) {
        return new Promise((resolve, reject) => {
            const deleteService = service.getService('delete');

            if (!options) {
                options = {
                    parameters: {
                        objectId: data.objectId
                    }
                };
            }

            serviceCaller.doRequest(deleteService, options)
                .then(response => resolve(response))
                .catch(error => {
                        dispatch('APIError', {error});
                        reject(error);
                    }
                );
        });
    },

    APIError(context, {error}) {
        console.log('API CALL ERROR', error);
    }
}