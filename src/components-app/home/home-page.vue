<template>
    <Page class="home-page" title="Inicio">
        <div class="home-page--feedback">
            <Feedback />
        </div>
        <div class="home-page--quick-access-list">
            <QuickAccessList />
        </div>
    </Page>
</template>

<script lang="js">
import { mapActions } from 'vuex';
import QuickAccessList from 'components-app/home/quick-access-list';
import Feedback from 'components-app/home/feedback';
import Page from 'components-app/layout/page';

export default {
    name: 'HomePage',

    created() {
        this.getAllSubjects();
        this.getAllUpdates();
    },

    methods: {
        ...mapActions({
            getAllSubjects: 'subjects/getAll',
            getAllUpdates: 'updates/getAll'
        })
    },

    components: { QuickAccessList, Feedback, Page }
};
</script>

<style lang="sass" src="./home-page.scss"></style>
