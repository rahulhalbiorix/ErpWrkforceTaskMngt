import { useMutation } from "@tanstack/vue-query";
import { loginApi } from "@/services/apiCallFn";


export const useLoginMutation = () => {
   return useMutation({
    mutationFn:loginApi
   })
}
