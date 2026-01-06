import { useMutation } from "@tanstack/vue-query";
import { createUserApi } from "@/services/apiCallFn";

export const useUserCreation = () => {
   return useMutation({
    mutationFn:createUserApi
   })
}