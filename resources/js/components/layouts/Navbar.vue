<template>
  <nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark">
    <div class="container">
      <router-link :to="{name: 'master.dashboard'}" tag="a" class="navbar-brand"><i class="fas fa-hamburger fa-lg"></i> Burguers</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <slot/>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="fas fa-user-circle"></i> {{user.name}}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link tag="a" exact :to="{name: 'profile'}" class="dropdown-item">Meu perfil</router-link>
            <div class="dropdown-divider"></div>
                <button @click="logout" class="dropdown-item" href="">Sair</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Toast from "../../mixins/toasts"

export default {
  computed: {
    endpoint () {
      return `/api/logout`
    },
  },
  
  methods: {
    logout() {
      axios.post(`${this.endpoint}`, {}, {"headers":
        {"authorization":`Bearer ${this.$store.getters.getToken}`}
      }).then(response => {
        console.log(response)
          if (response.data.concluded) {
            this.$store.commit('setUser', null)
            sessionStorage.clear()
            this.$router.push({name: 'login'})
          } else {
            this.$store.commit('setUser', null)
            sessionStorage.clear()
            this.$router.push({
              name: 'login',
              params: {
                toast: {
                  type: 'warning',
                  title: 'Ação não concluída!',
                  message: response.data.message
                }
              }
            })
          }
      }).catch(e => {
        this.$store.commit('setUser', null)
        sessionStorage.clear()
        this.$router.push({
          name: 'login',
          params: {
            toast: {
              type: 'warning',
              title: 'Ação não concluída!',
              message: 'Sessão não encontrada!'
            }
          }
        })
      })
    },
  },

  mixins: [Toast],

  props: ['user'],
}
</script>