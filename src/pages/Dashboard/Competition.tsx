import { useQuery } from "react-query";
import { Leaderbaord } from "../../components/Leaderboard";
import { useMemo, useState } from "react";
import { TeamSummary } from "../../components/TeamSummary";
import { Stack, Box, Typography } from "@mui/material";
import { NotFitbitIntegrated } from "../../components/NotFitbitIntegrated";
import { useCompetition } from "../../api/hooks/useCompetition";
import { fetchCompetitionTeams } from "../../api/requests/competitionRequests";
import { useTeam } from "../../api/hooks/teams/useTeam";
import { Team, User } from "../../api/api.types";
import { isDateInFuture } from "../../utils/isDateInFuture";
import { IsCreator } from "../../components/IsCreator";
import { CompetitionNotStarted } from "../../components/CompetitionNotStarted";

interface CompetitionProps {
  user: User;
  competitionId: string;
}

// Initially just show winning team

export const Competition = ({
  competitionId,
  user: {
    isFitbitIntegrated,
    isCreator
  }
}: CompetitionProps) => {
  const [pageSize, setPageSize] = useState(2);
  const [page, setPage] = useState(0);
  const isNotFitbitEnabled = !isFitbitIntegrated;

  const { isLoading: isCompetitionLoading, data: competition } = useCompetition(competitionId);
  const isCompetitionInFuture = useMemo(() => 
  competition?.startTime ? isDateInFuture(competition.startTime): false, [competition]);

  const [selectedTeam, setSelectedTeam] = useState<Team | undefined>();

  const { isLoading: isTeamsLoading, data: teams } = useQuery({
    queryKey: ["teams", pageSize, page],
    queryFn: () => fetchCompetitionTeams(competition?.id!, pageSize, page),
    onSuccess: (teams) => {
      setSelectedTeam(teams.items[0]);
    },
    enabled: Boolean(competition)
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

  if(isCompetitionLoading){
    return <Typography>Loading...</Typography>
  }

  if(!competition){
    return <Typography>No competition found</Typography>
  }

  return (
    <Stack sx={{ height: "100%", backgroundColor: "#ECF0F1", p: 2}}>
      {isCreator && isCompetitionInFuture && <IsCreator sx={{mb: 2}} competitionId={competitionId} />}
      {isNotFitbitEnabled && <NotFitbitIntegrated />}
      {isCompetitionInFuture ?
        <CompetitionNotStarted competition={competition}/>
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
              isLoading={isCompetitionLoading || isTeamsLoading}
            />
          </Stack>
        </Stack>
      }  
    </Stack>
  );
};
