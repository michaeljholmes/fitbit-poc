import { UseQueryResult, useQuery } from "react-query";
import { User } from "../../api.types";
import { getUserByEmail } from "../../requests/userRequests";
import { useRecoilState } from "recoil";
import { loggedInState } from "../../../state/loggedIn";

export const useUser = (): UseQueryResult<User> => {

    const [loggedIn] = useRecoilState(loggedInState); 
    const {isLoggedIn, userEmail} = loggedIn;

    return useQuery({
      queryKey: ["getUserByEmail", userEmail],
      queryFn: () => getUserByEmail(userEmail!),
      enabled: Boolean(isLoggedIn)
    });
}