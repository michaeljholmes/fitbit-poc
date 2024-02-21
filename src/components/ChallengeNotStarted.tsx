import { Typography } from "@mui/material";
import Countdown from "react-countdown";
import { Challenge } from "../api/api.types";

interface ChallengeNotStartedProps {
    challenge: Challenge;
}

export const ChallengeNotStarted = ({challenge: {startTime}}: ChallengeNotStartedProps) => {
    return (
        <>
            <Typography>You challenge starts soon!!</Typography>
            <Countdown date={startTime} onComplete={() => location.reload()}/>
        </>
    );
}