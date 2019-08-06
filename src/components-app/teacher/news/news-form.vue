<template lang="html">
    <div>
        <h2 style="font-size: 25px; margin-bottom: 10px;">Noticia</h2>
        <CCard class="news-form">
            <CForm v-bind="formProps">
                <div>
                    <CFormControl class="full-width" fieldName="title">
                        <CInput v-bind="fieldProps.title" />
                    </CFormControl>
                </div>
                <div>
                    <CFormControl class="full-width" fieldName="images">
                        <CInput v-bind="fieldProps.images" @change="handleFileChange" ref="file" />
                    </CFormControl>
                </div>
                <div class="text-area">
                    <div class="text-area--toolbar">
                        <CButton @click="handleStyleChanged" v-bind="buttonsProps.underline" />
                        <CButton @click="handleStyleChanged" v-bind="buttonsProps.bold" />
                        <CButton @click="handleStyleChanged" v-bind="buttonsProps.italic" />
                        <span class="text-area--toolbar-separator"></span>
                        <CButton @click="handleStyleChanged" v-bind="buttonsProps.insertOrderedList" />
                        <CButton @click="handleStyleChanged" v-bind="buttonsProps.insertUnorderedList" />
                        <CButton @click="handleStyleChanged" v-bind="buttonsProps.justifyLeft" />
                        <CButton @click="handleStyleChanged" v-bind="buttonsProps.justifyCenter" />
                        <CButton @click="handleStyleChanged" v-bind="buttonsProps.justifyRight" />
                        <CButton @click="handleStyleChanged" v-bind="buttonsProps.justifyFull" />
                        <span class="text-area--toolbar-separator"></span>
                        <CButton @click="handleStyleChanged" v-bind="buttonsProps['<h1>']" />
                        <CButton @click="handleStyleChanged" v-bind="buttonsProps['<h2>']" />
                        <CButton @click="handleStyleChanged" v-bind="buttonsProps['<h3>']" />
                        <CButton @click="handleStyleChanged" v-bind="buttonsProps.removeFormat" />
                    </div>
                    </CFormControl fieldName="body" class="full-width">
                        <CTextArea v-bind="fieldProps.body"></CTextArea>
                    </CFormControl>
                </div>
            </CForm>
        </CCard>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CButton from 'components/c-button';
import CCard from 'components/c-card';
import CForm from 'components/c-form';
import CFormControl from 'components/c-form-control';
import CInput from 'components/c-input';
import CTextArea from 'components/c-text-area';
import Validations from 'lib-core/form/validations';
import _ from 'lodash';

