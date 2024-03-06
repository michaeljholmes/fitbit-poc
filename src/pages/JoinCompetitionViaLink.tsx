import { Button, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useCompetition } from "../api/hooks/useCompetition";
import { useAuth0 } from "@auth0/auth0-react";
import { rem } from "polished";
import { Copyright } from "../components/Copyright";

export const JoinCompetitionViaLink = () => {

    const { loginWithRedirect } = useAuth0();
    
    const [searchParams] = useSearchParams();

    const competitionId = searchParams.get('competitionId');
    const { data: competition, isLoading: isCompetitionLoading } = useCompetition(competitionId ?? undefined);

    if(isCompetitionLoading){
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
                    onClick={() => loginWithRedirect({authorizationParams: {
                        screen_hint: "signup"
                    }, appState: {
                        isNewUser: true,
                        competitionId
                    }})}
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