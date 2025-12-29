
const SuperAdminRoutes = [
    {
        path:'/superAdmin',
        name:'superAdmin',
        redirect: { name: 'superAdminDashboard' },
        meta: { requiresAuth: true , role: 'Super-Admin' },
         children:[
            {
               path:'dashboard',
               name:'superAdminDashboard',
               component:()=>import('@/views/superAdminPage/superAdminDashBoard.vue'), 
            },
            {
              path: 'organizations',
              name: 'superAdminOrganizations',
              component: () => import('@/views/superAdminPage/organizationPage.vue'),
            },
            { 
                path:'users',
                name:'superAdminUsers',
                component:()=>import('@/views/superAdminPage/allUser.vue'),
            },
            {
                path:'projects',
                name:'superAdminProjects',
                component:()=>import('@/views/superAdminPage/project.vue'),
            },
            {
                path:'tasks',
                name:'superAdminTasks',
                component:()=>import('@/views/superAdminPage/Task.vue'),
            }
        ]
    }
]

export default SuperAdminRoutes;

