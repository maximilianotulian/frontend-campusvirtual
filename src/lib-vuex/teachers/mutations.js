import * as types from 'lib-vuex/mutation-types';
import Vue from 'vue';
import _ from 'lodash';

export default {

    [types.GET_TEACHERS_SUCCESS] (state, teachers) {
        state.teachers = teachers;
    },

    [types.GET_TEACHERS_FAIL] (state) {
        state.teachers = [];
    },

    [types.GET_TEACHER_SUCCESS] (state, selectedTeacher) {
        state.selectedTeacher = selectedTeacher;
    },

    [types.GET_TEACHER_FAIL] (state) {
        state.selectedTeacher = {};
    },

    [types.EDIT_TEACHER_SUCCESS] (state, editedTeacher) {
        const editedTeacherIndex = _.findIndex(state.teachers,  teacher => teacher.objectId === editedTeacher.objectId);
        Vue.set(state.teachers, editedTeacherIndex, editedTeacher);
        state.editTeacherErrors = {};
        state.selectedTeacher = {};
    },

    [types.EDIT_TEACHER_FAIL] (state, error) {
        state.editTeacherErrors = error;
    },

    [types.DELETE_TEACHER_SUCCESS] (state) {
        if (state.selectedTeacher && state.teachers) {
            const deletedTeacherIndex = _.findIndex(state.teachers,  teacher => teacher.objectId === state.selectedTeacher.objectId);
            state.teachers.splice(deletedTeacherIndex, 1);
            state.selectedTeacher = {};
        }
    },

    [types.DELETE_TEACHER_FAIL] (state, error) {
        state.deleteTeacherErrors = error;
    },

    [types.SEND_TEACHER_INVITATION_SUCCESS] (state, error) {
        //TODO: Added to remove the warning from console
    }
}
