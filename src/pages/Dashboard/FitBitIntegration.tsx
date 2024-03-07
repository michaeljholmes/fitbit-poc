import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { rem } from "polished";
import { useOutletContext } from "react-router-dom";
import { useAsync } from "react-use";
import { OutletContext } from "../../routing/Template";
import { useConnectToFitbit } from "../../api/hooks/fitbit/useConnectToFitbit";
import { useDisconnectFromFitbit } from "../../api/hooks/fitbit/useDisconnectFromFitbit";
import { getFitbitDetails } from "../../api/requests/fitbitRequests";
import { LoadingContainer } from "../../components/LoadingContainer";

interface FitBitIntegrationProps {
    code?: string;
    state?: string;
}

export const FitBitIntegration = ({code, state}: FitBitIntegrationProps) => {

    const { user } = useOutletContext<OutletContext>();
    const { isFitbitIntegrated} = user;
    // const [searchParams, setSearchParams] = useSearchParams();
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
      if(!user.userId) return;
      if (!state) return;
      if (!code) return;
      try {
        await connectToFitbit.mutateAsync({userId: user.userId, code, state});
      } catch (e) {
        // Probably use toast notifications for errors
        return undefined;
      }
    }, [code, state, user]);

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

    if(loading){
        return <LoadingContainer/>;
    }
  
    return (
        <Stack>
            <Typography variant="h3">
                Fitbit Integration
            </Typography>
            <Typography>
                If you already own a fitbit, simply click the 'integrate' button below
            </Typography>
                {authLink && <Button
                    onClick={() => {
                        window.location.href = authLink;
                    }}
                    >
                    Integrate
                </Button>}
            <Typography variant="h3">
                New to Fitbit?
            </Typography>
            <Typography>
                Simple create an account (you must have a gmail account), set up your mobile phone as the tracker, then come back and integrate above.
            </Typography>
        </Stack>
    );
}