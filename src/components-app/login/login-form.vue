<template lang="html">
    <CCard class="login-form">
        <CForm v-bind="formProps">
            <CFormControl fieldName="username">
                <CInput v-bind="fields.username"/>
            </CFormControl>
            <CFormControl fieldName="password">
                <CInput v-bind="fields.password"/>
            </CFormControl>
            <CFormControl fieldName="rememberUser">
                <CToggle v-bind="fields.rememberUser"/>
            </CFormControl>
            <div v-if="loginError" class="login-form--login-error">
                Bad username or password
            </div>
        </CForm>
    </CCard>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CCard from 'components/c-card';
import CForm from 'components/c-form';
import CFormControl from 'components/c-form-control';
import CInput from 'components/c-input';
import CToggle from 'components/c-toggle';
import groups from 'constants/groups';
import userHelper from 'lib-core/helpers/user';

export default {
    name: 'LoginForm',

    props: {
        signUpButton: {
            type: Boolean,
            required: false,
            default: false
        },
        signUpButtonAction: {
            type: Function,
            required: false
        }
    },

    data () {
        return {
            loginError: false
        }
    },

    computed: {
        ...mapState({
            user: state => state.user.user
        }),

        fields () {
            return {
                username: {
                    label: 'Usuario',
                    required: true,
                    fieldName: 'username',
                },
                password: {
                    label: 'Contraseña',
                    required: true,
                    fieldName: 'password',
                    type: 'password'
                },
                rememberUser: {
                    label: 'Recordar usuario',
                    fieldName: 'rememberUser'
                }
            }
        },

        formProps () {
            return {
                class: 'login-form--form',
                primaryActionProps: {
                    class: 'login-form--login-button',
                    content: 'Iniciar sesión'
                },
                secondaryAction: this.signUpButton,
                secondaryActionHandler: this.signUpButtonAction,
                secondaryActionProps: {
                    class: 'login-form--register-button',
                    content: 'Crear cuenta'
                },
                handleSubmitAction: this.login,
                handleSuccess: this.onSuccessSubmit,
                handleError: this.onErrorSubmit
            }
        }
    },

    methods: {
        ...mapActions({
            login: 'user/login'
        }),

        onSuccessSubmit () {
            if (userHelper.isManager(this.user)) {
                this.$router.push({name: 'admin'});
            } else {
                this.$router.push({name: 'home'});
            }
        },

        onErrorSubmit () {
            this.loginError = true
        }
    },

    components: { CCard, CInput, CFormControl, CForm, CToggle }
}
</script>

<style lang="sass" src="./login-form.scss"></style>
