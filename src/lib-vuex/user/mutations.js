import * as types from 'lib-vuex/mutation-types';

export default {

    [types.LOG_IN_SUCCESS] (state, user) {
        state.user = user;
        state.logInErrors = {};
    },

    [types.LOG_IN_FAIL] (state, error) {
        state.user = {};
        state.logInErrors = error;
    },

    [types.LOG_OUT] (state) {
        state.user = {};
        state.logInErrors = null;
    },

    [types.REGISTERED_FAIL] (state, error) {
        state.registeredErrors = error;
    },

    [types.GET_USERS_SUCCESS] (state, users) {
        state.users = users;
    },

    [types.GET_USERS_FAIL] (state) {
        state.users = [];
    },

    [types.GET_USER_SUCCESS] (state, selectedUser) {
        state.selectedUser = {...state.selectedUser, ...selectedUser};
    },

    [types.GET_USER_FAIL] (state) {
        state.selectedUser = {};
    },

    [types.EDIT_USER_SUCCESS] (state, editedUser) {
        const editedUserIndex = _.findIndex(state.users,  user => user.objectId === editedUser.objectId);
        Vue.set(state.specialities, editedUserIndex, editedUser);
        state.editUserErrors = {};
        state.selectedUser = {};
    },

    [types.EDIT_USER_FAIL] (state, error) {
        state.editUserErrors = error;
    },

    [types.DELETE_USER_SUCCESS] (state) {
        if (state.selectedUser && state.users) {
            const deletedUserIndex = _.findIndex(state.users,  user => user.objectId === state.selectedUser.objectId);
            state.users.splice(deletedUserIndex, 1);
            state.selectedUser = {};
        }
    },

    [types.DELETE_USER_FAIL] (state, error) {
        state.deleteUserErrors = error;
    },

    [types.GET_TEACHERS_SUCCESS] (state, teachers) {
        state.teachers = teachers;
    },

    [types.GET_TEACHERS_FAIL] (state, error) {
        state.teachers = [];
    },
}