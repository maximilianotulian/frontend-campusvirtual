<template lang="html">
    <header class="header">
        <CContainer class="header--container">
            <MainMenu class="header--menu" />
        </CContainer>
    </header>
</template>

<script>
import CContainer from 'components/c-container';
import MainMenu from 'components-app/common/main-menu';

export default {
    name: 'CHeader',

    components: { CContainer, MainMenu }
}
</script>

<style lang="sass" src="./c-header.scss"></style>
