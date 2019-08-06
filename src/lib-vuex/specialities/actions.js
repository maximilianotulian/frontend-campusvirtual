import * as types from 'lib-vuex/mutation-types';
import specialitiesService from 'app/services/specialities-service';

export default {
  getAll ({commit, dispatch}) {
    dispatch('getAllAPICall', 
    { service: specialitiesService },
    { root: true }
  )
    .then(response => commit(types.GET_SPECIALITIES_SUCCESS, response))
    .catch(error => commit(types.GET_SPECIALITIES_FAIL, error));
  },

  getOne ({commit, dispatch}, objectId) {
    dispatch('getOneAPICall', 
    { service: specialitiesService, data: {objectId: objectId} },
    { root: true }
  )
    .then(response => commit(types.GET_SPECIALITY_SUCCESS, response))
    .catch(error => commit(types.GET_SPECIALITY_FAIL, error));
  },

  edit ({store, commit, dispatch}, data) {
    data.objectId = this.state.specialities.selectedSpeciality.objectId;

    dispatch('editAPICall', 
    { service: specialitiesService,  data: data},
    { root: true }
  )
    .then(response => commit(types.EDIT_SPECIALITY_SUCCESS, response))
    .catch(error => commit(types.EDIT_SPECIALITY_FAIL, error));
  },

  create ({commit, dispatch}, data) {
    dispatch('createAPICall', 
      { service: specialitiesService, data: data },
      { root: true }
    )
      .then(response => commit(types.CREATE_SPECIALITY_SUCCESS, response))
      .catch(error => commit(types.CREATE_SPECIALITY_FAIL, error));
  },

  delete({commit, dispatch}, data) {
    data.objectId = this.state.specialities.selectedSpeciality.objectId;

    dispatch('deleteAPICall', 
      { service: specialitiesService,  data: data},
      { root: true }
    )
      .then(response => commit(types.DELETE_SPECIALITY_SUCCESS, response))
      .catch(error => commit(types.DELETE_SPECIALITY_FAIL, error));
  }
}
