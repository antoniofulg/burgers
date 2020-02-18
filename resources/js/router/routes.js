import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import MasterBurguers from '../pages/master/Burguers'
import MasterDashboard from '../pages/master/Dashboard'
import MasterDrinks from '../pages/master/Drinks'
import MasterIngredients from '../pages/master/Ingredients'
import MasterOrders from '../pages/master/Orders'
import MasterSideDishes from '../pages/master/SideDishes'
import MasterUsers from '../pages/master/Users'

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
        component: MasterSideDishes,
        name: 'master.foods',
        meta: {
            admin: true
        }
    },
    {
        path: '/alimentos/bebidas',
        component: MasterDrinks,
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