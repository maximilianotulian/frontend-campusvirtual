<template>
    <div v-bind:class="classes" v-if="onlySlot">
        <slot
            v-bind="props"
            :ref="fieldName"
            @change="onChange"
            @focus="onFocus"
            @input="onInput"
        />
    </div>
    <div :class="classes" v-else>
        <input
            v-bind="props"
            v-model="value"
            :ref="fieldName"
            @blur="onBlur"
            @change="onChange"
            @focus="onFocus"
            @input="onInput"
        />

        <span class="input--highlight" />
        <span class="input--bar" />

        <label class="input--label" v-if="label" :for="id">
            {{ label }}
        </label>
    </div>
</template>

<script>
import _ from 'lodash';
import FormInputMixin from 'lib-core/form/form-input-mixin';

export default {
    name: 'CInput',

    mixins: [FormInputMixin],

    props: {
        autoComplete: {
            type: Boolean,
            default: false
        },
        autoFocus: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: [Boolean, String],
            required: false,
            default: false
        },
        id: {
            type: String,
        },
        label: {
            type: String,
            required: false,
            default: ''
        },
        onlySlot: {
            type: Boolean,
            required: false,
            default: false
        },
        pattern: {
            type: [Function, String],
            required: false
        },
        readOnly: {
            type: [Boolean, String],
            required: false,
            default: false
        },
        type: {
            type: String,
            default: 'text'
        },
        flavor: {
            type: String,
            required: false
        }
    },

    data () {
        return {
            hasBeenModified: (this.initialValue),
        }
    },

    computed: {
        classes () {
            return {
                'input': true,
                'input__ready-only': (this.readOnly),
                'input__invalid': (this.hasError && !this.disabled && this.hasBeenModified),
                'input__valid': (!this.hasError && !this.disabled && this.hasBeenModified),
                'input__disabled': (this.disabled),
                'input__dirty': (this.value !== '' && this.hasBeenModified),
                'input__large': (this.flavor === 'large')
            }
        },
        props () {
            return {
                autocomplete: this.autoComplete,
                autofocus: this.autoFocus,
                class: 'input--text',
                disabled: this.disabled,
                id: this.id || _.uniqueId('Input-'),
                readonly: this.readOnly,
                type: this.type
            }
        },
    },

    methods: {
        onBlur (e) {
            this.$emit('blur', this.value);

            this.validate();
            this.updateStore();
        },

        onChange (e) {
            this.$emit('change', this.value);
        },

        onFocus (e) {
            this.$emit('focus', this.value);
        },

        onInput (e) {
            this.$emit('input', e.target.value);
            this.hasBeenModified = true;
        },

        blur () {
            this.$refs[this.fieldName].blur();
            return this;
        },

        focus () {
            this.$refs[this.fieldName].focus();
            return this; //review if it is needed to return this and why
        },

        select () {
            this.$refs[this.fieldName].select();
            return this;
        }
    }
}

</script>

<style lang="sass" src="./c-input.scss"></style>
