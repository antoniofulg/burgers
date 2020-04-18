require('./bootstrap');
require('./fontawesome');

import Vue from 'vue'
import App from './App.vue'
import store from './vuex'
import router from './router'
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
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')