<template lang="html">
    <div class="list-with-search">
        <div class="list-with-search--title">
            {{title}}
        </div>
        <div class="list-with-search--search">
            <CSearch
                :searchAction="searchAction"
                hint="Ingresá al menos tres caracteres para buscar"
                :resultTableProps="extendedSearchTableProps"
            />
        </div>
        <div class="list-with-search--list">
            <CTable v-if="this.value.length" v-bind="extendedSelectedTableProps" />
        </div>
    </div>
</template>

<script>
import CSearch from 'components/c-search';
import CTable from 'components/c-table';
import FormInputMixin from 'lib-core/form/form-input-mixin';
import _ from 'lodash';

export default {
    name: 'ListWithSearch',

    mixins: [FormInputMixin],

    props: {
        searchAction: {
            type: Function,
            required: true
        },
        searchResults: {
            type: Array,
            required: false,
            default: () => []
        },
        initialValue: {
            type: Array,
            required: false,
            default: () => []
        },
        idAttribute: {
            type: String,
            required: false,
            default: 'id'
        },
        title: {
            type: String,
            required: true
        },
        searchTableProps: {
            type: Object,
            required: true
        },
        selectedTableProps: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            value: this.initialValue,
        }
    },

    computed: {
        extendedSearchTableProps() {
            const rows = _.differenceBy(this.searchResults, this.value, this.idAttribute);

            return {
                ...this.searchTableProps,
                rows: rows,
                actions: {
                    custom: [{
                        name: 'add',
                        handler: this.addFromSearch,
                        props: {
                            onlyIcon: true,
                            icon: 'add',
                            flavor: 'link',
                        }
                    }]
                }
            }
        },
        extendedSelectedTableProps() {
            return {
                ...this.selectedTableProps,
                rows: this.value,
                actions: {
                    delete: this.removeFromSelected
                }
            }
        }
    },

    methods: {
        addFromSearch(row) {
            this.value.push(row);
            this.updateStore();
        },

        removeFromSelected(row) {
            const removedRowIndex = _.findIndex(this.value,  element => element[this.idAttribute] === row[this.idAttribute]);
            this.value.splice(removedRowIndex, 1);
            this.updateStore();
        }
    },

    components: { CSearch, CTable }
}
</script>

<style lang="sass" src="./list-with-search.scss"></style>