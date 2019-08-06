<template lang="html">
    <AdminAbmContainer class="subject-form--form">
        <DynamicForm v-bind="dynamicFormProps" />
    </AdminAbmContainer>
</template>

<script>
import { isUUID } from "lib-core/common/regex";
import { mapActions, mapState } from "vuex";
import AdminAbmContainer from "components-app/layout/admin-abm-container";
import DynamicForm from "components-app/common/dynamic-form";

export default {
    name: "SubjectForm",

    created() {
        this.getAllSpecialities();

        if (isUUID(this.objectId)) {
            this.getSubject(this.objectId);
        }
    },

    computed: {
        ...mapState({
            subject: state => state.subjects.selectedSubject,
            specialities: state => state.specialities.specialities,
            users: state => state.user.users,
            students: () => [],
            teachers: state => state.teachers.teachers
        }),

        dynamicFormProps() {
            const isDelete = this.isDelete;
            const subject = this.subject;
            const setInitialValues = (subject && isUUID(this.objectId));

            return {
                model: {
                    name: "Materias",
                    fields: [
                        {
                            name: "Titulo",
                            fieldType: "input",
                                fieldProps: {
                                label: "Titulo",
                                required: true,
                                fieldName: "title",
                                initialValue: (setInitialValues) ? subject.title : "",
                                disabled: isDelete
                            }
                        },
                        {
                            name: "Especialidad",
                            fieldType: "listbox",
                            fieldProps: {
                                defaultOption: "Especialidad",
                                disabled: isDelete,
                                fieldName: "specialities",
                                label: "Especialidad",
                                options: this.specialities,
                                required: true,
                                titleAttribute: "title",
                                valueAttribute: "objectId",
                                initialSelection: this.getSpecialityInitialSelection()
                            }
                        },
                        {
                            name: "Descripcion",
                            fieldType: "input",
                            fieldProps: {
                                disabled: this.isDelete,
                                fieldName: "description",
                                initialValue: (setInitialValues) ? subject.description : "",
                                label: "Descripcion",
                                required: true
                            },
                            last: true
                        },
                        {
                            name: "Profesores",
                            fieldType: "list-with-search",
                            fieldProps: {
                                fieldName: "teachers",
                                initialValue: (setInitialValues) ? subject.teachers : [],
                                searchResults: this.teachers,
                                searchAction: (searchString) => {
                                    return this.searchTeachers(searchString);
                                },
                                title: 'Profesores',
                                searchTableProps: {
                                    caption: 'Profesores disponibles',
                                    headers: ['Nombre', 'Apellido', 'Email'],
                                    displayValues: ['firstName', 'lastName', 'email']
                                },
                                selectedTableProps: {
                                    caption: 'Profesores asignados',
                                    headers: ['Nombre', 'Apellido', 'Email'],
                                    displayValues: ['firstName', 'lastName', 'email']
                                }
                            },
                        }
                    ]
                },
                successRoute: 'admin-subject',
                submitAction: this.getSubmitAction(),
                title: this.getTitle(),
            };
        },

        isDelete() {
            // When using deep linking query parameter is a string, when using router.go it's a boolean. :/
            return (
                this.$route.query.is_delete === "true" || this.$route.query.is_delete
            );
        },

        objectId() {
            return this.$route.params.objectId;
        },
    },

    methods: {
        ...mapActions({
            createSubject: "subjects/create",
            deleteSubject: "subjects/delete",
            editSubject: "subjects/edit",
            getAllSpecialities: "specialities/getAll",
            getSubject: "subjects/getOne",
            getTeachers: "teachers/getAll",
            searchTeachers: "teachers/search"
        }),

        getFormMode() {
            let formMode;

            if (this.objectId === 'new') {
                formMode = 'create';
            } else if (isUUID(this.objectId)) {
                formMode = (this.isDelete) ? 'delete' : 'edit';
            }

            return formMode;
        },

        getTitle(mode) {
            let formMode = this.getFormMode();
            let titles = {
                create: 'Crear nueva Materia',
                edit: 'Editar Materia',
                delete: 'Eliminar Materia'
            };

            return titles[formMode];
        },

        getSubmitAction() {
            let submitActionHandler = function () {};

            if (this.objectId === 'new') {
                submitActionHandler = this._createSubject;
            } else if (isUUID(this.objectId)) {
                submitActionHandler = this.isDelete ? this.deleteSubject : this._editSubject;
            }

            return submitActionHandler;
        },

        _createSubject() {
            arguments[0].specialities = [arguments[0].specialities];

            return this.createSubject(...arguments);
        },

        _editSubject() {
            arguments[0].specialities = [arguments[0].specialities];

            return this.editSubject(...arguments);
        },

        getSpecialityInitialSelection() {
            let selectedSpeciality;
            let subject = this.subject;

            if (subject && subject.specialities) {
                selectedSpeciality = this.specialities.filter((speciality) => {
                    return (speciality.objectId === subject.specialities[0]);
                });
            }

            return (selectedSpeciality) ? selectedSpeciality[0] : undefined;
        }
    },

    components: { DynamicForm, AdminAbmContainer }
};
</script>

<style lang="sass" src="./subject-form.scss"></style>