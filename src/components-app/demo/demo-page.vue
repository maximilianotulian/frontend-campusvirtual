<template>
        <div :class="{'demo-page': true, 'demo-page_no-menu': !expanded}">
            <div class="demo-page--header">
                <CButton @click="expanded = !expanded" v-bind="buttonProps" />
                <span class="demo-page--header-title">Campus Virtual</span>
            </div>
            <div class="demo-page--wrapper">
                <div class="demo-page--side-bar">
                    <CDrawer :expanded="expanded" animateFromLeft>
                        <CCard :style="{height: '880px'}">
                            <ul>
                                <li>
                                    <CButton @click="() => {this.$router.push({name: 'animationDemo'})}">
                                        Animation
                                    </CButton>
                                </li>
                                <li>
                                    <CButton @click="() => {this.$router.push({name: 'buttonDemo'})}">
                                        Button
                                    </CButton>
                                </li>
                                <li>
                                    <CButton @click="() => {this.$router.push({name: 'drawerDemo'})}">
                                        Drawer
                                    </CButton>
                                </li>
                                <li>
                                    <CButton @click="() => {this.$router.push({name: 'inputDemo'})}">
                                        Input
                                    </CButton>
                                </li>
                                <li>
                                    <CButton @click="() => {this.$router.push({name: 'modalDemo'})}">
                                        Modal
                                    </CButton>
                                </li>
                                <li>
                                    <CButton @click="() => {this.$router.push({name: 'newsDemo'})}">
                                        News
                                    </CButton>
                                </li>
                            </ul>
                        </CCard>
                    </CDrawer>
                </div>
                <div class="demo-page--content">
                    <CAnimation  :appearConfig="true" animationMode="out-in">
                        <router-view />
                    </CAnimation>
                </div>
            </div>
        </div>
</template>

<script lang="js">
import { CAnimation, CButton, CCard, CDrawer } from 'components';

export default {
    name: 'DemoPage',

    components: { CAnimation, CButton, CCard, CDrawer },

    data () {
        return {
            expanded: false,
            buttonProps: {
                class: 'demo-page--header-button',
                flavor: 'link',
                icon: 'view_list',
                iconOnly: true,
                size: 'small'
            },
        }
    },

    methods: {
        handleClick () {
            this.$router.push({name: 'animation'});
        },
    }
};
</script>

<style lang="sass" src="./demo-page.scss"></style>
