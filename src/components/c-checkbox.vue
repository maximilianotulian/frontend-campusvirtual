<template lang="html">
    <div :class="classes">
        <label class="checkbox--label-before" v-if="label && labelBefore" :for="id">
            {{ label }}
        </label>

        <input
            v-bind="props"
            v-model="value"
            :ref="fieldName"
            @blur="onBlur"
            @change="onChange"
            @focus="onFocus"
            @input="onInput"
        />

        <label class="checkbox--label-after" v-if="label && labelAfter" :for="id">
            {{ label }}
        </label>
    </div>
</template>

<script>
import FormInputMixin from 'lib-core/form/form-input-mixin';
import _ from 'lodash';

export default {
    name: 'CCheckbox',

    mixins: [FormInputMixin],

    props: {
        disabled: {
            type: [Boolean, String],
            required: false,
            default: false
        },
        id: {
            type: String,
            default: _.uniqueId('Checkbox-')
        },
        label: {
            type: String,
            required: true,
            default: ''
        },
        readOnly: {
            type: [Boolean, String],
            required: false,
            default: false
        },
        fieldName: {
            type: String,
            required: true
        },
        labelBefore: {
            type: Boolean,
            required: false,
            default: false
        },
        labelAfter: {
            type: Boolean,
            required: false,
            default: true
        }
    },

    data () {
        return {
            value: '',
            classes: this.getClasses()
        }
    },

    computed: {
        props () {
            return {
                class: 'checkbox--box',
                disabled: this.disabled,
                id: this.id,
                readonly: this.readOnly,
                type: 'checkbox',
                value: this.value
            }
        }
    },

    methods: {
        onBlur (e) {
            this.$emit('blur', this.value);
        },

        onChange (e) {
            this.value = e.target.checked;
            this.$emit('change', this.value);
            this.updateStore();
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
        },

        getClasses () {
            return {
                'checkbox': true,
                'checkbox__ready-only': (this.readOnly),
                'checkbox__invalid': (this.hasError && this.hasBeenModified),
                'checkbox__valid': (!this.hasError && this.hasBeenModified),
                'checkbox__disabled': (this.disabled)
            }
        }
    }
}
</script>

<style lang="sass" src="./c-checkbox.scss"></style>
