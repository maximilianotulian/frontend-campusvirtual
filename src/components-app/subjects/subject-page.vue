<template lang="html">
    <Page class="subject-page" title="Materia" flexDirection="column">
        <h2 style="font-size: 25px; margin-bottom: 10px;">Materia</h2>
        <div style="display:flex; padding-bottom: 40px">
            <CCard
                :showImage="true"
                imageSource="https://conceptodefinicion.de/wp-content/uploads/2014/10/fisica.jpg"
                :title="subject.title">
                <div style="display:flex; flex-direction: column;">
                    <br />
                    <h4 style="color:grey;">Descripción</h4>
                    <br />
                    <p style="margin-bottom: 15px;">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                <div style="display: flex; justify-content: flex-end">
                    <CButton v-bind="ctaButtonProps" @click="handleSubscribeClick"/>
                    <CButton style="margin-left: 10px" v-bind="examsButtonProps" @click="handleExamsButtonClick" v-if="!isStudent"/>
                </div>
                </div>
            </CCard>
        </div>
        <div style="position: relative;">
            <div style="display: flex; justify-content: space-between; margin: 20px 0;">
                <h2 style="font-size: 25px;">Noticias</h2>
                <CButton style="width: 77px; margin-right: 8px;" v-if="!isStudent" v-bind="addNewButtonProps" @click="handleAddNewClick">Agregar</CButton>
            </div>
            <div style="display: flex;">
                <New
                    v-for="newItem in news"
                    v-bind="newItem"
                    :actions="getNewActions(newItem)"
                    :showMenu="!isStudent"
                    style="width: 30%; padding: 0 10px"
                />
            </div>
        </div>
    </Page>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CButton from 'components/c-button';
import CCard from 'components/c-card';
import New from 'components-app/common/news/new';
import Page from 'components-app/layout/page';
import userHelper from 'lib-core/helpers/user';

export default {
    name: 'SubjectPage',

    computed: {
        ...mapState({
            user: state => state.user.user,
            subject: state => state.subjects.selectedSubject,
            news: (state) => {
                return state.news.news.filter((n) => {
                    return n.subject === state.subjects.selectedSubject.objectId; //Show only the news asociated with the subject selected.
                });
            }
        }),

        tableProps() {
            return {
                headers: ['Id', 'Nombre','Email'],
                rows: _.map(this.students, (student, index) => {
                    return {
                        id: index,
                        name: student.name,
                        email: student.email
                    }
                })
            }
        },

        isStudent() {
            return userHelper.isStudent(this.user);
        },

        addNewButtonProps() {
            return {
                class: 'subject-page--action',
                extended: true,
                flavor: 'primary',
            }
        },

        ctaButtonProps() {
            const subject = this.subject;
            let buttonProps = {
                extended: true,
                flavor: 'primary'
            };

            if (this.isStudent) {
                if (subject.isEnabled) {
                    buttonProps.value = 'Alumnos';
                } else if (subject.subscriptionPending) {
                    buttonProps.value = 'Inscripción pendiente';
                    buttonProps.disabled = true;
                } else {
                    buttonProps.value = 'Inscribirse';
                }
            } else {
                buttonProps.value = 'Alumnos';
            }

            return buttonProps;
        },

        examsButtonProps() {
            return {
                extended: true,
                flavor: "secondary",
                value: "Examenes"
            }
        },

        subjectId() {
            return this.$route.params.subjectId;
        }
    },

    data() {
        return {
            isEnabled: false,
        }
    },

    methods: {
        ...mapActions({
            getSubject: 'subjects/getOne',
            getNews: 'news/getAll',
            subscribeToSubject: 'subjects/subscribeToSubject'
        }),

        handleAddNewClick() {
            this.$router.push({name: 'createNew'});
        },

        handleEditNewClick(selectedNew) {
            this.$router.push({
                name: 'editNew',
                params: {newId: selectedNew.objectId}
            });
        },

        handleDeleteNewClick(selectedNew) {
            this.$router.push({
                name: 'removeNew',
                params: {newId: selectedNew.objectId}
            });
        },

        handleSubscribeClick() {
            const subject = this.subject;

            if (this.isStudent) {
                if (subject.isEnabled) {
                    this.$router.push({name: 'subject-students'});
                } else {
                    this.subscribeToSubject({'subject': this.subjectId});
                    this.$router.push({name: 'subjects-list'});
                }
            } else {
                this.$router.push({name: 'subject-students'});
            }
        },


        handleExamsButtonClick() {
	        this.$router.push({name: 'subject-exams'});
        },

        getNewActions(newItem) {
            return [
                {
                    value: 'Editar',
                    handler: this.handleEditNewClick.bind(this, newItem)
                },
                {
                    value: 'Eliminar',
                    handler: this.handleDeleteNewClick.bind(this, newItem)
                },
            ]
        }
    },

    created: function () {
        this.getSubject(this.subjectId);
        this.getNews();
    },

    components: { CButton, CCard, New, Page }
}
</script>

<style lang="sass" src="./subject-page.scss"></style>