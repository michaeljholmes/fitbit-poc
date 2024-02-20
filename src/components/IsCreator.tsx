import { Button, Stack, SxProps, Tooltip, Typography } from "@mui/material";
import { rem } from "polished";

interface IsCreatorProps {
    challengeId: string;
    sx?: SxProps;
}

const getChallengeSignUpUrl = (challengeId: string): string => `${import.meta.env.VITE_URL}/sign-up/${challengeId}`;

/**
 * For now, the creator will have a default challengeID, they can send out the link with the challenge ID.
 */
export const IsCreator = ({challengeId, sx}: IsCreatorProps) => {
    const link = getChallengeSignUpUrl(challengeId);
    return (
        <Stack sx={sx}>
            <Typography>
                Click the link before to copy it, send it out to all those that wish to participate.
                They'll have right up until the challenge starts to enter.
            </Typography>
            <Typography sx={{mb: 2}} >
                We will generate teams of 5 from those that sign up via the link. Any teams with less people will automatically get assinged our friendly BOT walkers to join their teams. 
                These nifty BOTs are keen walkers, they'll be sure not to let their teams down!
            </Typography> 
            <Tooltip title={`Click to copy link`}>
                <Button sx={{width: rem(250)}} variant="outlined" onClick={() => {navigator.clipboard.writeText(link)}}>
                    <Typography sx={{textDecoration: "underline"}}>Click to copy link</Typography>
                </Button>
            </Tooltip>
            <Typography>
                TODO - LIST OF PEOPLE THAT HAVE JOINED UP
            </Typography>
        </Stack>
    );
}