<template>
  <div id="app">
    {{people}}
    {{errors}}
  </div>
</template>

<script>
import axios_client from "./axios_client";

export default {
  data () {
    return {
      people: [],
      errors: null
    }
  },
  beforeMount() {
    axios_client.get("https://api.meetup.com/GDGPetropolis/events?photo-host=public&page=1&key=...")
            .then(response => {
              self.people = response.data
            })
            .catch(e => {
              self.errors = e
            })
  }
}
</script>

<style>

</style>
