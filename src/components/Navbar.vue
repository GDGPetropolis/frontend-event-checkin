<template>
    <b-navbar toggleable="md" type="dark" variant="info">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav>
                <b-navbar-nav>
                    <b-nav-item><router-link to="/">Eventos</router-link></b-nav-item>
                </b-navbar-nav>
            </b-navbar-nav>

        </b-collapse>

    </b-navbar>

</template>

<script>
    export default {
        data () {
            return {

            }
        }
    }
</script>

<style>
</style>