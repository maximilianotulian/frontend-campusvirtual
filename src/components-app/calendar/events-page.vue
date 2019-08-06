<template lang="html">
    <Page flexDirection="column">
        <h1 style="font-size: 25px; margin-bottom: 10px;">Eventos</h1>
        <CCard class="events-page">
            <CForm v-bind="formProps">
                <div class="events-page--title">
                    <CFormControl fieldName="title" class="full-width">
                        <CInput v-bind="fieldProps.title" />
                    </CFormControl>
                </div>
                <div class="events-page--date">
                    <CFormControl fieldName="startDate" class="events-page--date-item">
                        <CInput v-bind="fieldProps.startDate" />
                    </CFormControl>
                    <CFormControl
                        fieldName="startHour"
                        class="
                            events-page--date-item
                            events-page--date-item-big
                        ">
                        <CListbox v-bind="fieldProps.startHour" />
                    </CFormControl>
                    <CFormControl fieldName="endDate" class="events-page--date-item">
                        <CInput v-bind="fieldProps.endDate" />
                    </CFormControl>
                    <CFormControl
                        fieldName="endHour"
                        class="
                            events-page--date-item
                            events-page--date-item-big
                        ">
                        <CListbox v-bind="fieldProps.endHour" />
                    </CFormControl>
                </div>
                <div class="events-page--description">
                    <h2 class="events-page--description-title">Detalles del evento</h2>
                    <div class="events-page--description-separator" />
                    <div class="events-page--description-content">
                        <div class="content--wrapper">
                            <CFormControl fieldName="visibility">
                                <CToggle v-bind="fieldProps.visibility" />
                            </CFormControl>
                            <CFormControl fieldName="description">
                                <CTextAreaSimple v-bind="fieldProps.description"/>
                            </CFormControl>
                        </div>
                        <div class="content--separator" />
                        <div class="content--guests">
                            <CFormControl fieldName="guests">
                                <CListbox v-bind="fieldProps.guests" />
                            </CFormControl>
                            <div class="content--guests-advice">
                                Los invitados no podrán modificar el evento.
                            </div>
                        </div>
                    </div>
                </div>
            </CForm>
        </CCard>
    </Page>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import CButton from 'components/c-button';
import CCard from 'components/c-card';
import CForm from 'components/c-form';
import CFormControl from 'components/c-form-control';
import CListbox from 'components/c-listbox';
import CInput from 'components/c-input';
import Page from 'components-app/layout/page';
import CTextAreaSimple from 'components/c-text-area-simple';
import CToggle from 'components/c-toggle';
import moment from 'moment';

