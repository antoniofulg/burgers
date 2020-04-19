import DashboardLayout from '../../layout/DashboardLayout'
import AuthLayout from '../../layout/AuthLayout'

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
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "demo" */ '../../views/Dashboard.vue'),
      },
      {
        path: '/users',
        name: 'users',
        component: () => import(/* webpackChunkName: "demo" */ '../../views/Users.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "demo" */ '../../views/UserProfile.vue')
      },
      {
        path: '/orders',
        name: 'orders',
        component: () => import(/* webpackChunkName: "demo" */ '../../views/Maps.vue')
      },
      {
        path: '/tables',
        name: 'tables',
        component: () => import(/* webpackChunkName: "demo" */ '../../views/Tables.vue')
      }
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
  }
]
