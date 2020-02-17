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
    // Middleware example
    // {
    //     path: '/my-posts',
    //     component: MyPostsPage,
    //     name: 'my-posts',

    // },
]

export default routes