import { useQuery } from "react-query";
import { Leaderbaord } from "../../components/Leaderboard";
import { useState } from "react";
import { TeamSummary } from "../../components/TeamSummary";
import { Stack, Box, Typography } from "@mui/material";
import { isFuture, parseISO } from "date-fns";
import Countdown from "react-countdown";
import { NotFitbitIntegrated } from "../../components/NotFitbitIntegrated";
import { useChallenge } from "../../api/hooks/useChallenge";
import { fetchTeams } from "../../api/requests/teamRequests";
import { useTeam } from "../../api/hooks/useTeam";
import { Team, User } from "../../api/api.types";

interface ChallengeProps {
  user: User;
  challengeId: string;
}

// Initially just show winning team

export const ChallengePage = ({
  challengeId,
  user
}: ChallengeProps) => {
  const [pageSize, setPageSize] = useState(2);
  const [page, setPage] = useState(0);
  const isNotFitbitEnabled = !user.isFitbitIntegrated;

  console.log("PROCESS ", process.env.NODE_ENV);

  const { isLoading: isChallengeLoading, data: challenge } = useChallenge(challengeId);

  const [selectedTeam, setSelectedTeam] = useState<Team | undefined>();

  const { isLoading: isTeamsLoading, data: teams } = useQuery({
    queryKey: ["teams", pageSize, page],
    queryFn: () => fetchTeams(pageSize, page),
    onSuccess: (teams) => {
      setSelectedTeam(teams.items[0]);
    },
    enabled: Boolean(challenge)
  });

  const [selectedRowId, setSelectedRowId] = useState<string[] | undefined>(
    undefined,
  );

  const { data: teamMembers } = useTeam(selectedTeam);

  const onSelectedRow = async (row: string[]) => {
    setSelectedRowId(row);
    const team = teams?.items.find(({ id }) => id === row[0]);
    if (team) {
      setSelectedTeam(team);
    }
  };

  if(challenge?.startTime && isFuture(parseISO(challenge.startTime))){
    return (
      <>
        {isNotFitbitEnabled && <NotFitbitIntegrated />}
        <Typography>You challenge starts soon!!</Typography>
        <Countdown date={challenge.startTime} />
      </>
    )
  }

  return (
    <Stack sx={{ height: "100%", backgroundColor: "#ECF0F1" }}>
      {isNotFitbitEnabled && <NotFitbitIntegrated />}
      <Stack sx={{flex: 1, position: "relative"}}>
        <Box sx={{...(isNotFitbitEnabled && {position: "absolute", backgroundColor: "black", flex: 1, width: "100%", height: "100%", opacity: 0.5, zIndex: 2})}}/>
        <Stack flexDirection={"row"} sx={{ p: 4}}>
          <TeamSummary users={teamMembers} />
          <Leaderbaord
            sx={{ ml: 2 }}
            rows={teams?.items ?? []}
            onPaginationModelChange={(model) => {
              console.log(model);
              setPage(model.page);
              setPageSize(model.pageSize);
            }}
            rowCount={teams?.totalItems ?? 0}
            paginationModel={{ page, pageSize }}
            pageSizeOptions={[2, 4, 6]}
            rowSelectionModel={selectedRowId}
            setRowSelectionModel={onSelectedRow}
            isLoading={isChallengeLoading || isTeamsLoading}
          />
        </Stack>
      </Stack>  
    </Stack>
  );
};
