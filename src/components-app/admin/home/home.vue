<template lang="html">
    <Page class="admin-home-wrapper" title="Inicio" :fullWidth="true" showTitle>
        <div style="margin: 0 auto;">
            <h1 style="font-weigth: bold; font-size: 25px;">
                Bienvenido al admin del Campus Virtual.
            </h1>
            <p style="margin-top: 20px;">
                <span style="display: block; margin-top: 5px;">En esta sección podrá realizar ABM de las entidades disponibles.</span>
                <span style="display: block; margin-top: 5px;">Para comenzar, seleccione alguna de las entidades del menu lateral.</span>
                <span style="display: block; margin-top: 5px;">Esperamos que disfrute su estadia en el Campus Virtual.</span>
            </p>
        </div>
    </Page>
</template>

<script>
import Page from 'components-app/layout/page';

export default {
    name: 'Home',

    components: { Page }
}
</script>

<style lang="sass" src="./home.scss"></style>