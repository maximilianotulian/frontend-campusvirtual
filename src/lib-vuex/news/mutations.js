import * as types from 'lib-vuex/mutation-types';

export default {

    [types.GET_NEWS_SUCCESS] (state, news) {
        state.news = news;
    },

    [types.GET_NEWS_FAIL] (state) {
        state.news = [];
    },

    [types.GET_NEW_SUCCESS] (state, selectedNew) {
        state.selectedNew = selectedNew;
    },

    [types.GET_NEW_FAIL] (state) {
        state.selectedNew = {};
    },

    [types.CREATE_NEW_SUCCESS] (state, newNotice) {
        state.news.push(newNotice);
        state.saveNewErrors = {};
    },

    [types.CREATE_NEW_FAIL] (state, error) {
        state.saveNewErrors = error;
    },

    [types.EDIT_NEW_SUCCESS] (state, editedNew) {
        const editedNewIndex = _.findIndex(state.news,  newItem => newItem.objectId === editedNew.objectId);
        Vue.set(state.news, editedNewIndex, editedNew);
        state.editNewErrors = {};
        state.selectedNew = {};
    },

    [types.EDIT_NEW_FAIL] (state, error) {
        state.editNewErrors = error;
    },

    [types.DELETE_NEW_SUCCESS] (state) {
        if (state.selectedNew && state.news) {
            const deletedNewIndex = _.findIndex(state.news,  newItem => newItem.objectId === state.selectedNew.objectId);
            state.news.splice(deletedNewIndex, 1);
            state.selectedNew = {};
        }
    },

    [types.DELETE_NEW_FAIL] (state, error) {
        state.deleteNewErrors = error;
    }
}
