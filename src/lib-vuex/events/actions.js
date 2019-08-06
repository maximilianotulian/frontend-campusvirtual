import * as types from 'lib-vuex/mutation-types';
import calendarService from 'app/services/calendar-service';
import storage from 'lib-core/persistance/storage';
import moment from 'moment';

export default {
  getAll ({commit, dispatch}) {
    dispatch('getAllAPICall',
    { service: calendarService },
    { root: true }
  )
    .then(response => commit(types.GET_EVENTS_SUCCESS, response))
    .catch(error => commit(types.GET_EVENTS_FAIL, error));
  },

  getOne ({commit, dispatch}, objectId) {
    dispatch('getOneAPICall',
    { service: calendarService, data: {objectId: objectId} },
    { root: true }
  )
    .then(response => commit(types.GET_EVENT_SUCCESS, response))
    .catch(error => commit(types.GET_EVENT_FAIL, error));
  },

  edit ({store, commit, dispatch}, data) {
    let dataExtended = getExtendedData(data);

    dataExtended.objectId = this.state.events.selectedEvent.objectId;

    dispatch('editAPICall',
    { service: calendarService, data: dataExtended},
    { root: true }
  )
    .then(response => commit(types.EDIT_EVENT_SUCCESS, response))
    .catch(error => commit(types.EDIT_EVENT_FAIL, error));
  },

  create ({commit, dispatch}, data) {
    let dataExtended = getExtendedData(data);

    dispatch('createAPICall',
      { service: calendarService, data: dataExtended },
      { root: true }
    )
      .then(response => commit(types.CREATE_EVENT_SUCCESS, response))
      .catch(error => commit(types.CREATE_EVENT_FAIL, error));
  },

  delete({commit, dispatch}, data) {
    let dataExtended = getExtendedData(data);

    dataExtended.objectId = this.state.events.selectedEvent.objectId;

    dispatch('deleteAPICall',
      { service: calendarService,  data: dataExtended},
      { root: true }
    )
      .then(response => commit(types.DELETE_EVENT_SUCCESS, response))
      .catch(error => commit(types.DELETE_SPECIALITY_FAIL, error));
  }
}

function getExtendedData(data) {
  let extendedData = _.extend({
    start_time: moment(''.concat(data.startDate, ' ', data.startHour)).format(),
    end_time: moment(''.concat(data.endDate, ' ', data.endHour)).format()
  }, data, {
    guests: _.map(data.guests, (guest) => {
      return guest.toString();
    })
  });

  return extendedData;
}