import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import MasterDashboard from '../pages/master/Dashboard'

const routes = [
    {
        path: '/',
        component: Login,
        name: 'index'
    },
    {
        path: '/login',
        component: Login,
        name: 'login'
    },
    {
        path: '/register',
        component: Register,
        name: 'register'
    },
    {
        path: '/dashboard',
        component: MasterDashboard,
        name: 'master.dashboard',
        // meta: {
        //     requiresAuth: true
        // }
    },
    {
        path: '/pedidos',
        component: MasterDashboard,
        name: 'master.orders',
        // meta: {
        //     requiresAuth: true
        // }
    },
    {
        path: '/usuarios',
        component: MasterDashboard,
        name: 'master.users',
        // meta: {
        //     requiresAuth: true
        // }
    },
    {
        path: '/alimentos',
        component: MasterDashboard,
        name: 'master.foods',
        // meta: {
        //     requiresAuth: true
        // }
    },
    {
        path: '/alimentos/bebidas',
        component: MasterDashboard,
        name: 'master.drinks',
        // meta: {
        //     requiresAuth: true
        // }
    },
    {
        path: '/alimentos/hamburguers',
        component: MasterDashboard,
        name: 'master.burguers',
        // meta: {
        //     requiresAuth: true
        // }
    },
    {
        path: '/alimentos/ingredientes',
        component: MasterDashboard,
        name: 'master.ingredients',
        // meta: {
        //     requiresAuth: true
        // }
    },
    {
        path: '*',
        component: MasterDashboard
    }
]

export default routes