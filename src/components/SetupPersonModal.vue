<template>
    <b-modal ref="modalPerson" size="lg" hide-footer title="Setup de Participante">
        <b-row>
            <b-col md="5">
                <b-input id="inlineFormInputName" placeholder="Informe o Nome..." v-model="name"/>
            </b-col>
            <b-col md="5">
                <b-input id="inlineFormInputGroupUsername2" placeholder="Informe o Email..." v-model="email"/>
            </b-col>
            <b-col md="2">
                <b-button variant="primary" v-on:click="doModalPersonSetup">Fazer Setup</b-button>
            </b-col>
        </b-row>
    </b-modal>
</template>

<script>
    import axios_client from "./../axios_client";

    export default {
        props: ["id"],
        data () {
            return {
                name: null,
                email: null
            }
        },
        methods: {
            async doModalPersonSetup(){
                var person = {
                    id: this.id,
                    name: this.name,
                    email: this.email
                };

                await axios_client.put("/api/person", person);
                this.$emit('personSetupDone', this.id);
                this.$refs.modalPerson.hide();
            }
        },
        watch: {
            id: function () {
                if (this.id != null){
                    this.name = "";
                    this.email = "";
                    this.$refs.modalPerson.show();
                }
            }
        }
    }
</script>

<style scoped>

</style>