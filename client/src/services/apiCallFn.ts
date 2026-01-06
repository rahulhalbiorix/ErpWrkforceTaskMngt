import instance from "@/api/instance";

/* =========================
   AUTHENTICATION APIs
   ========================= */

/**
 * Login API
 */

export const loginApi = async (payload: { email: string, password: string }) => {
   const response = await instance.post('/api/auth/login', payload);

   return response.data;
}

/* =========================
   ORGANIZATION APIs
   ========================= */

/**
 * Get all organizations
 */


export const getOrganizationsApi = async () => {
   const response = await instance.get('/api/orgs');

   return response.data;
}


/**
 * Get organization by ID
 */



/**
 * Create organization
 */

export const createOrganizationApi = async (payload: { name: string, domain: string, logo_url: string, status: string }) => {
   const response = await instance.post('/api/orgs/create', payload);

   return response.data;
}


/**
 * Update organization
 */

export const updateOrganizationApi = async ({
   orgId,
   payload
}: {
   orgId: string,
   payload: { name?: string, domain?: string, logo_url?: string, status?: string }
}) => {
   const response = await instance.put(`/api/orgs/update/${orgId}`, payload);

   return response.data;
}


/**
 *  activate Inactivate organization
 */


export const toggleOrganizationStatusApi = async ({
   orgId,
   status
}: {
   orgId: string, status: string
}) => {
   const response = await instance.patch(`/api/orgs/status/${orgId}`, { status });

   return response.data;
}


/* =========================
   USERS APIs
   ========================= */

/**
* Get all users list
*/

export const getUsersApi = async () => {
  const  response = await instance.get('/api/users/')
   return response.data;
}

/**
*  user creation API
*/

export const createUserApi = async (payload: { name: string, email: string, password_hash: string, role_id: string, organization_id: string, status: string }) => {
   const response = await instance.post('/api/users/register', payload);
   return response.data;
}


/**
*  user updation API
*/

export const updateUserApi = async ({
   userId,
   payload
}: {
   userId: string,
   payload: { name?: string, email?: string, password?: string, role?: string, orgId?: string, status?: string }
}) => {
   const response = await instance.put(`/api/users/update/${userId}`, payload);
   return response.data;
}

/**
*  user status toggle API
*/

export const toggleUserStatusApi = async ({
   userId
}: {
   userId: string, status: string
}) => {
   const response = await instance.patch(`/api/users/toggle-status/${userId}`);
   return response.data;
}