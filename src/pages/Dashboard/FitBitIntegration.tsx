import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { rem } from "polished";
import { useLocation, useOutletContext, useSearchParams } from "react-router-dom";
import { useAsync } from "react-use";
import { OutletContext } from "../../routing/Template";
import { useConnectToFitbit } from "../../api/hooks/fitbit/useConnectToFitbit";
import { useDisconnectFromFitbit } from "../../api/hooks/fitbit/useDisconnectFromFitbit";
import { useFititDetails } from "../../api/hooks/fitbit/useFitbitDetails";
import { useMemo } from "react";
import { getFitbitAuthURL } from "../../api/requests/endpoints";
import { getFitbitDetails } from "../../api/requests/fitbitRequests";

const redirectUrl = encodeURIComponent(`${import.meta.env.VITE_URL}/dashboard/tracker`);

export const FitBitIntegration = () => {

    const { user } = useOutletContext<OutletContext>();
    const { isFitbitIntegrated} = user;
    const [searchParams, setSearchParams] = useSearchParams();
    const connectToFitbit = useConnectToFitbit();
    const disconnectFromFitbit = useDisconnectFromFitbit();

    const {loading, value: authLink} = useAsync(async () => {
        const result = await getFitbitDetails(user.userId);
        if(result.url){
            return result.url;
        }
    }, [user]);

    //Validate user server side, trigger refetching user
    useAsync(async () => {
      if(loading) return;
      if(!user.userId) return;
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      if (!state) return;
      if (!code) return;
      try {
        searchParams.delete('code');
        searchParams.delete('state');
        setSearchParams(searchParams);
        await connectToFitbit.mutateAsync({userId: user.userId, code, state});
      } catch (e) {
        // Probably use toast notifications for errors
        return undefined;
      }
    }, [searchParams, loading, authLink]);

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