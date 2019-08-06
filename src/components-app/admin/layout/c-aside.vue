<template lang="html">
    <aside :class="asideClasses">
        <div class="aside--profile">
            <div>
                <i class="aside--profile-image material-icons">
                    account_circle
                </i>
            </div>
            <div class="aside--profile-info">
                <span>{{ user.username }}</span>
                <button @click="onMainMenuClick">
                    <i class="material-icons">keyboard_arrow_down</i>
                </button>
            </div>
        </div>
        <ul :class="mainMenuClasses">
            <li class="aside--menu-item" @click="onLogOut">Cerrar sesión</li>
        </ul>
        <ul class="aside--menu">
            <li class="aside--menu-item" @click="onHomeClick">
                Inicio
            </li>
            <li class="aside--menu-item" @click="onDepartmentClick">
                Departamentos
            </li>
            <li class="aside--menu-item" @click="onSubjectClick">
                Cátedras
            </li>
            <li class="aside--menu-item" @click="onTeacherClick">
                Profesores
            </li>
            <li class="aside--menu-item" @click="onStudentClick">
                Estudiantes
            </li>
        </ul>
    </aside>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CContainer from 'components/c-container';

export default {
    name: 'CAside',

    props: {
        menuVisible: {
            type: Boolean,
            required: false,
            default: false,
        }
    },

    data: function () {
        return {
            animating: false,
            mainMenuVisible: false,
        }
    },

    computed: {
        ...mapState({
            user: state => state.user.user,
        }),

        asideClasses() {
            return {
                'aside': true,
                'admin-layout--container-side-bar': true,
                'aside__hidden': (!this.menuVisible)
            }
        },

        mainMenuClasses() {
            this.animating = true;

            setTimeout(() => {
                this.animating = false;
            }, 0);

            return {
                'aside--menu': true,
                'aside--main-menu': true,
                'aside--main-menu__animating': (this.animating),
                'aside--main-menu__hidden': (!this.mainMenuVisible)
            }
        },
    },

    methods: {
        ...mapActions({
            logOut: 'user/logOut',
        }),

        onHomeClick() {
            this.$router.push({name: 'admin'});
        },

        onStudentClick() {
            this.$router.push({name: 'admin-students'});
        },

        onDepartmentClick() {
            this.$router.push({name: 'admin-department'});
        },

        onSubjectClick() {
            this.$router.push({name: 'admin-subject'});
        },

        onTeacherClick() {
            this.$router.push({name: 'admin-teachers'});
        },

        onMainMenuClick() {
            this.mainMenuVisible = !this.mainMenuVisible;
        },

        onLogOut() {
            this.logOut();
            this.$router.push({name: 'login'});
        }
    },

    components: { CContainer }
}
</script>

<style lang="sass" src="./c-aside.scss"></style>
