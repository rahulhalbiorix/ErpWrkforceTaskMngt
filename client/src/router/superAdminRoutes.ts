
const SuperAdminRoutes = [
    {
        path:'/super-admin-dashboard',
        name:'super-admin-dashboard',
        component:()=>import('@/views/superAdminPage/superAdminDashBoard.vue'),
        meta: { requiresAuth: true , role: 'Super-Admin' }
    }
]

export default SuperAdminRoutes;

