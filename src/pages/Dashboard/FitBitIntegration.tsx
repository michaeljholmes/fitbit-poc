import { Button, Stack, Typography } from "@mui/material";
import { rem } from "polished";
import { useOutletContext } from "react-router-dom";
import { useAsync } from "react-use";
import { OutletContext } from "../../routing/Template";
import { useDisconnectFromFitbit } from "../../api/hooks/fitbit/useDisconnectFromFitbit";
import { getFitbitDetails } from "../../api/requests/fitbitRequests";
import { LoadingContainer } from "../../components/LoadingContainer";

export const FitBitIntegration = () => {

    const { user } = useOutletContext<OutletContext>();
    const { isFitbitIntegrated} = user;

    const disconnectFromFitbit = useDisconnectFromFitbit();

    const {loading: isLoadingFitbitAuthLink, value: authLink} = useAsync(async () => {
        const result = await getFitbitDetails(user.userId);
        if(result.url){
            return result.url;
        }
    }, [user]);

    // Revoke token server side, trigger refetching user
    const revokeUser = async () => {
        try {
            await disconnectFromFitbit.mutateAsync(user.userId);
        } catch (e){
            console.log(e);
        }
    }
    
    if(isFitbitIntegrated) {
        return(
            <Stack sx={{m: 4}}>
                <Typography variant={"h3"}>
                    You're all setup.
                </Typography>
                <Typography sx={{mt: 1}}>
                    If for any reason you need to disconnect, or switch Fitbit accounts, disconnect your fitbit account from Stridewars by selecting 'Disconnect' below.
                </Typography>
                <Button sx={{width: rem(150), my: 2}} variant="outlined" onClick={revokeUser}>Disconnect</Button>
            </Stack>
        );
    }

    if(isLoadingFitbitAuthLink){
        return <LoadingContainer/>;
    }
  
    return (
        <Stack sx={{m: 4}}>
            <Typography variant="h3">
                Fitbit Integration
            </Typography>
            <Typography  sx={{mt: 1}}>
                If you already own a fitbit, simply click the 'integrate' button below
            </Typography>
                {authLink && 
                    <Button
                        variant={"outlined"}
                        sx={{width: rem(150), my: 2}}
                        onClick={() => {
                            window.location.href = authLink;
                        }}
                        >
                        Integrate
                    </Button>
                }
            <Typography variant="h3">
                New to Fitbit?
            </Typography>
            <Typography sx={{mt: 1}}>
                Simple create an account (you must have a gmail account), set up your mobile phone as the tracker, then come back and integrate above.
            </Typography>
        </Stack>
    );
}