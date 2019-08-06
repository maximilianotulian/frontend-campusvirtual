<template lang="html">
    <Page class="admin-users-wrapper" title="Estudiantes" :fullWidth="true" showTitle>
        <CTable v-bind="tableProps" />
    </Page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CTable from 'components/c-table';
import Page from 'components-app/layout/page';

export default {
    name: 'Students',

    created() {
        this.getAllStudents();
    },

    methods: {
        ...mapActions({
            getAllStudents: 'students/getAll'
        }),
    },

    computed: {
        ...mapState({
            students: state => state.students.students
        }),

        tableProps() {
            return {
                /* actions: {
                    edit: (student) => {
                        this.$router.push({name: 'admin-student-abm', params: { objectId: student.id}});
                    },
                    delete: (student) => {
                        this.$router.push({name: 'admin-student-abm', params: { objectId: student.id}, query: {is_delete: true} });
                    }
                }, */
                headers: ['Nombre', 'Apellido', 'Email'],
                displayValues: ['firstName', 'lastName', 'email'],
                rows: this.students
            }
        }
    },

    components: { CTable, Page }
}
</script>

<style lang="sass" src="./students.scss"></style>