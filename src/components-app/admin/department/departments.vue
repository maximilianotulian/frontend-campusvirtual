<template lang="html">
    <Page class="departments-wrapper" title="Departamentos" :fullWidth="true" showTitle>
        <CTable v-bind="tableProps" />
    </Page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CTable from 'components/c-table';
import Page from 'components-app/layout/page';

export default {
    name: 'Departments',

    created() {
        this.getAllSpecialities();
    },

    methods: {
        ...mapActions({
            getAllSpecialities: 'specialities/getAll',
        })
    },

    computed: {
        ...mapState({
            specialities: state => state.specialities.specialities,
        }),

        tableProps() {
            return {
                actions: {
                    add: () => {
                        this.$router.push({name: 'admin-department-abm', params: { objectId: 'new'}});
                    },
                    edit: (row) => {
                        this.$router.push({name: 'admin-department-abm', params: { objectId: row.objectId}});
                    },
                    delete: (row) => {
                        this.$router.push({name: 'admin-department-abm', params: { objectId: row.objectId}, query: {is_delete: true} });
                    }
                },
                headers: ['Descripción','Título'],
                displayValues: ['description', 'title'],
                rows: this.specialities
            }
        }
    },

    components: { CTable, Page }
}
</script>

<style lang="sass" src="./departments.scss"></style>