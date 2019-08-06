import * as types from 'lib-vuex/mutation-types';
import imagesService from 'app/services/images-service';
import storage from 'lib-core/persistance/storage';

export default {
  getAll ({commit, dispatch}) {
    dispatch('getAllAPICall',
    { service: imagesService },
    { root: true }
  )
    .then(response => commit(types.GET_IMAGES_SUCCESS, response))
    .catch(error => commit(types.GET_IMAGES_FAIL, error));
  },

  getOne ({commit, dispatch}, objectId) {
    dispatch('getOneAPICall',
    { service: imagesService, data: {objectId: objectId} },
    { root: true }
  )
    .then(response => commit(types.GET_IMAGE_SUCCESS, response))
    .catch(error => commit(types.GET_IMAGE_FAIL, error));
  },

  edit ({store, commit, dispatch}, data) {
    data.objectId = this.state.news.selectedNew.objectId;

    dispatch('editAPICall',
    { service: imagesService, data: data},
    { root: true }
  )
    .then(response => commit(types.EDIT_IMAGE_SUCCESS, response))
    .catch(error => commit(types.EDIT_IMAGE_FAIL, error));
  },

  create ({commit, dispatch}, data) {
    dispatch('createAPICall',
      { service: imagesService, data: data },
      { root: true }
    )
      .then(response => commit(types.CREATE_IMAGE_SUCCESS, response))
      .catch(error => commit(types.CREATE_IMAGE_FAIL, error));
  },

  delete({commit, dispatch}, data) {
    data.objectId = this.state.news.selectedNew.objectId;

    dispatch('deleteAPICall',
        {service: imagesService, data: data},
        {root: true}
    )
        .then(response => commit(types.DELETE_IMAGE_SUCCESS, response))
        .catch(error => commit(types.DELETE_IMAGE_FAIL, error));
  },
}
