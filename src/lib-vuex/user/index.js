import state from 'lib-vuex/user/state';
import getters from 'lib-vuex/user/getters';
import actions from 'lib-vuex/user/actions';
import mutations from 'lib-vuex/user/mutations';

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
