
const adminRoutes = [
    {
        path:'/admin-dashboard',
        name:'admin-dashboard',
        component:()=>import('@/views/adminPage/adminDashboard.vue'),    
    }
]

export default adminRoutes;