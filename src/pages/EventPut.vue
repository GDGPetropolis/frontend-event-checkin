<template>
    <b-container>
        <div v-if="loaded">
            <b-row>
                <b-col style="padding: 20px 20px 20px 20px;" md="6" class="my-1">
                    <h4> {{event_name}} ({{event_checkin}}/{{event_total}}) </h4>
                    <b-btn class="btn-warning btn-sm" v-on:click="syncWithMeetup">Sincronizar com Meetup</b-btn>
                    <b-btn class="btn-warning btn-sm" v-on:click="sendCertifications" disabled>Enviar Certificados</b-btn>
                </b-col>
            </b-row>


            <b-row>
                <b-col md="6" class="my-1">
                    <b-form-group horizontal label="Filtro" class="mb-0">
                        <b-input-group>
                            <b-form-input v-model="filter" placeholder="Type to Search" />
                            <b-input-group-append>
                                <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-col>

                <b-col md="6" class="my-1">
                    <b-form-group horizontal label="Por página" class="mb-0">
                        <b-form-select :options="pageOptions" v-model="perPage" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col cols="12">
                    <b-table show-empty
                             :items="items"
                             :fields="fields"
                             :current-page="currentPage"
                             :per-page="perPage"
                             :filter="filter"
                             @filtered="onFiltered">

                        <template slot="actions" slot-scope="row">
                            <b-btn v-if="!row.item.checkin" class="btn-success btn-sm" v-on:click="checkin(row.item.id, true)">Check-in</b-btn>
                            <b-btn v-else class="btn-danger btn-sm" v-on:click="checkin(row.item.id, false)">Check-out</b-btn>

                            <b-btn class="btn-info btn-sm" v-on:click="openMeetup(row.item.id)">Meetup</b-btn>

                            <b-btn v-if="row.item.email == null || row.item.nome == null" variant="primary" class="btn-sm" v-on:click="showModal(row.item.id)">Setup</b-btn>
                        </template>

                    </b-table>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="6" class="my-1">
                    <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
                </b-col>
            </b-row>
        </div>
        <div v-else>
            <Loading/>
        </div>


        <b-modal ref="myModalRef" size="lg" hide-footer title="Setup de Participante">
            <b-row>
                <b-col md="5">
                    <b-input id="inlineFormInputName" placeholder="Informe o Nome..." v-model="modal_person.name"/>
                </b-col>
                <b-col md="5">
                    <b-input id="inlineFormInputGroupUsername2" placeholder="Informe o Email..." v-model="modal_person.email"/>
                </b-col>
                <b-col md="2">
                    <b-button variant="primary" v-on:click="doModalPersonSetup">Fazer Setup</b-button>
                </b-col>
            </b-row>
        </b-modal>
    </b-container>
</template>

<script>
    import Loading from "./../components/Loading.vue"
    import axios_client from "./../axios_client";

    export default {
        components: {
            Loading
        },
        data () {
            return {
                loaded: false,
                items: null,
                fields: null,
                currentPage: 1,
                perPage: 25,
                totalRows: 0,
                pageOptions: [ 5, 10, 15, 20, 25 ],
                filter: null,
                event_id: null,
                event_name: null,
                event_total: null,
                event_checkin: null,
                modal_person: {
                    id: null,
                    name: null,
                    email: null
                }
            }
        },
        async mounted () {
            await this.refreshContent();
        },
        beforeUpdate() {
            this.totalRows = this.items.length;
            this.fields = this.mapItems();
        },
        methods: {
            async refreshContent(){
                var event = await this.get_event();
                var persons = event.persons;
                var participations = await this.get_participations();

                persons.forEach(function (x) {
                    var participation = participations.filter(function (y) {
                        return x.id === y.person_id
                    });

                    x.checkin = participation[0].checkin;
                });

                this.items = persons.map(this.mapPerson);
                this.fields = this.mapItems();
                this.event_id = event.id;
                this.event_name = event.name;
                this.event_checkin = participations.filter(function (x) {return x.checkin }).length;
                this.event_total = participations.length;
                this.loaded = true;
            },
            mapPerson(item){
                var new_item = {
                    "id": item.id,
                    "nick": item.nick,
                    "nome": item.name,
                    "email": item.email,
                    "checkin": item.checkin
                };

                if(new_item.checkin)
                    new_item._rowVariant = "success";

                return new_item;
            },
            onFiltered (filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length
                this.currentPage = 1
            },
            async get_event() {
                var response = await axios_client.get("api/event?id=" + this.$route.params.id);
                return response.data;
            },
            async get_participations() {
                var response = await axios_client.get("api/participation?event_id=" + this.$route.params.id);
                return response.data;
            },
            mapItems() {
                var options = [];

                options.push({ key: 'id', sortable: true });
                options.push({ key: 'nick', sortable: true });
                options.push({ key: 'nome', sortable: true });
                options.push({ key: 'email', sortable: true });
                options.push({ key: 'actions', label: 'Ações' });

                return options;
            },
            async syncWithMeetup(){
                this.loaded = false;
                await axios_client.post("/api/event/sync?id=" + this.$route.params.id);
                await this.refreshContent();
            },
            async checkin(person_id, status){
                this.loaded = false;

                var participation = {
                    person_id: person_id,
                    event_id: this.event_id,
                    checkin: status
                };

                console.log(participation);

                await axios_client.post("/api/participation", participation);

                await this.refreshContent()
            },
            openMeetup(id){
                window.open("https://www.meetup.com/pt-BR/members/" + id, '_blank');
            },
            sendCertifications() {

            },
            showModal(id){
                this.modal_person.id = id;
                this.modal_person.name = "";
                this.modal_person.email = "";
                this.$refs.myModalRef.show()
            },
            async doModalPersonSetup(){
                await axios_client.put("/api/person", this.modal_person);
                await this.refreshContent();
                this.$refs.myModalRef.hide();
            }
        }
    }
</script>

<style>
</style>
