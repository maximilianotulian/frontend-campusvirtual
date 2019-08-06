<template lang="html">
    <div class="dropdown">
        <select
            :ref="fieldName"
            @change="onChange"
            @blur="onBlur"
            v-model="value"
            multiple
        >
            <option v-if="options.length === 0" :value="null">{{defaultOption}}</option>
            <option v-for="option in options" :value="option[valueAttribute]">{{option[titleAttribute]}}</option>
        </select>
    </div>
</template>

<script>
import FormInputMixin from 'lib-core/form/form-input-mixin';

export default {
    name: 'CSelect',

    mixins: [FormInputMixin],

    props: {
        options: {
            type: Array,
            required: false,
            default: () => []
        },
        defaultOption: {
            type: String,
            required: true
        },
        valueAttribute: {
            type: String,
            required: true
        },
        selectedValue: {
            type: [String, Array, Object],
            required: false,
        },
        titleAttribute: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            value: []
        }
    },

    watch: {
        selectedValue(val) {
            if (this.value.indexOf(val) === -1) {
                if (Array.isArray(val) && val.length) {
                    this.value = val.map((a) => {
                        return a[this.valueAttribute];
                    });
                } else if (val && typeof val === 'object') {
                    this.value.push(val[this.valueAttribute]);               
                } else {
                    this.value.push(val);
                }                
                this.updateStore();
            }
        }
    },

    methods: {
        onBlur (e) {
            this.$emit('blur', this.value);

            this.validate();
            this.updateStore();
        },

        onChange() {
            this.$emit('change', this.value);
            this.updateStore();
        },

        focus () {
            this.$refs[this.fieldName].focus();
            return this; //review if it is needed to return this and why
        },
    },
}
</script>

<style lang="sass" src="./c-select.scss"></style>
