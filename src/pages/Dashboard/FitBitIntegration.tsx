import { Button, Stack, Typography } from "@mui/material";
import { rem } from "polished";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { useAsync } from "react-use";
import { OutletContext } from "../../routing/Template";
import { useDisconnectFromFitbit } from "../../api/hooks/fitbit/useDisconnectFromFitbit";
import { getFitbitDetails } from "../../api/requests/fitbitRequests";
import { LoadingContainer } from "../../components/LoadingContainer";
import { useConnectToFitbit } from "../../api/hooks/fitbit/useConnectToFitbit";

export const FitBitIntegration = () => {

    const { user } = useOutletContext<OutletContext>();
    const { isFitbitIntegrated} = user;
    const [searchParams, setSearchParams] = useSearchParams();
    const connectToFitbit = useConnectToFitbit();

    const disconnectFromFitbit = useDisconnectFromFitbit();

    const {loading: isLoadingFitbitAuthLink, value: authLink} = useAsync(async () => {
        // const result = await getFitbitDetails(user.userId);
        // if(result.url){
            // console.log("url", result.url)
            return "https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=23RRWJ&scope=activity&code_challenge=E56uzBdHaQdP-5iMIO7XEk-iYCT0_ALzWeHV8OSpe4I&code_challenge_method=S256&state=FdIlo2NQjuF5oKtnxy6yJKJ7FFOQKGeR09aAoSYagHM&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fhandle-fitbit";
        // }
    }, [user]);

    // Revoke token server side, trigger refetching user
    const revokeUser = async () => {
        try {
            await disconnectFromFitbit.mutateAsync(user.userId);
        } catch (e){
            console.log(e);
        }
    }

    useAsync(async () => {
        if (user) {
            const code = searchParams.get("fitbitCode");
            const state = searchParams.get("fitbitState");
            console.log(code, state);
            if (!state) return;
            if (!code) return;
            try {
                searchParams.delete('fitbitCode');
                searchParams.delete('fitbitState');
                setSearchParams(searchParams);
                await connectToFitbit.mutateAsync({userId: user.userId, code, state});
            } catch (e) {
                // Probably use toast notifications for errors
                // return undefined;
            }
        }
    }, [searchParams, user]);
    
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