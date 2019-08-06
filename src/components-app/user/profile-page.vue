<template lang="html">
    <Page class="user-profile-wrapper" title="Preferencias" flexDirection="column">
        <h1 style="font-size: 25px; margin-bottom: 10px;">Preferencias</h1>
        <Profile />
    </Page>
</template>

<script>
import Page from 'components-app/layout/page';
import Profile from 'components-app/home/profile';

export default {
    name: 'ProfilePage',

    components: { Page, Profile }
}
</script>

<style lang="sass" src="./profile-page.scss"></style>