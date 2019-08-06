<template>
    <div :class="classes">
        <a class="chip-wrapper" @click="handleAnchorClick">
            <img class="chip-wrapper--image" :src="image" v-if="image !== '#' " />
            <i v-else class="chip-wrapper--image material-icons main-menu--user-icon">account_circle</i>
            <span class="chip-wrapper--description" v-if="description">{{ description }}</span>
        </a>
    </div>
</template>

<script>

export default {
    name: 'CChip',

    props: {
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        routeName: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            required: false,
            default: '#'
        },
    },

    methods: {
        handleAnchorClick () {
            const routeName = this.routeName;

            if (routeName) {
                this.$router.push({name: routeName});
            }
        }
    },

    computed: {
        classes () {
            return {
                chip: true,
                'chip_disabled': this.disabled
            }
        }
    },


}
</script>
<style lang="sass" src="./c-chip.scss"></style>