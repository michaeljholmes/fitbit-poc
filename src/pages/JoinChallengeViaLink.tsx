import { Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useChallenge } from "../api/hooks/useChallenge";

export const JoinChallengeViaLink = () => {

    const [searchParams] = useSearchParams();

    const challengeId = searchParams.get('challengeId');
    const { data, isLoading } = useChallenge(challengeId ?? undefined);

    if(isLoading){
        return <Typography>Loading...</Typography>
    }
    
    if(!data){
        return <Typography>No challenge found!</Typography>
    }

    return (
        <>
            <Typography variant="h2">
                Welcome to Stridewars!
            </Typography>
            <Typography variant="body1">
                You been invited to join '{data.name}' challenge by '{data.creator}'. Sign up below.
            </Typography>  
            TODO ADD FORM         
        </>
    );
}