import instance from "@/api/instance";

/* =========================
   AUTHENTICATION APIs
   ========================= */

/**
 * Login API
 */

export const loginApi = async(payload:{email:string,password:string}) => {
   const response = await instance.post('/api/auth/login' , payload);
   
   return response.data;
}

/* =========================
   ORGANIZATION APIs
   ========================= */

/**
 * Get all organizations
 */


export const getOrganizationsApi = async() => {
   const response =  await instance.get('/api/orgs'); 

   return response.data;
}


/**
 * Get organization by ID
 */



/**
 * Create organization
 */

export const createOrganizationApi = async(payload:{name:string,domain:string , logo_url:string ,status:string }) => {
   const response = await instance.post('/api/orgs/create', payload);

   return response.data;
}


/**
 * Update organization
 */

export const updateOrganizationApi = async({
  orgId,
  payload
}:{
  orgId:string,
  payload:{name?:string,domain?:string , logo_url?:string ,status?:string }
}) => {
   const response = await instance.put(`/api/orgs/update/${orgId}` , payload); 

   return response.data;
}


/**
 *  activate Inactivate organization
 */


export const toggleOrganizationStatusApi = async({
  orgId,
  status
}:{
  orgId:string , status:string
} ) => {
   const response = await instance.patch(`/api/orgs/status/${orgId}` , {status});

   return response.data;
}