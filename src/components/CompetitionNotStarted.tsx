import { Typography } from "@mui/material";
import Countdown from "react-countdown";
import { Competition } from "../api/api.types";

interface CompetitionNotStartedProps {
    competition: Competition;
}

export const CompetitionNotStarted = ({competition: {startTime}}: CompetitionNotStartedProps) => {
    return (
        <>
            <Typography>You competition starts soon!!</Typography>
            <Countdown date={startTime} onComplete={() => location.reload()}/>
        </>
    );
}