<template lang="html">
    <div :class="classes">
        <div class="page--title" v-if="showTitle">{{ title }}</div>
        <div class="page--content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Page',

    computed: {
        classes() {
            return {
                'page': true,
                'page__display-column': (this.flexDirection === 'column'),
                'page__full-width': (this.fullWidth)
            }
        }
    },

    props: {
        flexDirection: {
            required: false,
            type: String,
            default: 'row'
        },
        showTitle: {
            required: false,
            type: Boolean,
            default: false
        },
        title: {
            required: false,
            type: String
        },
        fullWidth: {
            required: false,
            type: Boolean,
            default: false
        }
    },
}
</script>

<style lang="sass" src="./page.scss"></style>
