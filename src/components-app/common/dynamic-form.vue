<template lang="html">
    <section class="dynamic-form">
        <header>
            <h2 class="dynamic-form--title">{{title}}</h2>
        </header>
        <CForm v-bind="formProps">
            <CFormControl v-for="field in fields" v-if="!field.fieldProps.hide" :fieldName="field.fieldProps.fieldName" :last="field.last">
                <DynamicField :fieldProps="field.fieldProps" :fieldType="field.fieldType"/>
            </CFormControl>
        </CForm>
    </section>
</template>

<script>
import CFormControl from 'components/c-form-control';
import CForm from 'components/c-form';
import DynamicField from 'components-app/common/dynamic-field';
import { mapActions } from 'vuex';

export default {
    name: 'DynamicForm',

    props: {
        model: {
          type: Object,
          required: true
        },
        showClearbutton: {
          type: Boolean,
          required: false,
          default: true
        },
        submitAction: {
          type: Function,
          required: true,
        },
        successRoute: {
            type: String,
            required: false
        },
        title: {
          type: String,
          required: false
        }
    },

    computed: {
        formProps () {
            return {
                class: 'dynamic-form--form',
                formStyle: 'dynamic-form',
                primaryActionProps: {
                    class: 'dynamic-form--submit',
                    content: 'Guardar'
                },
                secondaryAction: this.showClearbutton,
                secondaryActionHandler: this.onSuccessSubmit,
                secondaryActionProps: {
                    class: 'dynamic-form--clear-button',
                    content: 'Cancelar'
                },
                handleSubmitAction: this.submitAction,
                handleSuccess: this.onSuccessSubmit,
                handleError: this.onErrorSubmit
            }
        },
        fields () {
            return this.model.fields.map( field => {
                const baseFieldProps = field.fieldProps;
                let extendedFieldProps = {
                    ...baseFieldProps
                };

                // This may be optional in the future
                if (field.fieldType === 'input') {
                    extendedFieldProps.flavor = 'large';
                }

                if (field.fieldType === 'listbox') {
                    extendedFieldProps.flavor = 'large';
                }

                return {
                    ...field,
                    fieldProps: extendedFieldProps
                };
            });
        }
    },

    methods: {
        ...mapActions({
            clearForm: 'form/clearForm'
        }),

        onSuccessSubmit () {
            const successRoute = this.successRoute;

            if (successRoute) {
                this.$router.push({name: successRoute});
            } else {
                this.$router.go(-1);
            }
        },

        onErrorSubmit () {
            console.log('ON SUCCESS ERROR');
        }
    },

    destroyed () {
        this.clearForm();
    },

    components: { CForm, CFormControl, DynamicField }
}
</script>

<style lang="sass" src="./dynamic-form.scss"></style>