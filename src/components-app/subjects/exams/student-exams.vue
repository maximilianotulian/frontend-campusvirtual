<template lang="html">
    <Page class="student-exams-page" title="Exámenes">
        <div style="width: 100%;">
            <h1 class="student-exams-page--title">Exámenes</h1>
            <div class="student-exams-page--wrapper">
                <div v-if="examList.length" class="student-exams-page--content" >
                    <div
                        v-if="exam.result && exam.result.result"
                        v-for="exam in examList"
                        :class="{item: true, item__reapproved: (exam.result.result < minNote)}"
                    >
                        <div class="item--title">{{ exam.title }}</div>
                        <div class="item--separator"></div>
                        <div class="item--description">{{ exam.description }}</div>
                        <div class="item--result">Nota: {{ exam.result.result }}</div>
                    </div>
                </div>
                <div v-else class="student-exams-page--content">
                    No hay exámenes disponibles.
                </div>
            </div>
        </div>
    </Page>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Page from 'components-app/layout/page';
import Card from 'components/c-card';
import _ from 'lodash';

export default {
    name: 'StudentExams',

    created() {
        this.getAllSubjects();
    },

    data() {
        return {
            examList: [],
            minNote: 6
        }
    },

    methods: {
        ...mapActions({
            getAllSubjects: 'subjects/getAll',
            getAllExams: 'exams/getAll',
        }),
    },

    computed: {
        ...mapState({
            user: state => state.user.user,
            subjects: state => state.subjects.subjects,
            exams: state => state.exams.exams,
        })
    },

    watch: {
        subjects: function (value, oldValue) {
            if (value !== oldValue) {
                this.subjects.forEach(s => this.getAllExams(s.objectId));
            }
        },
        exams: function (value, oldValue) {
            if (value !== oldValue) {
                value.forEach((exam) => {
                    if (!_.includes(this.examList, exam)) {
                        this.examList.push(exam);
                    }
                });
            }
        }
    },

    components: { Card, Page }
}
</script>

<style lang="sass" src="./student-exams.scss"></style>