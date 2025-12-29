import { useMutation } from "@tanstack/vue-query";
import { createOrganizationApi } from "@/services/apiCallFn";

export const useOrgCreation = () => {
   return useMutation({
    mutationFn:createOrganizationApi
   })
}