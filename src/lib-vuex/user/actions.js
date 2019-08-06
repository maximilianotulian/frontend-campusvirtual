import * as types from 'lib-vuex/mutation-types';
import moment from 'moment';
import { serviceCaller } from 'lib-core/services/service-caller';
import storage from 'lib-core/persistance/storage';
import userService from 'app/services/user-service';

export default {
    login ({ commit, state }, loginData) {
        return new Promise((resolve, reject) => {
            const loginService = userService.getService('loginService');

            serviceCaller.doRequest(loginService, {}, loginData)
                .then(handleSuccessLogin)
                .catch(handleFailedLogin);

            function handleSuccessLogin (response) {
                let authInformation = response.user;

                if (loginData.rememberUser) {
                    storage.save('authInformation',authInformation,moment().add(7, 'd').format('YYYY-MM-DD HH:mm'));
                    storage.save('authToken', response.token, moment().add(7, 'd').format('YYYY-MM-DD HH:mm'));
                }

                // Allow the user to refresh the page and keep working up to 30 minutes
                storage.save('authToken', response.token, moment().add(30, 'm').format('YYYY-MM-DD HH:mm'));
                storage.save('authInformation',authInformation,moment().add(30, 'm').format('YYYY-MM-DD HH:mm'));

                serviceCaller.setAuthToken(response.token);

                commit(types.LOG_IN_SUCCESS, authInformation);
                resolve();
            }

            function handleFailedLogin (error) {
                commit(types.LOG_IN_FAIL, error);
                reject();
            }
        });
    },

    logOut ({commit, state}) {
        storage.delete('authInformation');
        storage.delete('authToken');
        commit(types.LOG_OUT);
    },

    register ({commit, state}, data) {
        return new Promise((resolve, reject) => {
            const registerService = userService.getService('registerStudent');

            serviceCaller.doRequest(registerService, {}, data)
                .then(handleSucessRegister)
                .catch(handleFailedRegister);

            function handleSucessRegister (response) {
                let authInformation = response.user;

                storage.save('authToken', response.token, moment().add(1, 'd').format('YYYY-MM-DD HH:mm'));

                commit(types.LOG_IN_SUCCESS, authInformation);
                resolve();
            }

            function handleFailedRegister (error) {
                commit(types.REGISTERED_FAIL, error);
                reject();
            }
        });
    },

    getAll ({commit, dispatch}) {
        dispatch('getAllAPICall',
            { service: userService },
            { root: true }
        )
        .then(response => commit(types.GET_USERS_SUCCESS, response))
        .catch(error => commit(types.GET_USERS_FAIL, error));
    },

    getOne ({commit, dispatch}, objectId) {
        dispatch('getOneAPICall',
            { service: userService, data: {objectId: objectId} },
            { root: true }
        )
        .then(response => commit(types.GET_USER_SUCCESS, response))
        .catch(error => commit(types.GET_USER_FAIL, error));
    },

    edit ({store, commit, dispatch}, data) {
        data.objectId = this.state.user.selectedUser.id;

        dispatch('editAPICall',
            { service: userService, data: data},
            { root: true }
        )
        .then(response => commit(types.EDIT_USER_SUCCESS, response))
        .catch(error => commit(types.EDIT_USER_FAIL, error));
    },

    delete ({store, commit, dispatch}, data) {
        data.objectId = this.state.user.selectedUser.id;

        dispatch('deleteAPICall',
            { service: userService, data: data},
            { root: true }
        )
        .then(response => commit(types.DELETE_USER_SUCCESS, response))
        .catch(error => commit(types.DELETE_USER_FAIL, error));
    }
}
