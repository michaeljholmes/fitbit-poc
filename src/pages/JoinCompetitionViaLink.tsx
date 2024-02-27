import { Button, Typography } from "@mui/material";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useCompetition } from "../api/hooks/useCompetition";
import { useAuth0 } from "@auth0/auth0-react";
import { useAsync } from "react-use";
import { useUser } from "../api/hooks/users/useUser";
import { useCreateUser } from "../api/hooks/users/useCreateUser";

export const JoinCompetitionViaLink = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const competitionId = searchParams.get('competitionId');
    const { data: competition, isLoading: isCompetitionLoading } = useCompetition(competitionId ?? undefined);

    const { isLoading: isAuth0Loading, isAuthenticated, loginWithRedirect, user } = useAuth0();

    const { data: foundUser, isLoading: isUserLoading } = useUser(user?.email ?? undefined);

    const isLoading = isCompetitionLoading || isAuth0Loading || isUserLoading;

    const createUser = useCreateUser();

    useAsync(async () => {
        if (isLoading) {
            return;
        }
        if (foundUser){
            navigate("/dashboard");
        }
        if(isAuthenticated && user && competition){
            // Create user
            if(user.email){
                await createUser.mutateAsync(user.email);
                // Then direct to dashboard
                navigate("/dashboard");
            }
        }
    }, [isAuthenticated, user, competition, foundUser, isLoading, createUser])

    if(isLoading){
        return <Typography>Loading...</Typography>
    }
    
    if(!competition){
        return <Typography>No competition found!</Typography>
    }

    return (
        <>
            <Typography variant="h2">
                Welcome to Stridewars!
            </Typography>
            <Typography variant="body1">
                You been invited to join '{competition.name}' competition by '{competition?.owner?.username}'. Sign up below.
            </Typography>  
            <Button 
                variant="outlined" 
                onClick={() => loginWithRedirect({authorizationParams: { screen_hint: "signup"}})}
            >Sign up!</Button>       
        </>
    );
}