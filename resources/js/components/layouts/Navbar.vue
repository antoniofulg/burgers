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
            <a class="nav-link dropdown-toggle btn btn-secondary" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="fas fa-user-circle"></i> {{user.name}}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link tag="a" exact :to="{name: 'profile'}" class="dropdown-item">Meu perfil</router-link>
            <div class="dropdown-divider"></div>
                <a @click="sair" class="dropdown-item" href="#">Sair</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: ['user'],

  methods: {
    sair() {
      this.$store.commit('setUser', null)
      sessionStorage.clear()
      this.usuario = false
      this.$router.push({name: 'login'})
    }
  }
}
</script>