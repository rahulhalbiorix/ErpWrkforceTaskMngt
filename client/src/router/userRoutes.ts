
const userRoutes = [
    {
        path:'/user-dashboard',
        name:'user-dashboard',
        component:()=>import('@/views/userPage/userHomePage.vue'),     
        meta: { requiresAuth: true , role: 'User' }   
    }
]

export default userRoutes;