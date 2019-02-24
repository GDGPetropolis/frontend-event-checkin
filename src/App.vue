<template>
  <div class="">
    <div v-if="loaded">
      <h1 class="text-centered">Lista de Participantes do Evento</h1>
      <ul v-for="event in events" :key="event.id" class="list-unstyled">
        <div class="background-meetup padding-lg style-events">
          <div class="container">
            <li>
              {{event.id}} {{event.group_name}}
            </li>
            <li>
              Nome:
              {{event.name}}
            </li>
            <li>
              Data/hora:
              {{event.local_date}}
              {{event.local_time}}
            </li>
            <li>
              Link do Evento: <a v-bind:href="event.link">clique aqui</a>
            </li>
          </div>
        </div>
        <div class="container">
          <h3>Dados do Participante:</h3>
          <ul v-for="person in event.persons" :key="person.id" class="list-unstyled">
            <li v-if="person.photo === null">
              <img src="https://security.ufpb.br/intrum/contents/categorias/cordofones/gualambo/sem-imagem-1.jpg/@@images/image.jpeg" class="photo-participant"/>
            <li v-else>
              <img v-bind:src="person.photo" class="photo-participant"/>
            </li>
            <li>
              {{person.id}}
            </li>
            <li>
              {{person.name}}
            </li>
            <li>
              {{person.email}}
            </li>
            <li>
              {{person.events}}
            </li>
          </ul>
        </div>
      </ul>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
import axios_client from "./axios_client";

export default {
  data () {
    return {
      loaded: false,
      events: [],
      errors: null
    }
  },
  created() {
    axios_client.get("api/event")
            .then(response => {
              this.events = response.data
              this.loaded = true
            })
            .catch(e => {
              this.errors = e
            })
  }
}
</script>

<style>
.background-meetup{
  background: #F64060;
}
.padding-lg{
  padding: 1.2rem;
}
.style-events{
  color: #ffffff;
}
  .photo-participant{
    border-style: none;
    border-radius: 15rem;
    vertical-align: unset;
    height: 120px;
    width: 110px;
  }
</style>
