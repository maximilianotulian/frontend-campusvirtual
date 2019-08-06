<template lang="html">
    <div class="input-demo-page">
        <span class="demo-page--title">Input</span>

        <div class="demo-page--section">
            <span class="demo-page--section-title">Basic Input</span>
            <CInput class="demo--example" label="Example" fieldName="test" />
        </div>
    </div>
</template>

<script>
import { CInput } from 'components';

export default {
    name: 'DemoPageInput',

    components: { CInput }
}
</script>

<style lang="sass" src="./input-demo-page.scss">
</style>
