<template lang="html">
    <div class="quick-access-list">
        <div class="list--item">
            <CCard class="list--title">
                <h2>Materias</h2>
            </CCard>
            <CCard class="list--sublist">
                <ul v-if="subjects.length">
                    <li v-for="subject in subjects.slice(0,3)" class="list--sublist-item">
                        <h3 class="list--sublist-item-title">
                            {{ subject.title }}
                        </h3>
                        <span v-if="updatesBySubject[subject.objectId]" class="list--sublist-item-subtitle">
                            {{ updatesBySubject[subject.objectId] }} nuevas publicaciones
                        </span>
                        <span v-else class="list--sublist-item-subtitle">
                            No hay nuevas publicaciones
                        </span>
                    </li>
                </ul>
                <span v-else>
                    No hay subscripciones activas.
                </span>
                <span v-if="subjects.length > 3">
                    <br />
                    <a @click="() => {this.$router.push({name: 'subjects-list'});}">Ver más...</a>
                </span>
            </CCard>
        </div>
        <div class="list--item">
            <CCard class="list--title">
                <h2>Próximos eventos</h2>
            </CCard>
            <CCard class="list--sublist">
                <ul v-if="showEvents">
                    <li v-for="event in events" class="list--sublist-item" v-if="event.invitations.length">
                        <h3 class="list--sublist-item-title">
                            {{event.title}}
                        </h3>
                        <span class="list--sublist-item-subtitle">
                            {{event.startTime | format }}
                        </span>
                    </li>
                </ul>
                <div v-else>
                    No hay eventos nuevos.
                </div>
            </CCard>
        </div>
        <div class="list--item">
            <CCard class="list--title">
                <h2>Recordatorios</h2>
            </CCard>
            <CCard class="list--sublist">
                <ul v-if="showRecordatories">
                    <li v-for="event in events" class="list--sublist-item" v-if="event.recordatory">
                        <h3 class="list--sublist-item-title">
                            {{event.title}}
                        </h3>
                        <span class="list--sublist-item-subtitle">
                            {{event.startTime | format }}
                        </span>
                    </li>
                </ul>
                <div v-else>
                    No hay recordatorios nuevos.
                </div>
            </CCard>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CCard from 'components/c-card';
import moment from 'moment';
import _ from 'lodash';

export default {
    name: 'QuickAccessList',

    created() {
        this.getAllEvents();
    },

    computed: {
        ...mapState({
            subjects: state => state.subjects.subjects,
            updatesBySubject: state => state.updates.updatesBySubject,
            events: state => {
                return state.events.events.filter((event) => {
                    return moment().isBefore(moment(event.startTime).local());
                }).map((event) => {
                    let recordatory = false;

                    if (!event.invitations.length) {
                        recordatory = true
                    }

                    return _.extend({recordatory}, event);
                });
            }
        }),

        showEvents() {
            let events = false;

            _.forEach(this.events, (event) => {
                if (event.invitations.length !== 0) {
                    events = true;
                }
            });

            return events;
        },

        showRecordatories() {
            let recordatories = false;

            _.forEach(this.events, (event) => {
                if (event.invitations.length === 0) {
                    recordatories = true;
                }
            });

            return recordatories;
        }
    },

    methods: {
        ...mapActions({
            getAllEvents: 'events/getAll'
        })
    },

    filters: {
        format(time) {
            return moment(time).format('DD/YYYY/MM - HH:00') + 'hs';
        }
    },

    components: { CCard }
}
</script>

<style lang="sass" src="./quick-access-list.scss"></style>
