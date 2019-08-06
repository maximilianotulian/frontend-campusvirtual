import * as types from 'lib-vuex/mutation-types';
import studentsService from 'app/services/students-service';

export default {
  getAll ({commit, dispatch}) {
    dispatch('getAllAPICall',
    { service: studentsService },
    { root: true }
  )
    .then(response => commit(types.GET_STUDENTS_SUCCESS, response))
    .catch(error => commit(types.GET_STUDENTS_FAIL, error));
  },

  getOne ({commit, dispatch}, objectId) {
    return dispatch('getOneAPICall',
    { service: studentsService, data: {objectId: objectId} },
    { root: true })
    .then(response => commit(types.GET_STUDENT_SUCCESS, response))
    .catch(error => commit(types.GET_STUDENT_FAIL, error));
  },

  edit ({store, commit, dispatch}, data) {
    data.objectId = this.state.students.selectedStudent.id;

    dispatch('editAPICall',
    { service: studentsService,  data: data},
    { root: true }
  )
    .then(response => commit(types.EDIT_STUDENT_SUCCESS, response))
    .catch(error => commit(types.EDIT_STUDENT_FAIL, error));
  },

  register ({commit, dispatch}, data) {
    dispatch('user/register',
      { newUser: data },
      { root: true }
    )
  },
}
