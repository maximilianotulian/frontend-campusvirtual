<template lang="html">
  <component :is="fieldComponent" v-bind="fieldProps"></component>
</template>

<script>
import CInput from 'components/c-input';
import CListbox from 'components/c-listbox';
import CSelect from 'components/c-select';
import ListWithSearch from 'components-app/common/list-with-search';

const COMPONENT_FIELD_MAP = {
  'input': 'CInput',
  'listbox': 'CListbox',
  'select': 'CSelect',
  'list-with-search': 'ListWithSearch'
}

export default {
    name: 'DynamicField',

    props: {
      fieldType: {
        type: String,
        required: false,
        default: 'input'
      },
      fieldProps: {
        type: Object,
        required: true
      }
    },

    computed: {
      fieldComponent() {
        return COMPONENT_FIELD_MAP[this.fieldType]
      }
    },

    components: { CInput, CListbox, CSelect, ListWithSearch }
}
</script>

<style lang="sass" src="./dynamic-field.scss"></style>