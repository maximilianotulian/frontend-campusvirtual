<template lang="html">
    <form :class="classes">
        <slot />
        <div class="form--actions">
            <div class="form--secondary-action-block">
                <CButton v-if="secondaryAction" v-bind="secondaryButtonProps" @click="secondaryActionHandler" />
            </div>
            <div class="form--primary-action-block">
                <CButton v-bind="primaryButtonProps" @click="onPrimaryButtonClick" />
            </div>
        </div>
    </form>
</template>

<script>
import _ from 'lodash';
import CButton from 'components/c-button';
import { mapActions, mapState } from 'vuex';
import validations from 'lib-core/form/validations';

export default {
    name: 'CForm',

    props: {
        primaryActionProps: {
            type: Object,
            required: true
        },
        secondaryAction: {
            type: Boolean,
            required: false,
            default: false
        },
        secondaryActionHandler: {
            type: Function,
            required: false
        },
        secondaryActionProps: {
            type: Object,
            required: false
        },
        handleSubmitAction: {
            type: Function,
            required: true
        },
        handleSuccess: {
            type: Function,
            required: true
        },
        handleError: {
            type: Function,
            required: false
        },
        hiddenData: {
            type: Object,
            required: false
        },
        formStyle: {
            type: String,
            required: false,
            default: 'full-width'
        },
        actionsStyle: {
            type: String,
            required: false,
            default: 'space-around'
        }
    },

    computed: {
        ...mapState({
            fields: state => state.form.fields
        }),

        primaryButtonProps () {
            let classes = {
                'form--primary-button': true
            };
            let props = {
                flavor: 'primary'
            };

            classes[this.primaryActionProps.class] = (this.primaryActionProps.class);
            props.class = classes;

            return _.assign({}, this.primaryActionProps, props);
        },

        secondaryButtonProps () {
            let classes = {
                'form--secondary-button': true
            };
            let props = {
                flavor: 'secondary'
            };

            classes[this.secondaryActionProps.class] = (this.secondaryActionProps.class);
            props.class = classes;
            props.iconOnly = this.secondaryActionProps.iconOnly;
            props.icon = this.secondaryActionProps.icon;

            return _.assign({}, this.secondaryActionProps, props);
        },

        classes () {
            return {
                'form': true,
                'form__dynamic-form': this.formStyle === 'dynamic-form',
            };
        }
    },

    methods: {
        ...mapActions({
            clearForm: 'form/clearForm',
            setFieldErrors: 'form/setFieldErrors',
            setFieldFocus: 'form/setFieldFocus',
        }),

        onPrimaryButtonClick () {
            if (this.hasErrors()) {
                this.focusFirstWrongElement();
            } else {
                this.handleSubmit();
            }
        },

        hasErrors () {
            return _.some(this.fields, this.fieldHasError);
        },

        focusFirstWrongElement () {
            let firstWrongElement = _.findKey(this.fields, this.fieldHasError);
            let field = this.fields[firstWrongElement];

            this.setFieldFocus({
                name: firstWrongElement,
                focused: true
            });
        },

        fieldHasError (field) {
            return (field.errors && field.errors.length > 0) || (field.required && !field.value);
        },

        handleSubmit () {
            this.handleSubmitAction(this.getFormData())
                .then(this.handleSuccessSubmit)
                .catch(this.handleErrorSubmit);
        },

        handleSuccessSubmit (response) {
            this.handleSuccess(response);
        },

        getFormData () {
            let formData = {};
            const hiddenData = this.hiddenData;

            _.each(this.fields, (field, key) => {
	            formData[key] = field.value;
            });

            if (hiddenData) {
                formData = { ...hiddenData, ...formData };
            }

            return formData;
        },

        handleErrorSubmit(error) {
            if (this.handleError) {
                this.handleError(error)
            } else {
                console.log('Form failed silently')
            }
        }
    },

    components: { CButton }
}
</script>

<style lang="sass" src="./c-form.scss"></style>
