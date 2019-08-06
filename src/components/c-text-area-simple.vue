 <template>
    <div :class="classes">
        <textarea
            v-bind="props"
            v-model="value"
            :ref="fieldName"
            @change="onChange"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
        />

        <span class="text-area-s--highlight" />
        <span class="text-area-s--bar" />

        <label class="text-area-s--label" v-if="label" :for="id">
            {{ label }}
        </label>
    </div>
</template>

<script>
import _ from 'lodash';
import FormInputMixin from 'lib-core/form/form-input-mixin';

export default {
    name: 'CTextAreaSimple',

    mixins: [FormInputMixin],

    props: {
        id: {
            type: String,
        },
        label: {
            type: String,
            required: false,
            default: ''
        },
        onlySlot: {
            type: Boolean,
            required: false,
            default: true
        },
    },

    data () {
        return {
            hasBeenModified: (this.initialValue),
        }
    },

    computed: {
        classes () {
            return {
                'text-area-s': true,
                'text-area-s__invalid': (this.hasError && this.hasBeenModified),
                'text-area-s__valid': (!this.hasError  && this.hasBeenModified),
                'text-area-s__dirty': (this.value !== '' && this.hasBeenModified),
            }
        },
        props () {
            return {
                class: 'text-area-s--text',
                id: this.id || _.uniqueId('text-area'),
            }
        },
    },

    methods: {
        onChange (e) {
            this.$emit('change', this.value);
        },

        onInput (e) {
            this.$emit('input', this.value);
            this.hasBeenModified = true;
        },

        onFocus (e) {
            this.$emit('focus', this.value);
        },

        onBlur (e) {
            this.$emit('blur', this.value);

            this.validate();
            this.updateStore();
        },

        focus () {
            this.$refs[this.fieldName].focus();
            return this; //review if it is needed to return this and why
        },
    }
}

</script>

<style lang="sass" src="./c-text-area-simple.scss"></style>
