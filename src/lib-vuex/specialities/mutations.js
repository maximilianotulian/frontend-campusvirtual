import * as types from 'lib-vuex/mutation-types';
import Vue from 'vue';
import _ from 'lodash';

export default {

    [types.GET_SPECIALITIES_SUCCESS] (state, specialities) {
        state.specialities = specialities;
    },

    [types.GET_SPECIALITIES_FAIL] (state) {
        state.specialities = [];
    },

    [types.GET_SPECIALITY_SUCCESS] (state, selectedSpeciality) {
        state.selectedSpeciality = selectedSpeciality;
    },

    [types.GET_SPECIALITY_FAIL] (state) {
        state.selectedSpeciality = {};
    },

    [types.CREATE_SPECIALITY_SUCCESS] (state, newSpeciality) {
        state.specialities.push(newSpeciality);
        state.saveSpecialityErrors = {};
    },

    [types.CREATE_SPECIALITY_FAIL] (state, error) {
        state.saveSpecialityErrors = error;
    },

    [types.EDIT_SPECIALITY_SUCCESS] (state, editedSpeciality) {
        const editedSpecialityIndex = _.findIndex(state.specialities,  speciality => speciality.objectId === editedSpeciality.objectId); 
        Vue.set(state.specialities, editedSpecialityIndex, editedSpeciality);
        state.editSpecialityErrors = {};
        state.selectedSpeciality = {};
    },

    [types.EDIT_SPECIALITY_FAIL] (state, error) {
        state.editSpecialityErrors = error;
    },

    [types.DELETE_SPECIALITY_SUCCESS] (state) {
        if (state.selectedSpeciality && state.specialities) {
            const deletedSpecialityIndex = _.findIndex(state.specialities,  speciality => speciality.objectId === state.selectedSpeciality.objectId); 
            state.specialities.splice(deletedSpecialityIndex, 1);
            state.selectedSpeciality = {};
        }
    },

    [types.DELETE_SPECIALITY_FAIL] (state, error) {
        state.deleteSpecialityErrors = error;
    }
}
