import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { getUserByEmail } from "../../requests/userRequests";
import { useRecoilState } from "recoil";
import { useAsync } from "react-use";
import { loggedInState } from "../../../state/loggedIn";
import { useEffect } from "react";

export const useIsUserLoggedIn = () => {

    const [loggedIn, setLoggedIn] = useRecoilState(loggedInState); 
    const { 
        isLoading: isAuthLoading,
        isAuthenticated,
        user
    } = useAuth0();

    useEffect(() => {
        if(isAuthenticated && user && user.email){
            setLoggedIn({isLoggedIn: true, userEmail: user.email});
        }
    }, [isAuthenticated, user]);    

    const {data, isLoading} = useQuery({
        queryKey: ["getUserByEmail", user?.email],
        queryFn: () => getUserByEmail("08dc33e7-a98c-4688-848d-ca94fb195066"),
        enabled: Boolean(isAuthenticated)
    });

    return {
        isLoading: isLoading || isAuthLoading,
        isAuthenticated,
        authEmail: user?.email,
        user: data
    }
}