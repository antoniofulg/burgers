/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import App from './App'
import store from './vuex'
import router from './router'
import Vuelidate from 'vuelidate'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Install Vuelidate
Vue.use(Vuelidate)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

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
        roles.isGuest ? router.push({name: 'login'}) : null
        return
    }
    if (to.matched.some(r => r.meta.admin) && !roles.isAdmin) {
        console.log('getACL: ' + store.getters.getACL)
        console.log('Esta página é restrita a administradores')
        roles.isGuest ? router.push({name: 'login'}) : null
        return
    }
    next()
})

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {App}
});
