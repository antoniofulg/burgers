import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Unauthorized from '../pages/auth/Unauthorized'
import AdminBurguers from '../pages/admin/Burguers'
import AdminDashboard from '../pages/admin/Dashboard'
import AdminDrinks from '../pages/admin/Drinks'
import AdminIngredients from '../pages/admin/Ingredients'
import AdminAddIngredient from '../pages/admin/AddIngredient'
import AdminUpdateIngredient from '../pages/admin/UpdateIngredient'
import AdminOrders from '../pages/admin/Orders'
import AdminSideDishes from '../pages/admin/SideDishes'
import AdminUsers from '../pages/admin/Users'

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
        component: AdminDashboard,
        name: 'profile',
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/dashboard',
        component: AdminDashboard,
        name: 'admin.dashboard',
        props: true,
        meta: {
            admin: true
        }
    },
    {
        path: '/pedidos',
        component: AdminOrders,
        name: 'admin.orders',
        meta: {
            admin: true
        }
    },
    {
        path: '/usuarios',
        component: AdminUsers,
        name: 'admin.users',
        meta: {
            admin: true
        }
    },
    {
        path: '/alimentos',
        component: AdminSideDishes,
        name: 'admin.foods',
        meta: {
            admin: true
        }
    },
    {
        path: '/bebidas',
        component: AdminDrinks,
        name: 'admin.drinks',
        meta: {
            admin: true
        }
    },
    {
        path: '/hamburguers',
        component: AdminBurguers,
        name: 'admin.burguers',
        meta: {
            admin: true
        }
    },
    {
        path: '/ingredientes',
        component: AdminIngredients,
        name: 'admin.ingredients',
        props: true,
        meta: {
            admin: true
        }
    },
    {
        path: '/ingredientes/add',
        component: AdminAddIngredient,
        name: 'admin.ingredients.add',
        meta: {
            admin: true
        }
    },
    {
        path: '/ingredientes/update/:id',
        component: AdminUpdateIngredient,
        name: 'admin.ingredients.update',
        props: true,
        meta: {
            admin: true
        }
    },
    {
        path: '/unauthorized',
        component: Unauthorized,
        name: 'unauthorized'
    }
]

export default routes