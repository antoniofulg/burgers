<template>
    <span>
        <master-navbar>
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
                    <router-link tag="a" exact :to="{name: 'master.drinks'}" class="dropdown-item">Bebidas</router-link>
                </div>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Usuario
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <router-link tag="a" exact :to="{name: 'profile'}" class="dropdown-item">Meu perfil</router-link>
                <div class="dropdown-divider"></div>
                    <a @click="sair" class="dropdown-item" href="#">Sair</a>
                </div>
            </li>
        </master-navbar>

        <slot/>
        
        <master-footer/>
    </span>
</template>

<script>
import MasterFooter from '../components/layouts/Footer'
import MasterNavbar from '../components/layouts/Navbar'

export default {
    components: {
        MasterFooter,
        MasterNavbar,
    },

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