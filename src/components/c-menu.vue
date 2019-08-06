<template lang="html">
    <div class="menu">
        <CCard :class="{menu: true, 'menu_not-visible': !showMenu}">
            <CMenuItem v-for="item in items" :children="item" />
        </CCard>
    </div>
</template>

<script>
import { CButton, CCard, CMenuItem } from 'components';

export default {
    name: 'CMenu',

    props: {
        cascading: {
            default: true,
            required: false,
            type: Boolean
        },
        items: {
            default () {
                return [
                    'Add',
                    'Edit',
                    'Delete'
                ]
            },
            required: false,
            type: Array,
            validator (items) {
                return items.length >= 2;
            }
        },
        scrollable: {
            default: true,
            required: false,
            type: Boolean
        },
        showMenu: {
            default: true,
            required: false,
            type: Boolean
        }
    },

    methods: {
        closeMenu () {},
        disableItems () {},
        openMenu () {},
        removeIrrelevantItems () {}
    },

    components: { CCard, CButton, CMenuItem }
}
</script>

<style lang="sass" src="./c-menu.scss">
</style>
