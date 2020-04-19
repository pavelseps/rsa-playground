import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Messaging from "@/views/Messaging.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: '/messaging',
        name: 'Messaging',
        component: Messaging,
        meta: { encrypt: false, decrypt: false }
    },
    {
        path: '/encrypt/:m/:i',
        name: 'EncryptMessaging',
        component: Messaging,
        meta: { encrypt: true, decrypt: false }
    },
    {
        path: '/decrypt/:m/:y',
        name: 'DecryptMessaging',
        component: Messaging,
        meta: { encrypt: false, decrypt: true }
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
