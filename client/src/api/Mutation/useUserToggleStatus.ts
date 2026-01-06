import { useMutation } from "@tanstack/vue-query";
import { toggleUserStatusApi } from "@/services/apiCallFn";

export const useUserToggleStatus = () => {
   return useMutation(
    {
    mutationFn:toggleUserStatusApi
   });
};