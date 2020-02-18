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


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// Permissões de usuário
const roles = {
    isMaster: store.getters.getACL == 'master' ? true : false,
    isAdmin: store.getters.getACL == 'admin' || store.getters.getACL == 'master' ? true : false,
    isAttendant: store.getters.getACL == 'admin' || store.getters.getACL == 'master' || store.getters.getACL == 'attendant' ? true : false,
}

// Middleware access
router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.guest) && store.getters.getUser) {
        console.log('Você já está logado!')
        router.push({name: 'profile'})
        return
    }
    if (to.matched.some(r => r.meta.requiresAuth) && !store.getters.getUser) {
        console.log('Você precisa estar autenticado para acessar esta página!')
        router.push({name: 'login'})
        return
    }
    if (to.matched.some(r => r.meta.master) && store.getters.getACL != 'master'){
        console.log(store.getters.getACL)
        console.log(roles)
        console.log('Esta página é restrita ao usuário master')
        return
    }
    if (to.matched.some(r => r.meta.admin) && !roles.isAdmin) {
        console.log(store.getters.getACL)
        console.log('Esta página é restrita a administradores')
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
