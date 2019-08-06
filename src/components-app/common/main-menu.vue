<template lang="html">
    <div class="main-menu">
        <CLogo class="main-menu--logo" />
        <div class="main-menu--pages">
            <CButton v-for="buttonProp in buttonProps"
                v-bind="buttonProp"
                v-if="buttonProp.show"
                @click="buttonProp.clickHandler"
            />
            <!-- This is obviously not a placeholder -->
            <div v-if="false">SOY UN CONTADOR DE NOTIFICACIONES TOTALES: {{updatesCount}}</div>
        </div>
        <div class="main-menu--actions">
            <CChip v-bind="chipProps" />
            <CButton class="main-menu--actions-arrow" icon="keyboard_arrow_down" iconOnly @click="onMenuButtonClick" />
            <CModal v-bind="modalProps" />
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
import { mapState, mapActions } from 'vuex';
import CButton from 'components/c-button';
import CChip from 'components/c-chip';
import CLogo from 'components/c-logo';
import CModal from 'components/c-modal';
import userHelper from 'lib-core/helpers/user';

export default {
    name: 'MainMenu',

    data () {
        return {
            toggle: false,
        }
    },

    computed: {
        ...mapState({
            user: state => state.user.user,
            updatesCount: state => state.updates.updatesCount
        }),

        currentRouteName() {
            return this.$route.name;
        },

        chipProps() {
            return {
                class: 'main-menu--username',
                description: this.user.username
            }
        },

        buttonProps() {
            const user = this.user;
            const isStudent = userHelper.isStudent(user);
            const isTeacher = userHelper.isTeacher(user);
            const isManager = userHelper.isManager(user);
            let buttonProps = {
                inicio: {
                    value: 'Inicio',
                    parentPath: '',
                    clickHandler: this.onHomeClick,
                    show: true
                },
                subjects: {
                    value: 'Materias',
                    parentPath: '/subjects',
                    clickHandler: this.onClickSubjects,
                    show: true
                },
                exams: {
                    value: 'Examenes',
                    parentPath: '/exams',
                    clickHandler: this.onClickExams,
                    show: (true && isStudent)
                },
                calendar: {
                    value: 'Calendario',
                    parentPath: '/calendar',
                    clickHandler: this.onClickCalendar,
                    show: true
                },
                help: {
                    value: 'Manual',
                    parentPath: '/help',
                    clickHandler: this.onClickHelp,
                    show: true
                }
            };

            return _.each(buttonProps, (props) => {
                return _.extend(props, {
                    class: this.getButtonClass(props.name, props.parentPath),
                    flavor: 'link',
                });
            });
        },

        modalProps() {
            return {
                class: 'actions--modal',
                controlled: true,
                options: [
                    /* {
                        value: 'Preferencias',
                        handler: this.onMyProfileClick
                    }, */
                    {
                        value: 'Cerrar sesión',
                        handler: this.onLogOut
                    }
                ],
                showIndicator: false,
                visible: this.toggle,
            }
        },
    },

    methods: {
        ...mapActions({
            logOut: 'user/logOut'
        }),

        getButtonClass(name, parentPath) {
            let classes = {};

            classes[`main-menu--${name}`] = true;
            classes['main-menu_selected'] = this.isSelected(parentPath)

            return classes;
        },

        isSelected(parentPath) {
            const routes = this.$router.options.routes;
            const route = this.$route.name;
            let isChildOfRoute = false;

            _.each(routes, (route) => {
                if (route.path === parentPath) {
                    _.each(route.children, (routeChild) => {
                        if (routeChild.name === this.$route.name) {
                            isChildOfRoute = true;
                        }
                    });
                }
            });

            return isChildOfRoute;
        },

        onLogOut() {
            this.logOut();
            this.$router.push({name: 'login'});
        },

        onHomeClick() {
            this.$router.push({name: 'home'});
        },

        onClickSubjects() {
            this.$router.push({name: 'subjects-list'});
        },

        onClickExams() {
            this.$router.push({name: 'student-exams'});
        },

        onClickCalendar() {
            this.$router.push({name: 'calendar'});
        },

        onClickHelp() {
            this.$router.push({name: 'help'});
        },

        onMenuButtonClick() {
            this.toggle = !this.toggle;
        },

        onMyProfileClick() {
            this.$router.push({name: 'profile'});
        },
    },

    components: { CButton, CChip, CLogo, CModal }
}
</script>

<style lang="sass" src="./main-menu.scss"></style>
