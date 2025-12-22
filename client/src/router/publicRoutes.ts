
const publicRoutes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/publicPage/Login.vue'),
    },
    {
        path: '/unauthorized',
        name: 'unauthorized',
        component: () => import('@/views/publicPage/unAuthorize.vue'),
        meta:{ requiresAuth: false }
    }
]

export default publicRoutes;