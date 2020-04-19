/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
require('./fontawesome');

window.Vue = require('vue');

import App from './App'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './vuex'
import router from './router'
import Spinner from './components/Spinner'
import Vuelidate from 'vuelidate'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Install Vuelidate
Vue.use(Vuelidate)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Loading indicator
Vue.component('spinner', Spinner);
// Vue.component('font-awesome-icon', FontAwesomeIcon)

// Middleware access
router.beforeEach((to, from, next) => {
    const roles = {
        isGuest: store.getters.getUser ? false : true,
        isMaster: store.getters.getACL == 'master' ? true : false,
        isAdmin: store.getters.getACL == 'admin' || store.getters.getACL == 'master' ? true : false,
        isAttendant: store.getters.getACL == 'admin' || store.getters.getACL == 'master' || store.getters.getACL == 'attendant' ? true : false,
    }

    if (to.matched.some(r => r.meta.guest) && !roles.isGuest) {
        console.log('Você já está logado!')
        router.push({name: 'profile'})
        return
    }
    if (to.matched.some(r => r.meta.requiresAuth) && roles.isGuest) {
        console.log('Você precisa estar autenticado para acessar esta página!')
        router.push({name: 'login'})
        return
    }
    if (to.matched.some(r => r.meta.master) && !roles.isMaster){
        console.log('getACL: ' + store.getters.getACL)
        console.log('Esta página é restrita ao usuário master')
        roles.isGuest ? router.push({name: 'login'}) : router.push({name: 'unauthorized'})
        return
    }
    if (to.matched.some(r => r.meta.admin) && !roles.isAdmin) {
        console.log('getACL: ' + store.getters.getACL)
        console.log('Esta página é restrita a administradores')
        roles.isGuest ? router.push({name: 'login'}) : router.push({name: 'unauthorized'})
        return
    }
    next()
})

const app = new Vue({
    el: '#app',

    data: {
        loading: false,
        interceptor: null
    },

    created () {
        this.enableInterceptor();
    },

    methods: {
        enableInterceptor () {
            axios.interceptors.request.use((config) => {
                this.loading = true;
                return config;
            }, (error) => {
                this.loading = false;
                return Promise.reject(error);
            });
            
            axios.interceptors.response.use((response) => {
                this.loading = false;
                return response;
            }, (error) => {
                this.loading = false;
                return Promise.reject(error);
            });
        },

        disableInterceptor () {
            axios.interceptors.request.eject(this.interceptor);
        }
    },

    router,
    store,
    components: {App}
});
