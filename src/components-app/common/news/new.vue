<template lang="html">
    <div class="new">
        <CCard v-bind="cardProps">
            <div class="new--content" v-html="body"></div>
        </CCard>
    </div>
</template>

<script>
import CCard from 'components/c-card';

export default {
    name: 'New',

    props: {
        actions: {
            type: Array,
            required: false,
        },
        author: {
            type: Object,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        createdTime: {
            type: String,
            required: true
        },
        images: {
            type: Array,
            required: false,
            default: []
        },
        title: {
            type: String,
            required: true
        },
        flavor: {
            type: String,
            validator: function (value) {
                return _.includes(['big', 'small'], value);
            },
            default: 'big',
        },
        updatedTime: {
            type: String,
            required: true
        },
        showMenu: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    computed: {
        cardProps () {
            //For now we select the first image, we need to set a main imagen and then a gallery
            let mainImage = {};

            if (this.images && this.images.length > 0) {
                mainImage = this.images[0];
            }

            return {
                actions: this.actions,
                class: 'new--card',
                flavor: this.flavor,
                imageSource: mainImage.url,
                showImage: Boolean(mainImage),
                showMenu: this.showMenu,
                subtitle: `Escrito por ${this.author.name}`,
                title: this.title,
            }
        }
    },

    components: { CCard }
}
</script>

<style lang="sass" src="./new.scss"></style>
