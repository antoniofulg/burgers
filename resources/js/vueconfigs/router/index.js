import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  mode: 'history',
  routes
})
