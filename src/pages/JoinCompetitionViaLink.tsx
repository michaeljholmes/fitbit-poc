import { Button, Stack, Typography } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCompetition } from "../api/hooks/useCompetition";
import { useAuth0 } from "@auth0/auth0-react";
import { useAsync } from "react-use";
import { useCreateUser } from "../api/hooks/users/useCreateUser";
import { useIsUserLoggedIn } from "../api/hooks/users/useIsUserLoggedIn";
import { useEffect } from "react";
import { rem } from "polished";
import { Copyright } from "../components/Copyright";

export const JoinCompetitionViaLink = () => {

    const {isAuthenticated, user, isLoading, authEmail} = useIsUserLoggedIn();
    const { loginWithRedirect } = useAuth0();
    const navigate = useNavigate();
    const {mutateAsync} = useCreateUser();

    useEffect(() => {console.log("mutateAsync")} ,[mutateAsync]);

    //If authenticated, do they have a user? If not, create one. 
    useAsync(async () => {
        console.log("useAsync");
        if(isAuthenticated && !isLoading){
            if(user) {
                navigate("/dashboard");
            } else if(authEmail) {
                // Create user and join to team
                await mutateAsync(authEmail);
            }
        }
    }, [isAuthenticated, navigate, authEmail, mutateAsync]);

    const [searchParams] = useSearchParams();

    const competitionId = searchParams.get('competitionId');
    const { data: competition, isLoading: isCompetitionLoading } = useCompetition(competitionId ?? undefined);

    if(isLoading || isCompetitionLoading){
        return <Typography>Loading...</Typography>
    }
    
    if(!competition){
        return <Typography>No competition found!</Typography>
    }

    return (
        <Stack justifyContent={"space-between"} sx={{backgroundColor: "#f2f2f2", height: "100vh"}}>
            <Stack alignItems={"center"} sx={{px: 4}}>
                <Typography variant="h2" sx={{mt: 4}}>
                    Welcome to Stridewars!
                </Typography>
                <Typography variant="body1" sx={{mt: 4}}>
                    You been invited to join '{competition.competitionName}' competition by '{competition?.owner?.username}'. Click the 'Sign up' button below to get started.
                </Typography>  
                <Button 
                    sx={{width: rem(150), mt: 4}}
                    variant="outlined" 
                    onClick={() => loginWithRedirect({authorizationParams: { screen_hint: "signup"}})}
                >Sign up!</Button> 
                </Stack>
            <Copyright
                sx={{
                    alignSelf: "end",
                    width: "100%",
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: (theme) => theme.palette.common.white,
                    height: rem(100),
                    lineHeight: rem(100),
                }}
                websiteLink="https://www.stridewars/com"
                websiteName="Stride Wars"
            />      
        </Stack>
    );
}