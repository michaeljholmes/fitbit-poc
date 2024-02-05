import { UseQueryResult, useQuery } from "react-query";
import { User } from "../api.types";
import { getUserById } from "../requests/userRequests";

export const useUser = (): UseQueryResult<User> => {

    // TBD
    const isLoggedIn = true; 
    const currentUserId = "user5";

    return useQuery({
      queryKey: ["getUserById", isLoggedIn],
      queryFn: () => getUserById(currentUserId),
      enabled: Boolean(isLoggedIn)
    });
}