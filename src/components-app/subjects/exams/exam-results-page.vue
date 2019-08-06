<template lang="html">
    <Page class="exams-page" title="Listado de Examenes">
        <div style="width: 100%">
            <h2 style="margin-bottom: 15px; font-size: 16px">Agregar notas</h2>
            <StudentResultEditor v-for="studentResult in exam.students" :studentResult="studentResult"/>
            <div style="text-align: right;">
                <CButton @click="saveResults" flavor="primary">
                    Guardar
                </CButton>
            </div>
        </div>
    </Page>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import Page from 'components-app/layout/page';
  import StudentResultEditor from 'components-app/subjects/exams/student-result-editor';
  import CButton from "components/c-button";

  export default {
    name: 'ExamResultsPage',

    computed: {
      ...mapState({
        exam: state => state.exams.selectedExam
      }),
    },

    methods: {
      ...mapActions({
        getExam: 'exams/getOne',
        editExam: 'exams/edit'
      }),

      saveResults() {
        this.editExam({
          data: this.exam,
          parameters: {objectId: this.$route.params.examId, subjectObjectId: this.$route.params.subjectId}
        }).then(() => this.$router.go(-1));
      }
    },

    components: {CButton, StudentResultEditor, Page },

    created() {
      if (!this.exam.objectId) {
        this.getExam({objectId: this.$route.params.examId, subjectObjectId: this.$route.params.subjectId});
      }
    }
  }
</script>

<style lang="sass" src="./exams-page.scss"></style>