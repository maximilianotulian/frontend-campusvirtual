<template lang="html">
    <Page class="admin-users-wrapper" title="Profesores" :fullWidth="true" showTitle>
        <CTable v-bind="tableProps" />
    </Page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CTable from 'components/c-table';
import Page from 'components-app/layout/page';

export default {
    name: 'Teachers',

    created() {
        this.getAllUsers();
        this.getAllTeachers();
    },

    methods: {
        ...mapActions({
            getAllUsers: 'user/getAll',
            getAllTeachers: 'teachers/getAll',
        }),
    },

    computed: {
        ...mapState({
            users: (state) => {
                //TODO: This will be useful only if the we need to map the teachers from the users
                return state.user.users.filter(function isTeacher(user) {
                    let teacher = false;

                    (user.groups || []).forEach(function hasGroupTeacher(userGroup) {
                        if (userGroup.name === 'teachers') {
                            teacher = true;
                        }
                    });

                    return teacher;
                });
            },
            teachers: state => state.teachers.teachers
        }),

        tableProps() {
            return {
                actions: {
                    add: () => {
                        this.$router.push({name: 'admin-teacher-invite', params: { objectId: 'new'}})
                    },
                    // edit: (teacher) => {
                    //
                    //     // TODO: Should we allow edition?
                    //     //this.$router.push({name: 'admin-teacher-abm', params: { objectId: teacher.id}});
                    // },
                    // delete: (teacher) => {
                    //
                    //     // TODO: Should we allow remove?
                    //     //this.$router.push({name: 'admin-teacher-abm', params: { objectId: teacher.id}, query: {is_delete: true} });
                    // }
                },
                headers: ['Nombre y apellido', 'Email'],
                displayValues: ['firstName', 'lastName', 'email'],
                rows: this.teachers
            }
        }
    },

    components: { CTable, Page }
}
</script>

<style lang="sass" src="./teachers.scss"></style>