<template>
    <b-container>
        <div v-if="loaded">
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
                            <MeetupButton v-bind:id="row.item.Id"/>
                            <SetupPersonButton v-bind:id="row.item.Id" v-on:showSetupModalById="showSetupModalById($event)"/>
                        </template>

                    </b-table>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="6" class="my-1">
                    <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
                </b-col>
            </b-row>

            <b-row>
                <SetupPersonModal v-on:personSetupDone="refreshContent" ref='SetupPersonModal'/>
            </b-row>
        </div>
        <div v-else>
            <Loading/>
        </div>
    </b-container>
</template>

<script>
    import Loading from "./../components/Loading.vue";
    import SetupPersonButton from "./../components/SetupPersonButton.vue";
    import axios_client from "./../axios_client";
    import MeetupButton from "./../components/MeetupButton.vue";
    import SetupPersonModal from "./../components/SetupPersonModal.vue"

    export default {
        components: {
            Loading,
            MeetupButton,
            SetupPersonButton,
            SetupPersonModal
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
                filter: null
            }
        },
        async mounted () {
            await this.refreshContent();
            this.loaded = true;
        },
        beforeUpdate() {
            this.totalRows = this.items.length;
            this.fields = this.getFieldsOfItems(this.items);
        },
        methods: {
            async refreshContent() {
                this.items = await this.getPersons();
                this.fields = this.getFieldsOfItems(this.items);
            },
            mapEvent(item){
                var new_item = {
                    "Id": item.id,
                    "Nick": item.nick,
                    "Nome": item.name,
                    "Email": item.email
                };

                return new_item;
            },
            async getPersons(){
                var response = await axios_client.get("api/person");
                return response.data.map(this.mapEvent);
            },
            onFiltered (filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length;
                this.currentPage = 1
            },
            getFieldsOfItems(list) {
                var options = [];
                var obj = list[0];

                for(var k in obj){
                    var testValue = {
                        key: k,
                        sortable: true
                    }

                    options.push(testValue);
                }

                var action = { key: 'actions', label: 'Ações' };
                options.push(action);

                return options;
            },
            showSetupModalById(id){
                this.$refs.SetupPersonModal.showModal(id);
            }
        }
    }
</script>

<style>

</style>
