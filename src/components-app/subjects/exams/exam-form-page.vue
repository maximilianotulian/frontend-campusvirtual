<template lang="html">
    <Page class="exam-form-page" title="Agregar examen">
        <CForm v-bind="formProps">
            <CFormControl fieldName="title">
                <CInput v-bind="fields.title"/>
            </CFormControl>
            <CFormControl fieldName="description">
                <CInput v-bind="fields.description"/>
            </CFormControl>
            <CFormControl fieldName="evaluateAllStudentsInSubject">
                <CToggle v-bind="fields.evaluateAllStudentsInSubject"/>
            </CFormControl>
            <div v-if="showStudentSelect">
                <CFormControl fieldName="students">
                    <ListWithSearch v-bind="fields.students" />
                </CFormControl>
            </div>
        </CForm>
    </Page>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import Page from 'components-app/layout/page';
    import CForm from 'components/c-form';
    import CFormControl from 'components/c-form-control';
    import CInput from 'components/c-input';
    import CToggle from 'components/c-toggle';
    import ListWithSearch from "components-app/common/list-with-search";

    export default {
        name: 'ExamFormPage',

        data() {
            return {
                studentsSearchResults: []
            }
        },

        computed: {
            ...mapState({
                subject: state => state.subjects.selectedSubject,
                formFields: state => state.form.fields
            }),

            showStudentSelect() {
                const evaluateAllStudentsInSubject = this.formFields.evaluateAllStudentsInSubject;

                return !evaluateAllStudentsInSubject || !evaluateAllStudentsInSubject.value;
            },

            formProps() {
                return {
                    class: 'exam-form-page--form',
                    primaryActionProps: {
                        class: 'exam-form-page--save-button',
                        content: 'Guardar'
                    },
                    secondaryAction: true,
                    secondaryActionHandler: () => {console.log('secondary Action handler')},
                    secondaryActionProps: {
                        class: 'exam-form-page--cancel-button',
                        content: 'Salir'
                    },
                    handleSubmitAction: this.addExam,
                    handleSuccess: this.handleSaveSucess,
                    handleError: () => {console.log('on error submit')},
                }
            },

            fields() {
                return {
                    title: {
                        label: 'Título',
                        required: true,
                        fieldName: 'title',
                        flavor: 'large'
                    },
                    description: {
                        label: 'Descripción',
                        required: true,
                        fieldName: 'description',
                        flavor: 'large'
                    },
                    evaluateAllStudentsInSubject: {
                        label: 'Evaluar a todos los estudiantes de la cátedra',
                        fieldName: 'evaluateAllStudentsInSubject',
                        initialValue: false
                    },
                    students: {
                        fieldName: "students",
                        initialValue: [],
                        searchResults: this.studentsSearchResults,
                        searchAction: (searchString) => {
                            this.studentsSearchResults = this.subject.students.filter( (student) => {
                                return student.name.toLowerCase().startsWith(searchString.toLowerCase())
                            });
                        },
                        title: 'Estudiantes',
                        searchTableProps: {
                            caption: 'Estudiantes de la cátedra',
                            headers: ['Nombre y Apellido'],
                            displayValues: ['name']
                        },
                        selectedTableProps: {
                            caption: 'Estudiantes en el exámen',
                            headers: ['Nombre y Apellido'],
                            displayValues: ['name']
                        }
                    }
                }
            }
        },

        methods: {
            ...mapActions({
                getSubject: 'subjects/getOne',
                addExam: 'exams/create'
            }),

          handleSaveSucess() {
            this.$router.go(-1);
          }
        },

        components: {ListWithSearch, CForm, Page, CFormControl, CInput, CToggle },

        created() {
            if (!this.subject.objectId) {
                this.getSubject(this.$route.params.subjectId);
            }
        },
    }
</script>

<style lang="sass" src="./exam-form-page.scss"></style>