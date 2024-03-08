import { Stack, Typography, Button } from "@mui/material";
import { rem } from "polished";
import { useNavigate } from "react-router";

export const NotFitbitIntegrated = () => {
    const navigate = useNavigate();
    return ( 
    <Stack alignItems={"center"} sx={{m: 1}}>
        <Typography textAlign="center" variant="h2">You must connect Stridewars with fitbit so we can track your steps!</Typography>
        <Typography sx={{my: 2}} textAlign="center" variant="h3">Its easy to set up and totally free. Haven't got a fitbit, not to worry, you can use your phone, with the Fitbit app to count your steps.</Typography>
        <Button sx={{m: 1, width: rem(250)}} onClick={() => navigate("tracker")} variant="outlined">Click here to get set up!</Button>
    </Stack>);
}