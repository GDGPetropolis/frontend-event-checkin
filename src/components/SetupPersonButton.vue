<template>
    <b-btn variant="primary" class="btn-sm" v-on:click="showModal">Setup</b-btn>
</template>

<script>
    export default {
        props: ['id'],
        methods: {
            showModal(){
                this.$emit('showSetupModalById', this.id);
            }
        }
    }
</script>

<style scoped>

</style>