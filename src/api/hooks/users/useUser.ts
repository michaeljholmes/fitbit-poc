import { UseQueryResult, useQuery } from "react-query";
import { User } from "../../api.types";
import { getUserByEmail } from "../../requests/userRequests";

export const useUser = (userEmail?: string): UseQueryResult<User> => {

    // TBD
    const isLoggedIn = true; 

    return useQuery({
      queryKey: ["getUserByEmail", isLoggedIn],
      queryFn: () => getUserByEmail(userEmail!),
      enabled: Boolean(userEmail)
    });
}