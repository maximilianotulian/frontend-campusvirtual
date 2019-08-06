<template lang="html">
    <div class="logo">
        <CButton class="logo--name" flavor="link" @click="onClickHome">Campus Virtual</CButton>
        <span v-if="showCopyright" class="logo--copyright">© 2017 All right reserved</span>
    </div>
</template>

<script>
import CButton from 'components/c-button';

export default {
    name: 'CLogo',

    props: {
        showCopyright: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    methods: {
        onClickHome() {
            this.$router.push({name: 'home'});
        },
    },

    components: { CButton }
}
</script>

<style lang="sass" src="./c-logo.scss"></style>
