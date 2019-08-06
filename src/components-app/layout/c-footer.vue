<template lang="html">
    <footer class="footer">
        <CContainer class="footer--container">
            <div class="container--logo">
                <CLogo showCopyright />
            </div>
            <div class="container--pages-info">
                <ul class="list">
                    <li class="list--item">Mas información</li>
                    <li class="list--item">
                        <CButton v-bind="buttonProps.aboutUs" @click="onAboutUsClick" />
                    </li>
                    <li class="list--item">
                        <CButton v-bind="buttonProps.contact" @click="onContactClick" />
                    </li>
                </ul>
            </div>
        </CContainer>
    </footer>
</template>

<script>
import CButton from 'components/c-button';
import CContainer from 'components/c-container';
import CLogo from 'components/c-logo';

export default {
    name: 'CFooter',

    computed: {
        buttonProps() {
            let buttonProps = {
                aboutUs: {
                    value: 'Sobre nosotros',
                },
                contact: {
                    value: 'Contacto',
                }
            };

            return _.each(buttonProps, (props) => {
                return _.extend(props, {
                    flavor: 'link'
                });
            });
        },
    },
    methods: {
        onAboutUsClick() {
            this.$router.push({name: 'aboutUs'});
        },

        onContactClick() {
            this.$router.push({name: 'contact'});
        }
    },

    components: { CButton, CContainer, CLogo }
}
</script>

<style lang="sass" src="./c-footer.scss"></style>
