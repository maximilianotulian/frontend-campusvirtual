<template lang="html">
    <div :class="classes">
        <label v-if="hasBeenModified" class="listbox--label">
            {{defaultOption}}
        </label>
        <CDropdown v-bind="dropDownProps">
            <ul class="listbox--list">
                <button type="button" class="listbox--list-item" v-for="option in options" @click="onOptionSelected(option)">
                    <span v-if="multiple" class="listbox--checkbox">
                            <i class="material-icons listbox--checkbox-icon" v-if="!isOptionSelected(option[valueAttribute])">
                            check_box_outline_blank
                            </i>
                            <i class="material-icons listbox--checkbox-icon" v-if="isOptionSelected(option[valueAttribute])">
                            check_box
                            </i>
                        </span>
                    {{option[titleAttribute]}}
               </button>
            </ul>
        </CDropdown>
    </div>
</template>

<script>
import CDropdown from 'components/c-dropdown';
import FormInputMixin from 'lib-core/form/form-input-mixin';

export default {
    name: 'CListbox',

    mixins: [FormInputMixin],

    props: {
        multiple: {
            type: Boolean,
            required: false,
            default: false
        },
        titleAttribute: {
            type: String,
            required: false,
        },
        valueAttribute: {
            type: String,
            required: false,
        },
        defaultOption: {
            type: String,
            required: false,
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        initialSelection: {
            type: [Object, Array],
            required: false,
        },
        options: {
            type: Array,
            required: true
        },
        useObjectAsValue: {
            type: Boolean,
            required: false,
            default: false
        },
        flavor: {
            type: String,
            required: false,
            default: ''
        }
    },

    data () {
        return {
            selected: (this.multiple) ? [] : null,
            hasBeenModified: false,
            value: (this.multiple) ? [] : ''
        }
    },

    computed: {
        classes () {
            return {
                'listbox': true,
                'listbox__dirty': (this.hasBeenModified),
                'listbox__invalid': (this.hasError),
                'listbox__valid': (!this.hasError) && (this.hasBeenModified) && (!this.disabled),
                'listbox__large': (this.flavor === 'large'),
                'listbox__disabled': (this.disabled)
            }
        },

        dropDownProps () {
            return {
                dropdownButtonContent: this.dropDownButtonContent,
                onDropDownClosed: this.onDropDownClosed,
                class: "listbox--button",
                ref: "dropdown",
                buttonSize: (this.flavor === 'large') ? 'xxLarge' : undefined,
                size: this.flavor,
                disabled: this.disabled
            }
        },

        dropDownButtonContent () {
            let content;

            if (!this.multiple) {
                if (this.selected) {
                    content = this.selected[this.titleAttribute];
                } else {
                    content = this.defaultOption;
                }
            } else {
                if (this.selected.length > 0) {
                    content = this.selected.reduce( (content, option) => content + option[this.titleAttribute] + '; ', '');
                } else {
                    content = this.defaultOption;
                }
            }

            return content;
        }
    },

    methods: {
        onOptionSelected (option) {
            if (!this.multiple) {
                this.handleSingleSelection(option);
            } else {
                this.handleMultipleSelection(option);
            }
        },

        handleSingleSelection (option) {
            const newValue = option[this.valueAttribute];

            if (newValue != this.value) {
                this.selected = option;
                this.hasBeenModified = true;
                this.value = (this.useObjectAsValue) ? option: newValue;
                this.validate();
                this.updateStore();
            }

            this.$refs.dropdown.hideDropDown();
        },

        handleMultipleSelection (option) {
            const newValue = option[this.valueAttribute];

            if (!this.isOptionSelected(newValue)) {
                this.selected.push(option);
                this.hasBeenModified = true;
                this.value.push(newValue);
            } else {
                const valueIndex = this.value.indexOf(newValue);
                this.value.splice(valueIndex, 1);
                this.selected.splice(valueIndex, 1);
            }

            this.validate();
            this.updateStore();
        },

        onDropDownClosed () {
            if (!this.value) {
                this.validate();
            }
        },

        isOptionSelected (value) {
            return this.value.includes(value);
        },

        updateSelectedBasedOnInitialSelection () {
            if (this.hasBeenModified) return;

            if (!this.multiple) {
                if (this.initialSelection) {
                    this.selected = this.initialSelection;
                    this.value = (this.useObjectAsValue) ? this.initialSelection : this.initialSelection[this.valueAttribute];
                    this.hasBeenModified = true;
                }
            } else {
                if (this.initialSelection && this.initialSelection.length !== 0) {

                    // Check if I have an array of objects or objectsIds
                    if (this.initialSelection[0][this.valueAttribute]) {
                        this.selected = this.initialSelection;
                        this.value = this.initialSelection.map( option => option[this.valueAttribute]);
                    } else {
                        this.selected = this.options.filter(this._filterInitialSelectedNonObjects);
                        this.value = this.initialSelection;
                    }

                    this.hasBeenModified = true;
                }
            }

            if (this.hasBeenModified) {
                this.updateStore();
            }
        },

        _filterInitialSelectedNonObjects (option) {
            return this.initialSelection.includes(option[this.valueAttribute])
        },
    },

    watch: {
        initialSelection: function (newInitialSelection, oldInitialSelection) {
            if (newInitialSelection !== oldInitialSelection) {
                this.updateSelectedBasedOnInitialSelection();
            }
        }
    },

    components: { CDropdown }
}
</script>

<style lang="sass" src="./c-listbox.scss"></style>


