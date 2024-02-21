import { Button, Typography } from "@mui/material";
import { Navigate, useSearchParams } from "react-router-dom";
import { useChallenge } from "../api/hooks/useChallenge";
import { useAuth0 } from "@auth0/auth0-react";

export const JoinChallengeViaLink = () => {

    const [searchParams] = useSearchParams();

    const challengeId = searchParams.get('challengeId');
    const { data, isLoading } = useChallenge(challengeId ?? undefined);

    const { isLoading: isAuth0Loading, isAuthenticated, loginWithRedirect } = useAuth0();

    if(isLoading || isAuth0Loading){
        return <Typography>Loading...</Typography>
    }
    
    if(!data){
        return <Typography>No challenge found!</Typography>
    }

    if (isAuthenticated){
        return <Navigate to={"/dashboard"}/>
    }

    return (
        <>
            <Typography variant="h2">
                Welcome to Stridewars!
            </Typography>
            <Typography variant="body1">
                You been invited to join '{data.name}' challenge by '{data.creator}'. Sign up below.
            </Typography>  
            <Button 
                variant="outlined" 
                onClick={() => loginWithRedirect({authorizationParams: { screen_hint: "signup"}})}
            >Sign up!</Button>       
        </>
    );
}