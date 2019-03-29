<template>
    <b-modal ref="modalPerson" size="lg" hide-footer title="Setup de Participante">
        <b-row v-if="loaded">
            <b-col md="5">
                <b-input id="inlineFormInputName" placeholder="Informe o Nome..." v-model="person.name"/>
            </b-col>
            <b-col md="5">
                <b-input id="inlineFormInputGroupUsername2" placeholder="Informe o Email..." v-model="person.email"/>
            </b-col>
            <b-col md="2">
                <b-button variant="primary" v-on:click="doModalPersonSetup">Fazer Setup</b-button>
            </b-col>
        </b-row>
        <b-row v-else>
            <Loading/>
        </b-row>
    </b-modal>
</template>

<script>
    import axios_client from "./../axios_client";
    import Loading from "./../components/Loading.vue"

    export default {
        components: {
            Loading
        },
        data () {
            return {
                loaded: false,
                person: {
                    id: null,
                    name: null,
                    email: null
                }
            }
        },
        methods: {
            async doModalPersonSetup(){
                await axios_client.put("/api/person", this.person);
                this.$emit('personSetupDone', this.id);

                this.$refs.modalPerson.hide();
            },
            async showModal(id) {
                this.loaded = false;

                this.$refs.modalPerson.show();
                var response = await axios_client.get("/api/person?id=" + id);

                this.person.id = id;
                this.person.name = response.data.name;
                this.person.email = response.data.email;

                this.loaded = true;
            }
        }
    }
</script>

<style scoped>

</style>