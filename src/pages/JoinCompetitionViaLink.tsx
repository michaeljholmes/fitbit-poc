import { Button, Typography } from "@mui/material";
import { Navigate, useSearchParams } from "react-router-dom";
import { useCompetition } from "../api/hooks/useCompetition";
import { useAuth0 } from "@auth0/auth0-react";

export const JoinCompetitionViaLink = () => {

    const [searchParams] = useSearchParams();

    const competitionId = searchParams.get('competitionId');
    const { data, isLoading } = useCompetition(competitionId ?? undefined);

    const { isLoading: isAuth0Loading, isAuthenticated, loginWithRedirect } = useAuth0();

    if(isLoading || isAuth0Loading){
        return <Typography>Loading...</Typography>
    }
    
    if(!data){
        return <Typography>No competition found!</Typography>
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
                You been invited to join '{data.name}' competition by '{data.owner.username}'. Sign up below.
            </Typography>  
            <Button 
                variant="outlined" 
                onClick={() => loginWithRedirect({authorizationParams: { screen_hint: "signup"}})}
            >Sign up!</Button>       
        </>
    );
}