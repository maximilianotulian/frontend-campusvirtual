<template lang="html">
    <Page class="subject-students-page" title="Alumnos" flexDirection="column">
        <div>
            <h3>Alumnos de {{subject.title}}</h3>
            <div v-for="student in enabledStudents">
                {{student.name}}
            </div>
        </div>
        <div v-if="isTeacher && studentRequests.length">
            <h3>Pedidos de subscripción</h3>
            <CForm v-bind="formProps">
                <CListSelector v-bind="listSelectorProps"/>
            </CForm>
        </div>
    </Page>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Page from 'components-app/layout/page';
import CListSelector from 'components/c-list-selector';
import CForm from "components/c-form";
import userHelper from 'lib-core/helpers/user';

export default {
    name: 'SubjectStudentsPage',

    computed: {
        ...mapState({
            user: state => state.user.user,
            subject: state => state.subjects.selectedSubject,
        }),

        listSelectorProps() {
            return {
                label: 'Alumnos',
                fieldName: 'students',
                valueAttribute: 'userId',
                titleAttribute: 'name',
                options: this.studentRequests,
                multiple: true,
            }
        },

        formProps() {
            return {
                class: 'subject-students-page--form',
                primaryActionProps: {
                    class: 'subject-students-page--save-button',
                    content: 'Guardar'
                },
                secondaryAction: true,
                secondaryActionHandler: () => {console.log('secondary Action handler')},
                secondaryActionProps: {
                    class: 'subject-students-page--cancel-button',
                    content: 'Salir'
                },
                handleSubmitAction: this.enableStudents,
                handleSuccess: () => { this.getSubject(this.$route.params.subjectId) },
                handleError: () => {console.log('on error submit')},
                hiddenData: {
                    subject: this.subject.objectId
                }
            }
        },

        studentRequests() {
            return this.subject.students.filter( student => !student.isEnabled);
        },

        enabledStudents() {
            return this.subject.students.filter( student => student.isEnabled);
        },

        isTeacher() {
            return userHelper.isTeacher(this.user);
        }
    },

    data() {
        return {};
    },

    methods: {
        ...mapActions({
            getSubject: 'subjects/getOne',
            enableStudents: 'subjects/enableStudents'
        })
    },

    created() {
        if (!this.subject.objectId) {
            this.getSubject(this.$route.params.subjectId);
        }
    },

    components: { CForm, Page, CListSelector }
}
</script>

<style lang="sass" src="./subject-students-page.scss"></style>