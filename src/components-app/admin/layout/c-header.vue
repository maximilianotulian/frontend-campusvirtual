<template lang="html">
    <div>
        <div :class="lineClasses" @click="onMenuClick">
            <div class="line-wrap--line line-top"></div>
            <div class="line-wrap--line line-middle"></div>
            <div class="line-wrap--line line-bottom"></div>
        </div>
        Campus Virtual Admin
    </div>
</template>

<script>
export default {
    name: 'CHeader',

    props: {
        handleMenutoggle: {
            type: Function,
            required: true
        }
    },

    computed: {
        lineClasses() {
            return {
                'line-wrap': true,
                'line-wrap__animated': (this.menuVisible),
            }
        },

        lineWrapperClasses() {
            return {
                'line-wrapper': true,
                'open': (this.menuVisible)
            }
        }
    },

    data: function () {
        return {
            menuVisible: true,
        }
    },

    methods: {
        onMenuClick() {
            this.menuVisible = !this.menuVisible;
            this.handleMenutoggle(this.menuVisible);
        }
    },
}
</script>

<style lang="sass" src="./c-header.scss"></style>
