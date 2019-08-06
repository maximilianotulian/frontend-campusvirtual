import * as types from 'lib-vuex/mutation-types';
import examsService from 'app/services/exams-service';
import {serviceCaller} from 'lib-core/services/service-caller';

export default {
    getAll({commit, dispatch, state}, subjectObjectId) {
        const options = {
            parameters: {
                subjectObjectId: subjectObjectId
            }
        };

        dispatch('getAllAPICall',
            {service: examsService, options},
            {root: true}
        )
            .then(response => commit(types.GET_EXAMS_SUCCESS, response))
            .catch(error => commit(types.GET_EXAMS_FAIL, error));
    },

    getOne({commit, dispatch}, parameters) {
        const options = {
            parameters: parameters
        };

        dispatch('getOneAPICall',
            {service: examsService, data: {objectId: parameters.objectId}, options },
            {root: true}
        )
            .then(response => commit(types.GET_EXAM_SUCCESS, response))
            .catch(error => commit(types.GET_EXAM_FAIL, error));
    },

    edit({store, commit, dispatch}, {data, parameters}) {
        const options = {
          parameters: parameters
        }

        dispatch('editAPICall',
            {service: examsService, data: data, options},
            {root: true}
        )
            .then(response => commit(types.EDIT_EXAM_SUCCESS, response))
            .catch(error => commit(types.EDIT_EXAM_FAIL, error));
    },

    create({commit, dispatch}, data) {
        const options = {
            parameters: {
                subjectObjectId: this.state.subjects.selectedSubject.objectId,
            }
        };

        dispatch('createAPICall',
            {service: examsService, data: data, options},
            {root: true}
        )
            .then(response => commit(types.CREATE_EXAM_SUCCESS, response))
            .catch(error => commit(types.CREATE_EXAM_FAIL, error));
    },

    delete({commit, dispatch}, data) {
        const options = {
            parameters: {
                subjectObjectId: this.state.subjects.selectedSubject.objectId,
                objectId: this.state.exams.selectedExam.objectId
            }
        };

        dispatch('deleteAPICall',
            {service: examsService, data: data, options},
            {root: true}
        )
            .then(response => commit(types.DELETE_EXAM_SUCCESS, response))
            .catch(error => commit(types.DELETE_EXAM_FAIL, error));
    },
}