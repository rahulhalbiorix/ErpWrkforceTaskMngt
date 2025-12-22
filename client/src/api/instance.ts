import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

const instance = axios.create({
    baseURL:'http://localhost:3000',
     headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use((config)=>{
   const authStore = useAuthStore();
     
   if(authStore.userToken){
    config.headers.Authorization = `Bearer ${authStore.userToken}`
   }
   
   return config
},(error)=>{
  return Promise.reject(error);
}
)

export default instance;