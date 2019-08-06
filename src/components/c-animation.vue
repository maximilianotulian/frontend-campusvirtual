<template lang="html">
    <div class="animation">
        <transition
            v-if="javascriptAnimated"
            v-bind="props"
            v-bind:css="false"
            @beforeEnter="handleBeforeEnter"
            @enter="handleEnter"
            @afterEnter="handleAfterEnter"
            @enterCancelled="handleEnterCancelled"
            @beforeLeave="handleBeforeLeave"
            @leave="handleLeave"
            @afterLeave="handleAfterLeave"
            @leaveCancelled="handleLeaveCancelled"
        >
            <slot />
        </transition>
        <transition v-else v-bind="props">
            <slot v-if="toggle" />
            <slot v-if="!toggle" name="secondSlot" />
        </transition>
    </div>
</template>

<script>

export default {
    name: 'CAnimation',

    props: {
        animationName: {
            type: [String, Array],
            required: false,
            default: 'slide-fade'
        },
        appearConfig: {
            default: false,
            required: false,
            type: [Boolean, Object]
        },
        animationMode: {
            type: String,
            required: false
        },
        javascriptAnimated: {
            type: Boolean,
            required: false,
            default: false
        },
        toggle: {
            type: Boolean,
            required: false,
            default: true
        }
    },

    methods: {
        handleBeforeEnter (el) {
            this.$emit('beforeEnter', el);
        },

        handleEnter (el, done) {
            this.$emit('enter', {
                el: el,
                done: done
            });
        },

        handleAfterEnter (el) {
            this.$emit('afterEnter', el);
        },

        handleEnterCancelled (el) {
            this.$emit('enterCancelled', el);
        },

        handleBeforeLeave (el) {
            this.$emit('beforeLeave', el);
        },

        handleLeave (el, done) {
            this.$emit('leave', {
                el: el,
                done: done
            });
        },

        handleAfterLeave (el) {
            this.$emit('afterLeave', el);
        },

        handleLeaveCancelled (el) {
            this.$emit('leaveCancelled', el);
        }
    },

    computed: {
        props () {
            const appearConfig = this.appearConfig;
            let props = {
                mode: this.animationMode,
                name: this.animationName
            };

            if (appearConfig) {
                _.extend(props, appearConfig, {appear: true});
            }

            return props;
        }
    }
}
</script>

<style lang="sass" src="./c-animation.scss"></style>
