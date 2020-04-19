import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from "vuetify";
// @ts-ignore don't have types..
import VueMathjax from 'vue-mathjax'

Vue.config.productionTip = false;

Vue.use(VueMathjax);
Vue.use(Vuetify);
const vuetify = new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#0680a9',
            },
        },
    },
});


new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app');



if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('service worker registered'))
        .catch(err => console.log('service worker not registered', err));
}