export default {
    name: 'NewsForm',

    props: {
        logInButton: {
            type: Boolean,
            required: false,
            default: false
        },
        logInButtonAction: {
            type: Function,
            required: false
        },
        mode: {
            type: String,
            validator: function (value) {
                return _.includes(['create', 'edit', 'remove'], value);
            },
        }
    },

    computed: {
        ...mapState({
            images: state => state.images.images,
            selectedNew: state => state.news.selectedNew,
            user: state => state.user.user
        }),

        fieldProps() {
            const isDelete = this.isDelete;
            let selectedNew = this.selectedNew || {};
            let fieldsProps = {
                body: {
                    contentEditable: (isDelete) ? false : true,
                    fieldName: 'body',
                    maxLength: 500,
                    minLength: 1,
                    onlySlot: true,
                    initialValue: selectedNew.body || '',
                    disabled: isDelete
                },
                images: {
                    disabled: isDelete,
                    fieldName: 'images',
                    required: false,
                    type: 'file'
                },
                resume: {
                    label: 'Descripción corta',
                    required: true,
                    fieldName: 'resume',
                    maxLength: 200,
                    minLength: 1,
                    disabled: isDelete
                },
                title: {
                    label: 'Título',
                    required: true,
                    fieldName: 'title',
                    maxLength: 50,
                    minLength: 3,
                    initialValue: selectedNew.title || '',
                    disabled: isDelete
                }
            };

            if (selectedNew.title) {
                _.each(fieldsProps, (fieldProp, index) => {
                    if (!this.isCreate) {
                        if (index !== 'author') {
                            fieldProp.value = selectedNew[index];
                        } else {
                            fieldProp.value = selectedNew[index].name;
                        }
                    }
                });
            }

            return fieldsProps;
        },

        buttonsProps() {
            let buttonsProps = {
                underline: {
                    icon: 'format_underlined'
                },
                bold: {
                    icon: 'format_bold'
                },
                italic: {
                    icon: 'format_italic'
                },
                insertOrderedList: {
                    icon: 'format_list_numbered'
                },
                insertUnorderedList: {
                    icon: 'format_list_bulleted'
                },
                justifyLeft: {
                    icon: 'format_align_left'
                },
                justifyCenter: {
                    icon: 'format_align_center'
                },
                justifyRight: {
                    icon: 'format_align_right'
                },
                justifyFull: {
                    icon: 'format_align_justify'
                },
                '<h1>': {
                    icon: 'format_size'
                },
                '<h2>': {
                    icon: 'format_size'
                },
                '<h3>': {
                    icon: 'format_size'
                },
                removeFormat: {
                    icon: 'remove'
                }
            };

            return _.each(buttonsProps, (buttonProps, index) => {
                return _.extend(buttonProps, {
                    class: 'text-area--toolbar-item',
                    iconOnly: true,
                    value: index
                });
            });
        },

        formProps() {
            return {
                class: 'news-form--form',
                primaryActionProps: {
                    class: 'news-form--save-button',
                    content: (this.isCreate) ? 'Guardar' :
                        (this.isDelete) ? 'Eliminar' : 'Actualizar'
                },
                secondaryAction: true,
                secondaryActionHandler: this.onCancel,
                secondaryActionProps: {
                    class: 'news-form--cancel-button',
                    content: 'Cancel'
                },
                handleSubmitAction: this.getSubmitAction(),
                handleSuccess: this.onSuccessSubmit,
                hiddenData: this.getHiddenData()
            }
        },

        newId() {
            return this.$route.params.newId;
        },

        isCreate() {
            return this.mode === 'create';
        },

        isDelete() {
            return this.mode === 'remove';
        }
    },

    data() {
        return {
            submitAction: this.getSubmitAction()
        }
    },

    created() {
        const newId = this.newId;

        if (newId) {
            this.getNew(newId);
        }
    },

    methods: {
        ...mapActions({
            createImage: 'images/create',
            createNew: 'news/create',
            deleteNew: 'news/delete',
            editNew: 'news/edit',
            getNew: 'news/getOne',
        }),

        getSubmitAction (event) {
            let callback = this._createNew;

            if (this.newId) {
                if (this.isDelete) {
                   callback = this.deleteNew;
                } else {
                    callback = this._editNew;
                }
            }

            return callback;
        },

        getHiddenData() {
            let hiddenData = {
                author: this.user.id,
                images: [],
            };

            if (this.isCreate) {
                hiddenData.subject = this.$route.params.subjectId;
            } else {
                hiddenData.objectId = this.selectedNew.objectId;
            }

            return hiddenData;
        },

        onCancel () {
            this.$router.go(-1);
        },

        onSuccessSubmit () {
            this.$router.push({
                name: 'subject',
                params: {subjectId: this.$route.params.subjectId}
            });
        },

        handleStyleChanged (event) {
            const value = event.target.value || event.target.parentElement.value;

            event.stopPropagation();
            event.preventDefault();

            if (value) {
                this.executeCommand(value);
            }
        },

        executeCommand (command) {
            let commandResult;
            let commandParameters = this.getCommandParameters(command);
            let commandName = commandParameters.name;
            let commandArgument = commandParameters.argument;

            try {
                if (this.shouldExecuteCommand(commandName)) {
                    commandResult = document.execCommand(commandName, false, commandArgument);

                    if (!commandResult) {
                        console.log('something went wrong');
                    }
                }
            } catch (err) {
                console.log(`cannot execute the command ${commandName}`);
                console.log(`error description ${err}`);
            }
        },

        getCommandParameters (command) {
            let commandParameters = {
                name: command,
                argument: null
            };

            if (this.shouldModifyTextWrapper(command)) {
                commandParameters = {
                    name: 'formatBlock',
                    argument: command
                }
            }

            return commandParameters;
        },

        shouldExecuteCommand (commandName) {
            return (
                document.queryCommandSupported(commandName) &&
                document.queryCommandEnabled(commandName)
            );
        },

        shouldModifyTextWrapper (commandName) {
            return (commandName.indexOf('<') !== -1);
        },

        handleFileChange(event) {
            let file = this.$refs.file.$refs.images.files[0];
            let formData;

            if (file) {
                formData = new FormData();
                formData.append('url', file);
                this.createImage(formData);
            } else {
                console.log('NEWS-FORM: Not file was selected');
            }
        },

        _createNew(data) {
            const extendedData = this.validateAndSetImages(data);

            return this.createNew(extendedData);
        },

        _editNew(data) {
            const extendedData = this.validateAndSetImages(data);

            return this.editNew(extendedData);
        },

        validateAndSetImages(data) {
            let extendedData = _.clone(data);

            extendedData.images = this.selectedNew.images.map((image) => {
                return image.objectId
            });

            _.forEach(this.images, (image) => {
                extendedData.images.push(image.objectId);
            });

            return extendedData;
        }
    },

    components: { CCard, CButton, CInput, CFormControl, CForm, CTextArea }
}
</script>

<style lang="sass" src="./news-form.scss"></style>