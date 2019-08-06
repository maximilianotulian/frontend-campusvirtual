<template lang="html">
      <div class="dropdown">
        <CButton @click="onOpenDropdownClick" v-bind="buttonProps">
            {{dropdownButtonContent}}
        </CButton>
        <CAnimation animationName="fade">
            <div v-if="visible" :class="dropdownClasses" v-click-outside="hideDropDown">
                <slot></slot>
            </div>
        </CAnimation>
    </div>
</template>

<script>
import CAnimation from 'components/c-animation';
import CButton from 'components/c-button';

export default {
    name: 'CDropdown',

    props: {
        dropdownButtonContent: {
            type: String,
            required: true
        },
        onDropDownClosed: {
            type: Function,
            required: false
        },
        buttonSize: {
            type: String,
            required: false,
            default: 'extraLarge'
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
        size: {
            type: String,
            required: false,
            default: ''
        }
    },

    data () {
        return {
            visible: this.hide
        }
    },

    computed: {
        dropdownClasses () {
            return {
                'dropdown--content': true,
                'dropdown--content__large': (this.size === 'large')
            }
        },

        buttonProps() {
            return {
                disabled: (this.disabled),
                icon: 'arrow_drop_down', 
                iconPosition: 'right',
                size: this.buttonSize
            }
        }
    },

    methods: {
        onOpenDropdownClick () {
            this.showDropDown();
        },

        showDropDown () {
            if (!this.disabled) {
                this.visible = true;
            }
        },

        hideDropDown () {
            this.visible = false;
            this.onDropDownClosed();
        }
    },

    components: { CAnimation, CButton }
}
</script>

<style lang="sass" src="./c-dropdown.scss"></style>
