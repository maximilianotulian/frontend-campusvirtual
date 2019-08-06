<template lang="html">
    <Page class="admin-roles-wrapper" title="Admin Roles" :fullWidth="true" showTitle>
    </Page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CTable from 'components/c-table';
import Page from 'components-app/layout/page';

export default {
    name: 'Roles',

    created() {
    },

    methods: {
        ...mapActions({}), // Only update permissions related to a role. Do not allow to create new roles.
    },

    computed: {},

    components: { CTable, Page }
}
</script>

<style lang="sass" src="./roles.scss"></style>