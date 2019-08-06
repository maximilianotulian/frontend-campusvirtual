import * as types from 'lib-vuex/mutation-types';

export default {
    initField ({commit, state}, fieldData) {
        commit(types.INIT_FIELD, fieldData)
    },

    setFieldValue ({commit, state}, fieldData) {
        commit(types.SET_FIELD_VALUE, fieldData);
    },

    setFieldErrors ({commit, state}, fieldData) {
        commit(types.SET_FIELD_ERRORS, fieldData);
    },

    setFieldFocus ({commit, state}, fieldData) {
        commit(types.SET_FIELD_FOCUS, fieldData);
    },

    clearForm ({commit, state}) {
        commit(types.CLEAR_FORM)
    }
}
