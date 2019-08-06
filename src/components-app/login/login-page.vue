<template>
    <div class="login-page">
        <CAnimation animationMode="out-in">
            <LoginForm v-if="toggle" v-bind="getLoginFormProps" />
            <RegisterForm v-else v-bind="getRegisterFormProps" />
        </CAnimation>
    </div>
</template>

<script lang="js">
import { mapActions } from 'vuex';
import LoginForm from 'components-app/login/login-form';
import RegisterForm from 'components-app/login/register-form';
import CAnimation from 'components/c-animation';

export default {
    name: 'LoginPage',

    data () {
        return {
            toggle: true
        }
    },

    computed: {
        getLoginFormProps () {
            return {
                signUpButton: true,
                signUpButtonAction: this.toggleForms
            }
        },

        getRegisterFormProps () {
            return {
                logInButton: true,
                logInButtonAction: this.toggleForms
            }
        }
    },

    methods: {
        ...mapActions({
            clearForm: 'form/clearForm'
        }),

        toggleForms () {
            this.clearForm();
            this.toggle = !this.toggle;
        }
    },

    components: { CAnimation, LoginForm, RegisterForm }
};
</script>

<style lang="sass" src="./login-page.scss"></style>
