import _ from 'lodash';

export default {

    props: {
        fieldName: {
            type: String,
            required: true
        },
        last: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    computed: {
        field () {
            const getFieldByName = this.$store.getters['form/getFieldByName'];
            let storedField = getFieldByName(this.fieldName);

            return (storedField) ? (storedField) : {errors: []}
        }
    }
}
