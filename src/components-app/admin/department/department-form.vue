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
    name: 'DepartmentForm',

    created() {
		if (isUUID(this.objectId)) {
			this.getSpeciality(this.objectId);
		}
    },

    components: { DynamicForm, AdminAbmContainer },

    computed: {
		...mapState({
			speciality: state => state.specialities.selectedSpeciality
		}),

      	dynamicFormProps () {
			const setInitialValues = (this.speciality && isUUID(this.objectId));

			return {
				model: {
					name: 'Especialidades',
					fields: [
					{
						name: 'Titulo',
						fieldType: 'input',
						fieldProps: {
							label: 'Titulo',
							required: true,
							fieldName: 'title',
							initialValue: (setInitialValues) ? this.speciality.title : '',
							disabled: this.isDelete
						}
					},
					{
						name: 'Descripcion',
						fieldType: 'input',
						fieldProps: {
							label: 'Descripcion',
							required: true,
							fieldName: 'description',
							initialValue: (setInitialValues) ? this.speciality.description : '',
							disabled: this.isDelete
						}
					}]
				},
				submitAction: this.getSubmitAction(),
				successRoute: 'admin-department',
				title: this.getTitle(),
			};
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
            getSpeciality: 'specialities/getOne',
            createSpeciality: 'specialities/create',
            editSpeciality: 'specialities/edit',
            deleteSpeciality: 'specialities/delete'
        }),

		getSubmitAction() {
			let submitAction = function () {};

			if (this.objectId === 'new') {
				submitAction = this.createSpeciality;
			} else if (isUUID(this.objectId)) {
				submitAction = this.isDelete ? this.deleteSpeciality : this.editSpeciality;
			}

			return submitAction;
		},

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
				create: 'Crear nueva Especialidad',
				edit: 'Editar Especialidad',
				delete: 'Eliminar Especialidad'
			};

			return titles[formMode];
		},
	},
}
</script>

<style lang="sass" src="./department-form.scss"></style>