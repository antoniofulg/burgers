import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: true,
    state,
    getters,
    mutations
})

// Middleware example
// router.beforeEach((to, from, next) => {
//     if (to.matched.some(r => r.meta.requiresAuth) && !window.Auth.signedIn) {
//         window.location = window.Urls.login
//         return
//     }
//     next()
// })

export default store