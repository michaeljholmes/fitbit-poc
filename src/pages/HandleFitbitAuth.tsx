import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useAsync } from "react-use";
import { useConnectToFitbit } from "../api/hooks/fitbit/useConnectToFitbit";
import { LoadingContainer } from "../components/LoadingContainer"
import { useIsUserLoggedIn } from "../api/hooks/users/useIsUserLoggedIn";

export const HandleFitbitAuth = () => {

    const {isAuthenticated, isLoading: isAuth0Loading, user} = useIsUserLoggedIn();
    const [searchParams, setSearchParams] = useSearchParams();
    const connectToFitbit = useConnectToFitbit();
    const navigate = useNavigate();
    
    useAsync(async () => {
        if (!isAuth0Loading && isAuthenticated) {
            const code = searchParams.get("code");
            const state = searchParams.get("state");
            if (!state) return;
            if (!code) return;
            try {
                searchParams.delete('code');
                searchParams.delete('state');
                setSearchParams(searchParams);
                await connectToFitbit.mutateAsync({userId: user.userId, code, state});
                navigate("/dashboard/tracker")
            } catch (e) {
                navigate("/")
                // Probably use toast notifications for errors
                // return undefined;
            }
        }
    }, [searchParams, isAuthenticated, user, isAuthenticated]);

    if(!isAuthenticated && isAuth0Loading){
        return <Navigate to="/" />;
    }

    return <LoadingContainer />;
}