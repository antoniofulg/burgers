import DashboardLayout from '../../layout/DashboardLayout'
import AuthLayout from '../../layout/AuthLayout'
import CustomerLayout from '../../layout/CustomerLayout'

export default [
  {
    path: '/',
    redirect: 'dashboard',
    component: DashboardLayout,
    meta: {
      admin: true
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../../views/Dashboard.vue'),
      },
      {
        path: '/usuarios',
        name: 'users',
        component: () => import('../../views/Admin/Users.vue')
      },
      {
        path: '/perfil',
        name: 'profile',
        component: () => import('../../views/UserProfile.vue')
      },
      {
        path: '/pedidos',
        name: 'orders',
        component: () => import('../../views/Maps.vue')
      },
      {
        path: '/tables',
        name: 'tables',
        component: () => import('../../views/Tables.vue')
      },
      /** Menu */
      {
        path: '/bebidas',
        name: 'drinks',
        component: () => import('../../views/Admin/Drinks.vue')
      },
      {
        path: '/categorias-de-lanches',
        name: 'categories',
        component: () => import('../../views/Admin/Categories.vue')
      },
      {
        path: '/lanches',
        name: 'snacks',
        component: () => import('../../views/Admin/Snacks.vue')
      },
      {
        path: '/ingredientes',
        name: 'ingredients',
        component: () => import('../../views/Admin/Ingredients.vue')
      },
      {
        path: '/hamburguers',
        name: 'burgers',
        component: () => import('../../views/Admin/Burgers.vue')
      },
    ]
  },
  {
    path: '/',
    redirect: 'login',
    component: AuthLayout,
    meta: {
      guest: true
    },
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "demo" */ '../../views/Auth/Login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "demo" */ '../../views/Auth/Register.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: 'menu',
    component: CustomerLayout,
    children: [
      {
        path: '/cardapio',
        name: 'menu',
        component: () => import('../../views/Customer/Menu.vue')
      },
      {
        path: '/menu2',
        name: 'menu2',
        component: () => import('../../views/Customer/Menu.vue')
      }
    ]
  }
]
