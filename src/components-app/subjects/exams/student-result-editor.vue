<template lang="html">
    <div class="student-result-editor">
        <div class="student-result-editor--name">
            Alumno: {{studentResult.student.firstName}} {{studentResult.student.lastName}}
        </div>
        <div class="student-result-editor--input">
            <div class="student-result-editor--label">
                Nota:
            </div>
            <div class="student-result-editor--field">
                <input v-model="studentResult.result" type="number" min="0" max="10">
            </div>
        </div>
        <div class="student-result-editor--input">
            <div class="student-result-editor--label">
                Descripcion
            </div>
            <div class="student-result-editor--field">
                <input v-model="studentResult.resultDescription">
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'StudentResultEditor',

    props: {
      studentResult: {
        type: Object,
        required: true
      }
    },

    computed: {},

    methods: {},

    components: {},
  }
</script>

<style lang="sass" src="./student-result-editor.scss"></style>