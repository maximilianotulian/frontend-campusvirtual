<template>
    <ul class="sidebar">
        <li v-for="option in menuOptions" class="sidebar--item">
            <i class="material-icons">
                home
            </i>
            <span>{{ option.description }}</span>
        </li>
    </ul>
</template>

<script>

export default {
    name: 'SideBar',

    data () {
        return {
            //TODO: Add navigation functionality for each menu option.
            menuOptions: [
                {description: 'Perfil'},
                {description: 'Noticias'},
                {description: 'Materias'},
                {description: 'Calendario'},
                {description: 'Institución'}
            ]
        }
    }
};
</script>

<style lang="sass" src="./sidebar.scss"></style>
