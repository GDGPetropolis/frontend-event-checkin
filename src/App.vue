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
  created() {
    axios_client.get("api/event")
            .then(response => {
              this.people = response.data
            })
            .catch(e => {
              self.errors = e
            })
  }
}
</script>

<style>

</style>
