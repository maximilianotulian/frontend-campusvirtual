<template lang="html">
    <div class="drawer">
        <div class="drawer--header">
            <h2 class="drawer--header-title" v-if="title">{{ title }}</h2>
            <CButton
                class="drawer--header-trigger"
                @click="showContent = !showContent"
                :iconOnly="true"
                :icon="(showContent) ? 'expand_less' : 'expand_more'"
                />
        </div>
        <CAnimation
            class="drawer--content"
            v-on:beforeEnter="handleBeforeEnter"
            v-on:enter="handleEnter"
            v-on:leave="handleLeave"
            :javascriptAnimated="true"
        >
            <slot v-if="showContent" />
        </CAnimation>
    </div>
</template>

<script>
import _ from 'lodash';
import CAnimation from 'components/c-animation';
import CButton from 'components/c-button';
import CCard from 'components/c-card';
import Velocity from 'velocity-animate';

export default {
    name: 'CDrawer',

    data() {
        return {
            showContent: false
        }
    },

    props: {
        animateFromLeft: {
            type: Boolean,
            required: false
        },
        expanded: {
            type: Boolean,
            required: false
        },
        title: {
            type: String,
            required: false
        }
    },

    methods: {
        handleBeforeEnter (el) {
            el.style.maxHeight = 'initial';
            el.style.width = 'initial';
            el.style.opacity = 0;
        },
        handleEnter (configObject) {
            let el = configObject.el;

            if (this.animateFromLeft) {
                Velocity(el, {opacity: 1, maxWidth: el.offsetWidth}, {duration: 300, complete: configObject.done});
            } else {
                Velocity(el, {opacity: 1, maxHeight: el.offsetHeight}, {duration: 300, complete: configObject.done});
            }
        },
        handleLeave (configObject) {
            let el = configObject.el;

            if (this.animateFromLeft) {
                Velocity(el, {opacity: 0, maxWidth: 0}, {duration: 300, complete: configObject.done});
            } else {
                Velocity(el, {opacity: 0, maxHeight: 0}, {duration: 300, complete: configObject.done});
            }

        },
    },

    components: { CAnimation, CButton, CCard }
}
</script>

<style lang="sass" src="./c-drawer.scss"></style>
