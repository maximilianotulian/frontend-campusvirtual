<template lang="html">
    <div class="feedback">
        <h1>Noticias</h1>
        <div class="feedback--news-list" v-if="news.length">
            <div style="display:flex">
                <New v-for="(newItem, index) in news" class="feedback--new" v-bind="newItem" />
            </div>
        </div>
        <div class="feedback--news-list" v-else>
            Lo sentimos, no hay noticias disponibles.
        </div>
        <div v-if="getNewsError" class="feedback--error">
            Placeholder - error getting news
        </div>
    </div>
</template>

<script>
import New from 'components-app/common/news/new';
import { mapActions, mapState } from 'vuex';

export default {
    name: 'Feedback',

    data () {
        return {
            getNewsError: false,
        }
    },

    computed: {
        ...mapState({
            news: state => state.news.news
        })
    },

    created: function () {
        this.getNews().catch(this.onErrorGetNews);
    },

    methods: {
        ...mapActions({
            getNews: 'news/getAll'
        }),

        onErrorGetNews() {
            this.getNewsError = true;
        }
    },

    components: { New }
}
</script>

<style lang="sass" src="./feedback.scss"></style>