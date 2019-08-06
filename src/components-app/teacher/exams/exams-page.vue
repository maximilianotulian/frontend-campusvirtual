<template lang="html">
    <Page class="courses-page" title="Listado de Cursos">
        <div class="courses-page--wrapper">
            <h1 style="font-size: 25px">Examenes</h1>
            </div>
        </div>
    </Page>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CCard from 'components/c-card';
import CTable from 'components/c-table';
import Page from 'components-app/layout/page';

export default {
    name: 'ExamsPage',

    components: { CCard, CTable, Page }
}
</script>

<style lang="sass" src="./exams-page.scss"></style>