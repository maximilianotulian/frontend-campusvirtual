<template lang="html">
    <div>
        <CButton v-if="!controlled" @click="handleMenuClick" iconOnly icon="more_horizontal" />
        <CAnimation animationName="fade">
            <div v-if="visible" :class="modalClasses" v-click-outside="handleModalClose">
                <div v-if="showIndicator" class="modal--indicator" />
                <ul class="modal--options">
                    <li class="modal--options-item" v-for="option in options" @click="option.handler">
                        {{ option.value }}
                    </li>
                </ul>
            </div>
        </CAnimation>
    </div>
</template>

<script>
import CAnimation from 'components/c-animation';
import CButton from 'components/c-button';

export default {
    name: 'CModal',

    props: {
        controlled: {
            type: Boolean,
            required: false,
            default: false
        },
        options: {
            type: Array,
            required: false,
            default: []
        },
        visible: {
            type: Boolean,
            required: false,
            default: true
        },
        showIndicator: {
            type: Boolean,
            required: false,
            default: true
        },
        modalClose: {
            type: Function,
            required: false,
        }
    },

    computed: {
        modalClasses () {
            return {
                modal: true,
            }
        }
    },

    methods: {
        handleModalClose() {
            const modalClose = this.modalClose;

            if (modalClose) {
                modalClose();
            }
        },
    },

    components: { CAnimation, CButton }
}

</script>

<style lang="sass" src="./c-modal.scss">

</style>
