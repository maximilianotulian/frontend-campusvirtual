<template lang="html">
    <Page class="subjects-page" title="Listado de Materias">
        <div class="subjects-page--wrapper">
            <h1 style="font-size: 25px">Materias</h1>
            <div style="display:flex; margin: 10px; flex-wrap: wrap;">
                <CCard
                    v-for="subject in subjects"
                    class="subjects-page--subject"
                    :title="subject.title"
                    :subtitle="subject.description"
                >
                    <a class="subjects-page--subject-arrow" @click="handleSubjectSelection(subject)"></a>
                    <div
                        style="
                            height: 10px;
                            background: lightblue;
                            position: absolute;
                            left: 0;
                            right: 0;
                        "></div>
                    <div v-if="subject.isEnabled && !isTeacher" class="subjects-page--subject-icon">
                        <i class="material-icons">check</i>
                    </div>
                    <div v-if="subject.subscriptionPending" class="subjects-page--subject-icon-pending">
                        <i class="material-icons">av_timer</i>
                    </div>
                </CCard>
                <div style="display:flex; flex-direction: column;" v-if="!subjects.length">
                    Lo sentimos, no hay materias disponibles.
                </div>
            </div>
        </div>
    </Page>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CCard from 'components/c-card';
import Page from 'components-app/layout/page';
import userHelper from 'lib-core/helpers/user';

export default {
    name: 'SubjectsPage',

    computed: {
        ...mapState({
            user: state => state.user.user,
            subjects: state => state.subjects.subjects
        }),

        isTeacher() {
            return userHelper.isTeacher(this.user);
        }
    },

    created: function () {
        this.getAllSubjects();
    },

    methods: {
        ...mapActions({
            getAllSubjects: 'subjects/getAll',
        }),

        handleSubjectSelection(subject) {
            this.$router.push({
                name: 'subject',
                params: {
                    subjectId: subject.objectId,
                }
            });
        },

        handleSubscribeClick(subject) {
            // TODO: Find a better way to manage the subscription
            subject.subscribed = !subject.subscribed;
            this.$forceUpdate();
        }
    },

    components: { CCard, Page }
}
</script>

<style lang="sass" src="./subjects-page.scss"></style>