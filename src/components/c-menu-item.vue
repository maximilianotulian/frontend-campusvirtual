<template lang="html">
    <div class="menu-item">
        {{ children }}
    </div>
</template>

<script>
export default {
    name: 'CMenuItem',

    props: {
        icon: {
            type: String,
            required: false
        },
        helperText: {
            type: String,
            required: false
        },
        iconPosition: {
            type: String,
            default: 'left'
        },
        children: {
            type: String,
            required: true
        }
    }

}
</script>

<style lang="sass" src="./c-menu-item.scss"></style>
