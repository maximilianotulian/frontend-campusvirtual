<template>
    <div style="margin: 0 auto; width: 70%">
        <Card>
            <div style="padding-left: 30px;">
                <div style="display:flex; flex-direction: row; align-items: center;">
                    <div>
                        <img
                            src="https://scontent.faep9-1.fna.fbcdn.net/v/t1.0-9/14021654_10210275103223286_8911019256328962692_n.jpg?_nc_cat=0&oh=b0cad588d885f656f2a08f2e5c49914c&oe=5B808CE7"
                            alt="Foto de perfil"
                            style="width: 80px; height: 80px; border-radius: 50%;">
                    </div>
                    <div style="padding-left: 10px; font-size: 20px">{{ user.username }}</div>
                </div>
            </div>
        </Card>
        <Card>
            <div>
                <CForm v-bind="formProps" style="padding-left: 30px; padding-top: 25px;">
                    <div style="display:flex; justify-content: space-between;">
                        <CFormControl fieldName="firstName">
                            <CInput v-bind="fieldProps.firstName" />
                        </CFormControl>
                        <CFormControl fieldName="lastName">
                            <CInput v-bind="fieldProps.lastName" />
                        </CFormControl>
                    </div>
                    <div style="display:flex; justify-content: space-between;">
                        <CFormControl fieldName="username">
                            <CInput v-bind="fieldProps.username" />
                        </CFormControl>
                        <CFormControl fieldName="email">
                            <CInput v-bind="fieldProps.email" />
                        </CFormControl>
                    </div>
                </CForm>
            </div>
        </Card>
        <Card>
            <CButton style="width: 100%; height: 100%; color: red;">Desactivar cuenta</CButton>
        </Card>
    </div>
</template>

<script>
import Card from 'components/c-card';
import CForm from 'components/c-form';
import CInput from 'components/c-input';
import CButton from 'components/c-button';
import CFormControl from 'components/c-form-control';
import { mapActions, mapState } from 'vuex';
import moment from 'moment';

export default {
    name: 'Profile',

    computed: {
        ...mapState({
            user: state => state.user.user,
        }),

        fieldProps() {
            return {
                firstName: {
                    label: 'Nombre',
                    required: true,
                    fieldName: 'firstName',
                    maxLength: 20,
                    minLength: 5,
                    isAlphanumeric: true,
                    initialValue: this.user.name.split(' ')[0]
                },
                lastName: {
                    label: 'Apellido',
                    required: true,
                    fieldName: 'lastName',
                    maxLength: 20,
                    minLength: 5,
                    isAlphanumeric: true,
                    initialValue: this.user.name.split(' ')[1]
                },
                username: {
                    label: 'Usuario',
                    required: true,
                    fieldName: 'username',
                    maxLength: 20,
                    minLength: 5,
                    isAlphanumeric: true,
                    initialValue: this.user.username
                },
                email: {
                    label: 'Email',
                    required: true,
                    fieldName: 'email',
                    maxLength: 50,
                    minLength: 5,
                    isEmail: true,
                    initialValue: this.user.email
                },
            }
        },

        formProps() {
             return {
                class: 'profile-form--form',
                primaryActionProps: {
                    class: 'profile-form--save-button',
                    content: 'Guardar'
                },
                secondaryAction: true,
                secondaryActionHandler: this.redirectToHomePage,
                secondaryActionProps: {
                    class: 'profile-form--cancel-button',
                    content: 'Cancelar'
                },
                handleSubmitAction: this.redirectToHomePage,
                handleSuccess: () => {console.log('success');}
            }
        }
    },

    methods: {
        redirectToHomePage() {
            this.$router.push({name: 'home'})
        }
    },

    components: { Card, CFormControl, CForm, CInput, CButton }
}
</script>

<style lang="sass" src="./profile.scss">

</style>