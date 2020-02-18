import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import MasterDashboard from '../pages/master/Dashboard'
import MasterIngredients from '../pages/master/Ingredients'
import MasterOrders from '../pages/master/Orders'
import MasterUsers from '../pages/master/Users'
import MasterBurguers from '../pages/master/Burguers'

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
        path: '/perfil',
        component: MasterDashboard,
        name: 'profile'
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
        component: MasterOrders,
        name: 'master.orders',
        // meta: {
        //     requiresAuth: true
        // }
    },
    {
        path: '/usuarios',
        component: MasterUsers,
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
        component: MasterBurguers,
        name: 'master.burguers',
        // meta: {
        //     requiresAuth: true
        // }
    },
    {
        path: '/alimentos/ingredientes',
        component: MasterIngredients,
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