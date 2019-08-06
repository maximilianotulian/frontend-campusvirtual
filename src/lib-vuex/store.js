import apiActions from 'lib-vuex/api-actions';
import createLogger from 'vuex/dist/logger'
import events from 'lib-vuex/events';
import exams from 'lib-vuex/exams';
import form from 'lib-vuex/form';
import images from 'lib-vuex/images';
import news from 'lib-vuex/news';
import specialities from 'lib-vuex/specialities'
import students from 'lib-vuex/students';
import subjects from 'lib-vuex/subjects';
import teachers from 'lib-vuex/teachers';
import updates from 'lib-vuex/updates';
import user from 'lib-vuex/user';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    actions: {
        ...apiActions
    },
    modules: { events, exams, user, news, form, images, subjects, updates, specialities, students, teachers },
    plugins: [createLogger()]
});
