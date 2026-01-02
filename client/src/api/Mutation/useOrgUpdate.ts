import { useMutation } from "@tanstack/vue-query";
import { updateOrganizationApi } from "@/services/apiCallFn";


export const useOrgUpdate = () => {
   return useMutation({
    mutationFn:updateOrganizationApi
   })
};