export default {
    name: 'EventsPage',

    created() {
        this.getAllStudents();

        if (this.eventId) {
            this.getEvent(this.eventId);
        }
    },

    methods: {
        ...mapActions({
            createEvent: 'events/create',
            deleteEvent: 'events/delete',
            editEvent: 'events/edit',
            getAllStudents: 'students/getAll',
            getEvent: 'events/getOne',
        }),

        redirectToCalendar() {
            this.$router.push({name: 'calendar'});
        },

        getSubmitAction() {
            let submitHandler = this.createEvent;

            if (this.eventId) {
                if (this.isDelete) {
                    submitHandler = this.deleteEvent;
                } else {
                    submitHandler = this.editEvent;
                }
            }

            return submitHandler;
        }
    },

    data() {
        let actualDate = moment().locale('es');
        let actualHour = 0;
        let aux;
        let hours = [];

        //TODO: Uncomment this after handle calendar selection
        //actualDate.hours();

        while (actualHour <= 24) {
            aux = actualHour;
            if (actualHour < 10) {
                aux = '0'.concat(aux, ':00');

            } else {
                aux = aux.toString().concat(':00');
            }

            hours.push({value: aux});
            actualHour ++;
        }
        return {
            hours: hours,
            actualDate: actualDate,
            submitAction: this.getSubmitAction()
        };
    },

    computed: {
        ...mapState({
            students: state => {
                let userEmail = state.user.user.email;

                return state.students.students.filter(function (student) {
                    return (student.email !== userEmail);
                });
            },
            event: state => state.events.selectedEvent,
            user: state => state.users.user
        }),

        formProps() {
            return {
                class: 'events-page--form',
                primaryActionProps: {
                    class: 'events-page--form-primary-action',
                    content: 'Guardar'
                },
                secondaryActionProps: {
                    class: 'events-page--form-secondary-action',
                    content: 'Cancelar',
                    iconOnly: true,
                    icon: 'close'
                },
                secondaryAction: true,
                secondaryActionHandler: this.redirectToCalendar,
                handleSubmitAction: this.getSubmitAction(),
                handleSuccess: this.redirectToCalendar,
                handleError: () => {console.log('on error submit')}
            };
        },

        fieldProps() {
            const event = this.event;
            const eventEndDay = moment(event.endTime);
            const eventStartDay = moment(event.startTime);
            const setEventAttributes = (event && this.eventId);
            const showGuests = this.students.length;

            return {
                title: {
                    label: 'Agregar un título',
                    required: true,
                    fieldName: 'title',
                    maxLength: 50,
                    minLength: 5,
                    initialValue: (setEventAttributes) ? this.event.title : ''
                },
                startDate: {
                    type: 'date',
                    required: true,
                    fieldName: 'startDate',
                    label: 'Día de inicio',
                    initialValue: (setEventAttributes) ? eventStartDay.format('YYYY-MM-DD') : this.actualDate.format('YYYY-MM-DD'),
                },
                startHour: {
                    fieldName: 'startHour',
                    valueAttribute: 'value',
                    titleAttribute: 'value',
                    defaultOption: 'Hora de inicio',
                    initialSelection: {value: (setEventAttributes) ? eventStartDay.format('HH:00') : this.actualDate.format('HH:00')},
                    options: this.hours,
                    required: true,
                },
                endDate: {
                    type: 'date',
                    required: true,
                    fieldName: 'endDate',
                    label: 'Día de fin',
                    initialValue: (setEventAttributes) ? eventEndDay.format('YYYY-MM-DD') : this.actualDate.format('YYYY-MM-DD')
                },
                endHour: {
                    fieldName: 'endHour',
                    valueAttribute: 'value',
                    titleAttribute: 'value',
                    defaultOption: 'Hora de fin',
                    initialSelection: {value:(setEventAttributes) ? eventEndDay.format('HH:00') :  this.actualDate.add(1, 'hour').format('HH:00')},
                    options: this.hours,
                    required: true,
                },
                visibility: {
                    fieldName: 'visibility',
                    type: 'checkbox',
                    label: 'Privado',
                    required: false
                },
                description: {
                    label: 'Agregar descripción',
                    fieldName: 'description',
                    required: true,
                    maxLength: 500,
                    minLength: 1,
                    onlySlot: true,
                    initialValue: (setEventAttributes) ? this.event.description : ''
                },
                guests: {
                    label: 'Invitados',
                    fieldName: 'guests',
                    defaultOption: (showGuests) ? 'Agregar invitados' : 'Estudiantes no disponibles',
                    valueAttribute: 'userId',
                    titleAttribute: 'fullName',
                    options: this.students.map(function (student) {
                        return _.extend({
                            fullName: student.firstName + ', ' + student.lastName
                        }, student);
                    }),
                    required: false,
                    multiple: true,
                    initialSelection: (setEventAttributes) ? this.event.guests : [],
                    disabled: (!showGuests)
                }
            };
        },

        eventId() {
            return this.$route.params.eventId;
        },

        isDelete () {
            return this.$route.query.is_delete || this.$route.query.is_delete === 'true';
        },
    },

    components: { CButton, CCard, CInput, CForm, CFormControl, CListbox, Page, CTextAreaSimple, CToggle }
}
</script>

<style lang="sass" src="./events-page.scss"></style>
