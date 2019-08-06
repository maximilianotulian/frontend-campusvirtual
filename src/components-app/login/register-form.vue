<template lang="html">
    <CCard class="register-form">
        <CForm v-bind="formProps">
            <CFormControl fieldName="firstName">
                <CInput v-bind="getFieldProps.firstName" />
            </CFormControl>
            <CFormControl fieldName="lastName">
                <CInput v-bind="getFieldProps.lastName" />
            </CFormControl>
            <CFormControl fieldName="username">
                <CInput v-bind="getFieldProps.username" />
            </CFormControl>
            <CFormControl fieldName="email">
                <CInput v-bind="getFieldProps.email" />
            </CFormControl>
            <CFormControl fieldName="speciality">
                <CListbox v-bind="getFieldProps.speciality"/>
            </CFormControl>
            <CFormControl fieldName="password">
                <CInput v-bind="getFieldProps.password" />
            </CFormControl>
            <CFormControl fieldName="repeatPassword">
                <CInput v-bind="getFieldProps.repeatPassword" />
            </CFormControl>
            <div v-if="registerError" class="register-form--error">
                Error al registrar el usuario
            </div>
        </CForm>
    </CCard>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CCard from 'components/c-card';
import CDropdown from 'components/c-dropdown';
import CForm from 'components/c-form';
import CFormControl from 'components/c-form-control';
import CInput from 'components/c-input';
import CListbox from 'components/c-listbox';
import Validations from 'lib-core/form/validations';

import specialitiesService from 'app/services/specialities-service';
import ServiceCaller from 'lib-core/services/service-caller';

export default {
    name: 'RegisterForm',

    props: {
        logInButton: {
            type: Boolean,
            required: false,
            default: false
        },
        logInButtonAction: {
            type: Function,
            required: false
        }
    },

    methods: {
        ...mapActions({
            getAllSpecialities: 'specialities/getAll',
            registerStudent: 'user/register',
        }),

        onSuccessSubmit () {
            this.$router.push({name: 'home'});
        },

        onErrorSubmit() {
            this.registerError = true;
        },

        _registerStudent() {
            this.registerError = false;

            return this.registerStudent(...arguments);
        }
    },

    created() {
        this.getAllSpecialities();
    },

    data() {
        return {
            registerError: false
        }
    },

    computed: {
        ...mapState({
            specialities: state => state.specialities.specialities
        }),

        getFieldProps () {
            return {
                firstName: {
                    label: 'Nombre',
                    required: true,
                    fieldName: 'firstName',
                    maxLength: 20,
                    minLength: 3,
                    isAlphanumeric: true
                },
                lastName: {
                    label: 'Apellido',
                    required: true,
                    fieldName: 'lastName',
                    maxLength: 20,
                    minLength: 3,
                    isAlphanumeric: true
                },
                username: {
                    label: 'Usuario',
                    required: true,
                    fieldName: 'username',
                    maxLength: 20,
                    minLength: 3,
                },
                email: {
                    label: 'Email',
                    required: true,
                    fieldName: 'email',
                    maxLength: 50,
                    minLength: 5,
                    isEmail: true
                },
                password: {
                    label: 'Contraseña',
                    required: true,
                    fieldName: 'password',
                    type: 'password'
                },
                repeatPassword: {
                    label: 'Repetir contraseña',
                    required: true,
                    fieldName: 'repeatPassword',
                    mustBeEqualTo: 'password',
                    type: 'password'
                },
                speciality: {
                    label: 'Especialidad',
                    fieldName: 'speciality',
                    defaultOption: 'Especialidad',
                    valueAttribute: 'objectId',
                    titleAttribute: 'title',
                    options: this.specialities,
                    required: true
                }
            };
        },

        formProps () {
            return {
                class: 'register-form--form',
                primaryActionProps: {
                    class: 'register-form--register-button',
                    content: 'Crear cuenta'
                },
                secondaryAction: this.logInButton,
                secondaryActionHandler: this.logInButtonAction,
                secondaryActionProps: {
                    class: 'register-form--log-in-button',
                    content: 'Iniciar sesión'
                },
                handleSubmitAction: this._registerStudent,
                handleSuccess: this.onSuccessSubmit,
                handleError: this.onErrorSubmit
            }
        },
    },

    components: { CCard, CInput, CFormControl, CForm, CDropdown, CListbox }
}
</script>

<style lang="sass" src="./register-form.scss"></style>
