<template>
    <div class="text-area">
        <div
            class="text-area--content"
            v-bind="props"
            @blur="onBlur"
            ref="content"
            >
        </div>
        <textarea
            class="text-area--hidden"
            :ref="fieldName"
            >
        </textarea>
    </div>
</template>

<script>
import _ from 'lodash';
import FormInputMixin from 'lib-core/form/form-input-mixin';

export default {
    name: 'CTextArea',

    mixins: [FormInputMixin],

    props: {
        contentEditable: {
            type: [Boolean],
            require: false,
            default: false
        },
        disabled: {
            type: [Boolean, String],
            required: false,
            default: false
        },
        id: {
            type: String,
            default: _.uniqueId('TextArea-')
        },
        fieldName: {
            required: true
        },
        onlySlot: {
            type: Boolean,
            required: false,
            default: true
        }
    },

    computed: {
        props () {
            return {
                class: 'text-area--text',
                contenteditable: this.contentEditable,
                disabled: this.disabled,
                id: this.id,
            }
        }
    },

    mounted: function () {
        if (this.value !== '') {
            this.$refs.content.innerHTML = this.value;
        }
    },

    watch: {
        value: {
            handler: function (value, oldValue) {
                if (value !== oldValue) {
                    this.updateStore();
                }

                if (oldValue === '') {
                    this.$refs.content.innerHTML = value;
                }
            }
        }
    },

    methods: {
        onBlur (e) {
            let textWithMarkup = this.getTextWithMarkup(e);
            this.value = textWithMarkup;
        },

        getTextWithMarkup (e) {
            let textDescription = e.target;
            let textWithMarkup;

            if (textDescription.childNodes) {
                textWithMarkup = _.map(textDescription.childNodes, function (childNode) {
                    if (childNode.textContent !== "") {
                        return childNode;
                    }
                });
                textWithMarkup = _.compact(textWithMarkup);
                textWithMarkup = _.map(textWithMarkup, (c) => {
                    var nodeName = c.nodeName;
                    var text = '';

                    if (nodeName === '#text') {
                        text = c.textContent;
                    } else if (nodeName === 'DIV' || nodeName === 'P') {
                        text = c.innerHTML;
                        if (text.indexOf('script') !== -1) {
                            text = '';
                        }
                    } else if (nodeName.indexOf('<H')) {
                        text = c.outerHTML;
                    }

                    return text;
                });

                textWithMarkup = _.compact(textWithMarkup);
                textWithMarkup = _.join(textWithMarkup, '<br />');
            }


            return textWithMarkup;
        }
    }
}

</script>

<style lang="sass" src="./c-text-area.scss"></style>