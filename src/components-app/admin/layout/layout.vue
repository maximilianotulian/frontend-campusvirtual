<template lang="html">
    <div :class="classes">
        <CHeader class="admin-layout--header" :handleMenutoggle="handleMenuToggle" />
        <div class="admin-layout--container">
            <CAside class="admin-layout--container-aside" :menuVisible="menuVisible" />
            <router-view class="admin-layout--container-content" />
        </div>
    </div>
</template>

<script>
import CAside from 'components-app/admin/layout/c-aside';
import CHeader from 'components-app/admin/layout/c-header';
import CContainer from 'components/c-container';

export default {
    name: 'Layout',

    data() {
        return {
            menuVisible: true
        }
    },

    computed: {
        classes() {
            return {
                'admin-layout': true,
                'admin-layout_hidden': (!this.menuVisible)
            }
        }
    },

    methods: {
        handleMenuToggle(newMenuToggleValue) {
            this.menuVisible = newMenuToggleValue;
        }
    },

    components: { CAside, CContainer, CHeader }
}
</script>

<style lang="sass" src="./layout.scss"></style>
