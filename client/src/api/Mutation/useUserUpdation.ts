import { useMutation } from "@tanstack/vue-query";
import { updateUserApi } from "@/services/apiCallFn";

export const useUserUpdate = () => {
   return useMutation({
    mutationFn:updateUserApi
   })
}