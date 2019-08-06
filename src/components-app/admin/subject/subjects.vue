<template lang="html">
    <Page class="subjects-wrapper" title="Materias" :fullWidth="true" showTitle>
        <CTable v-bind="tableProps" />
    </Page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CTable from 'components/c-table';
import Page from 'components-app/layout/page';

export default {
    name: 'Subjects',

    created() {
        this.getAllSubjects();
    },

    methods: {
        ...mapActions({
            getAllSubjects: 'subjects/getAll',
        }),
    },

    computed: {
        ...mapState({
            subjects: state => state.subjects.subjects.sort((a,b) => {
                return a.title > b.title;
            }),
        }),

        tableProps() {
            return {
                actions: {
                    add: () => {
                        this.$router.push({name: 'admin-subject-abm', params: { objectId: 'new'}})
                    },
                    edit: (subject) => {
                        this.$router.push({name: 'admin-subject-abm', params: { objectId: subject.objectId }})
                    },
                    delete: (subject) => {
                        this.$router.push({name: 'admin-subject-abm', params: { objectId: subject.objectId }, query: {is_delete: true} });
                    }
                },
                headers: ['Descripción','Título'],
                maxRowsPerPage: 5,
                displayValues: ['description', 'title'],
                rows: this.subjects
            }
        },
    },

    components: { CTable, Page }
}
</script>

<style lang="sass" src="./subjects.scss"></style>