import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { getUserByEmail } from "../../requests/userRequests";

export const useIsUserLoggedIn = () => {

    const { 
        isLoading: isAuthLoading,
        isAuthenticated,
        user,
        logout
    } = useAuth0();

    const {data, isLoading} = useQuery({
        queryKey: ["getUserByEmail", user?.email],
        queryFn: () => getUserByEmail(user?.email!),
        enabled: Boolean(isAuthenticated),
        onSuccess: ({status}:any) => {
            if(status == "404"){
                logout({logoutParams: {returnTo: import.meta.env.VITE_URL}});
            }
        }
    });

    return {
        isLoading: isLoading || isAuthLoading,
        isAuthenticated,
        authEmail: user?.email,
        user: data
    }
}