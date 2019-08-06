import * as types from 'lib-vuex/mutation-types';
import newsService from 'app/services/news-service';
import storage from 'lib-core/persistance/storage';

export default {
  getAll ({commit, dispatch}) {
    dispatch('getAllAPICall',
    { service: newsService },
    { root: true }
  )
    .then(response => commit(types.GET_NEWS_SUCCESS, response))
    .catch(error => commit(types.GET_NEWS_FAIL, error));
  },

  getOne ({commit, dispatch}, objectId) {
    dispatch('getOneAPICall',
    { service: newsService, data: {objectId: objectId} },
    { root: true }
  )
    .then(response => commit(types.GET_NEW_SUCCESS, response))
    .catch(error => commit(types.GET_NEW_FAIL, error));
  },

  edit ({store, commit, dispatch}, data) {
    data.objectId = this.state.news.selectedNew.objectId;

    dispatch('editAPICall',
    { service: newsService, data: data},
    { root: true }
  )
    .then(response => commit(types.EDIT_NEW_SUCCESS, response))
    .catch(error => commit(types.EDIT_NEW_FAIL, error));
  },

  create ({commit, dispatch}, data) {
    dispatch('createAPICall',
      { service: newsService, data: data },
      { root: true }
    )
      .then(response => commit(types.CREATE_NEW_SUCCESS, response))
      .catch(error => commit(types.CREATE_NEW_FAIL, error));
  },

  delete({commit, dispatch}, data) {
    data.objectId = this.state.news.selectedNew.objectId;

    dispatch('deleteAPICall',
        {service: newsService, data: data},
        {root: true}
    )
        .then(response => commit(types.DELETE_NEW_SUCCESS, response))
        .catch(error => commit(types.DELETE_NEW_FAIL, error));
  },
}
