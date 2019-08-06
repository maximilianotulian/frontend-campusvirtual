import * as types from 'lib-vuex/mutation-types';

export default {

    [types.GET_UPDATES_COUNT_SUCCESS] (state, payload) {
        const { updatesBySubject, updatesCount } = payload
        state.updatesBySubject = updatesBySubject;
        state.updatesCount = updatesCount;
    },

    [types.GET_UPDATES_COUNT_FAIL] (state, error) {
        state.updatesBySubject = [];
        state.updatesCount = 0;
    }
}
