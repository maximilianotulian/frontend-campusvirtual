<template lang="html">
    <div class="animation-demo-page">
        <span class="demo-page--title">Animation</span>

        <CButton flavor="primary" @click="handleClick">
            <CAnimation :toggle="animate" animationName="fade" animationMode="out-in">
                <span>Animate</span>
                <span slot="secondSlot">Here we are!</span>
            </CAnimation>
        </CButton>

        <div class="demo-page--section">
            <span class="demo-page--section-title">Login animation</span>
            <CAnimation :toggle="animate" animationMode="out-in">
                <div>Main content</div>
                <div slot="secondSlot">Secondary content</div>
            </CAnimation>
        </div>

        <div class="demo-page--section">
            <span class="demo-page--section-title">Bounce</span>
            <CAnimation name="bounce" :toggle="animate">
                <div>Bounce</div>
            </CAnimation>
        </div>
    </div>
</template>

<script>
import { CAnimation, CButton } from 'components';


export default {
    name: 'AnimationDemoPage',

    components: { CAnimation, CButton },

    data () {
        return {
                animate: false
        }
    },

    methods: {
        handleClick () {
            this.animate = !this.animate;
        }
    }
}
</script>

<style lang="sass" src="./animation-demo-page.scss">
</style>
