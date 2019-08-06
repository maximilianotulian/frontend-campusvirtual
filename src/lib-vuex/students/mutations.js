import * as types from 'lib-vuex/mutation-types';
import Vue from 'vue';
import _ from 'lodash';

export default {

    [types.GET_STUDENTS_SUCCESS] (state, students) {
        state.students = students;
    },

    [types.GET_STUDENTS_FAIL] (state) {
        state.students = [];
    },

    [types.GET_STUDENT_SUCCESS] (state, selectedStudent) {
        state.selectedStudent = selectedStudent;
    },

    [types.GET_STUDENT_FAIL] (state) {
        state.selectedStudent = {};
    },

    [types.CREATE_STUDENT_SUCCESS] (state, newStudent) {
        state.students.push(newStudent);
        state.saveStudentErrors = {};
    },

    [types.CREATE_STUDENT_FAIL] (state, error) {
        state.saveStudentErrors = error;
    },

    [types.EDIT_STUDENT_SUCCESS] (state, editedStudent) {
        const editedStudentIndex = _.findIndex(state.students,  student => student.objectId === editedStudent.objectId); 
        Vue.set(state.students, editedStudentIndex, editedStudent);
        state.editStudentErrors = {};
        state.selectedStudent = {};
    },

    [types.EDIT_STUDENT_FAIL] (state, error) {
        state.editStudentErrors = error;
    },

    [types.DELETE_STUDENT_SUCCESS] (state) {
        if (state.selectedStudent && state.students) {
            const deletedStudentIndex = _.findIndex(state.students,  student => student.objectId === state.selectedStudent.objectId); 
            state.students.splice(deletedStudentIndex, 1);
            state.selectedStudent = {};
        }
    },

    [types.DELETE_STUDENT_FAIL] (state, error) {
        state.deleteStudentErrors = error;
    }
}
