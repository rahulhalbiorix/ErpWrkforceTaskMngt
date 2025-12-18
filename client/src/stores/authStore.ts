import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('useAuthStore', () => {

    const userToken = ref('')
    const isUserLogin = ref(false)
    const userRole = ref('')
    const userId = ref('')
    const userName = ref('')
    const userEmail = ref('')
     
   function setUserToken(payload:string) {
     userToken.value = payload 
   }
  
  function  setIsUserLogin(payload:boolean) {
    isUserLogin.value = payload
  }
 
  function  setUserRole(payload:string) {
    userRole.value = payload
  }

function setUserId(payload:string){
    userId.value = payload
}

function setUserName(payload:string){
  userName.value = payload
}

function setUserEmail(payload:string){
  userEmail.value = payload
}

    

    return { userToken,
         isUserLogin,
          userRole,
          userId,
          userName,
          userEmail,
          setUserToken,
          setIsUserLogin,
          setUserRole,
          setUserId,
          setUserName,
          setUserEmail
        }

},
 
)
