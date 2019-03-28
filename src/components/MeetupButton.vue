<template>
    <b-btn class="btn-info btn-sm" v-on:click="openMeetup">Meetup</b-btn>
</template>

<script>
    export default {
        props: ['id'],
        methods: {
            openMeetup(){
                window.open("https://www.meetup.com/pt-BR/members/" + this.id, '_blank');
            }
        }
    }
</script>

<style scoped>

</style>