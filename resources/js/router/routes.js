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
        name: 'index',
        meta: {
            guest: true
        }
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
        meta: {
            guest: true
        }
    },
    {
        path: '/register',
        component: Register,
        name: 'register',
        meta: {
            guest: true
        }
    },
    {
        path: '/perfil',
        component: MasterDashboard,
        name: 'profile',
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/dashboard',
        component: MasterDashboard,
        name: 'master.dashboard',
        meta: {
            admin: true
        }
    },
    {
        path: '/pedidos',
        component: MasterOrders,
        name: 'master.orders',
        meta: {
            admin: true
        }
    },
    {
        path: '/usuarios',
        component: MasterUsers,
        name: 'master.users',
        meta: {
            admin: true
        }
    },
    {
        path: '/alimentos',
        component: MasterDashboard,
        name: 'master.foods',
        meta: {
            admin: true
        }
    },
    {
        path: '/alimentos/bebidas',
        component: MasterDashboard,
        name: 'master.drinks',
        meta: {
            admin: true
        }
    },
    {
        path: '/alimentos/hamburguers',
        component: MasterBurguers,
        name: 'master.burguers',
        meta: {
            admin: true
        }
    },
    {
        path: '/alimentos/ingredientes',
        component: MasterIngredients,
        name: 'master.ingredients',
        meta: {
            admin: true
        }
    },
    {
        path: '*',
        component: MasterDashboard
    }
]

export default routes