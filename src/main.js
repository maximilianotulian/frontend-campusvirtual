import App from 'src/app';
import Vue from 'vue';
import router from 'src/router';
import store from 'lib-vuex/store';

import 'directives/click-outside';

let vm = new Vue({
    el: '#app',
    router: router,
    store: store,
    components: { App },
    template: '<App />'
});

window.vm = vm;
window.Vue = Vue;
