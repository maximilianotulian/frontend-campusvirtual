<template lang="html">
    <div class="list-selector">
        <ul class="list-selector--list">
            <li class="list-selector--list-item" v-for="option in options" @click="onOptionSelected(option)">
                <span v-if="multiple" class="list-selector--checkbox">
                   <i class="material-icons list-selector--checkbox-icon"
                      v-if="!isOptionSelected(option[valueAttribute])">
                       check_box_outline_blank
                   </i>
                   <i class="material-icons listbox--checkbox-icon" v-if="isOptionSelected(option[valueAttribute])">
                       check_box
                   </i>
                </span>
                {{option[titleAttribute]}}
            </li>
        </ul>
    </div>
</template>

<script>
    import FormInputMixin from 'lib-core/form/form-input-mixin';

    export default {
        name: 'CListSelector',

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

        data() {
            return {
                selected: (this.multiple) ? [] : null,
                hasBeenModified: false,
                value: (this.multiple) ? [] : ''
            }
        },

        computed: {
            classes() {
                return {
                    'list-selector': true,
                }
            },
        },

        methods: {
            onOptionSelected(option) {
                if (!this.multiple) {
                    this.handleSingleSelection(option);
                } else {
                    this.handleMultipleSelection(option);
                }
            },

            handleSingleSelection(option) {
                const newValue = option[this.valueAttribute];

                if (newValue != this.value) {
                    this.selected = option;
                    this.hasBeenModified = true;
                    this.value = (this.useObjectAsValue) ? option : newValue;
                    this.validate();
                    this.updateStore();
                }
            },

            handleMultipleSelection(option) {
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

            isOptionSelected(value) {
                return this.value.includes(value);
            },

            updateSelectedBasedOnInitialSelection() {
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
                            this.value = this.initialSelection.map(option => option[this.valueAttribute]);
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

            _filterInitialSelectedNonObjects(option) {
                return this.initialSelection.includes(option[this.valueAttribute])
            }
        },

        watch: {
            initialSelection: function (newInitialSelection, oldInitialSelection) {
                if (newInitialSelection !== oldInitialSelection) {
                    this.updateSelectedBasedOnInitialSelection();
                }
            }
        },

        components: {}
    }
</script>

<style lang="sass" src="./c-list-selector.scss"></style>