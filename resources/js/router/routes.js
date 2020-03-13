import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Unauthorized from '../pages/auth/Unauthorized'
import Profile from '../pages/admin/Profile'
import Burguers from '../pages/admin/Burguers'
import Dashboard from '../pages/admin/Dashboard'
//Categories
import Categories from '../pages/admin/Categories'
import CategoryAdd from '../pages/admin/CategoryAdd'
import CategoryUpdate from '../pages/admin/CategoryUpdate'
//Drinks
import Drinks from '../pages/admin/Drinks'
//Ingredients
import Ingredients from '../pages/admin/Ingredients'
//Orders
import Orders from '../pages/admin/Orders'
//Snacks
import Snacks from '../pages/admin/Snacks'
import SnackAdd from '../pages/admin/SnackAdd'
import SnackUpdate from '../pages/admin/SnackUpdate'
import Users from '../pages/admin/Users'

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
        component: Profile,
        name: 'profile',
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/dashboard',
        component: Dashboard,
        name: 'admin.dashboard',
        props: true,
        meta: {
            admin: true
        }
    },
    {
        path: '/pedidos',
        component: Orders,
        name: 'admin.orders',
        meta: {
            admin: true
        }
    },
    {
        path: '/usuarios',
        component: Users,
        name: 'admin.users',
        meta: {
            admin: true
        }
    },
    {
        path: '/categorias',
        component: Categories,
        name: 'admin.categories',
        props: true,
        meta: {
            admin: true
        }
    },
    {
        path: '/categorias/nova',
        component: CategoryAdd,
        name: 'admin.categories.add',
        meta: {
            admin: true
        }
    },
    {
        path: '/categorias/atualizar/:id',
        component: CategoryUpdate,
        name: 'admin.categories.update',
        props: true,
        meta: {
            admin: true
        }
    },
    {
        path: '/bebidas',
        component: Drinks,
        name: 'admin.drinks',
        props: true,
        meta: {
            admin: true
        }
    },
    {
        path: '/hamburguers',
        component: Burguers,
        name: 'admin.burguers',
        meta: {
            admin: true
        }
    },
    {
        path: '/ingredientes',
        component: Ingredients,
        name: 'admin.ingredients',
        props: true,
        meta: {
            admin: true
        }
    },
    {
        path: '/lanches',
        component: Snacks,
        name: 'admin.snacks',
        props: true,
        meta: {
            admin: true
        }
    },
    {
        path: '/lanches/novo',
        component: SnackAdd,
        name: 'admin.snacks.add',
        props: true,
        meta: {
            admin: true
        }
    },
    {
        path: '/lanches/atualizar/:id',
        component: SnackUpdate,
        name: 'admin.snacks.update',
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