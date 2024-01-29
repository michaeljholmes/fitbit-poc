import { Button, Stack, Typography } from "@mui/material";
import { rem } from "polished";
import { useState } from "react";
import { newUserNoFitbit, newUserWithFitbit } from "./DashboardPage";
import { User } from "../../api/api.types";
import { useSearchParams } from "react-router-dom";
import { useAsync } from "react-use";

const clientId = "23RNL8";
const codeChallenge = "pQgSBsfD_S2HqKLsRolDFljd5ECIgerjRM9Izlkqv5w";
const generatedState = "442x6y58162d1q2l4h556j4q275t531q";

const authLink = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${clientId}&scope=activity&
code_challenge=${codeChallenge}&code_challenge_method=S256&state=${generatedState}&redirect_uri=http%3A%2F%2Flocalhost%3A5174%2Ffitbit`;

export const FitBitIntegration = () => {

    const [user, setUser] = useState(newUserNoFitbit);

    return (
        <Stack sx={{flex: 1}}>
            <Stack flexDirection="row" sx={{m: 1}}>
                <Button variant="outlined" onClick={() => setUser(newUserNoFitbit)}>
                    New User
                </Button>
                <Button variant="outlined" onClick={() => setUser(newUserWithFitbit)}>
                    User with Fitbit
                </Button>
            </Stack>
            <FitbitPageWithUser user={user}/>
        </Stack>
    );
}

const FitbitPageWithUser = ({user}: any) => {

    const [searchParams] = useSearchParams();

    //Validate user server side, trigger refetching user
    useAsync(async () => {
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      if (state !== generatedState) {
        return;
      }
      if (!code) return;
      try {
        // API CALL
      } catch (e) {
        console.log(e);
        return undefined;
      }
    }, [searchParams]);

    // Revoke token server side, trigger refetching user
    const revokeUser = () => {
        console.log("REVOKE USER")
    }

    
    if(user.isFitbitIntegrated) {
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
            <Button
                onClick={() => {
                    window.location.href = authLink;
                }}
                >
                Integrate
            </Button>
            <Typography variant="h3">
                New to Fitbit?
            </Typography>
            <Typography>
                Simple create an account (you must have a gmail account), set up your mobile phone as the tracker, then come back and integrate above.
            </Typography>
        </Stack>
    );
}