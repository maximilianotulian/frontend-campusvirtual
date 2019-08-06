<template lang="html">
    <Page title="Listado de Examenes">
        <div class="exams-page">
            <div v-for="exam in exams" class="exams-page--exam">
                <div class="exams-page--exam-left-column">
                    <p class="exams-page--exam-title">{{exam.title}}</p>
                    <p class="exams-page--exam-description">{{exam.description}}</p>
                </div>
                <div class="exams-page--exam-right-column">
                    <CButton @click="addExamResults(exam.objectId)" icon="edit" iconPosition="left" :extended="true">
                        Notas
                    </CButton>
                </div>
            </div>
        </div>
        <CFloatButton :onClick="addNewExam" class="exams-page--add-exam" >Agregar</CFloatButton>
    </Page>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import Page from 'components-app/layout/page';
    import CFloatButton from 'components/c-float-button';
    import CButton from "components/c-button";

    export default {
        name: 'ExamsPage',

        computed: {
            ...mapState({
                exams: state => state.exams.exams,
                subject: state => state.subjects.selectedSubject
            }),
        },

        methods: {
            ...mapActions({
                getAllExams: 'exams/getAll',
                getSubject: 'subjects/getOne',
            }),

            addNewExam() {
                this.$router.push({
                    name: 'subject-exam-form',
                    params: {examId: 'new'}
                });
            },

            addExamResults(objectId) {
              this.$router.push({
                name: 'subject-exam-results',
                params: {examId: objectId}
              });
            }
        },

        components: {CButton, CFloatButton, Page },

        created() {
            this.getAllExams(this.$route.params.subjectId);
        }
    }
</script>

<style lang="sass" src="./exams-page.scss"></style>