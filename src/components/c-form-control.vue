<template lang="html">
    <div v-bind="props">
        <slot />
        <div class="form-control--invalid-text" v-if="field.errors.length > 0">
            <p v-for="error in field.errors">
                {{ error }}
            </p>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import FormFieldMixin from 'lib-core/form/form-field-mixin';

export default {
    name: 'CFormControl',

    props: {
        last: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    mixins: [FormFieldMixin],

    computed: {
        props () {
            return {
                class: {
                    'form-control': true,
                    'form-control__last': (this.last),
                }
            }
        }
    }
}
</script>

<style lang="sass" src="./c-form-control.scss"></style>
