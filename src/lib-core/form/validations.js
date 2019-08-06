const ALPHANUMERIC_REGEX = /^[a-z0-9 ]+$/i;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default {

    errors: {
        IS_REQUIRED: 'Es requerido.',
        MAX_LENGHT: 'Longitud máxima alcanzada.',
        MIN_LENGHT: 'Longitud mínima no alcanzada.',
        IS_ALPHANUMERIC: 'No es alfanumérico.',
        FIELDS_MUST_BE_EQUAL: 'Debe ser igual al anterior.',
        INVALID_EMAIL: 'No posee formato de email.'
    },

    isInRange(value, minLength, maxLength) {
        let errors = [];

        if (maxLength && (value.length > maxLength)) errors.push(this.errors.MAX_LENGHT);
        if (minLength && (value.length < minLength)) errors.push(this.errors.MIN_LENGHT);

        return errors;
    },

    isAlphanumeric (value) {
        return (ALPHANUMERIC_REGEX.test(value)) ? [] : [this.errors.IS_ALPHANUMERIC];
    },

    isEmail (value) {
        return (EMAIL_REGEX.test(value)) ? [] : [this.errors.INVALID_EMAIL]
    }
}
