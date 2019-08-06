import * as types from 'lib-vuex/mutation-types';

export default {

    [types.INIT_FIELD] (state, fieldData) {
        let field = {
            name: fieldData.name,
            value: fieldData.value,
            errors: [],
            focused: fieldData.focused,
            required: fieldData.required
        };

        state.fields[fieldData.name] = field;
    },

    [types.SET_FIELD_VALUE] (state, fieldData) {
        let updatedFields = _.clone(state.fields);

        updatedFields[fieldData.name].value = fieldData.value;
        updatedFields[fieldData.name].focused = fieldData.focused;

        state.fields = _.extend({}, state.fields, updatedFields);
    },

    [types.SET_FIELD_ERRORS] (state, fieldData) {
        let stateFields = _.clone(state.fields);

        stateFields[fieldData.name].errors = fieldData.errors;

        state.fields = _.extend({}, state.fields, stateFields);
    },

    [types.SET_FIELD_FOCUS] (state, fieldData) {
        let stateFields = _.clone(state.fields);

        stateFields[fieldData.name].focused = fieldData.focused;

        state.fields = _.extend({}, state.fields, stateFields);
    },

    [types.CLEAR_FORM] (state) {
        state.fields = {};
        state.formHasErrors = false;
    }
}
