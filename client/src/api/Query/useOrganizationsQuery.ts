import { useQuery } from "@tanstack/vue-query";
import { getOrganizationsApi } from "@/services/apiCallFn";

export const useOrganizationsQuery = () => {
   return useQuery({
      queryKey:['organizations'],
      queryFn:getOrganizationsApi
   })
}