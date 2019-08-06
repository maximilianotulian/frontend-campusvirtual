import * as types from 'lib-vuex/mutation-types';
import teachersService from 'app/services/teachers-service';
import userService from 'app/services/user-service';
import {serviceCaller} from 'lib-core/services/service-caller';
import moment from "moment/moment";
import storage from 'lib-core/persistance/storage';

export default {
    getAll({commit, dispatch}, data) {
        dispatch('getAllAPICall',
            {service: teachersService, data: data},
            {root: true}
        )
            .then(response => commit(types.GET_TEACHERS_SUCCESS, response))
            .catch(error => commit(types.GET_TEACHERS_FAIL, error));
    },

    getOne({commit, dispatch}, objectId) {
        dispatch('getOneAPICall',
            {service: teachersService, data: {objectId: objectId}},
            {root: true}
        )
            .then(response => commit(types.GET_TEACHER_SUCCESS, response))
            .catch(error => commit(types.GET_TEACHER_FAIL, error));
    },

    edit({store, commit, dispatch}, data) {
        data.objectId = this.state.specialities.selectedSpeciality.id;

        dispatch('editAPICall',
            {service: teachersService, data: data},
            {root: true}
        )
            .then(response => commit(types.EDIT_TEACHER_SUCCESS, response))
            .catch(error => commit(types.EDIT_TEACHER_FAIL, error));
    },

    register({commit, dispatch}, data) {
	    return new Promise((resolve, reject) => {
		    const registerService = userService.getService('registerTeacher');

		    serviceCaller.doRequest(registerService, {}, data)
			    .then(handleSucessRegister)
			    .catch(handleFailedRegister);

		    function handleSucessRegister (response) {
			    let authInformation = response.user;

			    storage.save('authToken', response.token, moment().add(1, 'd').format('YYYY-MM-DD HH:mm'));

			    commit('user/' + types.LOG_IN_SUCCESS, authInformation, { root: true});
			    resolve();
		    }

		    function handleFailedRegister (error) {
			    commit('user/' + types.REGISTERED_FAIL, error, { root: true});
			    reject();
		    }
	    });
    },

    delete({commit, dispatch}, data) {
        data.objectId = this.state.specialities.selectedSpeciality.id;

        dispatch('deleteAPICall',
            {service: teachersService, data: data},
            {root: true}
        )
            .then(response => commit(types.DELETE_TEACHER_SUCCESS, response))
            .catch(error => commit(types.DELETE_TEACHER_FAIL, error));
    },

    sendInvitation({commit, dispatch}, data) {
        return new Promise((resolve, reject) => {
            const sendInvitationService = teachersService.getService('sendInvitation');

            serviceCaller.doRequest(sendInvitationService, {}, data)
                .then(response => {
                    commit(types.SEND_TEACHER_INVITATION_SUCCESS);
                    resolve(response);
                })
                .catch(error => {
                        commit(types.SEND_TEACHER_INVITATION_FAIL);
                        dispatch('APIError', {error});
                        reject(error);
                    }
                );
        });
    },

    search({commit, dispatch}, searchString ) {
        return new Promise((resolve, reject) => {
            const getAllTeachersService = teachersService.getService('getAll');
            const options = {
                queryParameters: {
                    search: searchString
                }
            };

            serviceCaller.doRequest(getAllTeachersService, options)
                .then(response => {
                    commit(types.GET_TEACHERS_SUCCESS, response);
                    resolve(response);
                })
                .catch(error => {
                        commit(types.GET_TEACHERS_FAIL, error);
                        dispatch('APIError', {error});
                        reject(error);
                    }
                );
        });
    }
}