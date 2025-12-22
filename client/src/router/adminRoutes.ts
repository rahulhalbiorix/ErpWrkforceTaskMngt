
const adminRoutes = [
    {
        path:'/admin-dashboard',
        name:'admin-dashboard',
        component:()=>import('@/views/adminPage/adminDashboard.vue'),    
        meta: { requiresAuth: true , role: 'Admin' }
    }
]

export default adminRoutes;