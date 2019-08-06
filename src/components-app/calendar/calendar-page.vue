<template lang="html">
    <Page title="Calendario" flexDirection="column">
        <h1 style="font-size: 25px; margin-bottom: 10px;">Calendario</h1>
        <CCalendar />
    </Page>
</template>

<script>
import CCalendar from 'components/c-calendar';
import Page from 'components-app/layout/page';

export default {
    name: 'CalendarPage',

    components: { CCalendar, Page }
}
</script>

<style lang="sass" src="./calendar-page.scss"></style>
