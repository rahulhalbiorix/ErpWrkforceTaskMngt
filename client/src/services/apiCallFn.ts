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
