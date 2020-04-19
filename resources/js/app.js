require('./bootstrap');
require('./fontawesome');

import Vue from 'vue'
import App from './App.vue'
import store from './vuex'
import router from './vueconfigs/router'
import Vuelidate from 'vuelidate'
import { BootstrapVue } from 'bootstrap-vue'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'

// Install Vuelidate
Vue.use(Vuelidate)
// Install BootstrapVue
Vue.use(BootstrapVue)

Vue.config.productionTip = false

Vue.use(ArgonDashboard)

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')