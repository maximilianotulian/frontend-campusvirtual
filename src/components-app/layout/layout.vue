<template lang="html">
    <div class="layout">
        <CHeader class="layout--header" />
        <CContainer class="layout--container">
            <router-view></router-view>
        </CContainer>
        <CFooter class="layout--footer" />
    </div>
</template>

<script>
import CHeader from 'components-app/layout/c-header';
import CContainer from 'components/c-container';
import CFooter from 'components-app/layout/c-footer';

export default {
    name: 'Layout',

    components: { CHeader, CContainer, CFooter }
}
</script>

<style lang="sass" src="./layout.scss"></style>
