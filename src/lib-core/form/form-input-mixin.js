import _ from 'lodash';
import { mapActions } from 'vuex';
import validations from 'lib-core/form/validations';

export default {

    data () {
        return {
            value: this.initialValue,
            hasError: false,
            hasBeenModified: false,
            hasBeenReseted: false
        }
    },

    props: {
        fieldName: {
            type: String,
            required: true
        },
        maxLength: {
            type: Number,
            required: false
        },
        minLength: {
            type: Number,
            required: false
        },
        required: {
            type: Boolean,
            required: false,
            default: false
        },
        isAlphanumeric: {
            type: Boolean,
            required: false,
            default: false
        },
        mustBeEqualTo: {
            type: String,
            required: false
        },
        isEmail: {
            type: Boolean,
            required: false,
            default: false
        },
        initialValue: {
            type: String,
            required: false,
            default: ''
        }
    },

    computed: {
        field () {
            return this.getFieldByName(this.fieldName);
        }
    },

    methods: {
        ...mapActions({
            initField: 'form/initField',
            setFieldValue: 'form/setFieldValue',
            setFieldErrors: 'form/setFieldErrors'
        }),

        initFieldOnStore () {
            this.initField({
                name: this.fieldName,
                required: this.required,
                focused: false,
                value: (this.hasBeenReseted) ? '' : this.initialValue
            });
        },

        getFieldByName (fieldName) {
            return this.$store.getters['form/getFieldByName'](fieldName);
        },

        validate () {
            let errors = [];
            let maxLength = this.maxLength;
            let minLength = this.minLength;
            let value = this.value;

            if (this.required && !this.value) {
                errors.push(validations.errors.IS_REQUIRED);
            }

            if (maxLength || minLength) {
                errors = errors.concat(validations.isInRange(value, minLength, maxLength));
            }

            if (this.isAlphanumeric) {
                errors = errors.concat(validations.isAlphanumeric(value));
            }

            if (this.mustBeEqualTo && value !== this.getFieldByName(this.mustBeEqualTo).value) {
                errors = errors.concat(validations.errors.FIELDS_MUST_BE_EQUAL);
            }

            if (this.isEmail) {
                errors = errors.concat(validations.isEmail(value));
            }

            this.hasError = (errors.length > 0);
            this.hasBeenModified = true;
            this.setFieldErrors({
                name: this.fieldName,
                errors: errors
            });
        },

        updateStore () {
            let newFieldData = {
                name: this.fieldName
            };

            if (newFieldData.value !== this.value) {
                newFieldData.value = this.value;
                newFieldData.focused = false;

                this.setFieldValue(newFieldData);
            }
        }
    },

    watch: {
        'field': {
            handler: function (field) {
                if (field && field.focused && field.errors.length === 0 && !this.onlySlot) {
                    this.validate();
                    this.focus();
                }

                if (!field) {
                    this.value = '';
                    this.hasBeenModified = false;
                    this.hasError = false;
                    this.hasBeenReseted = true;
                    this.initFieldOnStore();
                }
            },
            deep: true
        },
        'initialValue': {
            handler: function(newValue, oldValue) {
                if (this.value !== newValue) {
                    this.hasBeenModified = true;
                    this.value = newValue;
                    this.updateStore();
                }
            }
        }
    },

    mounted () {
        this.initFieldOnStore();
    }
}
