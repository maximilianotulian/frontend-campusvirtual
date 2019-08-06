<template lang="html">
    <Page class="news-wrapper" title="Crear Noticia">
        <NewsForm :mode="mode" />
    </Page>
</template>

<script>
import _ from 'lodash';
import { mapActions, mapState } from 'vuex';
import NewsForm from 'components-app/teacher/news/news-form';
import Page from 'components-app/layout/page';

export default {
    name: 'NewsPage',

    data() {
        return {
            mode: 'create',
        }
    },

    created: function () {
        const path = this.$route.path;

        if (path.indexOf('edit') !== -1) {
            this.mode = 'edit';
        } else if (path.indexOf('remove') !== -1) {
            this.mode = 'remove';
        }
    },

    components: { NewsForm, Page }
}
</script>

<style lang="sass" src="./news-page.scss">
</style>
