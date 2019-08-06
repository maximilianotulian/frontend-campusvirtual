import * as types from 'lib-vuex/mutation-types';

export default {

    [types.GET_SUBJECTS_SUCCESS] (state, subjects) {
        state.subjects = subjects;
    },

    [types.GET_SUBJECTS_FAIL] (state) {
        state.subjects = [];
    },

    [types.GET_SUBJECT_SUCCESS] (state, selectedSubject) {
        state.selectedSubject = selectedSubject;
    },

    [types.GET_SUBJECT_FAIL] (state) {
        state.selectedSubject = {};
    },

    [types.CREATE_SUBJECT_SUCCESS] (state, newSubject) {
        state.subjects.push(newSubject);
        state.saveSubjectErrors = {};
    },

    [types.CREATE_SUBJECT_FAIL] (state, error) {
        state.saveSubjectErrors = error;
    },

    [types.EDIT_SUBJECT_SUCCESS] (state, editedSubject) {
        const editedSubjectIndex = _.findIndex(state.subjects,  subject => subject.objectId === editedSubject.objectId);
        Vue.set(state.subjects, editedSubjectIndex, editedSubject);
        state.editSubjectErrors = {};
        state.selectedSubject = {};
    },

    [types.EDIT_SUBJECT_FAIL] (state, error) {
        state.editSubjectErrors = error;
    },

    [types.DELETE_SUBJECT_SUCCESS] (state) {
        if (state.selectedSubject && state.subjects) {
            const deletedSubjectIndex = _.findIndex(state.subjects,  subject => subject.objectId === state.selectedSubject.objectId);
            state.subjects.splice(deletedSubjectIndex, 1);
            state.selectedSubject = {};
        }
    },

    [types.DELETE_SUBJECT_FAIL] (state, error) {
        state.deleteSubjectErrors = error;
    }
}
