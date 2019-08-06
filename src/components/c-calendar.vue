<template lang="html">
    <CCard :class="getClass()">
        <div class="calendar--actions">
            <CButton class="actions-left" flavor="link" onlyIcon icon="keyboard_arrow_left" @click="this.onLeftArrowClick" />
            <CButton class="actions-right" flavor="link" onlyIcon icon="keyboard_arrow_right" @click="this.onRightArrowClick" />
        </div>
        <table>
            <caption class="calendar--title">
                {{ this.getCurrentDateFormated('MMMM YYYY') }}
            </caption>
            <thead>
                <tr>
                    <th :class="getHeaderClass(header)" v-for="header in headers">{{ header }}</th>
                </tr>
            </thead>
            <tbody>
                <tr class="calendar--week" v-for="week in weeks">
                    <td v-for="day in week.days" :class="getDayClass(day)">
                        <span class="calendar--day-value">{{ day.value }}</span>
                        <div v-if="day.events.length" class="events">
                            <span
                                @click="handleEventClick(event)"
                                :class="getEventClass(event)"
                                v-for="(event, index) in day.events"
                                v-if="index < 3"
                            >
                                <div style="display: flex;">
                                    <div class="events--item-dot" />
                                    {{ event.hour }} - <strong class="events--item-description">{{ event.title }}</strong>
                                </div>
                            </span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <CFloatButton class="calendar--add" :onClick="handleClick" />
    </CCard>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CButton from 'components/c-button';
import CCard from 'components/c-card';
import CFloatButton from 'components/c-float-button';
import moment from 'moment';

export default {
    name: 'CCalendar',

    props: {
        type: {
            required: false,
            default: 'big',
            validator: function (value) {
                return _.includes(['big', 'medium', 'small'], value);
            },
        }
    },

    data () {
        return {
            date: '',
            headers: [],
            weeks: [],
        }
    },

    created() {
        this.date = moment().locale('es');
        this.weeks = this.getWeeks();
        this.headers = this.getDayHeaders();
        this.getAllEvents(this.date);
    },

    computed: {
        ...mapState({
            events: (state) => state.events.events
        }),
    },

    watch: {
        events: function (newEvents, oldEvents) {
            this.weeks = this.getWeeks();
        }
    },

    methods: {
        ...mapActions({
            getAllEvents: 'events/getAll',
        }),

        getCurrentDateFormated(format) {
            let dateWithFormat = '';

            if (this.date !== '') {
                dateWithFormat = this.date.format(format);
            }

            return dateWithFormat;
        },

        getClass() {
            const type = this.type;

            return {
                'calendar': true,
                'calendar__medium': (type === 'medium'), //TODO: medium and small are not implemented yet
                'calendar__small': (type === 'small'),
            };
        },

        getDayClass(day) {
            return {
                'calendar--day': true,
                'calendar--day__selected': (day.selected)
            }
        },

        getWeeks() {
            const date = this.date;
            const daysPerWeek = 7;
            const daysInMonth = date.daysInMonth();
            const firstDayOfWeek = this.getFirstDayOfWeek();
            const month = date.get('month') + 1;
            const weeksAtMonth = Math.ceil((daysInMonth + firstDayOfWeek) / daysPerWeek);
            let weekIndex = 0;
            let weeks = [];

            for (weekIndex; weekIndex < weeksAtMonth; weekIndex = weekIndex + 1) {
                weeks.push(this.getDaysForWeek(weekIndex));
            };

            return weeks;
        },

        getDaysForWeek(weekIndex) {
            const daysPerWeek = 7;
            let dayIndex = (daysPerWeek * weekIndex);
            const dayUpperIndex = dayIndex + daysPerWeek;
            let daysForWeek = [];

            for (dayIndex; dayIndex < dayUpperIndex; dayIndex = dayIndex + 1) {
                daysForWeek.push(this.getDay(dayIndex));
            };

            return {days: daysForWeek};
        },

        getDay(dayIndex) {
            const daysInMonth = this.date.daysInMonth();
            const firstDayOfWeek = this.getFirstDayOfWeek();

            let day = {
                selected: this.isActualDay(dayIndex, firstDayOfWeek),
                value: '',
            };

            if (dayIndex >= firstDayOfWeek && dayIndex < (daysInMonth + firstDayOfWeek)) {
                day.value = (dayIndex - firstDayOfWeek) + 1;
            }

            day.events = this.getEventsForDay(day);

            return day;
        },

        getFirstDayOfWeek() {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const firstDayOfWeek = moment({day: 1, month: this.date.get('month')}).format('dddd');

            return days.indexOf(firstDayOfWeek);
        },

        getDayHeaders() {
            return ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
        },

        isActualDay(dayIndex, firstDayOfWeek) {
            const today = moment();

            return (
                (dayIndex + 1 - firstDayOfWeek) === today.get('date') &&
                (this.date.get('month') === today.get('month'))
            )
        },

        getEventsForDay(day) {
            const dayValue = day.value;
            const date = this.date;
            let events = [];
            let eventsForDay = [];

            if (dayValue && this.events.length) {
                eventsForDay = _.filter(this.events, function (event) {
                    let shouldInclude = false;
                    let eventAux = _.clone(event);

                    eventAux.startTime = moment(event.startTime).local().format();

                    if (date.isSame(eventAux.startTime, 'month')) {
                        if (dayValue.toString() === moment(eventAux.startTime).format('D')) {
                            shouldInclude = true;
                        }
                    }

                    return shouldInclude;
                });

                eventsForDay.forEach((eventForDay) => {
                    _.extend(eventForDay, {hour: moment(eventForDay.startTime).format('HH:mm')});

                    events.push(_.pick(eventForDay, ['objectId', 'title', 'hour', 'invitations']));
                });
            }

            return events;
        },

        getEventClass(event) {
            const invitations = event.invitations && event.invitations.length;
            let classes = {
                'events--item': true,
                'events__secondary': (!invitations)
            };

            return classes;
        },

        onLeftArrowClick() {
            this.date = this.date.subtract(1, 'month');
            this.weeks = this.getWeeks();
        },

        onRightArrowClick() {
            this.date = this.date.add(1, 'month');
            this.weeks = this.getWeeks();
        },

        handleClick() {
            this.$router.push({name: 'createEvent'});
        },

        handleEventClick(event) {
            this.$router.push({name: 'editEvent', params: {eventId: event.objectId}});
        },

        getHeaderClass(header) {
            let today = moment();
            let actualDate = this.date.format('dddd').toUpperCase();
            let classes = {
                'calendar--header': true,
                'calendar--header__selected': (
                    actualDate === header.toUpperCase() &&
                    today.get('month') === this.date.get('month')
                )
            };

            return classes;
        }
    },

    components: { CButton, CFloatButton, CCard }
}
</script>

<style lang="sass" src="./c-calendar.scss"></style>
