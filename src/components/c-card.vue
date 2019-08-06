<template lang="html">
    <article :class="classes">
        <div :class="{'card--header': Boolean(title)}">
            <h2 class="card--title">
                {{ title }}
            </h2>
            <h3 v-if="flavor === 'big'"class="card--subtitle">
                {{ subtitle }}
            </h3>
            <div class="card--menu" v-if="showMenu && this.actions">
                <CButton @click="handleMenuClick" iconOnly icon="more_horizontal" />
                <CAnimation animationName="fade">
                    <div :class="modalClasses" v-if="menuVisible">
                        <div class="modal--indicator"></div>
                        <ul class="modal--options">
                            <li class="modal--options-item" v-for="action in actions" @click="action.handler">
                                {{ action.value }}
                            </li>
                        </ul>
                    </div>
                </CAnimation>
            </div>
        </div>
        <div class="card--image" v-if="showImage">
            <img class="card--image-content" :src="imageSource" :alt="getAltDescription()" />
        </div>
        <div class="card--content">
            <slot />
        </div>
    </article>
</template>

<script>
import CAnimation from 'components/c-animation';
import CButton from 'components/c-button';

export default {
    name: 'CCard',

    props: {
        actions: {
            type: Array,
            required: false
        },
        title: {
            type: String,
            required: false
        },
        subtitle: {
            type: String,
            required: false
        },
        showMenu: {
            type: Boolean,
            required: false,
            default: false
        },
        showImage: {
            type: Boolean,
            required: false,
            default: false
        },
        imageSource: {
            type: String,
            required: false,
        },
        noPadding: {
            type: Boolean,
            required: false,
        },
        flavor: {
            type: String,
            validator: function (value) {
                return _.includes(['big', 'small'], value);
            },
            default: 'big',
        },
    },

    computed: {
        classes () {
            return {
                'card': true,
                'card__no-padding': (this.noPadding),
                'card__small': (this.flavor === 'small')
            }
        },
        modalClasses () {
            return {
                'modal': true,
            }
        },
    },

    data () {
        return {
            menuVisible: false,
            menuOptions: [
                {
                    value: 'Editar',
                    action: this.handleEditOption
                },
                {
                    value: 'Eliminar',
                    action: this.handleRemoveOption
                }
            ]
        }
    },

    methods: {
        handleMenuClick () {
            this.menuVisible = !this.menuVisible;
        },

        handleEditOption (e) {
            console.log('edit', e);
        },

        handleRemoveOption (e) {
            console.log('remove', e);
        },

        getAltDescription() {
            const altDescription = [this.title, this.subtitle];

            return altDescription.join(' ');
        }
    },

    components: { CAnimation, CButton }
}
</script>

<style lang="sass" src='./c-card.scss'></style>
