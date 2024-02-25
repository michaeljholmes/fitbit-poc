import { useQuery } from "react-query";
import { Leaderbaord } from "../../components/Leaderboard";
import { useMemo, useState } from "react";
import { TeamSummary } from "../../components/TeamSummary";
import { Stack, Box, Typography } from "@mui/material";
import { NotFitbitIntegrated } from "../../components/NotFitbitIntegrated";
import { useChallenge } from "../../api/hooks/useChallenge";
import { fetchChallengeTeams } from "../../api/requests/challengeRequests";
import { useTeam } from "../../api/hooks/teams/useTeam";
import { Team, User } from "../../api/api.types";
import { isDateInFuture } from "../../utils/isDateInFuture";
import { IsCreator } from "../../components/IsCreator";
import { ChallengeNotStarted } from "../../components/ChallengeNotStarted";

interface ChallengeProps {
  user: User;
  challengeId: string;
}

// Initially just show winning team

export const Challenge = ({
  challengeId,
  user: {
    isFitbitIntegrated,
    isCreator
  }
}: ChallengeProps) => {
  const [pageSize, setPageSize] = useState(2);
  const [page, setPage] = useState(0);
  const isNotFitbitEnabled = !isFitbitIntegrated;

  const { isLoading: isChallengeLoading, data: challenge } = useChallenge(challengeId);
  const isChallengeInFuture = useMemo(() => 
    challenge?.startTime ? isDateInFuture(challenge.startTime): false, [challenge]);

  const [selectedTeam, setSelectedTeam] = useState<Team | undefined>();

  const { isLoading: isTeamsLoading, data: teams } = useQuery({
    queryKey: ["teams", pageSize, page],
    queryFn: () => fetchChallengeTeams(challenge?.id!, pageSize, page),
    onSuccess: (teams) => {
      setSelectedTeam(teams.items[0]);
    },
    enabled: Boolean(challenge)
  });
  console.log(teams)

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

  if(isChallengeLoading){
    return <Typography>Loading...</Typography>
  }

  if(!challenge){
    return <Typography>No challenge found</Typography>
  }

  return (
    <Stack sx={{ height: "100%", backgroundColor: "#ECF0F1", p: 2}}>
      {isCreator && isChallengeInFuture && <IsCreator sx={{mb: 2}} challengeId={challengeId} />}
      {isNotFitbitEnabled && <NotFitbitIntegrated />}
      {isChallengeInFuture ?
        <ChallengeNotStarted challenge={challenge}/>
        :
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
      }  
    </Stack>
  );
};
