
const userRoutes = [
    {
        path:'/user-dashboard',
        name:'user-dashboard',
        component:()=>import('@/views/userPage/userHomePage.vue'),        
    }
]

export default userRoutes;