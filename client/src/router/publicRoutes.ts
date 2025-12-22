
const publicRoutes = [
    {
    path: '/',
    redirect:'/login'
    },
    {
    path:'/login',
    name:'login',
    component:()=>import('@/views/publicPage/Login.vue'),
    }
]

export default publicRoutes;