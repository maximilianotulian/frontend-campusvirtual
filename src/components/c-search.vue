<template lang="html">
    <div class="search">
        <div class="search--box">
            <label v-if="showSearchHint" class="search--box-hint" for="search">
                {{ hint || 'Ingresá al menos tres letras para buscar' }}
            </label>
            <input
                class="search--box-input"
                id="search"
                @input="debouncer"
                @focus="handleFocus"
                @blur="handleBlur" />
            <i class="search--box-icon material-icons">search</i>
        </div>

        <div class="search--results">
            <div v-if="isSearching" class="search--results-loading"></div>
            <CTable v-else-if="showContent && resultTableProps.rows.length" class="search--results-content" v-bind="resultTableProps" />
            <div v-if="showContent && !resultTableProps.rows.length" class="search--empty-results">
                Su búsqueda no arrojó ningún resultado
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import _ from 'lodash';
import CTable from 'components/c-table';

export default {

    name: 'CSearch',

    props: {
        searchAction: {
            type: Function,
            required: true
        },
        hint: {
            type: String,
            required: false
        },
        resultTableProps: {
            type: Object,
            required: true
        },
    },

    data() {
        const debouncer = _.debounce(this.handleInput, 600);

        return {
            debouncer,
            isSearching: false, //Should be moved to vuex inside teachers
            lastSearch: '',
            showSearchHint: true,
        };
    },

    methods: {
        handleInput(event) {
            const value = event.target.value;

            if (value.length > 2 && value !== this.lastSearch) {
                this.isSearching = true;
                this.lastSearch = value;
                const searchActionCall = this.searchAction(value);

                // If this returns a promise
                if (searchActionCall && searchActionCall.then) {
                    searchActionCall.then( () => this.isSearching = false);
                } else {
                    this.isSearching = false;
                }
            }
        },

        handleFocus() {
            this.showSearchHint = false;
        },

        handleBlur(event) {
            const value = event.target.value;

            if (value.length === 0) {
                this.showSearchHint = true;
            }
        },
    },

    computed: {
        showContent() {
            return (this.lastSearch && !this.isSearching);
        }
    },

    components: { CTable }
}
</script>

<style lang="sass" src="./c-search.scss"></style>