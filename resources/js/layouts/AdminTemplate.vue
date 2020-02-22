<template>
    <span>
        <admin-navbar :user="user">
            <li class="nav-item">
                <router-link tag="a" exact :to="{name: 'admin.dashboard'}" class="nav-link"><i class="fas fa-chart-pie"></i> Dashboard</router-link>
            </li>
            <li class="nav-item">
                <router-link tag="a" exact :to="{name: 'admin.orders'}" class="nav-link"><i class="fas fa-shopping-cart"></i> Pedidos</router-link>
            </li>
            <li class="nav-item">
                <router-link tag="a" exact :to="{name: 'admin.users'}" class="nav-link"><i class="fas fa-user-friends"></i> Usuários</router-link>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-utensils"></i> Alimentos
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <router-link tag="a" exact :to="{name: 'admin.drinks'}" class="dropdown-item">Bebidas</router-link>
                    <router-link tag="a" exact :to="{name: 'admin.burguers'}" class="dropdown-item">Hambúrguers</router-link>
                    <router-link tag="a" exact :to="{name: 'admin.ingredients'}" class="dropdown-item">Ingredientes</router-link>
                    <router-link tag="a" exact :to="{name: 'admin.snacks'}" class="dropdown-item">Lanches</router-link>
                </div>
            </li>
        </admin-navbar>

        <main role="main">
            <slot/>
        </main>
        
        <admin-footer/>
    </span>
</template>

<script>
import AdminFooter from '../components/layouts/Footer'
import AdminNavbar from '../components/layouts/Navbar'

export default {
    components: {
        AdminFooter,
        AdminNavbar,
    },

    data () {
      return {
        user: this.$store.getters.getUser
      }
    },
}
</script>