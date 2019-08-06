<template lang="html">
    <CButton @click="handleClick" class="float-button" flavor="link"> + </CButton>
</template>

<script>
import CButton from 'components/c-button';

export default {
    name: 'CFloatButton',

    props: {
        onClick: {
            type: Function,
            required: false
        }
    },

    methods: {
        handleClick(event) {
            const onClick = this.onClick;

            if (onClick) {
                onClick(event);
            }
        }
    },

    components: { CButton }
}
</script>

<style lang="sass" src="./c-float-button.scss"></style>
