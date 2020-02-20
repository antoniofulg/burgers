import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import MasterBurguers from '../pages/master/Burguers'
import MasterDashboard from '../pages/master/Dashboard'
import MasterDrinks from '../pages/master/Drinks'
import MasterIngredients from '../pages/master/Ingredients'
import MasterAddIngredient from '../pages/master/AddIngredient'
import MasterUpdateIngredient from '../pages/master/UpdateIngredient'
import MasterOrders from '../pages/master/Orders'
import MasterSideDishes from '../pages/master/SideDishes'
import MasterUsers from '../pages/master/Users'

const routes = [
    {
        path: '/',
        component: Login,
        name: 'index',
        props: true,
        meta: {
            guest: true
        }
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
        props: true,
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
        path: '/bebidas',
        component: MasterDrinks,
        name: 'master.drinks',
        meta: {
            admin: true
        }
    },
    {
        path: '/hamburguers',
        component: MasterBurguers,
        name: 'master.burguers',
        meta: {
            admin: true
        }
    },
    {
        path: '/ingredientes',
        component: MasterIngredients,
        name: 'master.ingredients',
        props: true,
        meta: {
            admin: true
        }
    },
    {
        path: '/ingredientes/add',
        component: MasterAddIngredient,
        name: 'master.ingredients.add',
        meta: {
            admin: true
        }
    },
    {
        path: '/ingredientes/update/:id',
        component: MasterUpdateIngredient,
        name: 'master.ingredients.update',
        props: true,
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