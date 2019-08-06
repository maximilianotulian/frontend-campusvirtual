import * as types from 'lib-vuex/mutation-types';
import Vue from 'vue';
import _ from 'lodash';

export default {

    [types.GET_EXAMS_SUCCESS] (state, exams) {
        state.exams = exams;
    },

    [types.GET_EXAMS_FAIL] (state) {
        state.exams = [];
    },

    [types.GET_EXAM_SUCCESS] (state, selectedExam) {
        state.selectedExam = selectedExam;
    },

    [types.GET_EXAM_FAIL] (state) {
        state.selectedExam = {};
    },

    [types.CREATE_EXAM_SUCCESS] (state, newEvent) {
        state.exams.push(newEvent);
        state.saveEventErrors = {};
    },

    [types.CREATE_EXAM_FAIL] (state, error) {
        state.saveEventErrors = error;
    },

    [types.EDIT_EXAM_SUCCESS] (state, editedExam) {
        const editedExamIndex = _.findIndex(state.exams,  event => event.objectId === editedExam.objectId);
        Vue.set(state.exams, editedExamIndex, editedExam);
        state.editExamErrors = {};
        state.selectedExam = {};
    },

    [types.EDIT_EXAM_FAIL] (state, error) {
        state.editExamErrors = error;
    },

    [types.DELETE_EXAM_SUCCESS] (state) {
        if (state.selectedExam && state.exams) {
            const deletedEventIndex = _.findIndex(state.exams,  event => event.objectId === state.selectedExam.objectId);
            state.exams.splice(deletedEventIndex, 1);
            state.selectedExam = {};
        }
    },

    [types.DELETE_EXAM_FAIL] (state, error) {
        state.deleteEventErrors = error;
    }
}
