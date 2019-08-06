import * as types from 'lib-vuex/mutation-types';
import Vue from 'vue';
import _ from 'lodash';

export default {

    [types.GET_EVENTS_SUCCESS] (state, events) {
        state.events = events;
    },

    [types.GET_EVENTS_FAIL] (state) {
        state.events = [];
    },

    [types.GET_EVENT_SUCCESS] (state, selectedEvent) {
        state.selectedEvent = selectedEvent;
    },

    [types.GET_EVENT_FAIL] (state) {
        state.selectedEvent = {};
    },

    [types.CREATE_EVENT_SUCCESS] (state, newEvent) {
        state.events.push(newEvent);
        state.saveEventErrors = {};
    },

    [types.CREATE_EVENT_FAIL] (state, error) {
        state.saveEventErrors = error;
    },

    [types.EDIT_EVENT_SUCCESS] (state, editedEvent) {
        const editedEventIndex = _.findIndex(state.events,  event => event.objectId === editedEvent.objectId);
        Vue.set(state.events, editedEventIndex, editedEvent);
        state.editEventErrors = {};
        state.selectedEvent = {};
    },

    [types.EDIT_EVENT_FAIL] (state, error) {
        state.editEventErrors = error;
    },

    [types.DELETE_EVENT_SUCCESS] (state) {
        if (state.selectedEvent && state.events) {
            const deletedEventIndex = _.findIndex(state.events,  event => event.objectId === state.selectedEvent.objectId);
            state.events.splice(deletedEventIndex, 1);
            state.selectedEvent = {};
        }
    },

    [types.DELETE_EVENT_FAIL] (state, error) {
        state.deleteEventErrors = error;
    }
}
