<template lang="html">
    <AdminAbmContainer>
        <DynamicForm v-bind="dynamicFormProps" />
    </AdminAbmContainer>
</template>

<script>
import DynamicForm from 'components-app/common/dynamic-form'
import AdminAbmContainer from 'components-app/layout/admin-abm-container';
import { mapActions, mapState } from 'vuex';
import { isUUID } from 'lib-core/common/regex';

export default {
    name: 'StudentForm',

    created() {
        this.getTeacher(this.objectId);
        this.getAllSpecialities();
        this.submitAction = this.isDelete ? this.deleteTeacher : this.editTeacher;
    },

    components: { DynamicForm, AdminAbmContainer },

    computed: {
        ...mapState({
            teacher: state => state.teachers.selectedTeacher,
            specialities: state => state.specialities.specialities,
        }),

        dynamicFormProps () {
            return {
                model: {
                    name: 'Profesores',
                    fields: [
                        {
                            name: 'Nombre',
                            fieldType: 'input',
                            fieldProps: {
                                label: 'Nombre',
                                required: true,
                                fieldName: 'firstName',
                                initialValue: this.teacher.firstName,
                                disabled: true
                            }
                        },
                        {
                            name: 'Apellido',
                            fieldType: 'input',
                            fieldProps: {
                                label: 'Apellido',
                                required: true,
                                fieldName: 'name',
                                initialValue: this.teacher.lastName,
                                disabled: true
                            }
                        },
                        {
                            name: 'Email',
                            fieldType: 'input',
                            fieldProps: {
                                label: 'Email',
                                required: true,
                                fieldName: 'email',
                                initialValue: this.teacher.email,
                                disabled: true
                            }
                        },
                        {
                            name: 'Especialidad',
                            fieldType: 'listbox',
                            fieldProps: {
                                label: 'Especialidad',
                                required: true,
                                fieldName: 'speciality',
                                defaultOption: 'Especialidad',
                                valueAttribute: 'objectId',
                                titleAttribute: 'title',
                                options: this.specialities,
                                disabled: this.isDelete,
                                initialSelection: this.teacher.speciality,
                                useObjectAsValue: true
                            }
                        },
                    ]
                },
                submitAction: this.submitAction
            }
        },
        isDelete () {
            // When using deep linking query parameter is a string, when using router.go it's a boolean. :/
            return this.$route.query.is_delete === 'true' || this.$route.query.is_delete;
        },

        objectId () {
            return this.$route.params.objectId;
        }
    },

    methods: {
        ...mapActions({
            getTeacher: 'teachers/getOne',
            editTeacher: 'teachers/edit',
            deleteTeacher: 'teachers/delete',
            getAllSpecialities: 'specialities/getAll'
        })
    }
}
</script>

<style lang="sass" src="./teacher-form.scss"></style>