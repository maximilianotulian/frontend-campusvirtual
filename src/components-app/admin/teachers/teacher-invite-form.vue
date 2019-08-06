<template lang="html">
    <AdminAbmContainer>
        <DynamicForm v-bind="dynamicFormProps" />
    </AdminAbmContainer>
</template>

<script>
import { mapActions } from 'vuex';
import Page from 'components-app/layout/page';
import DynamicForm from "components-app/common/dynamic-form";
import AdminAbmContainer from "components-app/layout/admin-abm-container";

export default {
    name: 'Teachers',

    computed: {
        dynamicFormProps() {
            const subject = this.subject;
            const isDelete = this.isDelete;

            return {
                title: 'Invitar Profesor',
                model: {
                    fields: [
                        {
                            name: "Email",
                            fieldType: "input",
                            fieldProps: {
                                label: 'Email',
                                required: true,
                                fieldName: 'email',
                                maxLength: 50,
                                minLength: 5,
                                isEmail: true
                            }
                        }
                    ]},
                submitAction: this.sendTeacherInvitation
            };
        },
    },
    
    methods: {
        ...mapActions({
            sendTeacherInvitation: 'teachers/sendInvitation',
        }),

        onSuccessSubmit () {
            this.$router.go(-1);
        }
    },

    components: { Page, DynamicForm, AdminAbmContainer }
}
</script>

<style lang="sass" src="./teacher-invite-form.scss"></style>