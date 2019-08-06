<template lang="html">
    <CCard class="table" noPadding>
        <table class="table--wrapper">
            <caption class="table--caption" v-if="caption">{{ caption }}</caption>
            <thead class="table--header">
                <tr class="table--header-content">
                    <th class="table--header-content-item" :style="{width: '10%'}">

                    </th>
                    <th v-for="header in headers" class="table--header-content-item" :style="rowsStyle">
                        {{ header }}
                    </th>
                    <td v-if="shouldShowActions()" class="table--header-content-item" :style="{width: '20%'}">
                        Acciones
                    </td>
                </tr>
            </thead>
            <tbody class="table--body">
                <tr v-for="(row, index) in rows" v-if="shouldDisplayRow(index)" class="table--body-content" :key="index">
                    <td class="table--body-content-item" :style="{width: '10%'}">
                        {{ index + 1 }}
                    </td>
                    <td v-for="(value) in displayValues" class="table--body-content-item" :style="rowsStyle">
                        {{ row[value] }}
                    </td>
                    <td class="table--body-content-actions" :style="{width: '10%'}">
                        <CButton v-if="shouldShowAction('edit')"
                            class="table--body-content-actions-item"
                            flavor="link"
                            onlyIcon
                            icon="mode_edit"
                            @click="onEditClick(row)" />
                        <CButton v-if="shouldShowAction('delete')"
                            class="table--body-content-actions-item delete-button"
                            flavor="link"
                            onlyIcon
                            icon="delete"
                            @click="onDeleteClick(row)" />
                        <div v-if="actions && actions.custom">
                            <CButton
                                v-for="customAction in actions.custom"
                                class="custom-action"
                                @click="customAction.handler(row)"
                                v-bind="customAction.props" />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="table--paginator paginator">
            <div class="paginator--actions">
                <i :class="getPageNavigationClasses('left')" @click="handleNavigateBefore">navigate_before</i>
                <button v-for="index in pagesToDisplay" :class="getPageNumberClasses(index)" @click="handlePageNumberClick(index)">
                    {{ index }}
                </button>
                <i :class="getPageNavigationClasses('rigth')" @click="handleNavigateNext">navigate_next</i>
            </div>
        </div>
        <div v-if="shouldShowAction('add')" class="table--actions">
            <CFloatButton :onClick="onAddClick" class="add-button" flavor="link"> + </CFloatButton>
        </div>
    </CCard>
</template>

<script>
import _ from 'lodash';
import CButton from 'components/c-button';
import CFloatButton from 'components/c-float-button';
import CCard from 'components/c-card';

export default {
    name: 'CTable',

    props: {
       actions: {
            type: Object,
            required: false,
            default: () => {
                return {}
            }
        },
        caption: {
            type:String,
            required: false,
        },
        headers: {
            type: Array,
            required: true,
        },
        maxRowsPerPage: {
            type: Number,
            default: 10,
            required: false,
        },
        rows: {
            type: Array,
            required: true,
        },
        displayValues: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            actualPage: 1,
        }
    },

    methods: {
        onAddClick() {
            const addHandler = this.actions.add;

            if (addHandler) {
                addHandler();
            }
        },

        onEditClick(row) {
            const editHandler = this.actions.edit;

            if (editHandler) {
                editHandler(row);
            }
        },

        onDeleteClick(row) {
            const deleteHandler = this.actions.delete;

            if (deleteHandler) {
                deleteHandler(row);
            }
        },

        handleNavigateBefore() {
            const actualPage = this.actualPage;

            if (actualPage !== 1) {
                this.actualPage = actualPage - 1;
            } else {
                console.log('limit reached, will not navigate before');
            }
        },

        handlePageNumberClick(index) {
            const rowsLength = this.rows.length;

            if (index <= Math.ceil(rowsLength / this.maxRowsPerPage)) {
                this.actualPage = index;
            }
        },

        handleNavigateNext() {
            const actualPage = this.actualPage;
            const rowsLength = this.rows.length;

            if (actualPage < Math.ceil(rowsLength / this.maxRowsPerPage)) {
                this.actualPage = actualPage + 1;
            } else {
                console.log('limit reached, will not navigate next');
            }
        },

        getPageNumberClasses(index) {
            return {
                'paginator--actions-item': true,
                'selected': (index === this.actualPage)
            }
        },

        getPageNavigationClasses(direction) {
            const rowsLength = this.rows.length;
            const navigationClasses = {
                common: {
                    'material-icons': true,
                },
                left: {
                    'paginator--actions-left': true,
                    disabled: (this.actualPage === 1),
                },
                rigth: {
                    'paginator--actions-rigth': true,
                    disabled: (this.actualPage === Math.ceil(rowsLength / this.maxRowsPerPage)),
                }
            };

            return _.extend(navigationClasses.common, navigationClasses[direction]);
        },

        shouldDisplayRow(rowIndex) {
            const actualPage = this.actualPage;
            const maxRowsPerPage = this.maxRowsPerPage;
            const maxRowsLimit = actualPage * maxRowsPerPage;
            const minRowsLimit = (actualPage - 1) * maxRowsPerPage - 1;

            return (
                rowIndex > minRowsLimit &&
                rowIndex < maxRowsLimit
            );
        },

        shouldShowActions() {
            let showActions = false;
            const actionTypes = ['add', 'edit', 'delete', 'custom'];

            actionTypes.forEach((type) => {
                if (!showActions) {
                    showActions = this.shouldShowAction(type);
                }
            });

            return showActions;
        },

        shouldShowAction(type) {
            return this.actions[type];
        }
    },

    computed: {
        pagesToDisplay() {
            return Math.ceil(this.rows.length / this.maxRowsPerPage);
        },

        rowsStyle() {
            const headers = this.headers;
            let headersLength = headers.length;
            let style = {};

            if (headersLength) {
                style.width = 70 / headersLength;
                style.width = style.width + '%';
            }

            return style;
        }
    },

    components: { CButton, CFloatButton, CCard }
}
</script>

<style lang="sass" src="./c-table.scss"></style>