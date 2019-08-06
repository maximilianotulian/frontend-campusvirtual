<template>
    <div id="app" class="app">
        <router-view></router-view>
    </div>
</template>

<script lang="js">

export default {
    name: 'App'
};

</script>

<style lang="sass">
    @import "./styles/reset.scss";

    html, body, {
        height: 100%;
        background: #f5f5fa;
    }

    .app {
        height: 100%;
    }
</style>
