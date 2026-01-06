import { useQuery } from "@tanstack/vue-query";
import { getUsersApi } from "@/services/apiCallFn";

export function useUserListQuery() {
   return useQuery({
      queryKey: ['user-list'],
      queryFn: getUsersApi
   })
}