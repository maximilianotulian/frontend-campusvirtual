import * as types from 'lib-vuex/mutation-types';
import subjectsService from 'app/services/subjects-service';
import {serviceCaller} from 'lib-core/services/service-caller';

export default {
    getAll({commit, dispatch}) {
        dispatch('getAllAPICall',
            {service: subjectsService},
            {root: true}
        )
            .then(response => commit(types.GET_SUBJECTS_SUCCESS, response))
            .catch(error => commit(types.GET_SUBJECTS_FAIL, error));
    },

    getOne({commit, dispatch}, objectId) {
        dispatch('getOneAPICall',
            {service: subjectsService, data: {objectId: objectId}},
            {root: true}
        )
            .then(response => commit(types.GET_SUBJECT_SUCCESS, response))
            .catch(error => commit(types.GET_SUBJECT_FAIL, error));
    },

    edit({store, commit, dispatch}, data) {
        data.objectId = this.state.subjects.selectedSubject.objectId;

        dispatch('editAPICall',
            {service: subjectsService, data: data},
            {root: true}
        )
            .then(response => commit(types.EDIT_SUBJECT_SUCCESS, response))
            .catch(error => commit(types.EDIT_SUBJECT_FAIL, error));
    },

    create({commit, dispatch}, data) {
        dispatch('createAPICall',
            {service: subjectsService, data: data},
            {root: true}
        )
            .then(response => commit(types.CREATE_SUBJECT_SUCCESS, response))
            .catch(error => commit(types.CREATE_SUBJECT_FAIL, error));
    },

    delete({commit, dispatch}, data) {
        data.objectId = this.state.subjects.selectedSubject.objectId;

        dispatch('deleteAPICall',
            {service: subjectsService, data: data},
            {root: true}
        )
            .then(response => commit(types.DELETE_SUBJECT_SUCCESS, response))
            .catch(error => commit(types.DELETE_SUBJECT_FAIL, error));
    },

    subscribeToSubject({commit, dispatch}, data) {
        const subscribeService = subjectsService.getService('subscribe');

        serviceCaller.doRequest(subscribeService, {
            parameters: {
                objectId: data.subject
            }
        }, {})
            // TODO commits if necessary
    },

    enableStudents({commit, dispatch}, data) {
        const enableStudentsService = subjectsService.getService('enableStudents');

        serviceCaller.doRequest(enableStudentsService, {
            parameters: {
                objectId: data.subject
            }
        }, { students: data.students })
            // TODO commits if necessary
    }
}