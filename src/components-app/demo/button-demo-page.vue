<template lang="html">
    <div class="button-demo-page">
        <span class="demo-page--title">Button</span>

        <div class="demo-page--section">
            <span class="demo-page--section-title">Small</span>
            <CButton size="small" flavor="primary" class="block--example">Primary</CButton>
            <CButton size="small" flavor="secondary"  class="block--example">Secondary</CButton>
            <CButton size="small" flavor="tertiary" class="block--example">Tertiary</CButton>
        </div>

        <div class="demo-page--section">
            <span class="demo-page--section-title">Default</span>
            <CButton flavor="primary" class="block--example">Primary</CButton>
            <CButton flavor="secondary" class="block--example">Secondary</CButton>
            <CButton flavor="tertiary" class="block--example">Tertiary</CButton>
        </div>
    </div>
</template>

<script>
import { CButton } from 'components';

export default {
    name: 'ButtonDemoPage',

    components: { CButton }
}
</script>

<style lang="css">
</style>
