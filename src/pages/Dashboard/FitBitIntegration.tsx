import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { rem } from "polished";
import { useLocation, useOutletContext, useSearchParams } from "react-router-dom";
import { useAsync } from "react-use";
import { OutletContext } from "../../routing/Template";
import { useConnectToFitbit } from "../../api/hooks/fitbit/useConnectToFitbit";
import { useDisconnectFromFitbit } from "../../api/hooks/fitbit/useDisconnectFromFitbit";
import { useFititDetails } from "../../api/hooks/fitbit/useFitbitDetails";
import { useMemo } from "react";

const redirectUrl = encodeURIComponent(`${import.meta.env.VITE_URL}/dashboard/tracker`);

export const FitBitIntegration = () => {

    const { user } = useOutletContext<OutletContext>();
    const { isFitbitIntegrated} = user;
    const [searchParams, setSearchParams] = useSearchParams();
    const connectToFitbit = useConnectToFitbit();
    const disconnectFromFitbit = useDisconnectFromFitbit();
    const {data: fitbitDetails} = useFititDetails();

    const authLink = useMemo(() => {
        if (fitbitDetails) {
            const {clientId, codeChallenge, generatedState} = fitbitDetails;
            return `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${clientId}&scope=activity&
                code_challenge=${codeChallenge}&code_challenge_method=S256&state=${generatedState}&redirect_uri=${redirectUrl}`;
        }
    }, [fitbitDetails])

    //Validate user server side, trigger refetching user
    useAsync(async () => {
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      if (!fitbitDetails) return;
      const {generatedState} = fitbitDetails;
      if (state !== generatedState) {
        return;
      }
      if (!code) return;
      try {
        searchParams.delete('code');
        searchParams.delete('state');
        setSearchParams(searchParams);
        await connectToFitbit.mutateAsync({code, state});
      } catch (e) {
        // Probably use toast notifications for errors
        return undefined;
      }
    }, [searchParams, fitbitDetails]);

    // Revoke token server side, trigger refetching user
    const revokeUser = async () => {
        try {
            await disconnectFromFitbit.mutateAsync();
        } catch (e){
            console.log(e);
        }
    }
    
    if(isFitbitIntegrated) {
        return(
            <>
                <Typography>
                    You're all setup.
                </Typography>
                <Typography>
                    If for any reason you need to disconnect, or switch Fitbit accounts, disconnect your fitbit account from Stridewars by selecting 'Disconnect' below.
                </Typography>
                <Button sx={{width: rem(150)}} variant="outlined" onClick={revokeUser}>Disconnect</Button>
            </>
        );
    }

    return (
        <Stack>
            <Typography variant="h3">
                Fitbit Integration
            </Typography>
            <Typography>
                If you already own a fitbit, simply click the 'integrate' button below
            </Typography>
            {authLink ?
                <Button
                    onClick={() => {
                        window.location.href = authLink;
                    }}
                    >
                    Integrate
                </Button> :
                <CircularProgress/>
            }
            <Typography variant="h3">
                New to Fitbit?
            </Typography>
            <Typography>
                Simple create an account (you must have a gmail account), set up your mobile phone as the tracker, then come back and integrate above.
            </Typography>
        </Stack>
    );
}