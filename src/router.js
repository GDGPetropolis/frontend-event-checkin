import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import EventGet from './pages/EventGet.vue'
import EventPut from './pages/EventPut.vue'
import PersonGet from './pages/PersonGet.vue'

const routes = [
    { path: '/', component: EventGet },
    { path: '/event-put/:id', component: EventPut },
    { path: '/person-get', component: PersonGet }
];

export default new VueRouter({
    routes,
    mode: 'history'
})