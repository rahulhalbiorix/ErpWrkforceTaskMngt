import { useMutation } from "@tanstack/vue-query";
import { toggleOrganizationStatusApi } from "@/services/apiCallFn";

export  const useOrgToggleStatus = () => {
   return useMutation(
    {
    mutationFn:toggleOrganizationStatusApi
   });
};