<template>
    <button :class="classes" @click="onClick" type="button" :disabled="disabled">
        <span v-if="!iconOnly" :class="contentClass">
            <i v-if="shouldRenderIcon('left')" :class="iconClass">
                {{ icon }}
            </i>
            <span>
                <slot>
                    {{ value }}
                </slot>
            </span>
            {{ content }}
            <i v-if="shouldRenderIcon('right')" :class="iconClass">
                {{ icon }}
            </i>
        </span>
        <i v-else :class="iconClass">
            {{ icon }}
        </i>
    </button>
</template>

<script>
export default {

    name: 'CButton',

    props: {
        flavor: {
            type: String,
            required: false
        },
        icon: {
            type: String,
            default: ''
        },
        iconPosition: {
            type: String,
            default: 'left'
        },
        size: {
            type: String,
            default: 'medium'
        },
        content: {
            type: String,
            required: false,
            default: ''
        },
        iconOnly: {
            type: Boolean,
            required: false,
            default: false
        },
        iconSize: {
            type: String,
            required: false,
            default: '24'
        },
        iconDisabled: {
            type: Boolean,
            required: false
        },
        iconType: {
            type: String,
            required: false
        },
        value: {
            type: String,
            required: false
        },
        extended: {
            type: Boolean,
            required: false,
            default: false
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    data () {
        return {
            classes: this.getClass(),
            iconClass: this.getIconClass()
        }
    },

    computed: {
        contentClass () {
            return {
                'button--content': true,
                'button--content__iconless': (!this.icon)
            }
        }
    },

    methods: {
        onClick (event) {
            this.$emit('click', event);
        },

        getClass () {
            const flavor = this.flavor;
            const size = this.size;

            return {
                button: true,
                button__primary: (flavor === 'primary'),
                button__secondary: (flavor === 'secondary'),
                button__tertiary: (flavor === 'tertiary'),
                button__transparent: (flavor === 'transparent'),
                'button__extra-large': (size === 'extraLarge'),
                button__large: (size === 'large'),
                button__link: (flavor === 'link'),
                button__small: (size === 'small'),
                'button__xx-large': (size === 'xxLarge'),
                'button__icon-only': (this.iconOnly),
                button__extended: (this.extended),
                button__disabled: (this.disabled)
            }
        },

        getIconClass () {
            let classes = {};
            let iconType = this.iconType;

            if (this.icon !== '') {
                classes['button--icon'] = true;
                classes['button--icon-' + this.iconPosition] = true;
                classes['material-icons'] = true;
                classes[`md-${this.iconSize}`] = true;
                classes['md-dark'] = (iconType === 'dark');
                classes['md-light'] = (iconType === 'light');
                classes['md-disabled'] = (this.iconDisabled);
            }

            return classes;
        },

        shouldRenderIcon (position) {
            return (this.icon && this.iconPosition === position);
        }
    }
}
</script>

<style lang="sass" src="./c-button.scss"></style>
