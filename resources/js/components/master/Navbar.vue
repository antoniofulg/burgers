<template>
  <nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">Burguers</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link tag="a" exact :to="{name: 'master.dashboard'}" class="nav-link">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" exact :to="{name: 'master.orders'}" class="nav-link">Pedidos</router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" exact :to="{name: 'master.users'}" class="nav-link">Usuários</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Alimentos
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link tag="a" exact :to="{name: 'master.ingredients'}" class="dropdown-item">Ingredientes</router-link>
              <router-link tag="a" exact :to="{name: 'master.burguers'}" class="dropdown-item">Hambúrguers</router-link>
              <router-link tag="a" exact :to="{name: 'master.foods'}" class="dropdown-item">Acompanhamentos</router-link>
              <router-link tag="a" exact :to="{name: 'master.ingredients'}" class="dropdown-item">Bebidas</router-link>
              <a class="dropdown-item" href="#">Ingredientes</a>
              <a class="dropdown-item" href="#">Hambúrguers</a>
              <a class="dropdown-item" href="#">Acompanhamentos</a>
              <a class="dropdown-item" href="#">Bebidas</a>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Usuario
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Perfil</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Sair</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
    mounted() {

    },
}
</script>