import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import router from './router'
import backend from './backend'

Vue.use(BootstrapVue)
Vue.prototype.$backend = backend;

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
