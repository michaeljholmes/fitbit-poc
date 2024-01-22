import { Button, Stack, Typography } from "@mui/material";
import { rem } from "polished";

export const FitBitIntegration = () => {

    if(true) {
        return(
            <>
                <Typography>
                    You're all setup.
                </Typography>
                <Typography>
                    If for any reason you need to disconnect, or switch Fitbit accounts, disconnect your fitbit account from Stridewars by selecting 'Disconnect' below.
                </Typography>
                <Button sx={{width: rem(150)}} variant="outlined" onClick={() =>{}}>Disconnect</Button>
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
            <Typography variant="h3">
                New to Fitbit?
            </Typography>
            <Typography>
                Simple create an account (you must have a gmail account), set up your mobile phone as the tracker, then come back and integration above.
            </Typography>
        </Stack>
    );
}