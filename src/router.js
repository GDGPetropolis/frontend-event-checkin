import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import EventGet from './pages/EventGet.vue'
import EventPut from './pages/EventPut.vue'

const routes = [
    { path: '/', component: EventGet },
    { path: '/event-put/:id', component: EventPut }
];

export default new VueRouter({
    routes,
    mode: 'history'
})