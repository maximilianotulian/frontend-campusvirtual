<template lang="html">
    <div class="teachers-register-page">
        <CCard class="register-form teachers-register-page--form">
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
                <CFormControl fieldName="specialities">
                    <CListbox v-bind="getFieldProps.specialities"/>
                </CFormControl>
                <CFormControl fieldName="password">
                    <CInput v-bind="getFieldProps.password" />
                </CFormControl>
                <CFormControl fieldName="repeatPassword">
                    <CInput v-bind="getFieldProps.repeatPassword" />
                </CFormControl>
            </CForm>
        </CCard>
    </div>
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

    created() {
        this.getAllSpecialities();
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
                    minLength: 5,
                },
                email: {
                    label: 'Email',
                    required: true,
                    fieldName: 'email',
                    maxLength: 50,
                    minLength: 5,
                    isEmail: true,
                    disabled: true,
                    initialValue: this.email
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
                specialities: {
                    label: 'Especialidades',
                    fieldName: 'specialities',
                    defaultOption: 'Especialidad',
                    valueAttribute: 'objectId',
                    titleAttribute: 'title',
                    options: this.specialities,
                    required: true,
                    multiple: true
                }
            };
        },

        formProps () {
            return {
                class: 'teachers-register--form',
                primaryActionProps: {
                    class: 'teachers-register--register-button',
                    content: 'Crear cuenta'
                },
                handleSubmitAction: this.registerTeacher,
                handleSuccess: this.onSuccessSubmit,
                hiddenData: {
                    invitationCheck: this.invitationCheck
                }
            }
        },

        email () {
            return this.$route.query.email;
        },

        invitationCheck () {
            return this.$route.query.check;
        }
    },

    methods: {
        ...mapActions({
            getAllSpecialities: 'specialities/getAll',
            registerTeacher: 'teachers/register',
        }),

        onSuccessSubmit () {
            this.$router.push({name: 'home'});
        }
    },

    components: { CCard, CInput, CFormControl, CForm, CDropdown, CListbox }
}
</script>

<style lang="sass" src="./teachers-register.scss"></style>
