<template lang="html">
    <div class="drawer-demo-page">
        <span class="demo-page--title">Drawer</span>

        <div class="demo-page--section">
            <span class="demo-page--section-title">Uncontrolled Drawer</span>
        </div>

        <div class="demo-page--section">
            <span class="demo-page--section-title">Controlled Drawer</span>

            <CButton @click="animate = !animate" flavor="primary">Animate</CButton>
            <CDrawer controlled :expanded="animate">
                <div>
                    <div>Content to animate</div>
                    <div>Content to animate</div>
                    <div>Content to animate</div>
                </div>
            </CDrawer>
        </div>
    </div>
</template>

<script>
import { CButton, CDrawer } from 'components';

export default {
    name: 'DrawerDemoPage',

    data () {
        return {
            animate: false
        }
    },

    components: { CButton, CDrawer }
}
</script>

<style lang="css">
</style>
